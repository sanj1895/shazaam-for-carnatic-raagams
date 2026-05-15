import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { RAGAS, toSargam } from '../utils/ragaLogic';
import { playNote, startDrone, getAudioCtx, playSequence, getOctaveSequence } from '../utils/audioUtils';

const SA_PRESETS = [
  { label: 'C', hz: 261.63 },
  { label: 'D', hz: 293.66 },
  { label: 'E', hz: 329.63 },
  { label: 'F', hz: 349.23 },
];

const ragaNames = Object.keys(RAGAS).sort();

export default function SwaraKeyboard() {
  const [selectedRaga, setSelectedRaga] = useState(ragaNames[0] || 'Shankarabharanam');
  const [saHz, setSaHz] = useState(261.63);
  const [droneActive, setDroneActive] = useState(false);
  const [playingNote, setPlayingNote] = useState(null);
  const [playingScale, setPlayingScale] = useState(false);
  const [gamakamEnabled, setGamakamEnabled] = useState(false);

  const droneStopRef = useRef(null);
  const scaleTimeoutsRef = useRef([]);

  const raga = RAGAS[selectedRaga] || {};
  const arohanam = raga.arohanam || [];
  const avarohanam = raga.avarohanam || [];

  // Compute octaves for the display keys
  const { aroOctaves, avaOctaves } = useMemo(() => {
    const combined = [...arohanam, ...avarohanam];
    const octs = getOctaveSequence(combined);
    return {
      aroOctaves: octs.slice(0, arohanam.length),
      avaOctaves: octs.slice(arohanam.length)
    };
  }, [arohanam, avarohanam]);

  // Stop drone when component unmounts
  useEffect(() => {
    return () => {
      if (droneStopRef.current) droneStopRef.current();
      scaleTimeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  const handleToggleDrone = () => {
    if (droneActive) {
      if (droneStopRef.current) {
        droneStopRef.current();
        droneStopRef.current = null;
      }
      setDroneActive(false);
    } else {
      const ctx = getAudioCtx();
      droneStopRef.current = startDrone(saHz, ctx);
      setDroneActive(true);
    }
  };

  const handleSaChange = (hz) => {
    // Restart drone on new sa
    if (droneActive && droneStopRef.current) {
      droneStopRef.current();
      droneStopRef.current = null;
      setDroneActive(false);
    }
    setSaHz(hz);
  };

  const handleNotePlay = useCallback((note, octaveShift = 0) => {
    const ctx = getAudioCtx();
    const durationMs = playNote(note, saHz, ctx, { octaveShift });
    setPlayingNote({ note, octaveShift });
    setTimeout(() => setPlayingNote(null), durationMs);
  }, [saHz]);

  const handlePlayScale = async () => {
    if (playingScale) return;
    setPlayingScale(true);
    scaleTimeoutsRef.current.forEach(clearTimeout);
    scaleTimeoutsRef.current = [];

    const sequence = [...arohanam, ...avarohanam];
    const octaves = getOctaveSequence(sequence);

    const { promise, abort } = playSequence(sequence, saHz, {
      gapMs: 600,
      duration: 0.5,
      gamakam: gamakamEnabled,
      onNote: (note, idx) => setPlayingNote({ note, octaveShift: octaves[idx] }),
    });
    scaleTimeoutsRef.current.push(abort);
    await promise;
    setPlayingNote(null);
    setPlayingScale(false);
  };

  const NoteKey = ({ note, octaveShift = 0 }) => {
    const isPlaying = playingNote?.note === note && playingNote?.octaveShift === octaveShift;
    const isSpecial = note === 'Sa' || note === 'Pa';
    const sargam = toSargam ? toSargam(note) : note;

    return (
      <button
        onMouseDown={() => handleNotePlay(note, octaveShift)}
        onTouchStart={(e) => { e.preventDefault(); handleNotePlay(note, octaveShift); }}
        className={[
          'flex flex-col items-center justify-center',
          'w-14 h-16 rounded-lg border select-none cursor-pointer',
          'transition-all duration-100 active:scale-95',
          'font-playfair',
          isPlaying
            ? 'bg-c-gold border-c-gold text-c-bg scale-95 shadow-inner'
            : isSpecial
            ? 'bg-c-gold-faint border-c-gold text-c-gold'
            : 'bg-c-card border-c-border text-c-cream hover:bg-c-surface hover:border-c-gold',
        ].join(' ')}
      >
        <span className="text-lg font-bold leading-tight">{sargam}</span>
        <span className="text-xs opacity-70 leading-tight">{note}</span>
      </button>
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 space-y-8 relative z-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-c-gold/20 pb-4">
        <h2 className="font-playfair text-3xl font-bold text-c-gold tracking-tight">
          Swara Keyboard
        </h2>
        <div className="relative">
          <select
            value={selectedRaga}
            onChange={(e) => setSelectedRaga(e.target.value)}
            className="appearance-none bg-c-card border border-c-gold/40 text-c-gold font-playfair font-bold rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:border-c-gold shadow-sm"
          >
            {ragaNames.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-c-gold opacity-50 text-[10px]">▼</div>
        </div>
      </div>

      {/* Sa selector */}
      <div className="heritage-card rounded-lg p-6 space-y-4 shadow-xl">
        {/* Heritage Corners */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="heritage-border-corner heritage-corner-tl" />
          <div className="heritage-border-corner heritage-corner-tr" />
          <div className="heritage-border-corner heritage-corner-bl" />
          <div className="heritage-border-corner heritage-corner-br" />
        </div>

        <p className="text-xs font-playfair font-bold text-c-gold uppercase tracking-[0.2em] border-b border-c-gold/10 pb-2">
          Select Tonic (Sa)
        </p>
        <div className="flex flex-wrap items-center gap-3 relative z-10">
          {SA_PRESETS.map(({ label, hz }) => (
            <button
              key={label}
              onClick={() => handleSaChange(hz)}
              className={[
                'px-5 py-2 rounded border font-playfair font-bold text-xs tracking-widest transition-all duration-300',
                saHz === hz
                  ? 'bg-c-gold border-c-gold text-c-bg shadow-lg scale-105'
                  : 'border-c-gold/40 text-c-gold hover:bg-c-gold/5',
              ].join(' ')}
            >
              {label}
              <span className="ml-2 text-[10px] opacity-60 font-mono">{hz.toFixed(0)}Hz</span>
            </button>
          ))}

          <button
            onClick={handleToggleDrone}
            className={[
              'ml-auto px-6 py-2 rounded-full border font-playfair font-bold text-xs tracking-widest uppercase transition-all duration-500',
              droneActive
                ? 'bg-c-maroon border-c-maroon text-white shadow-[0_0_15px_rgba(122,30,20,0.4)]'
                : 'border-c-gold/30 text-c-gold hover:border-c-gold hover:bg-c-gold/5',
            ].join(' ')}
          >
            {droneActive ? '◼ Drone On' : '♬ Drone Off'}
          </button>
        </div>
      </div>

      {/* Arohanam */}
      <div className="space-y-2">
        <p className="text-xs font-playfair italic text-c-cream-dark uppercase tracking-widest">
          Arohanam ↑
        </p>
        <div className="flex flex-wrap gap-2">
          {arohanam.map((note, idx) => (
            <NoteKey key={`aro-${idx}`} note={note} octaveShift={aroOctaves[idx]} />
          ))}
        </div>
      </div>

      {/* Avarohanam */}
      <div className="space-y-2">
        <p className="text-xs font-playfair italic text-c-cream-dark uppercase tracking-widest">
          Avarohanam ↓
        </p>
        <div className="flex flex-wrap gap-2">
          {avarohanam.map((note, idx) => (
            <NoteKey key={`ava-${idx}`} note={note} octaveShift={avaOctaves[idx]} />
          ))}
        </div>
      </div>

      {/* Gamakam toggle + Play Scale */}
      <div className="space-y-3">
        <label className="flex items-center justify-between cursor-pointer select-none group">
          <div className="flex-1">
            <span className="text-sm font-playfair font-bold text-c-gold group-hover:text-c-gold-light transition-colors uppercase tracking-widest">With Gamakam</span>
            <p className="text-[10px] text-c-cream-dark italic mt-0.5 opacity-70 group-hover:opacity-80 transition-opacity">
              Adds organic jaaru (slides) and dynamic kampitam (vibrato)
            </p>
          </div>
          <div
            onClick={() => setGamakamEnabled(g => !g)}
            className={`relative w-12 h-6 rounded-full transition-all duration-300 flex-shrink-0 border ${
              gamakamEnabled 
                ? 'bg-c-gold border-c-gold shadow-[0_0_10px_rgba(200,148,31,0.3)]' 
                : 'bg-c-card border-c-gold/30 shadow-inner'
            }`}
          >
            <span className={`absolute top-1 w-3.5 h-3.5 rounded-full shadow-md transition-all duration-300 ${
              gamakamEnabled 
                ? 'translate-x-7 bg-c-bg' 
                : 'translate-x-1 bg-c-gold/50'
            }`} />
          </div>
        </label>

        <button
          onClick={handlePlayScale}
          disabled={playingScale}
          className={[
            'w-full py-3 rounded-xl border font-playfair text-base tracking-wide transition-colors',
            playingScale
              ? 'bg-c-gold-faint border-c-gold-dim text-c-gold-dim cursor-not-allowed'
              : 'border-c-gold text-c-gold hover:bg-c-gold hover:text-c-bg',
          ].join(' ')}
        >
          {playingScale
            ? '♫ Playing scale…'
            : gamakamEnabled ? '▶ Play Scale (with Gamakam)' : '▶ Play Scale'}
        </button>
      </div>
    </div>
  );
}
