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
  'Ri': 1,
  'Ga': 4,
  'Ma': 5,
  'Da': 8,
  'Ni': 11,
  'Ṡ': 12,
};

export const SEMITONE_TO_SWARA = Object.fromEntries(
  Object.entries(SWARA_SEMITONE).map(([note, semi]) => [semi, note])
);

/**
 * Returns the frequency in Hz for a given note name, given the Sa (tonic) frequency.
 * Uses equal temperament spacing (2^(semitones/12)).
 */
export function noteFreq(note, saHz) {
  const semitone = SWARA_SEMITONE[note];
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
  masterGain.gain.setValueAtTime(0, now);
  masterGain.gain.exponentialRampToValueAtTime(volume, now + 0.08); // Softer "breath" attack
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

  const vibratoLfo = gamakam ? audioCtx.createOscillator() : null;
  const vibratoGain = gamakam ? audioCtx.createGain() : null;

  if (gamakam) {
    // Melodic Vibrato: variable speed for human drift
    const lfoFreq = 5.1 + Math.random() * 0.9;
    vibratoLfo.type = 'sine';
    vibratoLfo.frequency.setValueAtTime(lfoFreq, now);
    vibratoLfo.frequency.linearRampToValueAtTime(lfoFreq + 0.6, now + duration);
    vibratoLfo.connect(vibratoGain);
    vibratoLfo.start(now);
    vibratoLfo.stop(now + duration + 0.2);
  }

  const makeOsc = (targetFreq, type, gainAmt, detune = 0) => {
    const osc = audioCtx.createOscillator();
    osc.type = type;
    osc.detune.setValueAtTime(detune, now);

    if (gamakam) {
      // Fluid Jaaru: wide, vocal-like slides
      const jaaruOffset = slideDir >= 0 ? -50 : 45;
      const startFreq = targetFreq * Math.pow(2, jaaruOffset / 1200);
      const slideDuration = 0.22; // Longer slide for flute-like fluidity
      
      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.exponentialRampToValueAtTime(targetFreq * 1.004, now + slideDuration * 0.8);
      osc.frequency.linearRampToValueAtTime(targetFreq, now + slideDuration);

      const depth = targetFreq * (0.01 + Math.random() * 0.005);
      const individualGain = audioCtx.createGain();
      individualGain.gain.setValueAtTime(0, now);
      individualGain.gain.linearRampToValueAtTime(0, now + slideDuration * 0.5);
      individualGain.gain.exponentialRampToValueAtTime(depth, now + slideDuration + 0.2);
      
      vibratoLfo.connect(individualGain);
      individualGain.connect(osc.frequency);
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
export function getOctaveSequence(notes) {
  const octaves = [];
  let octave = 0;
  for (let i = 0; i < notes.length; i++) {
    const currSemi = SWARA_SEMITONE[notes[i]] ?? 0;
    if (i > 0) {
      const prevSemi = SWARA_SEMITONE[notes[i - 1]] ?? 0;
      // Ascending wrap: high note → lower semitone = we went up an octave
      if (currSemi < prevSemi && (prevSemi - currSemi) > 6) {
        octave++;
      }
      // Descending wrap: low note → higher semitone = we went down an octave
      if (currSemi > prevSemi && (currSemi - prevSemi) > 6 && octave > 0) {
        octave--;
      }
    }
    octaves.push(octave);
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

  const promise = new Promise((resolve) => {
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
export function detectPitch(analyserNode, sampleRate) {
  const bufferLength = analyserNode.fftSize;
  const buffer = new Float32Array(bufferLength);
  analyserNode.getFloatTimeDomainData(buffer);

  // RMS check  ·  lowered to be more sensitive to soft humming
  let rms = 0;
  for (let i = 0; i < bufferLength; i++) {
    rms += buffer[i] * buffer[i];
  }
  rms = Math.sqrt(rms / bufferLength);
  if (rms < 0.003) return null;

  // Autocorrelation
  const SIZE = bufferLength;
  const correlation = new Float32Array(SIZE);

  for (let lag = 0; lag < SIZE; lag++) {
    let sum = 0;
    for (let i = 0; i < SIZE - lag; i++) {
      sum += buffer[i] * buffer[i + lag];
    }
    correlation[lag] = sum;
  }

  // Find first local minimum after lag 0
  let d = 0;
  while (d < SIZE && correlation[d] > correlation[d + 1]) d++;

  // Find the peak after the dip
  let maxVal = -Infinity;
  let maxPos = -1;
  for (let i = d; i < SIZE; i++) {
    if (correlation[i] > maxVal) {
      maxVal = correlation[i];
      maxPos = i;
    }
  }

  if (maxPos === -1 || maxPos === 0) return null;

  // Parabolic interpolation for sub-sample accuracy
  const y1 = correlation[maxPos - 1] || 0;
  const y2 = correlation[maxPos];
  const y3 = correlation[maxPos + 1] || 0;
  const denom = 2 * y2 - y1 - y3;
  const refinedPos = denom !== 0 ? maxPos - (y3 - y1) / (2 * denom) : maxPos;

  const frequency = sampleRate / refinedPos;

  // Reject frequencies outside vocal/instrument range
  if (frequency < 60 || frequency > 2000) return null;

  // Confidence check  ·  lowered significantly for humming/soft singing
  if (maxVal / correlation[0] < 0.22) return null;

  return frequency;
}
