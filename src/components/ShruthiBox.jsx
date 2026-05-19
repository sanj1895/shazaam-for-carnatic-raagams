import { useState, useRef, useEffect } from 'react';
import { getAudioCtx } from '../utils/audioUtils';

const PITCHES = [
  { label: 'C',  hz: 261.63 },
  { label: 'C#', hz: 277.18 },
  { label: 'D',  hz: 293.66 },
  { label: 'D#', hz: 311.13 },
  { label: 'E',  hz: 329.63 },
  { label: 'F',  hz: 349.23 },
  { label: 'F#', hz: 369.99 },
  { label: 'G',  hz: 392.00 },
  { label: 'G#', hz: 415.30 },
  { label: 'A',  hz: 440.00 },
  { label: 'A#', hz: 466.16 },
  { label: 'B',  hz: 493.88 },
];

const WHITE_KEYS = [
  { label: 'C', hz: 261.63 },
  { label: 'D', hz: 293.66 },
  { label: 'E', hz: 329.63 },
  { label: 'F', hz: 349.23 },
  { label: 'G', hz: 392.00 },
  { label: 'A', hz: 440.00 },
  { label: 'B', hz: 493.88 },
];

// afterWhite = index of the white key this black key sits after
const BLACK_KEYS = [
  { label: 'C#', hz: 277.18, afterWhite: 0 },
  { label: 'D#', hz: 311.13, afterWhite: 1 },
  { label: 'F#', hz: 369.99, afterWhite: 3 },
  { label: 'G#', hz: 415.30, afterWhite: 4 },
  { label: 'A#', hz: 466.16, afterWhite: 5 },
];

const STRINGS = [
  { id: 'low_sa', label: 'LOW SA', semitones: -12 },
  { id: 'sa',     label: 'SA',     semitones:   0 },
  { id: 'pa',     label: 'PA',     semitones:   7 },
  { id: 'hi_sa',  label: 'HI SA',  semitones:  12 },
];

// ── Small helper components ──────────────────────────────────────────────────

function ArrowBtn({ onClick, up }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 28, height: 19,
        background: 'linear-gradient(to bottom, #808078, #4a4a44)',
        border: 'none',
        borderRadius: up ? '4px 4px 1px 1px' : '1px 1px 4px 4px',
        boxShadow: '0 2px 0 #252520, inset 0 1px 0 rgba(255,255,255,0.13)',
        color: '#d8d0b8',
        fontSize: 9,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'monospace',
        flexShrink: 0,
      }}
    >
      {up ? '▲' : '▼'}
    </button>
  );
}

function CtrlLabel({ children }) {
  return (
    <span style={{
      fontSize: 6.5,
      color: '#5c3010',
      letterSpacing: '0.1em',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      fontFamily: '"Courier New", monospace',
      textAlign: 'center',
      marginTop: 3,
      display: 'block',
    }}>
      {children}
    </span>
  );
}

function SpeakerGrille() {
  const petalCount = 8;
  const petals = Array.from({ length: petalCount }, (_, i) => {
    const angle = (i * (360 / petalCount)) * (Math.PI / 180);
    const x1 = 50 + 8 * Math.cos(angle);
    const y1 = 50 + 8 * Math.sin(angle);
    const x2 = 50 + 40 * Math.cos(angle);
    const y2 = 50 + 40 * Math.sin(angle);
    
    const spread = 0.3; 
    const cp1x = 50 + 25 * Math.cos(angle - spread);
    const cp1y = 50 + 25 * Math.sin(angle - spread);
    const cp2x = 50 + 25 * Math.cos(angle + spread);
    const cp2y = 50 + 25 * Math.sin(angle + spread);
    
    return (
      <path 
        key={i}
        d={`M ${x1} ${y1} Q ${cp1x} ${cp1y} ${x2} ${y2} Q ${cp2x} ${cp2y} ${x1} ${y1}`}
        fill="none" 
        stroke="#9a8840" 
        strokeWidth="1.5"
      />
    );
  });

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="46" fill="none" stroke="#9a8840" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="42" fill="none" stroke="#9a8840" strokeWidth="0.5" strokeDasharray="1,2" />
      {petals}
      <circle cx="50" cy="50" r="12" fill="none" stroke="#9a8840" strokeWidth="1" />
      <circle cx="50" cy="50" r="6" fill="#9a8840" opacity="0.6" />
      {/* Inner dots - alternating between petals */}
      {Array.from({ length: 8 }, (_, i) => {
        // Offset by 22.5 degrees (half of 45) to sit between petals
        const a = (i * 45 + 22.5) * (Math.PI / 180);
        return <circle key={i} cx={50 + 34 * Math.cos(a)} cy={50 + 34 * Math.sin(a)} r="1.5" fill="#9a8840" opacity="0.8" />;
      })}
    </svg>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export default function ShruthiBox() {
  const [saHz, setSaHz] = useState(293.66);
  const [activeStrings, setActiveStrings] = useState(new Set(['sa', 'pa']));
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [droneStyle, setDroneStyle] = useState('harmonium'); // 'harmonium' | 'tambura'

  const masterRef        = useRef(null);
  const oscsRef          = useRef([]);
  const lfoRef           = useRef(null);
  const lfoGainRef       = useRef(null);
  const tamburaNodesRef  = useRef([]);
  const tamburaTimerRef  = useRef(null);
  const pluckIndexRef    = useRef(0);

  useEffect(() => () => stopAll(true), []);

  function stopAll(immediate = false) {
    if (tamburaTimerRef.current) {
      clearInterval(tamburaTimerRef.current);
      tamburaTimerRef.current = null;
    }
    const ctx = getAudioCtx();
    const t = ctx.currentTime;
    if (masterRef.current) {
      const g = masterRef.current.gain;
      g.cancelScheduledValues(t);
      g.setValueAtTime(g.value, t);
      if (!immediate) g.linearRampToValueAtTime(0, t + 0.6);
      else g.setValueAtTime(0, t);
    }

    // Stop all active tambura string nodes
    tamburaNodesRef.current.forEach(node => {
      node.oscs.forEach(osc => { try { osc.stop(); } catch (_) {} });
    });
    tamburaNodesRef.current = [];

    setTimeout(() => {
      oscsRef.current.forEach(o => { try { o.stop(); } catch (_) {} });
      try { lfoRef.current?.stop(); } catch (_) {}
      oscsRef.current = [];
      masterRef.current = null;
      lfoRef.current = null;
      lfoGainRef.current = null;
    }, immediate ? 0 : 700);
  }

  function startAll(stringsSet, saFreq, vol, style = droneStyle) {
    const ctx = getAudioCtx();
    const now = ctx.currentTime;
    const tv = vol * 0.32;

    const master = ctx.createGain();
    master.gain.setValueAtTime(0, now);
    master.gain.linearRampToValueAtTime(tv, now + 1.2);
    master.connect(ctx.destination);
    masterRef.current = master;

    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.12, now);
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(tv * 0.06, now);
    lfo.connect(lfoGain);
    lfoGain.connect(master.gain);
    lfo.start(now);
    lfoRef.current = lfo;
    lfoGainRef.current = lfoGain;

    if (style === 'harmonium') {
      const oscs = [];
      for (const id of stringsSet) {
        const str = STRINGS.find(s => s.id === id);
        if (!str) continue;
        const freq = saFreq * Math.pow(2, str.semitones / 12);
        
        // Reed 1: Warm low-end detuned triangle/saw blend
        const osc1 = ctx.createOscillator();
        osc1.type = 'triangle';
        osc1.frequency.setValueAtTime(freq - 0.18, now);
        
        // Reed 2: Rich brassy saw/triangle octave
        const osc2 = ctx.createOscillator();
        osc2.type = 'sawtooth';
        osc2.frequency.setValueAtTime(freq * 2 + 0.25, now);
        
        const g1 = ctx.createGain();
        g1.gain.setValueAtTime(0.35, now);
        
        const g2 = ctx.createGain();
        g2.gain.setValueAtTime(0.06, now);
        
        // Filter out harsh high-end for warm woodiness
        const lowpass = ctx.createBiquadFilter();
        lowpass.type = 'lowpass';
        lowpass.frequency.setValueAtTime(freq * 3.8, now);
        lowpass.Q.setValueAtTime(0.8, now);
        
        osc1.connect(g1);
        osc2.connect(g2);
        
        g1.connect(lowpass);
        g2.connect(lowpass);
        lowpass.connect(master);
        
        osc1.start(now);
        osc2.start(now);
        
        oscs.push(osc1, osc2);
      }
      oscsRef.current = oscs;
    } else {
      // Tambura Plucked String loop physical modeling
      tamburaNodesRef.current = [];
      pluckIndexRef.current = 0;

      const pluckOrder = ['pa', 'hi_sa', 'hi_sa', 'sa'];
      
      const pluckNext = () => {
        const activeArray = Array.from(stringsSet);
        if (activeArray.length === 0) return;
        
        const idealId = pluckOrder[pluckIndexRef.current];
        const id = stringsSet.has(idealId) ? idealId : activeArray[0];
        
        const str = STRINGS.find(s => s.id === id);
        if (str) {
          const freq = saFreq * Math.pow(2, str.semitones / 12);
          const ctxNow = ctx.currentTime;
          
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const osc3 = ctx.createOscillator();
          
          osc1.type = 'sawtooth';
          osc1.frequency.setValueAtTime(freq, ctxNow);
          
          osc2.type = 'triangle';
          osc2.frequency.setValueAtTime(freq * 2 + 0.35, ctxNow);
          
          osc3.type = 'sawtooth';
          osc3.frequency.setValueAtTime(freq * 3 - 0.22, ctxNow);
          
          const pg1 = ctx.createGain();
          const pg2 = ctx.createGain();
          const pg3 = ctx.createGain();
          
          // Exquisite decaying envelope for copper string
          pg1.gain.setValueAtTime(0, ctxNow);
          pg1.gain.linearRampToValueAtTime(0.38, ctxNow + 0.012);
          pg1.gain.exponentialRampToValueAtTime(0.001, ctxNow + 3.4);
          
          pg2.gain.setValueAtTime(0, ctxNow);
          pg2.gain.linearRampToValueAtTime(0.20, ctxNow + 0.009);
          pg2.gain.exponentialRampToValueAtTime(0.001, ctxNow + 2.4);
          
          pg3.gain.setValueAtTime(0, ctxNow);
          pg3.gain.linearRampToValueAtTime(0.14, ctxNow + 0.006);
          pg3.gain.exponentialRampToValueAtTime(0.001, ctxNow + 1.4);
          
          // Buzz filter (Javari bridge resonance thread effect)
          const buzzFilter = ctx.createBiquadFilter();
          buzzFilter.type = 'bandpass';
          buzzFilter.frequency.setValueAtTime(freq * 4.6, ctxNow);
          buzzFilter.frequency.exponentialRampToValueAtTime(freq * 1.6, ctxNow + 2.6);
          buzzFilter.Q.setValueAtTime(4.0, ctxNow);
          
          const directGain = ctx.createGain();
          directGain.gain.setValueAtTime(0.78, ctxNow);
          
          const buzzyGain = ctx.createGain();
          buzzyGain.gain.setValueAtTime(0.62, ctxNow);
          
          osc1.connect(pg1);
          osc2.connect(pg2);
          osc3.connect(pg3);
          
          pg1.connect(directGain); pg1.connect(buzzFilter);
          pg2.connect(directGain); pg2.connect(buzzFilter);
          pg3.connect(directGain); pg3.connect(buzzFilter);
          
          buzzFilter.connect(buzzyGain);
          
          const stringOut = ctx.createGain();
          stringOut.gain.setValueAtTime(1.0, ctxNow);
          
          directGain.connect(stringOut);
          buzzyGain.connect(stringOut);
          
          stringOut.connect(master);
          
          osc1.start(ctxNow);
          osc2.start(ctxNow);
          osc3.start(ctxNow);
          
          osc1.stop(ctxNow + 4.2);
          osc2.stop(ctxNow + 4.2);
          osc3.stop(ctxNow + 4.2);
          
          tamburaNodesRef.current.push({ oscs: [osc1, osc2, osc3], gains: [pg1, pg2, pg3], buzzFilter, directGain, buzzyGain, stringOut });
        }
        
        pluckIndexRef.current = (pluckIndexRef.current + 1) % 4;
      };

      pluckNext();
      tamburaTimerRef.current = setInterval(pluckNext, 1050);
    }
  }

  const handleTogglePlay = () => {
    if (playing) { stopAll(); setPlaying(false); }
    else { startAll(activeStrings, saHz, volume); setPlaying(true); }
  };

  const handleSaChange = (hz) => {
    if (playing) { stopAll(); setPlaying(false); }
    setSaHz(hz);
  };

  const changePitch = (dir) => {
    const idx = PITCHES.findIndex(p => Math.abs(p.hz - saHz) < 1);
    const next = PITCHES[Math.max(0, Math.min(11, (idx < 0 ? 0 : idx) + dir))];
    handleSaChange(next.hz);
  };

  const toggleString = (id) => {
    setActiveStrings(prev => {
      const next = new Set(prev);
      if (next.has(id)) { if (next.size > 1) next.delete(id); }
      else next.add(id);
      return next;
    });
    if (playing) { stopAll(); setPlaying(false); }
  };

  const handleStyleChange = (style) => {
    setDroneStyle(style);
    if (playing) {
      stopAll();
      setTimeout(() => {
        startAll(activeStrings, saHz, volume, style);
      }, 120);
    }
  };

  const adjustVolume = (delta) => {
    const next = Math.max(0.05, Math.min(1, volume + delta));
    setVolume(next);
    if (masterRef.current) {
      const ctx = getAudioCtx();
      const t = ctx.currentTime;
      const tv = next * 0.32;
      masterRef.current.gain.cancelScheduledValues(t);
      masterRef.current.gain.setValueAtTime(masterRef.current.gain.value, t);
      masterRef.current.gain.linearRampToValueAtTime(tv, t + 0.1);
      if (lfoGainRef.current) lfoGainRef.current.gain.setValueAtTime(tv * 0.08, t);
    }
  };

  // Derived display values
  const currentPitch = PITCHES.find(p => Math.abs(p.hz - saHz) < 1);
  const knobAngle    = -135 + ((volume - 0.05) / 0.95) * 270;

  // ── Shared style tokens ────────────────────────────────────────────────────
  const s = {
    body: {
      background: 'linear-gradient(158deg, #f8f2e0 0%, #ede5c8 45%, #dfd5ae 100%)',
      borderRadius: 12,
      boxShadow: '0 20px 60px rgba(55,28,0,0.5), 0 2px 10px rgba(0,0,0,0.3)',
      border: '3px solid #c8b870',
      width: '100%',
      fontFamily: '"Courier New", Courier, monospace',
      userSelect: 'none',
      overflow: 'hidden',
      position: 'relative',
    },
    panel: {
      background: 'linear-gradient(172deg, #eee3c4, #d8cfa4)',
      padding: '16px 14px 15px',
      boxShadow: 'inset 0 2px 9px rgba(0,0,0,0.14)',
    },
    lcd: {
      background: '#141008',
      border: '1px solid #060400',
      borderRadius: 3,
      padding: '3px 6px',
      color: '#d4a030',
      fontSize: 13,
      fontFamily: '"Courier New", monospace',
      letterSpacing: '0.05em',
      boxShadow: 'inset 0 1px 5px rgba(0,0,0,0.85)',
      textAlign: 'center',
      minWidth: 70,
    },
    led: (on) => ({
      width: 9, height: 9,
      borderRadius: '50%',
      flexShrink: 0,
      background: on ? '#ff2200' : '#2a0a06',
      boxShadow: on ? '0 0 6px #ff4400, 0 0 12px rgba(255,60,0,0.45)' : 'inset 0 1px 3px rgba(0,0,0,0.65)',
      transition: 'all 0.25s',
    }),
  };

  return (
    <div id="tour-shruthi-box" style={s.body} className="max-w-[640px] lg:max-w-5xl mx-auto">
      {/* Heritage Corners */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="heritage-border-corner heritage-corner-tl" />
        <div className="heritage-border-corner heritage-corner-tr" />
        <div className="heritage-border-corner heritage-corner-bl" />
        <div className="heritage-border-corner heritage-corner-br" />
      </div>

      {/* Responsive 2-col wrapper: stacked on mobile, side-by-side on desktop */}
      <div className="lg:flex lg:items-stretch">

      {/* ══════════════ TOP CONTROL PANEL (left col on desktop) ══════════════ */}
      <div style={s.panel} className="lg:flex-1 [border-bottom:3px_solid_#b4a464] lg:[border-bottom:0] lg:[border-right:3px_solid_#b4a464] shruthi-keypad-panel">

        {/* Header strip */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 9, color: '#7a2010', letterSpacing: '0.25em', fontWeight: 'bold', textTransform: 'uppercase' }}>ELECTRONIC</div>
            <div style={{ fontSize: 12, color: '#6b1808', letterSpacing: '0.15em', fontWeight: 'bold', textTransform: 'uppercase', marginTop: 1 }}>SHRUTI BOX</div>
          </div>

          {/* LED cluster */}
          <div style={{ display: 'flex', gap: 8, paddingBottom: 2 }}>
            {[{ label: 'PWR', on: playing }, { label: 'SA', on: playing }].map(({ label, on }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <div style={s.led(on)} />
                <span style={{ fontSize: 5, color: '#5c2c0a', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{label}</span>
              </div>
            ))}
          </div>

          {/* Brand */}
          <div style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic', fontWeight: '900', fontSize: 16, color: '#7a1212', letterSpacing: '0.05em' }}>
            Alapana
          </div>
        </div>

        {/* ── Mini piano keyboard ── */}
        <div className="relative w-full max-w-[518px] mx-auto mb-4" style={{ height: 'calc(11vw + 36px)', maxHeight: 100, minHeight: 64 }}>
          {WHITE_KEYS.map((key, i) => {
            const sel = Math.abs(saHz - key.hz) < 1;
            return (
              <div key={key.label} onClick={() => handleSaChange(key.hz)} style={{
                position: 'absolute', left: `${i * 14.285}%`, top: 0,
                width: '14.285%', height: '100%',
                background: sel
                  ? 'linear-gradient(to bottom, #ffc050, #df7e18)'
                  : 'linear-gradient(to bottom, #f8f4e6, #e8e0c8)',
                border: `1px solid ${sel ? '#be6c10' : '#afa880'}`,
                borderRadius: '0 0 6px 6px',
                boxShadow: sel
                  ? 'inset 0 -3px 6px rgba(0,0,0,0.22)'
                  : '0 2px 5px rgba(0,0,0,0.12), inset 0 -1px 2px rgba(0,0,0,0.07)',
                cursor: 'pointer', zIndex: 1, transition: 'background 0.1s',
                display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                paddingBottom: 6, fontSize: 'clamp(9px, 2.5vw, 12px)', fontWeight: 'bold',
                color: sel ? '#713008' : '#888060',
              }}>
                {key.label}
              </div>
            );
          })}
          {BLACK_KEYS.map((key) => {
            const sel = Math.abs(saHz - key.hz) < 1;
            const left = `${(key.afterWhite + 1) * 14.285 - 4.25}%`;
            return (
              <div key={key.label} onClick={() => handleSaChange(key.hz)} style={{
                position: 'absolute', left, top: 0,
                width: '8.5%', height: '62%',
                background: sel
                  ? 'linear-gradient(to bottom, #b05010, #7a3408)'
                  : 'linear-gradient(to bottom, #242018, #141008)',
                border: `1px solid ${sel ? '#8a3c08' : '#060400'}`,
                borderRadius: '0 0 4px 4px',
                boxShadow: sel
                  ? 'inset 0 -2px 5px rgba(0,0,0,0.4)'
                  : '1px 3px 6px rgba(0,0,0,0.55), inset 0 -2px 4px rgba(0,0,0,0.4)',
                cursor: 'pointer', zIndex: 2, transition: 'background 0.1s',
                display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                paddingBottom: 4, fontSize: 'clamp(7px, 1.8vw, 9px)',
                color: sel ? '#ffa030' : '#604028',
              }}>
                {sel ? key.label : ''}
              </div>
            );
          })}
        </div>

        {/* ── Controls row ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-3">
          <div className="flex items-end gap-2.5">
            {/* MAIN SA */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <ArrowBtn onClick={() => changePitch(+1)} up />
              <div style={s.lcd}>{currentPitch?.label ?? '--'}</div>
              <ArrowBtn onClick={() => changePitch(-1)} up={false} />
              <CtrlLabel>MAIN SA</CtrlLabel>
            </div>

            {/* Hz readout */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <div style={{ ...s.lcd, minWidth: 64 }}>{Math.round(saHz)} Hz</div>
              <CtrlLabel>SA FREQ</CtrlLabel>
            </div>
          </div>

          <div className="flex items-end gap-2.5 ml-auto">
            {/* VOLUME */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <ArrowBtn onClick={() => adjustVolume(+0.1)} up />
              <ArrowBtn onClick={() => adjustVolume(-0.1)} up={false} />
              <CtrlLabel>VOLUME</CtrlLabel>
            </div>

            {/* Rotary knob */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div
                onWheel={e => { e.preventDefault(); adjustVolume(e.deltaY < 0 ? 0.05 : -0.05); }}
                style={{
                  width: 52, height: 52, borderRadius: '50%', position: 'relative',
                  background: 'radial-gradient(circle at 36% 30%, #7a3618, #361208)',
                  boxShadow: '2px 4px 9px rgba(0,0,0,0.68), inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -1px 3px rgba(0,0,0,0.55)',
                  cursor: 'ns-resize',
                }}
              >
                {/* Indicator tick */}
                <div style={{
                  position: 'absolute', bottom: '50%', left: '50%',
                  width: 2.5, height: '38%',
                  background: '#e8d8a8', borderRadius: 2,
                  transformOrigin: 'bottom center',
                  transform: `translateX(-50%) rotate(${knobAngle}deg)`,
                  transition: 'transform 0.1s',
                }} />
                {/* Hub dot */}
                <div style={{
                  position: 'absolute', top: '50%', left: '50%',
                  width: 6, height: 6, borderRadius: '50%',
                  background: '#c89030',
                  transform: 'translate(-50%, -50%)',
                  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)',
                }} />
              </div>
              <CtrlLabel>TONE/VOL</CtrlLabel>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════ FRONT FACE (right sidebar on desktop) ══════════════ */}
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row lg:flex-col gap-5 sm:gap-6 items-center lg:w-64 lg:justify-center">

        {/* Circular speaker grille */}
        <div className="w-32 h-32 sm:w-38 sm:h-38 flex-shrink-0 rounded-full flex items-center justify-center overflow-hidden"
          style={{
            background: 'radial-gradient(circle at 42% 38%, #ddd0a0, #bca870)',
            boxShadow: 'inset 0 6px 20px rgba(0,0,0,0.3), inset 0 -3px 8px rgba(255,240,180,0.12), 0 4px 12px rgba(0,0,0,0.22)',
          }}
        >
          <SpeakerGrille />
        </div>

        {/* Right panel */}
        <div className="w-full flex-1 flex flex-col gap-3">

          {/* Drone Engine selector plaque */}
          <div style={{
            background: 'linear-gradient(148deg, #e8e0c6, #d4cab0)',
            border: '1px solid #b4a460',
            borderRadius: 8, padding: '8px 10px',
            boxShadow: 'inset 0 1px 5px rgba(0,0,0,0.13)',
          }}>
            <div style={{ fontSize: 9, color: '#5c2c0a', letterSpacing: '0.15em', fontWeight: 'bold', marginBottom: 8, textTransform: 'uppercase' }}>
              Drone Engine
            </div>
            <div className="flex gap-2 w-full">
              {['harmonium', 'tambura'].map((style) => {
                const active = droneStyle === style;
                return (
                  <button 
                    key={style}
                    onClick={() => handleStyleChange(style)}
                    style={{
                      flex: 1,
                      padding: '7px 0',
                      borderRadius: 6,
                      fontSize: 8.5,
                      fontWeight: 'bold',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      fontFamily: '"Courier New", monospace',
                      cursor: 'pointer',
                      border: active ? '1px solid #be6c10' : '1px solid #afa880',
                      boxShadow: active ? 'inset 0 1.5px 3px rgba(0,0,0,0.25)' : '0 1px 2px rgba(0,0,0,0.08)',
                      background: active 
                        ? 'linear-gradient(to bottom, #ffc050, #df7e18)' 
                        : 'linear-gradient(to bottom, #f5ecd2, #e5dbbe)',
                      color: active ? '#713008' : '#7a5028',
                      transition: 'all 0.1s',
                    }}
                  >
                    {style === 'harmonium' ? '🎹 Harmonium' : '🪕 Tambura'}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Drone string LED toggles */}
          <div style={{
            background: 'linear-gradient(148deg, #e8e0c6, #d4cab0)',
            border: '1px solid #b4a460',
            borderRadius: 8, padding: '8px 10px',
            boxShadow: 'inset 0 1px 5px rgba(0,0,0,0.13)',
          }}>
            <div style={{ fontSize: 9, color: '#5c2c0a', letterSpacing: '0.15em', fontWeight: 'bold', marginBottom: 8, textTransform: 'uppercase' }}>
              Drone Strings
            </div>
            <div className="grid grid-cols-2 gap-x-2 gap-y-2">
              {STRINGS.map(({ id, label }) => {
                const on = activeStrings.has(id);
                return (
                  <div key={id} onClick={() => toggleString(id)}
                    style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                    <div style={{ ...s.led(on), width: 10, height: 10 }} />
                    <span style={{
                      fontSize: 9, fontWeight: 'bold', letterSpacing: '0.08em', textTransform: 'uppercase',
                      color: on ? '#481e00' : '#7a5028',
                      fontFamily: '"Courier New", monospace',
                    }}>
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* START / STOP button */}
          <button onClick={handleTogglePlay} style={{
            width: '100%', padding: '12px 0',
            background: playing
              ? 'linear-gradient(to bottom, #c04030, #862015)'
              : 'linear-gradient(to bottom, #585850, #343430)',
            border: 'none', borderRadius: 8,
            boxShadow: playing
              ? 'inset 0 2px 6px rgba(0,0,0,0.45), 0 0 12px rgba(200,50,20,0.4)'
              : '0 3px 0 #161612, inset 0 1px 0 rgba(255,255,255,0.09)',
            color: '#f0e8d0', fontSize: 14, fontWeight: 'bold',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            cursor: 'pointer',
            transform: playing ? 'translateY(1px)' : 'none',
            fontFamily: '"Courier New", monospace',
            transition: 'all 0.1s',
          }}>
            {playing ? '◼  STOP' : '▶  START'}
          </button>

          {/* Brand footer */}
          <div style={{ textAlign: 'right', marginTop: -2 }}>
            <div style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic', fontWeight: '900', fontSize: 13, color: '#7a1212' }}>
              Alapana
            </div>
            <div style={{ fontSize: 5.5, color: '#6a4a2a', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 1, fontFamily: 'monospace', fontWeight: 'bold' }}>
              VINTAGE HERITAGE EDITION
            </div>
          </div>

        </div>
      </div>

      </div>{/* end lg:flex wrapper */}
    </div>
  );
}
