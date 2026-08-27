# OfficeBoy.ai 🤖
### Autonomous AI Office Assistant & Multi-Agent Operating System (Pure Python)

```
               .---.
              /_____\
             (  . .  )     OfficeBoy.ai
              )  =  (      Autonomous AI Office Assistant
             /`-----'\     1 Managing Director + 5 Specialist Agents
            /  |   |  \
           (   |___|   )
            \_________/
             / /   \ \
            (_/     \_)
```

---

## 🌟 Overview

**OfficeBoy.ai** is an autonomous multi-agent office operating system built entirely in **pure Python**. It simulates an elite digital agency and enterprise engineering squad comprising **1 Managing Director (Aegis)** and **5 Specialist Employee Agents** who autonomously collaborate, communicate over an event bus, maintain shared memory, and produce real-world production-ready deliverables.

---

## 👥 The Autonomous Agent Roster

| Agent Name | Role | Primary Domain | Core Deliverable |
| :--- | :--- | :--- | :--- |
| **Aegis** | **Managing Director** | Strategic Planning & Executive Oversight | `EXECUTIVE_BRIEF.md` |
| **Cipher** | **Lead Architect & Developer** | Python/TypeScript, Data Pipelines & Algorithms | `core_engine.py` |
| **Scribe** | **Technical Writer** | System Documentation, API Specs & ADRs | `TECHNICAL_SPEC.md` |
| **Iris** | **Creative Director & UX** | Design Systems, Wireframes & Component Specs | `DESIGN_SYSTEM.md` |
| **Pulse** | **Growth & Market Strategist**| ICP Profiling, GTM Strategy & Launch Funnels | `GTM_STRATEGY.md` |
| **Sentinel**| **Lead QA & Security Auditor**| Vulnerability Scans, Code Review & Audits | `QA_SECURITY_AUDIT.md` |

---

## ⚡ Quickstart

### 1. Installation

Clone the repository and install the lightweight dependencies:

```bash
git clone https://github.com/your-org/officeboy.git
cd officeboy
pip install -r requirements.txt
```

*(Note: OfficeBoy is zero-dependency compatible and can run entirely using Python standard libraries in offline simulation mode!)*

---

### 2. Run via Command Line Interface (CLI)

Dispatch an autonomous sprint in 1 command:

```bash
# Basic run with interactive prompt
python main.py

# Direct brief dispatch
python main.py "Build a real-time invoice processing pipeline with fraud detection"

# Custom options
python main.py "Crypto Anomaly Engine" --client "Apex Ventures" --budget "$50,000" --output my_deliverables/
```

---

### 3. Run via Embedded Web Dashboard

Launch the built-in live browser dashboard:

```bash
python main.py --web --port 5000
```
Then navigate to `http://localhost:5000` to dispatch sprints and view live agent telemetry.

---

### 4. Use as a Python Library in Your Code

```python
from officeboy import CompanyOrchestrator

# Initialize the orchestrator
orchestrator = CompanyOrchestrator(output_dir="output_deliverables")

# Create a project brief
brief = orchestrator.initialize_brief(
    problem_statement="Develop a high-throughput webhook dispatcher with retry queues.",
    client_name="Stripe Partner Network",
    budget="$30,000"
)

# Run the sprint autonomously
final_state = orchestrator.run_sprint(brief)

# Inspect generated deliverables
for deliverable in final_state.deliverables:
    print(f"Generated: {deliverable.filename} by {deliverable.author_name}")
```

---

## 🧠 LLM Backends & Configuration

OfficeBoy supports multi-model reasoning engines via environment variables:

| Provider | Environment Variable | Default Model |
| :--- | :--- | :--- |
| **Google Gemini** *(Recommended)* | `GEMINI_API_KEY` | `gemini-2.5-flash` |
| **Anthropic Claude** | `ANTHROPIC_API_KEY` | `claude-3-7-sonnet-20250219` |
| **OpenAI** | `OPENAI_API_KEY` | `gpt-4o` |
| **Local Offline** | *(None required)* | High-Grade Deterministic Engine |

```bash
export GEMINI_API_KEY="your-gemini-api-key"
python main.py "Enterprise KYC Verification Pipeline"
```

---

## 📁 Repository Structure

```
.
├── main.py                       # Master CLI entry point
├── run.py                        # One-line launcher
├── requirements.txt              # Python dependencies
├── README.md                     # Comprehensive documentation
│
└── officeboy/                    # Core Python package
    ├── __init__.py               # Package exports
    ├── models.py                 # Dataclasses & type definitions
    ├── cli.py                    # Interactive terminal interface
    │
    ├── agents/                   # Autonomous agent implementations
    │   ├── __init__.py
    │   ├── base_agent.py         # Universal multi-LLM base interface
    │   ├── manager.py            # Aegis (Managing Director)
    │   ├── developer.py          # Cipher (Lead Architect)
    │   ├── writer.py             # Scribe (Technical Writer)
    │   ├── designer.py           # Iris (Creative Director)
    │   ├── marketer.py           # Pulse (Growth Strategist)
    │   └── reviewer.py           # Sentinel (QA & Security Auditor)
    │
    ├── core/                     # Operating system engine
    │   ├── __init__.py
    │   ├── orchestrator.py       # Multi-agent sprint loop & stages
    │   ├── company_log.py        # Event bus & message broadcasting
    │   └── ascii_banner.py       # Terminal robot mascot art
    │
    └── web/                      # Embedded web server
        ├── __init__.py
        └── app.py                # Flask server & REST API
```

---

## 📦 Generated Output Deliverables

When a sprint completes, OfficeBoy generates and writes 6 artifacts to disk:

1. **`core_engine.py`**: Production source code and algorithms.
2. **`TECHNICAL_SPEC.md`**: Architectural blueprint and API contract.
3. **`DESIGN_SYSTEM.md`**: Design tokens, component specs, and UX wireframes.
4. **`GTM_STRATEGY.md`**: Market positioning, ICP targeting, and launch playbook.
5. **`QA_SECURITY_AUDIT.md`**: Vulnerability assessment and quality scorecard.
6. **`EXECUTIVE_BRIEF.md`**: Final executive sign-off from Aegis.

---

## 🛡️ License

MIT License. Designed with precision by **OfficeBoy.ai**.
