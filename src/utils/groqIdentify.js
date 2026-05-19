import { RAGAS } from './ragaLogic';

export async function listGroqModels(apiKey) {
    const response = await fetch(`https://api.groq.com/openai/v1/models`, {
        headers: { 'Authorization': `Bearer ${apiKey}` }
    });
    if (!response.ok) return [];
    const data = await response.json();
    return data.data
        .filter(m => m.id.includes('llama') || m.id.includes('mixtral') || m.id.includes('gemma'))
        .filter(m => !m.id.includes('tool') && !m.id.includes('guard')) // filter out tool-use or guard models
        .map(m => ({ id: m.id, displayName: m.id }));
}

export async function identifyRagaWithGroq(swaraString, apiKey, model = 'llama-3.3-70b-versatile') {
    const ragaList = Object.entries(RAGAS).map(([name, data]) => `${name} | Arohanam: ${data.arohanam.join(' ')} | Avarohanam: ${data.avarohanam.join(' ')}`).join('\n');

    const PROMPT = `You are an expert Carnatic classical musician and musicologist.
Listen to this transcribed sequence of consecutive swaras from a performance:
${swaraString}

Here is a reference dictionary of valid Carnatic Ragas and their scales:
${ragaList}

Using the reference dictionary provided above as your strict baseline, identify the Top 3 most likely Carnatic raagams being sung from the transcribed sequence. Focus on comparing the exact notes present (especially held/long notes) and the notes entirely MISSING from the sequence to the Arohanam and Avarohanam provided.

CRITICAL INSTRUCTION: If the sequence precisely matches the scale of a specific Janya raga (e.g., Margahindolam, Abhogi, Hindolam) defined in the dictionary, you MUST select that Janya raga as your top choice. DO NOT default to a parent Melakarta (like Natabhairavi) unless the specific signature notes (like the missing Pa/Ri, or the vakra phrases) of the Janya are clearly absent. Only fall back to parent Melakartas if you strongly believe the Janya is NOT in the reference dictionary.

Respond ONLY with valid JSON exactly matching this format:
{
  "top_matches": [
    {
      "raagam": "<Name of the 1st identified raagam>",
      "arohanam": "<The ascending scale of this raagam>",
      "avarohanam": "<The descending scale of this raagam>",
      "confidence": "<high, medium, or low>",
      "prayogams": ["<phrase 1 found in sequence>", "<phrase 2 found in sequence>"],
      "reasoning": "<Why this sequence matches this raagam>"
    },
    ... (provide exactly 3 matches)
  ]
}`;

    const response = await fetch(`https://api.groq.com/openai/v1/chat/completions`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: model,
            messages: [{ role: "user", content: PROMPT }],
            temperature: 0.1,
            response_format: { type: "json_object" }
        }),
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error?.message || `Groq API error ${response.status}`);
    }

    const data = await response.json();
    const text = data.choices[0]?.message?.content || '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Could not parse Groq JSON response');
    return JSON.parse(jsonMatch[0]);
}

export async function askGroqAboutRaga(ragaName, apiKey, model = 'llama-3.3-70b-versatile') {
    const ragaRef = Object.entries(RAGAS)
        .map(([name, data]) => `${name}: Arohanam=[${data.arohanam.join(', ')}] Avarohanam=[${data.avarohanam.join(', ')}] Parent=${data.type}`)
        .join('\n');

    const PROMPT = `You are an expert Carnatic classical musician and musicologist.
The user is asking about: "${ragaName}".

VERIFIED RAGA DATABASE (these scales are 100% correct — use them as ground truth):
${ragaRef}

INSTRUCTIONS:
1. If "${ragaName}" exactly matches a raga in the database above, copy its arohanam and avarohanam VERBATIM. Do not alter a single note.
2. If "${ragaName}" is clearly a janya or variant of a raga in the database (e.g. a graha bhedam, murchana, or alternate spelling), derive the scale mathematically from the parent. Explain the relationship in "description".
3. If "${ragaName}" is NOT a real Carnatic raga at all, return only: { "error": "<explanation>" }
4. NEVER invent compositions. Only include compositions you are certain about for THIS specific raga. If unsure, return an empty array.
5. Use standard swara notation: Sa, Ri1, Ri2, Ri3, Ga1, Ga2, Ga3, Ma1, Ma2, Pa, Da1, Da2, Da3, Ni1, Ni2, Ni3.

Respond ONLY with valid JSON:
{
  "name": "<correctly spelled raga name>",
  "parent": "<parent melakarta name and number>",
  "arohanam": ["Sa", ...],
  "avarohanam": ["Sa", ...],
  "mood": "<1-3 words>",
  "description": "<2-3 sentences about character, history, and feeling — mention if this is a graha bhedam/variant>",
  "compositions": ["<only compositions you are 100% certain belong to this raga>"]
}`;

    const response = await fetch(`https://api.groq.com/openai/v1/chat/completions`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: model,
            messages: [{ role: "user", content: PROMPT }],
            temperature: 0.1,
            response_format: { type: "json_object" }
        }),
    });

    if (!response.ok) {
        throw new Error('Groq API error when fetching raga info');
    }

    const data = await response.json();
    const text = data.choices[0]?.message?.content || '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Could not parse Groq JSON response');
    const result = JSON.parse(jsonMatch[0]);
    // Add custom fields so it renders beautifully in our RagaDetail component
    return {
        ...result,
        type: `AI Search · ${result.parent}`,
        color: 'teal',
        video: null
    };
}
