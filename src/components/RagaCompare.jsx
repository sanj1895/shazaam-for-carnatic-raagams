import { RAGAS } from '../utils/ragaLogic';

// Canonical swara order for position comparison (Sa=0 through Ni=6, repeated Sa=7)
const SWARA_ORDER = ['Sa', 'Ri1', 'Ri2', 'Ri3', 'Ga1', 'Ga2', 'Ga3', 'Ma1', 'Ma2', 'Pa', 'Da1', 'Da2', 'Da3', 'Ni1', 'Ni2', 'Ni3'];

// Short display form: Ri1 -> Ri₁, Ma2 -> Ma₂, etc.
function fmt(note) {
  return note.replace(/([a-zA-Z]+)([123])/, (_, name, n) => {
    const subs = { '1': '₁', '2': '₂', '3': '₃' };
    return name + subs[n];
  });
}

// Find the notes that differ between two arohana/avarohana arrays.
// Returns a Set of note strings that appear in one but not both.
function diffNotes(aArr, bArr) {
  const aSet = new Set(aArr.filter(n => n !== 'Sa'));
  const bSet = new Set(bArr.filter(n => n !== 'Sa'));
  const diff = new Set();
  for (const n of aSet) if (!bSet.has(n)) diff.add(n);
  for (const n of bSet) if (!aSet.has(n)) diff.add(n);
  return diff;
}

function ScaleRow({ notes, diffSet, highlight }) {
  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {notes.map((note, i) => {
        const isDiff = diffSet.has(note);
        return (
          <span
            key={i}
            className="px-2.5 py-1 rounded-full text-[11px] font-mono tracking-wide transition-all"
            style={isDiff ? {
              background: highlight ? 'rgba(247,214,134,0.18)' : 'rgba(247,214,134,0.10)',
              border: '1px solid rgba(247,214,134,0.55)',
              color: '#f7d686',
              fontWeight: 700,
            } : {
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.10)',
              color: 'rgba(243,234,214,0.60)',
            }}
          >
            {fmt(note)}
          </span>
        );
      })}
    </div>
  );
}

function RagaCard({ name, raga, diffSet, side }) {
  if (!raga) {
    return (
      <div className="flex-1 rounded-[16px] border border-white/8 bg-white/[0.02] px-5 py-5">
        <p className="font-playfair text-white/40 text-sm">{name} — not in library</p>
      </div>
    );
  }
  return (
    <div className="flex-1 rounded-[16px] border border-c-gold/18 bg-[rgba(12,5,2,0.94)] px-5 py-5">
      <p className="text-[8px] uppercase tracking-[0.28em] text-c-gold/45 font-mono mb-1">{raga.type}</p>
      <h3 className="font-playfair text-white text-[1.35rem] font-bold leading-tight mb-1">{name}</h3>
      {raga.mood && (
        <p className="text-[11px] text-white/35 font-playfair italic mb-3">{raga.mood}</p>
      )}

      <div className="mb-3">
        <p className="text-[8px] uppercase tracking-[0.22em] text-c-gold/40 font-mono mb-1">Arohanam ↑</p>
        <ScaleRow notes={raga.arohanam} diffSet={diffSet} highlight={side === 'a'} />
      </div>
      <div>
        <p className="text-[8px] uppercase tracking-[0.22em] text-c-gold/40 font-mono mb-1">Avarohanam ↓</p>
        <ScaleRow notes={raga.avarohanam} diffSet={diffSet} highlight={side === 'b'} />
      </div>

      {raga.description && (
        <p className="mt-4 text-[11.5px] font-playfair text-white/45 leading-relaxed">
          {raga.description}
        </p>
      )}

      {raga.importantNotes?.length > 0 && (
        <div className="mt-4">
          <p className="text-[8px] uppercase tracking-[0.22em] text-c-gold/40 font-mono mb-1.5">Characteristic notes</p>
          <div className="flex flex-wrap gap-1">
            {raga.importantNotes.map((n, i) => (
              <span key={i} className="px-2 py-0.5 rounded-full text-[10px] font-mono"
                style={{ background: 'rgba(199,139,34,0.12)', border: '1px solid rgba(199,139,34,0.28)', color: 'rgba(247,214,134,0.85)' }}>
                {fmt(n)}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function RagaCompare({ ragaA, ragaB, onBack, onPractice }) {
  const dataA = RAGAS[ragaA];
  const dataB = RAGAS[ragaB];

  const diffSet = (dataA && dataB)
    ? diffNotes(
        [...(dataA.arohanam || []), ...(dataA.avarohanam || [])],
        [...(dataB.arohanam || []), ...(dataB.avarohanam || [])]
      )
    : new Set();

  const diffList = [...diffSet].filter(n => n !== 'Sa');

  return (
    <main className="w-full max-w-3xl mx-auto flex flex-col gap-6 px-4 md:px-8 py-8 animate-fade-in">

      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="text-[10px] font-mono uppercase tracking-widest text-white/30 hover:text-white/60 transition-colors flex items-center gap-1.5 py-1"
        >
          <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M8 2L4 6l4 4"/>
          </svg>
          Back
        </button>
      </div>

      <div>
        <p className="text-[8px] uppercase tracking-[0.28em] text-c-gold/45 font-mono mb-1">Raga comparison</p>
        <h2 className="font-playfair text-white text-[1.5rem] font-bold leading-tight">
          {ragaA} <span className="text-c-gold/40 font-normal mx-1">vs</span> {ragaB}
        </h2>
      </div>

      {/* What differs */}
      {diffList.length > 0 && (
        <div className="rounded-[14px] border border-c-gold/22 bg-[linear-gradient(140deg,rgba(199,139,34,0.07),rgba(7,3,2,0.98))] px-4 py-3.5">
          <p className="text-[8px] uppercase tracking-[0.28em] text-c-gold/50 font-mono mb-2">The distinguishing notes</p>
          <p className="text-[0.82rem] font-playfair text-white/65 leading-relaxed mb-2.5">
            These are the only notes that differ between the two ragas. Drilling these in context is how you stop confusing them.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {diffList.map((n, i) => (
              <span key={i} className="px-3 py-1 rounded-full text-[11px] font-mono font-bold"
                style={{ background: 'rgba(247,214,134,0.15)', border: '1px solid rgba(247,214,134,0.45)', color: '#f7d686' }}>
                {fmt(n)}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Side by side */}
      <div className="flex flex-col sm:flex-row gap-3">
        <RagaCard name={ragaA} raga={dataA} diffSet={diffSet} side="a" />
        <RagaCard name={ragaB} raga={dataB} diffSet={diffSet} side="b" />
      </div>

      {/* Practice CTA */}
      <div className="rounded-[14px] border border-white/8 bg-[rgba(10,4,2,0.92)] px-4 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <p className="text-[8px] uppercase tracking-[0.28em] text-c-gold/40 font-mono mb-1">Next step</p>
          <p className="text-[0.82rem] font-playfair text-white/55">
            Sing the arohanam of each raga back to back, holding the highlighted notes. Open Gurukul to practice with a drone and AI pitch feedback.
          </p>
        </div>
        <button
          onClick={onPractice}
          className="flex-shrink-0 text-[10px] font-mono uppercase tracking-widest px-4 py-2 rounded-lg bg-c-gold text-c-bg font-bold hover:bg-c-gold-light transition-all whitespace-nowrap"
        >
          Open Gurukul →
        </button>
      </div>

    </main>
  );
}
