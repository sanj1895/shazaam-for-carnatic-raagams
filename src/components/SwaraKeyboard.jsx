import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { RAGAS, toSargam } from '../utils/ragaLogic';
import { playNote, startDrone, getAudioCtx, playSequence, getOctaveSequence } from '../utils/audioUtils';
import RagaPracticePanel from './RagaPracticePanel';
import { CuratedIcon, PlayIcon, StopIcon } from './IconLibrary';

const SA_PRESETS = [
  { label: 'C',  hz: 261.63 }, { label: 'C#', hz: 277.18 },
  { label: 'D',  hz: 293.66 }, { label: 'D#', hz: 311.13 },
  { label: 'E',  hz: 329.63 }, { label: 'F',  hz: 349.23 },
  { label: 'F#', hz: 369.99 }, { label: 'G',  hz: 392.00 },
  { label: 'G#', hz: 415.30 }, { label: 'A',  hz: 440.00 },
  { label: 'A#', hz: 466.16 }, { label: 'B',  hz: 493.88 },
];

const ragaNames = Object.keys(RAGAS).sort();

export default function SwaraKeyboard({ forceRaga = null, compact = false, onSadhanaComplete }) {
  const [selectedRaga, setSelectedRaga] = useState(forceRaga || ragaNames[0] || 'Shankarabharanam');
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    if (forceRaga) setSelectedRaga(forceRaga);
  }, [forceRaga]);
  const [saHz, setSaHz] = useState(261.63);
  const [droneActive, setDroneActive] = useState(false);
  const [playingNote, setPlayingNote] = useState(null);
  const [playingScale, setPlayingScale] = useState(false);
  const [gamakamEnabled, setGamakamEnabled] = useState(false);

  const droneStopRef = useRef(null);
  const scaleTimeoutsRef = useRef([]);
  const playedSwarasRef = useRef(new Set());
  const keyboardSadhanaDoneRef = useRef(false);

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

    // Track unique notes for daily sadhana
    if (!keyboardSadhanaDoneRef.current) {
      playedSwarasRef.current.add(note);
      if (playedSwarasRef.current.size >= 5) {
        onSadhanaComplete?.('keyboard');
        keyboardSadhanaDoneRef.current = true;
      }
    }

    setTimeout(() => setPlayingNote(null), durationMs);
  }, [saHz, onSadhanaComplete]);

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
    <div id="tour-swara-keyboard" className="w-full max-w-5xl mx-auto px-4 py-8 relative z-10">
      {/* Header */}
      {!compact && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-c-gold/20 pb-4">
          <div className="flex items-center gap-3">
            <h2 className="font-playfair text-3xl font-bold text-c-gold tracking-tight">
              Swara Keyboard
            </h2>
            <button 
              onClick={() => setShowGuide(true)}
              className="px-3 py-1 rounded-full border border-c-gold/40 hover:bg-c-gold/5 text-c-gold text-xs font-playfair italic transition-all flex items-center gap-1 shadow-sm active:scale-95 cursor-pointer swara-guide-button"
            >
              <CuratedIcon icon="library" className="w-3 h-3" /> Swara Guide
            </button>
          </div>
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
      )}

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Column: Keyboard */}
        <div className="space-y-8">
          {/* Sa selector and Drone */}
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-c-surface border border-c-gold/20 rounded-lg p-3 shadow-sm">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-[11px] font-playfair font-bold text-c-gold tracking-widest uppercase">Tonic (Sa):</span>
              <div className="relative flex-1 sm:flex-none">
                <select
                  value={saHz}
                  onChange={(e) => handleSaChange(Number(e.target.value))}
                  className="w-full appearance-none bg-c-card border border-c-gold/40 text-c-gold font-playfair font-bold rounded flex items-center px-3 py-1.5 pr-8 text-sm focus:outline-none focus:border-c-gold shadow-sm cursor-pointer"
                >
                  {SA_PRESETS.map(({ label, hz }) => (
                    <option key={label} value={hz}>{label} ({hz.toFixed(0)}Hz)</option>
                  ))}
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-c-gold opacity-50 text-[9px]">▼</div>
              </div>
            </div>

            <div className="hidden sm:block w-px h-6 bg-c-gold/20" />

            <button
              onClick={handleToggleDrone}
              className={[
                'w-full sm:w-auto ml-auto sm:ml-0 px-5 py-1.5 rounded-full border font-playfair font-bold text-[11px] tracking-widest uppercase transition-all duration-300 shadow-sm cursor-pointer active:scale-95 flex items-center justify-center gap-1.5',
                droneActive
                  ? 'bg-c-maroon border-c-maroon text-white shadow-[0_0_10px_rgba(122,30,20,0.3)]'
                  : 'bg-c-card border-c-gold/30 text-c-gold hover:border-c-gold hover:bg-c-gold/10',
              ].join(' ')}
            >
              {droneActive ? <><StopIcon className="w-3.5 h-3.5" /> Drone On</> : <><PlayIcon className="w-3.5 h-3.5" /> Drone Off</>}
            </button>
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
            'w-full py-3 rounded-xl border font-playfair text-base tracking-wide transition-colors flex items-center justify-center gap-2',
            playingScale
              ? 'bg-c-gold-faint border-c-gold-dim text-c-gold-dim cursor-not-allowed'
              : 'border-c-gold text-c-gold hover:bg-c-gold hover:text-c-bg',
          ].join(' ')}
        >
          {playingScale
            ? <><PlayIcon className="w-4 h-4 animate-pulse" /> Playing scale…</>
            : gamakamEnabled ? <><PlayIcon className="w-4 h-4" /> Play Scale (with Gamakam)</> : <><PlayIcon className="w-4 h-4" /> Play Scale</>}
        </button>
      </div>
      </div>

      {/* Right Column: AI Guru Practice Embedded */}
      <div className="lg:border-l border-c-gold/20 lg:pl-12 pt-8 lg:pt-0 border-t lg:border-t-0 border-c-gold/20">
        <RagaPracticePanel 
          raga={raga} 
          initialSaHz={saHz} 
          externalSaHz={saHz} 
          compactMode={true} 
        />
      </div>
      </div>

            {/* Swara Guide Modal */}
      {showGuide && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 animate-fade-in">
          <div className="bg-c-bg border-2 border-c-gold rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6 relative shadow-2xl pb-6">
            {/* Heritage Corners */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="heritage-border-corner heritage-corner-tl" />
              <div className="heritage-border-corner heritage-corner-tr" />
              <div className="heritage-border-corner heritage-corner-bl" />
              <div className="heritage-border-corner heritage-corner-br" />
            </div>

            <button 
              onClick={() => setShowGuide(false)}
              className="absolute top-3.5 right-3.5 text-c-cream-dark hover:text-c-gold text-lg transition-colors font-mono cursor-pointer"
            >
              ✕
            </button>

            <div className="space-y-4 sm:space-y-6">
              <div className="text-center">
                <span className="text-[9px] uppercase tracking-widest text-c-gold font-mono">Theoretical Companion</span>
                <h3 className="font-playfair text-xl sm:text-2xl font-bold text-c-gold mt-1">Understanding the Swaras</h3>
                <div className="w-16 h-px bg-c-gold/30 mx-auto mt-2" />
              </div>

              <div className="space-y-3 sm:space-y-4 text-[11px] sm:text-sm text-c-cream leading-relaxed">
                <p className="hidden sm:block">
                  Welcome to the <strong>Swara Keyboard</strong>! Unlike Western music where notes are absolute (like C, D, or E), Carnatic music is built on <strong>relative tuning</strong>.
                </p>
                
                <div className="bg-c-surface border border-c-border/30 rounded-lg p-2.5 sm:p-4 space-y-1.5 sm:space-y-2">
                  <h4 className="font-playfair font-bold text-c-gold text-xs sm:text-sm">What are the 7 Notes (Swaras)?</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-0.5 sm:gap-y-1 text-[10px] sm:text-[11px] font-mono">
                    <div><strong>Sa (Shadjama):</strong> The tonic / home key.</div>
                    <div><strong>Ri (Rishabha):</strong> The 2nd note.</div>
                    <div><strong>Ga (Gandhara):</strong> The 3rd note.</div>
                    <div><strong>Ma (Madhyama):</strong> The 4th note.</div>
                    <div><strong>Pa (Panchama):</strong> The perfect 5th.</div>
                    <div><strong>Da (Dhaivata):</strong> The 6th note.</div>
                    <div><strong>Ni (Nishada):</strong> The 7th note.</div>
                  </div>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <h4 className="font-playfair font-bold text-c-gold text-xs sm:text-sm">What do the numbers (Ri1, Ga2...) mean?</h4>
                  <p className="text-[10px] sm:text-xs leading-normal">
                    The numbers (1, 2, 3) represent microtonal pitch positions of that note:
                  </p>
                  <ul className="list-disc pl-4 space-y-0.5 text-[10px] sm:text-xs">
                    <li><strong>Ri1 / Ga1:</strong> Lower, flatter microtones.</li>
                    <li><strong>Ri2 / Ga2:</strong> Normal or middle pitch positions.</li>
                    <li><strong>Ri3 / Ga3:</strong> Higher, sharper pitch positions.</li>
                  </ul>
                  <p className="text-[9px] sm:text-[11px] italic text-c-cream-dim leading-normal">
                    Pitches dynamically adapt to match your selected raga's exact scale structure!
                  </p>
                </div>

                <div className="hidden sm:block bg-c-gold/5 border border-c-gold/20 rounded-lg p-3 text-[11px] sm:text-xs text-c-gold italic">
                  <strong>Pro Tip:</strong> Turn on the <strong>Drone</strong> to establish a stable reference key, then play individual notes to hear how they blend beautifully with the tonic home!
                </div>
              </div>

              <div className="flex justify-center pt-1.5">
                <button 
                  onClick={() => setShowGuide(false)}
                  className="px-6 py-1.5 bg-c-gold text-c-bg hover:bg-c-gold-light rounded font-playfair font-bold text-xs sm:text-sm transition-all cursor-pointer active:scale-95"
                >
                  Got it! Let's Explore
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
