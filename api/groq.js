const GROQ_BASE_URL = 'https://api.groq.com/openai/v1';

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Groq API key is not configured on the server.' });
  }

  try {
    if (req.method === 'GET') {
      const response = await fetch(`${GROQ_BASE_URL}/models`, {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      const data = await response.json();
      return res.status(response.status).json(data);
    }

    const { model, messages, temperature = 0.1, response_format } = req.body || {};
    if (!model || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Missing model or messages.' });
    }

    const response = await fetch(`${GROQ_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ model, messages, temperature, response_format }),
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Groq request failed.' });
  }
}
