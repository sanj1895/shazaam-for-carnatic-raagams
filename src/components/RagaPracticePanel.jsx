import { useState, useRef, useEffect } from 'react';
import { getAudioCtx, detectPitch, startDrone, SWARA_SEMITONE } from '../utils/audioUtils';
import { getSwaram } from '../utils/ragaLogic';

const GROQ_KEY = import.meta.env.VITE_GROQ_API_KEY;
const RECORD_SECS = 20;

const PITCHES = [
  { label: 'C',  hz: 261.63 }, { label: 'C#', hz: 277.18 },
  { label: 'D',  hz: 293.66 }, { label: 'D#', hz: 311.13 },
  { label: 'E',  hz: 329.63 }, { label: 'F',  hz: 349.23 },
  { label: 'F#', hz: 369.99 }, { label: 'G',  hz: 392.00 },
  { label: 'G#', hz: 415.30 }, { label: 'A',  hz: 440.00 },
  { label: 'A#', hz: 466.16 }, { label: 'B',  hz: 493.88 },
];

// ── Audio analysis helpers ───────────────────────────────────────────────────

function measureHarmonicRichness(analyser, fundamentalHz, sampleRate) {
  const fftData = new Float32Array(analyser.frequencyBinCount);
  analyser.getFloatFrequencyData(fftData);
  const binHz = sampleRate / analyser.fftSize;
  const NOISE_FLOOR_DB = -75;
  let harmonicEnergy = 0;
  let totalEnergy = 0;
  fftData.forEach((db, i) => {
    if (db > NOISE_FLOOR_DB) {
      const lin = Math.pow(10, db / 20);
      totalEnergy += lin;
      const freq = i * binHz;
      for (let h = 1; h <= 5; h++) {
        if (Math.abs(freq - fundamentalHz * h) < binHz * 2.5) harmonicEnergy += lin;
      }
    }
  });
  return totalEnergy > 0 ? Math.min(1, harmonicEnergy / totalEnergy) : 0;
}

function oscillationHz(pitchWindow) {
  if (pitchWindow.length < 8) return 0;
  const mean = pitchWindow.reduce((a, b) => a + b, 0) / pitchWindow.length;
  let crossings = 0;
  for (let i = 1; i < pitchWindow.length; i++) {
    if ((pitchWindow[i] - mean) * (pitchWindow[i - 1] - mean) < 0) crossings++;
  }
  const durationSecs = pitchWindow.length * 0.05;
  return durationSecs > 0 ? (crossings / 2) / durationSecs : 0;
}

function alignSequence(detected, expected) {
  let eIdx = 0;
  const results = expected.map(n => ({ note: n, hit: false }));
  for (const note of detected) {
    if (eIdx >= expected.length) break;
    if (note === expected[eIdx]) { results[eIdx].hit = true; eIdx++; }
  }
  return results;
}

// ── Main component ───────────────────────────────────────────────────────────

export default function RagaPracticePanel({ raga, initialSaHz = 293.66 }) {
  const [saHz, setSaHz]         = useState(initialSaHz || 293.66);
  const [droneOn, setDroneOn]   = useState(false);
  const [phase, setPhase]       = useState('idle');
  const [countdown, setCountdown] = useState(RECORD_SECS);
  const [feedback, setFeedback] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [liveNotes, setLiveNotes] = useState([]);

  const streamRef      = useRef(null);
  const droneStopRef   = useRef(null);
  const analysisRef    = useRef(null);
  const countdownRef   = useRef(null);

  // Data collection
  const pitchHistRef    = useRef([]); // { swara, devCents, freq, time }
  const harmonicHist    = useRef([]); // harmonic richness per detected-pitch frame
  const rmsHist         = useRef([]); // RMS per frame
  const sequenceRef     = useRef([]); // committed distinct notes
  const candidateRef    = useRef(null);
  const candidateCt     = useRef(0);
  const silenceCt       = useRef(0);

  const cleanup = () => {
    clearInterval(analysisRef.current);
    clearInterval(countdownRef.current);
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
  };

  const stopDroneNow = () => { droneStopRef.current?.(); droneStopRef.current = null; setDroneOn(false); };

  const toggleDrone = () => {
    if (droneOn) { stopDroneNow(); return; }
    droneStopRef.current = startDrone(saHz, getAudioCtx());
    setDroneOn(true);
  };

  const changeSa = (hz) => {
    setSaHz(hz);
    if (droneOn) { droneStopRef.current?.(); droneStopRef.current = startDrone(hz, getAudioCtx()); }
  };

  useEffect(() => () => { cleanup(); stopDroneNow(); }, []);

  // ── Recording ────────────────────────────────────────────────────────────

  const startRecording = async () => {
    cleanup();
    setErrorMsg('');
    setFeedback('');
    setLiveNotes([]);
    pitchHistRef.current  = [];
    harmonicHist.current  = [];
    rmsHist.current       = [];
    sequenceRef.current   = [];
    candidateRef.current  = null;
    candidateCt.current   = 0;
    silenceCt.current     = 0;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const ctx    = getAudioCtx();
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 4096;
      source.connect(analyser);

      setPhase('recording');
      setCountdown(RECORD_SECS);

      let remaining = RECORD_SECS;
      countdownRef.current = setInterval(() => {
        remaining--;
        setCountdown(remaining);
        if (remaining <= 0) stopAndAnalyze();
      }, 1000);

      analysisRef.current = setInterval(() => {
        const buf = new Float32Array(analyser.fftSize);
        analyser.getFloatTimeDomainData(buf);
        const rms = Math.sqrt(buf.reduce((s, v) => s + v * v, 0) / buf.length);
        rmsHist.current.push(rms);

        const isSinging = rms * 1200 > 5;
        if (isSinging) {
          const freq = detectPitch(analyser, ctx.sampleRate);
          if (freq && freq >= 80 && freq <= 800) {
            const swara = getSwaram(freq, saHz);
            if (swara) {
              const targetFreq = saHz * Math.pow(2, (SWARA_SEMITONE[swara] ?? 0) / 12);
              const devCents = 1200 * Math.log2(freq / targetFreq);
              pitchHistRef.current.push({ swara, devCents, freq, time: Date.now() });
              harmonicHist.current.push(measureHarmonicRichness(analyser, freq, ctx.sampleRate));

              silenceCt.current = 0;
              if (swara === candidateRef.current) {
                candidateCt.current++;
              } else {
                candidateRef.current = swara;
                candidateCt.current = 1;
              }
              if (candidateCt.current === 3) {
                const last = sequenceRef.current[sequenceRef.current.length - 1];
                if (last !== swara) {
                  sequenceRef.current.push(swara);
                  setLiveNotes([...sequenceRef.current].slice(-7));
                }
              }
              return;
            }
          }
        }
        silenceCt.current++;
        if (silenceCt.current >= 4) { candidateRef.current = null; candidateCt.current = 0; }
      }, 50);
    } catch {
      setErrorMsg('Microphone access required. Please allow mic and try again.');
      setPhase('error');
    }
  };

  const stopAndAnalyze = () => { cleanup(); doAnalyze(); };

  // ── Analysis + Groq ──────────────────────────────────────────────────────

  const doAnalyze = async () => {
    setPhase('processing');
    try {
      const samples = pitchHistRef.current;
      if (samples.length < 10) throw new Error('Not enough audio detected. Sing clearly into your microphone and try again.');

      // 1. Per-note intonation stats
      const noteGroups = {};
      samples.forEach(({ swara, devCents }) => {
        if (!noteGroups[swara]) noteGroups[swara] = [];
        noteGroups[swara].push(devCents);
      });
      const intonation = Object.fromEntries(
        Object.entries(noteGroups).map(([note, devs]) => {
          const avg = devs.reduce((a, b) => a + b, 0) / devs.length;
          const stdDev = Math.sqrt(devs.reduce((a, v) => a + Math.pow(v - avg, 2), 0) / devs.length);
          return [note, {
            avgDev: Math.round(avg),
            stability: stdDev < 15 ? 'stable' : stdDev < 35 ? 'slightly wavering' : 'unstable',
          }];
        })
      );

      // 2. Sequence alignment
      const clean = arr => arr.filter(n => n !== '|' && n !== '||');
      const expectedAro = clean(raga.arohanam);
      const expectedAva = clean(raga.avarohanam);
      const detected = sequenceRef.current;

      const formatAlignment = (aligned) => aligned.map(({ note, hit }) => {
        if (!hit) return `- ${note}: ✗ missed`;
        const s = intonation[note];
        if (!s) return `- ${note}: ✓ hit`;
        const sign = s.avgDev >= 0 ? '+' : '';
        const tuning = Math.abs(s.avgDev) <= 15 ? 'in tune' : s.avgDev > 0 ? 'sharp' : 'flat';
        return `- ${note}: ✓ hit · ${sign}${s.avgDev}¢ (${tuning}) · ${s.stability}`;
      }).join('\n');

      const aroStr = formatAlignment(alignSequence(detected, expectedAro));
      const avaStr = formatAlignment(alignSequence(detected, expectedAva));

      // 3. Harmonic richness → resonance
      const harmArr = harmonicHist.current;
      const avgHarmonic = harmArr.length > 0 ? harmArr.reduce((a, b) => a + b, 0) / harmArr.length : 0;
      const resonanceLabel = avgHarmonic > 0.55 ? 'resonant and open'
        : avgHarmonic > 0.35 ? 'moderately resonant'
        : 'thin or constricted — voice may be tight';

      // 4. Breath support (RMS envelope shape)
      const rmsArr = rmsHist.current;
      let breathLabel = 'steady';
      if (rmsArr.length > 20) {
        const cut = Math.floor(rmsArr.length * 0.75);
        const earlyAvg = rmsArr.slice(0, cut).reduce((a, b) => a + b, 0) / cut;
        const lateAvg  = rmsArr.slice(cut).reduce((a, b) => a + b, 0) / (rmsArr.length - cut);
        const variance  = rmsArr.reduce((a, v) => a + Math.pow(v - earlyAvg, 2), 0) / rmsArr.length;
        if (lateAvg < earlyAvg * 0.5)  breathLabel = 'fading — voice dropped toward the end, likely breath support issue';
        else if (variance > 0.0008)     breathLabel = 'slightly inconsistent — some volume fluctuation detected';
        else                            breathLabel = 'steady and well-supported throughout';
      }

      // 5. Gamakam / oscillation per note segment
      const gamakamNotes = [];
      let segStart = 0;
      for (let i = 1; i <= samples.length; i++) {
        const ended = i === samples.length || samples[i]?.swara !== samples[segStart].swara;
        if (ended) {
          if (i - segStart >= 8) {
            const hz = oscillationHz(samples.slice(segStart, i).map(s => s.freq));
            if (hz >= 3.5 && hz <= 9) gamakamNotes.push(`${samples[segStart].swara} (${hz.toFixed(1)} Hz)`);
          }
          segStart = i;
        }
      }
      const ornamentLabel = gamakamNotes.length > 0
        ? `Oscillation detected on: ${gamakamNotes.join(', ')} — possible kampita gamakam`
        : 'No clear ornamentation detected';

      // 6. Groq prompt
      const PROMPT = `You are an expert classical Carnatic vocal teacher evaluating a student who already has a foundation and is now deepening their practice of the raga ${raga.name}.

RAGA: ${raga.name}
Arohanam: ${expectedAro.join(' ')}
Avarohanam: ${expectedAva.join(' ')}
${raga.description ? `Character: ${raga.description}` : ''}

AROHANAM ACCURACY:
${aroStr}

AVAROHANAM ACCURACY:
${avaStr}

VOICE QUALITY:
- Resonance: ${resonanceLabel} (harmonic richness: ${(avgHarmonic * 100).toFixed(0)}%)
- Breath Support: ${breathLabel}
- Ornamentation: ${ornamentLabel}

Respond in exactly 3 short paragraphs, max 200 words total:
1. Note accuracy — which notes they nailed, which were consistently flat or sharp, which they missed. Be specific.
2. Voice quality — address the resonance and breath support using proper Carnatic terms (akaram, gamakam, shruti, swarasthana). If ornamentation was detected, comment on whether it was clean.
3. One precise, actionable tip for their next practice session.

Tone: warm but direct. Address them as a serious student. Do not mention numbers or cents.`;

      if (GROQ_KEY) {
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_KEY}` },
          body: JSON.stringify({ model: 'llama-3.3-70b-versatile', messages: [{ role: 'user', content: PROMPT }], temperature: 0.65 }),
        });
        if (!res.ok) throw new Error(`Groq API error ${res.status}`);
        const data = await res.json();
        setFeedback(data.choices[0]?.message?.content || 'No feedback generated.');
      } else {
        const hitAro = alignSequence(detected, expectedAro).filter(a => a.hit).length;
        setFeedback(`You sang ${hitAro} of ${expectedAro.length} arohanam notes. Voice: ${resonanceLabel}. Breath: ${breathLabel}. ${ornamentLabel}.`);
      }

      setPhase('result');
    } catch (err) {
      setErrorMsg(err.message || 'Error generating feedback.');
      setPhase('error');
    }
  };

  // ── Render ───────────────────────────────────────────────────────────────

  const currentPitch = PITCHES.find(p => Math.abs(p.hz - saHz) < 1);
  const progressPct  = Math.round(((RECORD_SECS - countdown) / RECORD_SECS) * 100);

  return (
    <div className="flex flex-col gap-5">

      {/* Sa selector */}
      <div className="bg-c-surface border border-c-border rounded-xl p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-playfair text-c-cream-dim italic">Set your Sa (root note)</span>
          <span className="font-mono text-xs text-c-gold">{currentPitch?.label ?? '—'} · {Math.round(saHz)} Hz</span>
        </div>
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-1">
          {PITCHES.map(p => {
            const sel = Math.abs(p.hz - saHz) < 1;
            const isSharp = p.label.includes('#');
            return (
              <button
                key={p.label}
                onClick={() => changeSa(p.hz)}
                className={`py-2 rounded text-[10px] font-mono font-bold transition-all ${
                  sel
                    ? 'bg-c-gold text-c-bg border border-c-gold'
                    : isSharp
                    ? 'bg-c-bg border border-c-border text-c-cream-dark hover:border-c-gold/40'
                    : 'bg-c-surface border border-c-border text-c-cream hover:border-c-gold/40'
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Drone toggle */}
      <button
        onClick={toggleDrone}
        disabled={phase === 'recording' || phase === 'processing'}
        className={`flex items-center gap-2 self-start px-4 py-2 rounded-full border text-xs font-playfair transition-all disabled:opacity-40 ${
          droneOn
            ? 'border-c-gold bg-c-gold/10 text-c-gold'
            : 'border-c-border text-c-cream-dark hover:border-c-gold/40'
        }`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${droneOn ? 'bg-c-gold animate-pulse' : 'bg-c-cream-dark'}`} />
        {droneOn ? 'Drone playing — click to stop' : 'Play drone while you sing (recommended)'}
      </button>

      {/* Idle */}
      {phase === 'idle' && (
        <div className="flex flex-col items-center gap-4 py-4">
          <p className="text-xs text-c-cream-dim font-playfair italic text-center max-w-xs leading-relaxed">
            Sing the arohanam and avarohanam of {raga.name} at your own pace. Hold each note clearly for at least one beat. Recording is {RECORD_SECS} seconds.
          </p>
          <button
            onClick={startRecording}
            className="px-8 py-2.5 border border-c-gold/60 hover:border-c-gold hover:bg-c-gold-faint text-c-gold text-sm rounded transition-all font-playfair tracking-wide"
          >
            Start Recording
          </button>
        </div>
      )}

      {/* Recording */}
      {phase === 'recording' && (
        <div className="flex flex-col items-center gap-4 py-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-c-cream text-sm font-playfair italic">Recording…</span>
            <span className="font-mono text-c-gold text-sm tabular-nums">{countdown}s</span>
          </div>
          <div className="w-full h-1 bg-c-border rounded-full overflow-hidden">
            <div className="h-full bg-c-gold transition-all duration-1000 rounded-full" style={{ width: `${progressPct}%` }} />
          </div>
          <div className="h-5 flex items-center justify-center w-full">
            <p className="text-[11px] text-c-cream-dim tracking-widest">
              {liveNotes.length > 0 ? liveNotes.join(' · ') : 'Listening…'}
            </p>
          </div>
          <button
            onClick={stopAndAnalyze}
            className="text-xs text-c-cream-dark hover:text-c-gold transition-colors underline underline-offset-2"
          >
            Done early · analyze now
          </button>
        </div>
      )}

      {/* Processing */}
      {phase === 'processing' && (
        <div className="flex flex-col items-center gap-3 py-6">
          <div className="w-5 h-5 border-2 border-c-gold/30 border-t-c-gold rounded-full animate-spin" />
          <p className="text-c-cream-dark text-xs font-playfair italic">Analyzing your performance…</p>
        </div>
      )}

      {/* Result */}
      {phase === 'result' && feedback && (
        <div className="flex flex-col gap-4 animate-fade-in">
          <div className="border border-c-gold/20 rounded-xl p-5 bg-c-surface">
            <h4 className="font-playfair text-c-gold text-sm font-bold mb-3 flex items-center gap-2">
              <span className="text-c-gold/50">✦</span> Guru Feedback
            </h4>
            <div className="text-xs text-c-cream-dim font-playfair leading-relaxed space-y-3">
              {feedback.split('\n').filter(l => l.trim()).map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
          <button
            onClick={() => { setPhase('idle'); setFeedback(''); stopDroneNow(); }}
            className="self-center text-xs text-c-cream-dark hover:text-c-gold transition-colors underline underline-offset-2 font-playfair italic"
          >
            Practice again
          </button>
        </div>
      )}

      {/* Error */}
      {phase === 'error' && (
        <div className="flex flex-col items-center gap-3">
          <p className="text-xs text-red-400 text-center font-playfair italic max-w-xs">{errorMsg}</p>
          <button onClick={() => setPhase('idle')} className="text-xs text-c-cream-dark hover:text-c-gold transition-colors underline underline-offset-2">Try again</button>
        </div>
      )}
    </div>
  );
}
