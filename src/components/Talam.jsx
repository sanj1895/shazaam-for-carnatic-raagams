import React, { useState, useRef, useEffect, useCallback } from 'react';
import { getAudioCtx } from '../utils/audioUtils';
import { CuratedIcon } from './IconLibrary';
import SketchyRule from './SketchyRule';

const TALAS = [
  {
    id: 'adi',
    name: 'Adi',
    description: 'Chatusra Jati Triputa',
    pattern: ['sam', 'finger', 'finger', 'finger', 'clap', 'wave', 'clap', 'wave'],
    groups: [4, 2, 2],
  },
  {
    id: 'rupaka',
    name: 'Rupaka',
    description: 'Drutam + Chatusra Laghu',
    pattern: ['sam', 'wave', 'clap', 'finger', 'finger', 'finger'],
    groups: [2, 4],
  },
  {
    id: 'misra_chapu',
    name: 'Misra Chapu',
    description: '3 + 2 + 2',
    pattern: ['sam', 'finger', 'finger', 'clap', 'wave', 'clap', 'wave'],
    groups: [3, 2, 2],
  },
  {
    id: 'khanda_chapu',
    name: 'Khanda Chapu',
    description: '2 + 3',
    pattern: ['sam', 'wave', 'clap', 'finger', 'finger'],
    groups: [2, 3],
  },
  {
    id: 'tisra_ekam',
    name: 'Tisra Ekam',
    description: 'Tisra Laghu',
    pattern: ['sam', 'finger', 'finger'],
    groups: [3],
  },
];

function playClick(ctx, time, type) {
  const cfg = {
    sam:    { freq: 940, vol: 0.60, body: 220, decay: 0.15, resonance: 0.12 },
    clap:   { freq: 720, vol: 0.35, body: 280, decay: 0.08, resonance: 0.04 },
    wave:   { freq: 480, vol: 0.15, body: 280, decay: 0.06, resonance: 0.02 },
    finger: { freq: 480, vol: 0.12, body: 280, decay: 0.05, resonance: 0.01 },
  };
  const { freq, vol, body, decay, resonance } = cfg[type] || cfg.finger;

  // 1. Transient Click (The "Attack")
  const click = ctx.createOscillator();
  const clickGain = ctx.createGain();
  click.type = 'triangle';
  click.frequency.setValueAtTime(freq * 1.5, time);
  click.frequency.exponentialRampToValueAtTime(freq, time + 0.03);
  
  clickGain.gain.setValueAtTime(vol, time);
  clickGain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);
  
  click.connect(clickGain);
  clickGain.connect(ctx.destination);
  click.start(time);
  click.stop(time + 0.05);

  // 2. Resonant Body (The "Woody" sound)
  const bodyOsc = ctx.createOscillator();
  const bodyGain = ctx.createGain();
  bodyOsc.type = 'sine';
  bodyOsc.frequency.setValueAtTime(body, time);
  
  bodyGain.gain.setValueAtTime(vol * 0.8, time);
  bodyGain.gain.exponentialRampToValueAtTime(0.001, time + decay);
  
  bodyOsc.connect(bodyGain);
  bodyGain.connect(ctx.destination);
  bodyOsc.start(time);
  bodyOsc.stop(time + decay + 0.02);

  // 3. Metallic Overtones (for Sam beat only)
  if (type === 'sam') {
    const metal = ctx.createOscillator();
    const metalGain = ctx.createGain();
    metal.type = 'sine';
    metal.frequency.setValueAtTime(freq * 2.1, time);
    
    metalGain.gain.setValueAtTime(resonance, time);
    metalGain.gain.exponentialRampToValueAtTime(0.001, time + 0.25);
    
    metal.connect(metalGain);
    metalGain.connect(ctx.destination);
    metal.start(time);
    metal.stop(time + 0.3);
  }
}

export default function Talam() {
  const [selectedTala, setSelectedTala] = useState('adi');
  const [bpm, setBpm] = useState(72);
  const [playing, setPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(-1);

  const timerRef      = useRef(null);
  const animFrameRef  = useRef(null);
  const nextTimeRef   = useRef(0);
  const beatCountRef  = useRef(0);
  const scheduledRef  = useRef([]);
  const bpmRef        = useRef(bpm);

  // Keep bpmRef in sync without restarting the scheduler
  useEffect(() => { bpmRef.current = bpm; }, [bpm]);

  const stopScheduler = useCallback(() => {
    clearTimeout(timerRef.current);
    cancelAnimationFrame(animFrameRef.current);
    scheduledRef.current = [];
    setCurrentBeat(-1);
  }, []);

  useEffect(() => {
    if (!playing) { stopScheduler(); return; }

    const ctx = getAudioCtx();
    const tala = TALAS.find(t => t.id === selectedTala);

    nextTimeRef.current  = ctx.currentTime + 0.05;
    beatCountRef.current = 0;
    scheduledRef.current = [];

    function schedule() {
      while (nextTimeRef.current < ctx.currentTime + 0.2) {
        const spb     = 60 / bpmRef.current;
        const beatIdx = beatCountRef.current % tala.pattern.length;
        playClick(ctx, nextTimeRef.current, tala.pattern[beatIdx]);
        scheduledRef.current.push({ beat: beatIdx, time: nextTimeRef.current });
        nextTimeRef.current  += spb;
        beatCountRef.current += 1;
      }
      timerRef.current = setTimeout(schedule, 30);
    }

    function syncVisual() {
      const now    = ctx.currentTime;
      const passed = scheduledRef.current.filter(b => b.time <= now + 0.015);
      if (passed.length > 0) setCurrentBeat(passed[passed.length - 1].beat);
      scheduledRef.current = scheduledRef.current.filter(b => b.time > now - 0.1);
      animFrameRef.current = requestAnimationFrame(syncVisual);
    }

    schedule();
    animFrameRef.current = requestAnimationFrame(syncVisual);
    return stopScheduler;
  }, [playing, selectedTala, stopScheduler]);

  const handleTalaChange = (id) => {
    if (playing) setPlaying(false);
    setSelectedTala(id);
  };

  const adjustBpm = (delta) => setBpm(v => Math.max(40, Math.min(240, v + delta)));

  const tala       = TALAS.find(t => t.id === selectedTala);
  const tempoLabel = bpm < 60 ? 'Vilambit' : bpm <= 120 ? 'Madhyama' : 'Drut';

  // Pre-compute group offsets
  let offset = 0;
  const groups = tala.groups.map(size => {
    const start = offset;
    offset += size;
    return { start, size };
  });

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 relative z-10 talam-container space-y-6">

      {/* Header */}
      <div className="w-full flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-c-card border border-c-gold/30 flex items-center justify-center text-c-gold shadow-md flex-shrink-0">
          <CuratedIcon icon="talam" className="w-7 h-7" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="font-playfair text-2xl font-bold tracking-wider text-c-gold uppercase leading-none">Talam</h2>
            <span className="text-[8px] uppercase tracking-widest bg-c-gold/15 text-c-gold px-2 py-0.5 rounded font-semibold border border-c-gold/20 leading-none">Rhythm</span>
          </div>
          <p className="text-c-cream-dim text-[11px] mt-1 font-light leading-relaxed">
            Keep the cycle — select a tala, set your tempo, and feel the pulse.
          </p>
        </div>
      </div>
      <SketchyRule className="opacity-60" />

      {/* Tala selector */}
      <div className="flex flex-wrap gap-2">
        {TALAS.map(t => (
          <button
            key={t.id}
            onClick={() => handleTalaChange(t.id)}
            className={[
              'px-4 py-2 rounded-full border font-playfair text-xs tracking-wide transition-all',
              selectedTala === t.id
                ? 'bg-c-gold border-c-gold text-c-bg font-bold'
                : 'border-c-gold/30 text-c-cream-dim hover:border-c-gold hover:text-c-gold',
            ].join(' ')}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* Two-column on laptop: beat display left, tempo + start right */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-4 items-start">

        {/* Beat display */}
        <div className="heritage-card rounded-xl p-6 space-y-5">
          <div className="absolute inset-0 pointer-events-none">
            <div className="heritage-border-corner heritage-corner-tl" />
            <div className="heritage-border-corner heritage-corner-tr" />
            <div className="heritage-border-corner heritage-corner-bl" />
            <div className="heritage-border-corner heritage-corner-br" />
          </div>

          <div className="relative z-10">
            <p className="font-playfair text-c-gold text-lg font-bold">{tala.name} Tala</p>
            <p className="text-xs text-c-cream-dark italic">
              {tala.description} · {tala.pattern.length} beats · {tala.groups.join(' + ')}
            </p>
          </div>

          {/* Beat circles grouped by anga */}
          <div className="relative z-10 flex items-end gap-2 flex-wrap">
            {groups.map(({ start, size }, gIdx) => (
              <React.Fragment key={gIdx}>
                {gIdx > 0 && (
                  <div className="self-stretch flex items-center">
                    <div className="w-px h-8 bg-c-gold/15 mx-1" />
                  </div>
                )}
                <div className="flex items-end gap-2">
                  {Array.from({ length: size }).map((_, bIdx) => {
                    const beatIdx  = start + bIdx;
                    const beatType = tala.pattern[beatIdx];
                    const isActive = currentBeat === beatIdx && playing;
                    const isSam    = beatType === 'sam';
                    const isWave   = beatType === 'wave';
                    const isClap   = beatType === 'clap';

                    return (
                      <div key={beatIdx} className="flex flex-col items-center gap-1.5">
                        <div className={[
                          'flex items-center justify-center rounded-full transition-all duration-100 font-playfair font-bold relative',
                          isSam ? 'w-14 h-14 text-base' : 'w-11 h-11 text-xs',
                          isActive
                            ? 'bg-c-gold shadow-[0_0_25px_rgba(200,148,31,0.85)] scale-110 text-c-bg z-20'
                            : isSam
                            ? 'bg-c-card border-2 border-c-gold text-c-gold'
                            : isClap
                            ? 'bg-c-card border border-c-gold/60 text-c-cream'
                            : isWave
                            ? 'bg-transparent border border-c-gold/30 text-c-cream-dark'
                            : 'bg-c-card border-2 border-c-gold/40 text-c-gold-dim',
                        ].join(' ')}>
                          {isActive && (
                            <div className="absolute inset-0 rounded-full animate-ping bg-c-gold opacity-20" />
                          )}
                          {beatIdx + 1}
                        </div>
                        <span className={`text-[9px] uppercase tracking-wider leading-none font-bold ${isActive ? 'text-c-gold' : 'text-c-cream-dark/50'}`}>
                          {isSam ? 'sam' : isWave ? 'veechu' : isClap ? 'thattu' : 'viral'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </React.Fragment>
            ))}
          </div>

          {/* Legend */}
          <div className="relative z-10 flex flex-wrap gap-4 pt-4 border-t border-c-gold/10">
            {[
              { term: 'Sam',    desc: 'First beat' },
              { term: 'Thattu', desc: 'Clap' },
              { term: 'Veechu', desc: 'Wave / Rest' },
              { term: 'Viral',  desc: 'Finger Count' },
            ].map(({ term, desc }) => (
              <div key={term} className="flex flex-col gap-0.5">
                <span className="text-[10px] text-c-gold font-bold uppercase tracking-widest">{term}</span>
                <span className="text-[9px] text-c-cream-dark/60 italic leading-none">{desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: tempo + start/stop */}
        <div className="flex flex-col gap-4">
          {/* Tempo control */}
          <div className="heritage-card rounded-xl p-5 space-y-4">
            <div className="absolute inset-0 pointer-events-none">
              <div className="heritage-border-corner heritage-corner-tl" />
              <div className="heritage-border-corner heritage-corner-tr" />
              <div className="heritage-border-corner heritage-corner-bl" />
              <div className="heritage-border-corner heritage-corner-br" />
            </div>

            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-xs font-playfair font-bold text-c-gold uppercase tracking-[0.2em]">Tempo</p>
                <p className="text-[10px] text-c-cream-dark italic mt-0.5">{tempoLabel}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => adjustBpm(-5)}
                  className="w-8 h-8 rounded-full border border-c-gold/40 text-c-gold text-lg leading-none hover:bg-c-gold hover:text-c-bg transition-colors"
                >−</button>
                <div className="text-center min-w-[56px]">
                  <span className="font-playfair text-2xl font-bold text-c-cream">{bpm}</span>
                  <span className="text-[10px] text-c-cream-dark ml-1">BPM</span>
                </div>
                <button
                  onClick={() => adjustBpm(+5)}
                  className="w-8 h-8 rounded-full border border-c-gold/40 text-c-gold text-lg leading-none hover:bg-c-gold hover:text-c-bg transition-colors"
                >+</button>
              </div>
            </div>

            <input
              type="range"
              min="40" max="240" step="1"
              value={bpm}
              onChange={e => setBpm(Number(e.target.value))}
              className="relative z-10 w-full cursor-pointer accent-c-gold"
            />

            <div className="relative z-10 flex justify-between text-[9px] text-c-cream-dark/40">
              <span>40 Vilambit</span>
              <span>120 Madhyama</span>
              <span>240 Drut</span>
            </div>
          </div>

          {/* Start / Stop */}
          <button
            onClick={() => setPlaying(p => !p)}
            className={[
              'w-full py-4 rounded-xl border font-playfair text-base tracking-[0.2em] uppercase transition-all duration-300',
              playing
                ? 'bg-c-gold text-c-bg border-c-gold shadow-[0_0_30px_rgba(200,148,31,0.4)]'
                : 'border-c-gold text-c-gold hover:bg-c-gold hover:text-c-bg',
            ].join(' ')}
          >
            {playing ? '◼  Stop' : '▶  Start'}
          </button>
        </div>

      </div>

    </div>
  );
}
