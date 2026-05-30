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

## How the MongoDB Integration Works

When a student sends a message to the coach:

1. The ADK agent calls **MongoDB MCP `find`** to retrieve practice history
2. **Gemini 2.5 Flash** reasons over the history and gives a directed recommendation

When a student completes a practice session:

3. The frontend calls `/api/sessions` → Agent Engine → **MongoDB MCP `insertOne`** records the session

Schema: `{ userId, timestamp, tool, raga, durationMinutes, notes }`

## License

MIT — see [LICENSE](LICENSE)
