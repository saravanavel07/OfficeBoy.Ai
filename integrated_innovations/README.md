# INTEGRATED INNOVATIONS — Autonomous Multi-Agent AI Enterprise

A real, working multi-agent Python system simulating an AI-staffed engineering and design consultancy.

```
integrated_innovations/
  agents/
    __init__.py
    base_agent.py        # Universal agent interface: calls Gemini/Claude/OpenAI
    manager.py           # ManagingDirector (Aegis): plans, assigns, reviews, compiles
    developer.py         # Vega (Developer): Python 3.12 async code & architectures
    designer.py          # Nova (Designer): UX tokens, layouts & visual hierarchy
    reviewer.py          # Iris (Reviewer): QA audit, edge-case analysis & verification
    writer.py            # Sable (Writer): Client documentation & quickstart manuals
    marketer.py          # Rune (Marketer): GTM strategy, value proposition & copy
  core/
    orchestrator.py      # Runs the MD -> Specialist -> Reviewer -> MD compilation loop
    company_log.py       # Thread-safe, append-only shared state (JSON) event store
  web/
    app.py               # Flask app serving the dashboard & Server-Sent Events (SSE)
    templates/dashboard.html
    static/style.css     # Dark theme: Obsidian #06060a, Navy #0b0f24, Pink #ff3d9a, Blue #4f7dff
    static/dashboard.js  # Live SSE / polling updater
  main.py                # CLI entry point: takes a client brief and runs the agency
  requirements.txt
  README.md
```

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Configure API Key
Set your Gemini, Anthropic, or OpenAI API key:
```bash
export GEMINI_API_KEY="your-gemini-api-key"
# or
export ANTHROPIC_API_KEY="your-anthropic-api-key"
# or
export OPENAI_API_KEY="your-openai-api-key"
```

### 3. Run via CLI
```bash
python main.py "Build an automated Python invoice processing and fraud detection engine"
```

### 4. Run with Live Web Dashboard
```bash
# Terminal 1: Start the web dashboard
python -m web.app

# Terminal 2: Run a project
python main.py "Design a real-time crypto portfolio tracker"
```
Or run both together:
```bash
python main.py "Design a real-time crypto portfolio tracker" --web
```
Open `http://localhost:5000` to watch the Managing Director and specialists work live in real time.

---

## 🧠 Architecture & Shared Memory Bus

1. **Client Brief Ingestion**: The Managing Director (Aegis) ingests the client brief, decomposes it into structured specialist tasks, and logs `brief_received`.
2. **Specialist Execution**:
   - **Nova (Designer)** sets the visual tokens and UX topology.
   - **Vega (Developer)** writes production Python 3.12 async modules.
   - **Iris (Reviewer)** performs rigorous QA and compliance audits.
   - **Sable (Writer)** crafts client-facing technical manuals.
   - **Rune (Marketer)** drafts launch strategy and go-to-market positioning.
3. **Review & Revision Loop**: If the Reviewer detects missing requirements, up to 1 revision round is requested before sign-off.
4. **Master Synthesis**: Aegis compiles all 5 deliverables into a final executive dossier and writes the state to `company_log.json`.
5. **Reactive Dashboard**: Flask streams events via Server-Sent Events (`/api/events`), updating the web UI with zero page reload.
