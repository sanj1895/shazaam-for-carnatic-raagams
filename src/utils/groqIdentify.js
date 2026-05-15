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
    const PROMPT = `You are an expert Carnatic classical musician and musicologist.
The user is asking about a specific term: "${ragaName}".

CRITICAL RULE: If "${ragaName}" is NOT a real, mathematically valid Carnatic raga, you MUST NOT hallucinate or invent one. You must instead return a JSON object with only an "error" field explaining that this raga does not exist in traditional Carnatic music.

If it IS a real Carnatic raga, provide a concise, encyclopedic description of this raga in the exact JSON format below. Ensure the arohanam and avarohanam use the standard Carnatic swaras (Sa, Ri1, Ri2, Ga2, Ga3, etc.).

{
  "error": "<Include this ONLY if the raga is fake. String explaining it does not exist. Omit all other fields.>",
  "name": "<Correctly spelled name of the real raga>",
  "parent": "<Name of its parent Melakarta - e.g. Madhyamavati belongs to Kharaharapriya (22)>",
  "arohanam": ["Sa", ...],
  "avarohanam": ["Sa", ...],
  "mood": "<1-3 words describing its mood>",
  "description": "<A 2-3 sentence engaging description of the raga's character, history, and feeling>",
  "compositions": ["<Famous composition 1>", "<Famous composition 2>"]
}

STRICT FACTUAL RULES:
1. DO NOT HALLUCINATE. If you are unsure of the parent Melakarta, you must verify it. (e.g., Madhyamavati is Janya of 22nd Kharaharapriya, NOT 65th Kalyani).
2. DO NOT include notes in the scales that do not belong. Madhyamavati is an Audava (5-note) raga; do not return a 7-note scale for it.
3. MATCH COMPOSITIONS CORRECTLY. "Dorakuna Ituvanti" is Bilahari, not Madhyamavati. Return only compositions that are universally verified for the specific raga name requested.`;

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
        type: `Groq AI Search · ${result.parent}`,
        color: 'teal',
        video: null
    };
}
