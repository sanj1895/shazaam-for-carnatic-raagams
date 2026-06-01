import { RAGAS } from './ragaLogic';

export function uniqueSwaras(notes) {
  return [...new Set((notes || []).filter(Boolean))];
}

export function fullRagaSet(raga) {
  return new Set(uniqueSwaras([...(raga?.arohanam || []), ...(raga?.avarohanam || [])]));
}

export function deriveConfusedRaga(targetRagaName, targetRaga, detectedNotes, missedNotes) {
  const targetSet = fullRagaSet(targetRaga);
  const detectedSet = uniqueSwaras(detectedNotes);
  const alienNotes = detectedSet.filter((note) => !targetSet.has(note));
  if (alienNotes.length === 0) return '';

  const targetMissed = uniqueSwaras(missedNotes);
  let best = null;

  for (const [candidateName, candidateRaga] of Object.entries(RAGAS)) {
    if (candidateName === targetRagaName) continue;
    const candidateSet = fullRagaSet(candidateRaga);
    const candidateExclusive = [...candidateSet].filter((note) => !targetSet.has(note));
    const targetExclusive = [...targetSet].filter((note) => !candidateSet.has(note));

    const alienMatch = alienNotes.filter((note) => candidateExclusive.includes(note)).length;
    const missedSignal = targetMissed.filter((note) => targetExclusive.includes(note)).length;
    const sharedSupport = detectedSet.filter((note) => candidateSet.has(note)).length;
    const score = (alienMatch * 3) + (missedSignal * 2) + (sharedSupport * 0.15);

    if (alienMatch === 0 || score < 3) continue;
    if (!best || score > best.score) best = { name: candidateName, score };
  }

  return best?.name || '';
}

export function derivePracticeOutcome(ratio) {
  if (ratio >= 0.8) return 'identified';
  if (ratio >= 0.5) return 'likely';
  return 'ambiguous';
}

export function derivePracticeConfidence(ratio) {
  if (ratio >= 0.8) return 'high';
  if (ratio >= 0.5) return 'medium';
  return 'low';
}

export function resolveKnownRagaName(...candidates) {
  const cleaned = candidates
    .flat()
    .filter(Boolean)
    .map((value) => String(value).trim());

  for (const candidate of cleaned) {
    if (RAGAS[candidate]) return candidate;
  }

  const lowered = cleaned.map((value) => value.toLowerCase());
  for (const name of Object.keys(RAGAS)) {
    const needle = name.toLowerCase();
    if (lowered.some((value) => value.includes(needle))) return name;
  }

  return '';
}
