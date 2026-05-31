# Ālāpana — Carnatic Music Learning App

**Google Cloud Rapid Agent Hackathon · MongoDB Track**

Ālāpana is a web app for learning Carnatic classical music. It combines structured lessons, raga identification, and an AI practice coach that remembers your progress across sessions using MongoDB.

## What It Does

- **Viveka** — sing any phrase and Ālāpana identifies the raga using autocorrelation pitch detection + Gemini 2.5 Flash
- **Ālāpana Coach** — AI practice coach (Gemini 2.5 Flash via Vertex AI Agent Engine) that reads your MongoDB practice history and recommends what to work on next
- **Gurukul** — structured Carnatic curriculum: varisais, alankarams, gitams
- **Raga Kosha** — browse 90+ ragas with scales, mood, and curated performances
- **Dhwani** — AI raga identification panel with swara transcription
- **Shruthi / Talam / Keyboard** — practice tools

## Architecture

```
Browser (React + Vite)
    │
    ├── /api/coach ──────────────► Vertex AI Agent Engine (Google Cloud Agent Builder)
    │                                      │
    │                                 ADK Agent (Gemini 2.5 Flash)
    │                                      │
    │                              MongoDB MCP Server ◄──► MongoDB Atlas
    │                              (reads + writes sessions collection)
    │
    ├── /api/sessions (POST) ──► Vertex AI Agent Engine → MongoDB MCP insertOne
    │                            (direct MongoDB fallback if Agent Engine unavailable)
    │
    └── /api/gemini-identify ──► Gemini 2.5 Flash (Vertex AI)
              ▲
         Raga identification prompts with local candidate shortlist
```

## Tech Stack

| Layer | Technology |
|---|---|
| AI model | Gemini 2.5 Flash (Vertex AI) |
| Agent orchestration | Google ADK → Vertex AI Agent Engine (Agent Builder) |
| Partner integration | MongoDB MCP server (`mongodb-mcp-server`) |
| Practice memory | MongoDB Atlas (`alapana.sessions` collection) |
| Pitch detection | Autocorrelation (browser Web Audio API) |
| Frontend | React + Vite + Tailwind CSS |
| Hosting | Vercel |

## Setup

### Prerequisites
- Node.js 18+, Python 3.11+
- Google Cloud project with Vertex AI API enabled
- MongoDB Atlas cluster

### 1. Install dependencies

```bash
npm install
python3 -m venv .venv && source .venv/bin/activate
pip install google-adk mcp
```

### 2. Environment variables

```bash
cp .env.example .env
# Fill in MONGODB_URI, GOOGLE_CLOUD_PROJECT, GOOGLE_CREDENTIALS_B64
# Optional but recommended for shared serverless rate limiting:
# UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN
```

### 3. Deploy the agent to Vertex AI Agent Engine

```bash
pip install "google-cloud-aiplatform[adk]>=1.87.0"
python agent/deploy_to_agent_engine.py
# Copy the printed AGENT_ENGINE_RESOURCE value into .env
```

### 4. Run locally

```bash
npm run dev       # frontend on http://localhost:5173
adk web agent     # ADK dev UI on http://localhost:8000 (optional)
```

### Optional: shared rate limiting with Upstash

For production on Vercel, add these environment variables to enable cross-instance rate limiting:

```bash
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
```

If they are missing, the app falls back to in-memory per-instance rate limiting for local development.

## How the MongoDB Integration Works

When a student sends a message to the coach:

1. The API layer pre-fetches the learner's profile and recent sessions directly from MongoDB and injects them as structured context into the message (fast path for latency)
2. The **ADK agent on Agent Engine** receives the enriched message and can also call **MongoDB MCP `find`** directly for live or detailed history lookups
3. **Gemini 2.5 Flash** reasons over the context and gives a directed recommendation

When a student completes a practice session:

4. The frontend calls `/api/sessions` → **Agent Engine → MongoDB MCP `insertOne`** records the session (with a direct MongoDB fallback if Agent Engine is unavailable)

Schema: `{ userId, timestamp, tool, raga, durationMinutes, notes }`

## License

MIT — see [LICENSE](LICENSE)
