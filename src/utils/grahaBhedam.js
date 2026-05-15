// grahaBhedam.js  ·  Graha Bhedam (modal shift) computation
import { RAGAS } from './ragaLogic';
import { SWARA_SEMITONE, SEMITONE_TO_SWARA } from './audioUtils';

/**
 * Given a raga name, compute all possible Graha Bhedam shifts.
 * For each unique note in the raga's arohanam (excluding trailing Sa),
 * treat that note as the new Sa and recompute the scale.
 * Attempt to match the resulting scale to a known raga in RAGAS.
 *
 * Returns an array of:
 * {
 *   shiftNote: string,        // e.g. 'Ri2'   ·  the note treated as new Sa
 *   newNotes: string[],       // the recomputed scale note names (sorted by semitone)
 *   matchedRaga: string|null, // raga name if matched
 *   matchedData: object|null, // full raga data if matched
 * }
 */
export function computeGrahaBhedam(ragaName) {
  const raga = RAGAS[ragaName];
  if (!raga) return [];

  // Collect all unique note names from arohanam (skip the trailing repeated Sa)
  const arohanam = raga.arohanam || [];
  const uniqueNotes = [];
  const seen = new Set();
  for (const note of arohanam) {
    if (!seen.has(note)) {
      seen.add(note);
      uniqueNotes.push(note);
    }
  }

  // Build the set of non-Sa semitones for every raga (for matching)
  // key: sorted CSV of non-Sa semitones → raga name
  const ragaSignatureMap = new Map();
  for (const [name, data] of Object.entries(RAGAS)) {
    const allNotes = [...(data.arohanam || []), ...(data.avarohanam || [])];
    const semiSet = new Set();
    for (const n of allNotes) {
      const s = SWARA_SEMITONE[n];
      if (s !== undefined && s !== 0) semiSet.add(s);
    }
    const sig = [...semiSet].sort((a, b) => a - b).join(',');
    if (!ragaSignatureMap.has(sig)) {
      ragaSignatureMap.set(sig, name);
    }
  }

  const results = [];

  // Skip Sa (index 0)  ·  start from index 1
  for (let i = 1; i < uniqueNotes.length; i++) {
    const shiftNote = uniqueNotes[i];
    const shiftSemi = SWARA_SEMITONE[shiftNote];
    if (shiftSemi === undefined) continue;

    // Recompute all semitones relative to this new Sa
    const newSemiSet = new Set();
    for (const note of uniqueNotes) {
      const s = SWARA_SEMITONE[note];
      if (s === undefined) continue;
      const shifted = ((s - shiftSemi) % 12 + 12) % 12;
      newSemiSet.add(shifted);
    }

    // Map semitones to note names (0 is the new Sa)
    const newNotes = [...newSemiSet]
      .sort((a, b) => a - b)
      .map(s => (s === 0 ? 'Sa' : SEMITONE_TO_SWARA[s] || `?${s}`));

    // Build signature for matching (exclude 0 / Sa)
    const nonSaSemis = [...newSemiSet].filter(s => s !== 0).sort((a, b) => a - b);
    const sig = nonSaSemis.join(',');

    const matchedRagaName = ragaSignatureMap.get(sig) || null;
    const matchedData = matchedRagaName ? RAGAS[matchedRagaName] : null;

    results.push({
      shiftNote,
      newNotes,
      matchedRaga: matchedRagaName,
      matchedData,
    });
  }

  return results;
}
