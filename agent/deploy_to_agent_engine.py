"""
Deploy the Ālāpana Coach agent to Vertex AI Agent Engine.

Agent Engine is Google Cloud Agent Builder's managed execution environment for
custom agents. This script packages the ADK agent and registers it with the
Vertex AI platform so it can be called via a stable REST API.

Usage:
    # 1. Install deploy dependencies
    pip install "google-cloud-aiplatform[adk]>=1.87.0" google-adk mcp

    # 2. Authenticate
    gcloud auth application-default login

    # 3. Deploy (takes ~5-10 minutes on first run)
    cd /path/to/project
    python agent/deploy_to_agent_engine.py

    # 4. Copy the printed AGENT_ENGINE_RESOURCE value into your .env files.
"""
import os
import sys

try:
    import vertexai
    from vertexai.preview import reasoning_engines
except ImportError:
    print("ERROR: Install deploy deps first:")
    print("  pip install 'google-cloud-aiplatform[adk]>=1.87.0' google-adk mcp")
    sys.exit(1)

# Import the root agent from agent.py
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from agent.agent import root_agent  # noqa: E402

PROJECT  = os.getenv("GOOGLE_CLOUD_PROJECT",  "project-24a53985-305d-4031-ae8")
LOCATION = os.getenv("GOOGLE_CLOUD_LOCATION", "us-central1")

vertexai.init(project=PROJECT, location=LOCATION)

print(f"Deploying Ālāpana Coach to Vertex AI Agent Engine...")
print(f"  Project:  {PROJECT}")
print(f"  Location: {LOCATION}")
print(f"  Model:    gemini-2.5-flash (via ADK agent)\n")

app = reasoning_engines.AdkApp(
    agent=root_agent,
    enable_tracing=True,
)

remote_agent = reasoning_engines.create(
    app,
    requirements=[
        "google-cloud-aiplatform[adk]>=1.87.0",
        "google-adk>=0.5.0",
        "mcp>=1.0.0",
    ],
    display_name="Alapana Coach",
    description="Carnatic music practice coach — Gemini 2.5 Flash + MongoDB MCP (Ālāpana app)",
)

resource = remote_agent.resource_name
agent_id = resource.split("/")[-1]

print(f"\n✓ Agent Engine deployed successfully.")
print(f"  Resource name: {resource}")
print(f"  Agent ID:      {agent_id}")
print(f"\nAdd to your .env and Vercel environment variables:")
print(f"  AGENT_ENGINE_RESOURCE={resource}")
print(f"\nTo query the agent (Python):")
print(f'  session = remote_agent.create_session(user_id="student-1")')
print(f'  for chunk in remote_agent.stream_query(user_id="student-1",')
print(f'                                          session_id=session["id"],')
print(f'                                          message="Help me practice Bhairavi"):')
print(f'      print(chunk)')
