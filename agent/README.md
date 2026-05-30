# Ālāpana Coach — ADK Agent with MongoDB MCP

This is the Google ADK agent that powers the Ālāpana practice coach. It uses the **MongoDB MCP server** to read and write practice sessions, giving the agent long-term memory about the student's progress.

## Architecture

```
React App (alapana.vercel.app)
    ↓
/api/coach  (Vercel serverless)
    ↓
Google ADK Agent (Gemini 2.5 Flash)
    ↓
MongoDB MCP Server  ←→  MongoDB Atlas (practice sessions)
```

## Setup

**Prerequisites:** Python 3.11+, Node.js 18+, Google Cloud CLI with ADC configured

```bash
# 1. Create and activate Python virtual environment
python3 -m venv .venv
source .venv/bin/activate

# 2. Install Python dependencies
pip install google-adk mcp

# 3. Set up environment variables
cp agent/.env.example agent/.env
# Edit agent/.env with your values

# 4. Authenticate with Google Cloud (Vertex AI)
gcloud auth application-default login
bash <(curl -sSL https://storage.googleapis.com/cloud-samples-data/adc/setup_adc.sh)

# 5. Run the agent locally
adk web agent
# Opens at http://localhost:8000
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `GOOGLE_CLOUD_PROJECT` | GCP project ID |
| `GOOGLE_CLOUD_LOCATION` | GCP region (us-central1) |
| `GOOGLE_GENAI_USE_VERTEXAI` | Set to `1` to use Vertex AI |

## How it works

When a student sends a message:
1. The agent calls MongoDB MCP `find` to retrieve their practice history
2. Gemini 2.5 Flash reasons over the history and the student's request
3. The agent recommends specific tools in the Ālāpana app (Gurukul, Raga Kosha, Viveka, etc.)
4. After a session, the agent calls MongoDB MCP `insertOne` to save the session

The Events trace in the ADK web UI shows each MongoDB tool call in real time.
