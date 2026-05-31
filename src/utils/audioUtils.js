// audioUtils.js  ·  Web Audio API helpers for Carnatic raga app

export const SWARA_SEMITONE = {
  'Sa': 0,
  'Ri1': 1,
  'Ri2': 2,  'Ga1': 2,   // enharmonic: Ga1 = Ri2
  'Ga2': 3,  'Ri3': 3,   // enharmonic: Ri3 = Ga2
  'Ga3': 4,
  'Ma1': 5,
  'Ma2': 6,
  'Pa': 7,
  'Da1': 8,
  'Da2': 9,  'Ni1': 9,   // enharmonic: Ni1 = Da2
  'Ni2': 10, 'Da3': 10,  // enharmonic: Da3 = Ni2
  'Ni3': 11,
  
  // Plain names mapping to standard Mayamalavagowla (first beginner raga) notes for simplified curriculum
  'Ṙ': 1,   // tara Ri1 — display symbol for upper-octave Ri in Malahari/Saveri; octave auto-detected by getOctaveSequence
  'Ri': 1,
  'Ga': 4,
  'Ma': 5,
  'Da': 8,
  'Ni': 11,
  'Ṡ': 12,

  // Mandhra Sthayi (lower octave) notes — negative semitones encode frequency directly at octave 0
  'Sa.': -12,
  'Ri1.': -11,
  'Ri2.': -10, 'Ga1.': -10,
  'Ga2.': -9,  'Ri3.': -9,
  'Ga3.': -8,
  'Ma.': -7,
  'Ma1.': -7,
  'Ma2.': -6,
  'Pa.': -5,
  'Da1.': -4,
  'Da2.': -3, 'Ni1.': -3,
  'Ni2.': -2, 'Da3.': -2,
  'Ni3.': -1,

  // Plain lower-octave aliases for the beginner Mayamalavagowla material.
  'Ri.': -11,
  'Ga.': -8,
  'Da.': -4,
  'Ni.': -1,

  // Tara Sthayi (upper octave) notes — semitones 12–23 encode frequency directly at octave 0
  // Use ^ suffix to mirror the . suffix convention for mandhra sthayi.
  'Sa^': 12,
  'Ri1^': 13,
  'Ri2^': 14, 'Ga1^': 14,
  'Ga2^': 15, 'Ri3^': 15,
  'Ga3^': 16,
  'Ma1^': 17,
  'Ma2^': 18,
  'Pa^': 19,
  'Da1^': 20,
  'Da2^': 21, 'Ni1^': 21,
  'Ni2^': 22, 'Da3^': 22,
  'Ni3^': 23,

  // Plain upper-octave aliases.
  'Ri^': 13,
  'Ga^': 16,
  'Ma^': 17,
  'Da^': 20,
  'Ni^': 23,
};

export const SEMITONE_TO_SWARA = Object.fromEntries(
  Object.entries(SWARA_SEMITONE).map(([note, semi]) => [semi, note])
);

/**
 * Returns the frequency in Hz for a given note name, given the Sa (tonic) frequency.
 * Uses equal temperament spacing (2^(semitones/12)).
 */
export function noteFreq(note, saHz) {
  const semitone = SWARA_SEMITONE[note] ?? (
    note?.endsWith('.') && SWARA_SEMITONE[note.slice(0, -1)] !== undefined
      ? SWARA_SEMITONE[note.slice(0, -1)] - 12
      : undefined
  );
  if (semitone === undefined) return saHz;
  return saHz * Math.pow(2, semitone / 12);
}

// Singleton AudioContext
let _audioCtx = null;

export function getAudioCtx() {
  if (!_audioCtx || _audioCtx.state === 'closed') {
    _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (_audioCtx.state === 'suspended') {
    _audioCtx.resume();
  }
  return _audioCtx;
}

// Silence all app playback (drone, notes, etc.) while the mic is recording.
// The recording uses its own separate AudioContext, so this only affects output.
export function muteAppAudio() {
  if (_audioCtx && _audioCtx.state === 'running') _audioCtx.suspend();
}

export function unmuteAppAudio() {
  if (_audioCtx && _audioCtx.state === 'suspended') _audioCtx.resume();
}

// Open the microphone and mute app playback so the drone doesn't leak into the mic.
// Returns the MediaStream. Always pair with closeMicStream() when done.
export async function openMicStream() {
  muteAppAudio();
  return navigator.mediaDevices.getUserMedia({
    audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
  });
}

// Build a dedicated recording AudioContext + source → gain → analyser chain.
// Returns { ctx, analyser } — caller owns both and must close ctx when done.
export function buildMicChain(stream, { fftSize = 4096, gain = 2.5 } = {}) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const source = ctx.createMediaStreamSource(stream);
  const gainNode = ctx.createGain();
  gainNode.gain.value = gain;
  const analyser = ctx.createAnalyser();
  analyser.fftSize = fftSize;
  analyser.smoothingTimeConstant = 0;
  source.connect(gainNode);
  gainNode.connect(analyser);
  return { ctx, analyser };
}

// Stop mic tracks, close the recording context, and restore app audio.
export function closeMicStream(stream, ctx) {
  stream?.getTracks().forEach(t => t.stop());
  if (ctx && ctx.state !== 'closed') ctx.close().catch(() => {});
  unmuteAppAudio();
}

function autocorrelateDetailed(buffer, sampleRate, minRms = 0.01) {
  const SIZE = buffer.length;
  let rms = 0;
  for (let i = 0; i < SIZE; i++) rms += buffer[i] * buffer[i];
  rms = Math.sqrt(rms / SIZE);
  if (rms < minRms) return null;

  const correlation = new Float32Array(SIZE);
  for (let lag = 0; lag < SIZE; lag++) {
    let sum = 0;
    for (let i = 0; i < SIZE - lag; i++) sum += buffer[i] * buffer[i + lag];
    correlation[lag] = sum;
  }

  let d = 0;
  while (d < SIZE && correlation[d] > correlation[d + 1]) d++;

  let maxVal = -Infinity;
  let maxPos = -1;
  for (let i = d; i < SIZE; i++) {
    if (correlation[i] > maxVal) {
      maxVal = correlation[i];
      maxPos = i;
    }
  }
  if (maxPos <= 0) return null;

  for (let pass = 0; pass < 2; pass++) {
    const half = Math.round(maxPos / 2);
    if (half <= d) break;
    const halfFreq = sampleRate / half;
    if (halfFreq < 60 || halfFreq > 2000) break;
    if (correlation[half] >= maxVal * 0.80) {
      maxPos = half;
      maxVal = correlation[maxPos];
    } else {
      break;
    }
  }

  const y1 = correlation[maxPos - 1] || 0;
  const y2 = correlation[maxPos];
  const y3 = correlation[maxPos + 1] || 0;
  const denom = 2 * y2 - y1 - y3;
  const refinedPos = denom !== 0 ? maxPos - (y3 - y1) / (2 * denom) : maxPos;

  const frequency = sampleRate / refinedPos;
  const confidence = correlation[0] > 0 ? maxVal / correlation[0] : 0;
  if (frequency < 60 || frequency > 2000 || confidence < 0.22) return null;

  return { freq: frequency, confidence, rms };
}

function yinEstimate(buffer, sampleRate) {
  const threshold = 0.14;
  const maxTau = Math.min(1024, Math.floor(sampleRate / 60));
  const minTau = Math.max(2, Math.floor(sampleRate / 1400));
  const yin = new Float32Array(maxTau + 1);

  for (let tau = 1; tau <= maxTau; tau++) {
    let sum = 0;
    for (let i = 0; i < buffer.length - tau; i++) {
      const diff = buffer[i] - buffer[i + tau];
      sum += diff * diff;
    }
    yin[tau] = sum;
  }

  yin[0] = 1;
  let runningSum = 0;
  for (let tau = 1; tau <= maxTau; tau++) {
    runningSum += yin[tau];
    yin[tau] = runningSum === 0 ? 1 : (yin[tau] * tau) / runningSum;
  }

  let tauEstimate = -1;
  let bestTau = minTau;
  for (let tau = minTau; tau <= maxTau; tau++) {
    if (yin[tau] < yin[bestTau]) bestTau = tau;
    if (yin[tau] < threshold) {
      while (tau + 1 <= maxTau && yin[tau + 1] < yin[tau]) tau++;
      tauEstimate = tau;
      break;
    }
  }

  if (tauEstimate === -1) {
    if (yin[bestTau] > 0.34) return null;
    tauEstimate = bestTau;
  }

  const freq = sampleRate / tauEstimate;
  if (!Number.isFinite(freq) || freq < 60 || freq > 1500) return null;

  return {
    freq,
    confidence: Math.max(0, 1 - yin[tauEstimate]),
  };
}

/**
 * Play a single note using a triangle wave + octave harmonic.
 * Returns duration in ms so callers can chain notes.
 * options: { duration = 0.7, volume = 0.35 }
 */
export function playNote(note, saHz, ctx, options = {}) {
  const { duration = 0.7, volume = 0.35, octaveShift = 0, gamakam = false, slideDir = 1 } = options;
  const audioCtx = ctx || getAudioCtx();
  const freq = noteFreq(note, saHz) * Math.pow(2, octaveShift);
  const now = audioCtx.currentTime;

  const masterGain = audioCtx.createGain();
  
  // Sustained Bansuri Envelope: Gentle swell, long sustain, soft legato-ready release
  masterGain.gain.setValueAtTime(0.0001, now);
  masterGain.gain.linearRampToValueAtTime(volume, now + 0.08); // Softer "breath" attack
  masterGain.gain.linearRampToValueAtTime(volume * 0.9, now + duration * 0.9); 
  // Overlapping release: lasts slightly longer than the gap to create legato feel
  masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration + 0.15); 
  
  // Wood Resonance (Body of the Flute)
  const bodyFilter = audioCtx.createBiquadFilter();
  bodyFilter.type = 'lowpass';
  bodyFilter.frequency.setValueAtTime(1800, now);
  bodyFilter.Q.setValueAtTime(0.8, now);
  
  masterGain.connect(bodyFilter);
  bodyFilter.connect(audioCtx.destination);

  const makeOsc = (targetFreq, type, gainAmt, detune = 0) => {
    const osc = audioCtx.createOscillator();
    osc.type = type;
    osc.detune.setValueAtTime(detune, now);

    if (gamakam) {
      // Organic Vocal slide (Jaaru) & Expressive Breath Curve
      // Instead of robotic continuous wobbling, we do a beautiful slide-in, 
      // followed by a single-cycle warm breath oscillation that gently settles back.
      const jaaruOffset = slideDir >= 0 ? -70 : 60; // Wider slide for natural legato
      const startFreq = targetFreq * Math.pow(2, jaaruOffset / 1200);
      const slideDuration = 0.22;
      
      osc.frequency.setValueAtTime(startFreq, now);
      // Legato slide in
      osc.frequency.exponentialRampToValueAtTime(targetFreq, now + slideDuration);
      
      // Soulful micro-ornamentation: single-cycle breath swell
      if (duration > 0.5) {
        const ornamentStart = now + slideDuration + 0.05;
        osc.frequency.linearRampToValueAtTime(targetFreq * 1.012, ornamentStart + 0.12);
        osc.frequency.linearRampToValueAtTime(targetFreq * 0.988, ornamentStart + 0.24);
        osc.frequency.exponentialRampToValueAtTime(targetFreq, ornamentStart + 0.4);
      }
    } else {
      osc.frequency.setValueAtTime(targetFreq, now);
    }

    const g = audioCtx.createGain();
    g.gain.setValueAtTime(gainAmt, now);
    osc.connect(g);
    g.connect(masterGain);
    osc.start(now);
    osc.stop(now + duration + 0.2);
  };

  // Bansuri Timbre: Hollow fundamental with subtle overtones
  makeOsc(freq, 'triangle', 0.9, 0); 
  makeOsc(freq * 1.001, 'sine', 0.3, 4); // Chorus warmth
  makeOsc(freq * 3, 'sine', 0.1); // Third harmonic (hollow quality)
  makeOsc(freq * 5, 'sine', 0.04); // Fifth harmonic

  // Breath Noise: Substantial for flute realism
  const noise = audioCtx.createBufferSource();
  const bufferSize = audioCtx.sampleRate * (duration + 0.2);
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  noise.buffer = buffer;
  
  const noiseFilter = audioCtx.createBiquadFilter();
  noiseFilter.type = 'bandpass';
  noiseFilter.frequency.setValueAtTime(2000, now);
  noiseFilter.Q.setValueAtTime(1.5, now);
  
  const noiseGain = audioCtx.createGain();
  noiseGain.gain.setValueAtTime(0, now);
  noiseGain.gain.linearRampToValueAtTime(0.04, now + 0.1);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration + 0.15);
  
  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(masterGain);
  noise.start(now);

  return duration * 1000;
}

/**
 * Computes octave shifts for a sequence of notes.
 * Returns an array of integers representing the octave shift for each note.
 */
export function getOctaveSequence(notes, mode = 'auto') {
  const octaves = [];
  let octave = 0;
  let lastAbsSemi = null;
  for (let i = 0; i < notes.length; i++) {
    const swara = notes[i];
    if (swara === '|' || swara === '||' || swara === ',') {
       octaves.push(octave);
       continue;
    }
    const rawSemi = SWARA_SEMITONE[swara] ?? 0;
    // In strict mode, keep all plain notes in the base octave.
    // Only explicit octave-marked notes should move:
    // - mandhra notes (e.g., Ni3.) are encoded as negative semitones
    // - tara notes should be encoded as >= 12 semitones (e.g., Ṡ)
    if (mode === 'strict') {
      octaves.push(0);
      lastAbsSemi = rawSemi;
      continue;
    }
    // Mandhra/tara notes have semitones outside 0–11 that already encode the correct
    // frequency — they always play at octave 0; no auto-shift needed.
    if (rawSemi < 0 || rawSemi >= 12) {
      octaves.push(0);
      lastAbsSemi = rawSemi;
      continue;
    }
    const currAbsSemi = rawSemi + octave * 12;
    if (lastAbsSemi !== null) {
      if (currAbsSemi < lastAbsSemi && (lastAbsSemi - currAbsSemi) > 6) octave++;
      if (currAbsSemi > lastAbsSemi && (currAbsSemi - lastAbsSemi) > 6 && octave > 0) octave--;
    }
    octaves.push(octave);
    lastAbsSemi = rawSemi + octave * 12; // use updated octave so next note has the correct reference
  }
  return octaves;
}

/**
 * Play a sequence of notes with a gap between each.
 * Returns a promise that resolves when the sequence finishes,
 * and an abort function to cancel mid-playback.
 * onNote(note, idx) is called as each note starts.
 */
export function playSequence(notes, saHz, { gapMs = 550, duration = 0.55, onNote, gamakam = false } = {}) {
  const ctx = getAudioCtx();
  const timeouts = [];
  let cancelled = false;

  const octaves = getOctaveSequence(notes);
  // Ensure the note lasts long enough to touch or slightly overlap the next one
  const overlap = 0.08; // 80ms overlap for legato feel
  const effectiveGap = gamakam ? Math.max(gapMs, 680) : gapMs;
  const effectiveDuration = (effectiveGap / 1000) + overlap;

  const promise = new Promise(async (resolve) => {
    if (ctx.state === 'suspended') {
      try { await ctx.resume(); } catch (_) {}
    }
    notes.forEach((note, idx) => {
      // Detect melodic direction so the slide goes the right way
      let slideDir = 1;
      if (gamakam && idx > 0) {
        const prevAbs = (SWARA_SEMITONE[notes[idx - 1]] ?? 0) + (octaves[idx - 1] || 0) * 12;
        const currAbs = (SWARA_SEMITONE[note] ?? 0) + (octaves[idx] || 0) * 12;
        slideDir = currAbs >= prevAbs ? 1 : -1;
      }

      // Natural jitter for human feel, but reduced to preserve legato timing
      const jitter = (Math.random() * 10) - 5; 
      const t = setTimeout(() => {
        if (cancelled) return;
        playNote(note, saHz, ctx, { duration: effectiveDuration, octaveShift: octaves[idx], gamakam, slideDir });
        if (onNote) onNote(note, idx);
        if (idx === notes.length - 1) {
          setTimeout(resolve, effectiveDuration * 1000 + 50);
        }
      }, idx * effectiveGap + jitter);
      timeouts.push(t);
    });
  });

  const abort = () => {
    cancelled = true;
    timeouts.forEach(clearTimeout);
  };

  return { promise, abort };
}

/**
 * Start a continuous Sa drone (two oscillators: fundamental + fifth).
 * Returns a stop() function.
 */
export function startDrone(saHz, ctx) {
  const audioCtx = ctx || getAudioCtx();
  const now = audioCtx.currentTime;

  const masterGain = audioCtx.createGain();
  masterGain.gain.setValueAtTime(0, now);
  masterGain.gain.linearRampToValueAtTime(0.18, now + 0.4);
  masterGain.connect(audioCtx.destination);

  // Sa fundamental
  const oscSa = audioCtx.createOscillator();
  oscSa.type = 'sine';
  oscSa.frequency.setValueAtTime(saHz, now);
  oscSa.connect(masterGain);
  oscSa.start(now);

  // Pa (fifth)  ·  adds richness
  const paHz = saHz * Math.pow(2, 7 / 12);
  const paGain = audioCtx.createGain();
  paGain.gain.setValueAtTime(0.5, now);
  paGain.connect(masterGain);

  const oscPa = audioCtx.createOscillator();
  oscPa.type = 'sine';
  oscPa.frequency.setValueAtTime(paHz, now);
  oscPa.connect(paGain);
  oscPa.start(now);

  // Low octave drone
  const lowGain = audioCtx.createGain();
  lowGain.gain.setValueAtTime(0.35, now);
  lowGain.connect(masterGain);

  const oscLow = audioCtx.createOscillator();
  oscLow.type = 'sine';
  oscLow.frequency.setValueAtTime(saHz / 2, now);
  oscLow.connect(lowGain);
  oscLow.start(now);

  return function stop() {
    const t = audioCtx.currentTime;
    masterGain.gain.setValueAtTime(masterGain.gain.value, t);
    masterGain.gain.linearRampToValueAtTime(0, t + 0.5);
    oscSa.stop(t + 0.55);
    oscPa.stop(t + 0.55);
    oscLow.stop(t + 0.55);
  };
}

/**
 * Autocorrelation-based pitch detection from an AnalyserNode.
 * Returns frequency in Hz, or null if the signal is too quiet or has no clear pitch.
 */
/**
 * Mix a multi-channel AudioBuffer down to a single Float32Array (mono).
 * Averages all channels so stereo content isn't lost by discarding the right channel.
 */
export function mixToMono(audioBuffer) {
  const n    = audioBuffer.numberOfChannels;
  const len  = audioBuffer.length;
  const mono = new Float32Array(len);
  for (let c = 0; c < n; c++) {
    const ch = audioBuffer.getChannelData(c);
    for (let i = 0; i < len; i++) mono[i] += ch[i];
  }
  if (n > 1) for (let i = 0; i < len; i++) mono[i] /= n;
  return mono;
}

/**
 * Find the most melodically active segment of a fixed target duration.
 * Uses a sliding-window RMS sum over 0.5 s frames as an energy proxy.
 * Returns sample offsets and wall-clock times of the best window.
 */
export function findBestSegment(monoData, sampleRate, targetSec = 25) {
  const frameSize    = Math.round(sampleRate * 0.5); // 0.5 s scoring frames
  const targetFrames = Math.round(targetSec / 0.5);

  const scores = [];
  for (let i = 0; i + frameSize < monoData.length; i += frameSize) {
    const slice = monoData.subarray(i, i + frameSize);
    let rms = 0;
    for (let j = 0; j < slice.length; j++) rms += slice[j] * slice[j];
    scores.push(Math.sqrt(rms / slice.length));
  }

  if (scores.length <= targetFrames) {
    return { startSample: 0, endSample: monoData.length,
             startSec: 0, endSec: monoData.length / sampleRate };
  }

  let win = scores.slice(0, targetFrames).reduce((a, b) => a + b, 0);
  let best = win, bestIdx = 0;
  for (let i = targetFrames; i < scores.length; i++) {
    win += scores[i] - scores[i - targetFrames];
    if (win > best) { best = win; bestIdx = i - targetFrames + 1; }
  }

  const startSample = bestIdx * frameSize;
  const endSample   = Math.min(startSample + Math.round(targetSec * sampleRate), monoData.length);
  return { startSample, endSample,
           startSec: startSample / sampleRate, endSec: endSample / sampleRate };
}

/**
 * Autocorrelation pitch extraction on an offline AudioBuffer.
 * Processes a segment of an offline AudioBuffer and returns pitch frames.
 * Accepts { startSample, endSample } to process a specific segment;
 * omit both to process the full buffer.
 * Returns { frames, startSec, endSec }.
 */
export async function extractPitchFrames(audioBuffer, { startSample = 0, endSample = null } = {}) {
  const sampleRate = audioBuffer.sampleRate;
  const mono       = mixToMono(audioBuffer);
  const end        = endSample ?? mono.length;
  const frameSize  = 2048;
  const hopSize    = Math.round(sampleRate * 0.08); // 80 ms hop
  const frames     = [];

  for (let offset = startSample; offset + frameSize < end; offset += hopSize) {
    const frame = mono.subarray(offset, offset + frameSize);
    const hz    = _autocorrelate(frame, sampleRate);
    if (hz) frames.push(hz);

    if (frames.length > 0 && frames.length % 60 === 0) {
      await new Promise(r => setTimeout(r, 0));
    }
  }
  return { frames, startSec: startSample / sampleRate, endSec: end / sampleRate };
}

function _autocorrelate(buffer, sampleRate) {
  const SIZE = buffer.length;
  let rms = 0;
  for (let i = 0; i < SIZE; i++) rms += buffer[i] * buffer[i];
  rms = Math.sqrt(rms / SIZE);
  if (rms < 0.003) return null;

  const correlation = new Float32Array(SIZE);
  for (let lag = 0; lag < SIZE; lag++) {
    let sum = 0;
    for (let i = 0; i < SIZE - lag; i++) sum += buffer[i] * buffer[i + lag];
    correlation[lag] = sum;
  }

  let d = 0;
  while (d < SIZE && correlation[d] > correlation[d + 1]) d++;

  let maxVal = -Infinity, maxPos = -1;
  for (let i = d; i < SIZE; i++) {
    if (correlation[i] > maxVal) { maxVal = correlation[i]; maxPos = i; }
  }
  if (maxPos <= 0) return null;

  const y1 = correlation[maxPos - 1] || 0;
  const y2 = correlation[maxPos];
  const y3 = correlation[maxPos + 1] || 0;
  const denom = 2 * y2 - y1 - y3;
  const refined = denom !== 0 ? maxPos - (y3 - y1) / (2 * denom) : maxPos;
  const freq = sampleRate / refined;

  if (freq < 60 || freq > 2000) return null;
  if (maxVal / correlation[0] < 0.50) return null;
  return freq;
}

// minRms defaults to 0.01 but callers can pass a calibrated dynamic gate instead.
export function detectPitch(analyserNode, sampleRate, minRms = 0.01) {
  const bufferLength = analyserNode.fftSize;
  const buffer = new Float32Array(bufferLength);
  analyserNode.getFloatTimeDomainData(buffer);
  const yin = yinEstimate(buffer, sampleRate);
  const acf = autocorrelateDetailed(buffer, sampleRate, minRms);

  if (yin && acf) {
    const agreementCents = Math.abs(1200 * Math.log2(yin.freq / acf.freq));
    if (agreementCents <= 70) {
      return yin.confidence >= acf.confidence ? yin.freq : acf.freq;
    }
    if (yin.confidence >= 0.36) return yin.freq;
    if (acf.confidence >= 0.36) return acf.freq;
    return yin.confidence >= acf.confidence ? yin.freq : acf.freq;
  }

  if (yin && yin.confidence >= 0.24) return yin.freq;
  if (acf && acf.confidence >= 0.24) return acf.freq;
  return null;
}
