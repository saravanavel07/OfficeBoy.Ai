# OfficeBoy.ai

**An AI-powered office workspace for coordinating specialist agents, tracking project workflows, and producing structured deliverables.**

OfficeBoy.ai brings project intake, an animated multi-agent workspace, and command-line automation together in one repository. The web interface presents a step-by-step workflow led by a Managing Director and supported by Developer, Designer, Reviewer, Writer, and Marketer roles. A Python implementation provides a CLI and optional Flask dashboard, while the TypeScript server exposes a Gemini-backed agent endpoint.

> **Please note:** The browser workspace currently advances through a client-side workflow simulation. The Python CLI and TypeScript API are separate execution paths; the UI simulation should not be mistaken for live model inference. Configure the relevant provider key to use model-backed features in the corresponding backend.

## Contents

- [Features](#features)
- [Architecture](#architecture)
- [Requirements](#requirements)
- [Getting started](#getting-started)
  - [Web workspace and TypeScript server](#web-workspace-and-typescript-server)
  - [Python CLI and dashboard](#python-cli-and-dashboard)
- [Configuration](#configuration)
- [API endpoints](#api-endpoints)
- [Project layout](#project-layout)
- [Development](#development)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Animated workflow workspace:** Start, pause, step through, reset, and adjust the speed of a project workflow.
- **Specialist agent team:** Coordinate a Managing Director with Developer, Designer, Reviewer, Writer, and Marketer roles.
- **Project intake:** Review and manage sample client requests, or create a custom brief.
- **Shared activity log:** Follow workflow events, agent assignments, and deliverable updates.
- **Deliverable views:** Review the generated project summary and specialist outputs in the workspace.
- **Python command-line workflow:** Submit a project brief and export artifacts to a chosen directory.
- **Live multi-agent dashboard:** Watch agent activity update in real time using the standalone `integrated_innovations/` Flask dashboard and its Server-Sent Events stream.
- **Optional dashboards and AI integrations:** Run the Python Flask dashboard or use the TypeScript server's Gemini-backed agent endpoint.

## Architecture

The repository contains multiple related implementations:

1. **React workspace (`src/`)** — a Vite-powered interactive workspace. Its agent workflow is currently driven by the client-side engine in `src/services/agentEngine.ts`.
2. **TypeScript server (`server.ts`)** — serves the Vite app during development and static assets in production, and provides `/api/health` and `/api/agent/call` endpoints. The agent endpoint uses Google Gemini when `GEMINI_API_KEY` is configured and returns a simulated fallback response if it is not.
3. **Python package (`officeboy/`)** — provides the CLI, workflow orchestration, typed project models, and Flask dashboard.
4. **Additional Python implementation (`integrated_innovations/`)** — a standalone multi-agent workflow and live dashboard with its own README and dependencies.

These entry points are not a single shared runtime. Use the instructions for the component you intend to run. The real-time dashboard described below belongs to `integrated_innovations/`; it does not turn the React browser simulation into a live model workflow.

## Requirements

- Node.js 18 or newer and npm (or another compatible Node package manager)
- Python 3.10 or newer
- Git
- A Google Gemini API key for live Gemini responses from the TypeScript agent endpoint; provider keys may also be used by Python features, depending on their configuration

## Getting started

Clone the repository:

```bash
git clone https://github.com/saravanavel07/OfficeBoy.Ai.git
cd OfficeBoy.Ai
```

### Web workspace and TypeScript server

Install the Node dependencies and start the development server:

```bash
npm install
npm run dev
```

Open the local address reported by the server (the Express server defaults to `http://localhost:3000`). The workspace can be run without a Gemini key; the browser workflow itself is a simulation. Set `GEMINI_API_KEY` to enable Gemini responses from `/api/agent/call`.

To build the frontend and bundled server for production:

```bash
npm run build
npm start
```

The production server serves the Vite build from `dist/` and listens on port `3000`.

### Python CLI and dashboard

Create and activate a virtual environment, then install the root Python dependencies:

```bash
python -m venv .venv

# macOS / Linux
source .venv/bin/activate

# Windows PowerShell
.\.venv\Scripts\Activate.ps1

pip install -r requirements.txt
```

Run a project brief through the Python CLI:

```bash
python main.py "Build an invoice-processing workflow with review and reporting deliverables"
```

The CLI accepts options for the client, budget, deadline, output directory, and simulated delay. See `python main.py --help` for the available arguments. For example:

```bash
python main.py "Prepare a customer-support automation plan" \
  --client "Example Company" \
  --output output_deliverables
```

Launch the root Flask dashboard separately:

```bash
python main.py --web --port 5000
```

Then open `http://localhost:5000`. The dashboard command starts the web server; run the CLI workflow without `--web` when you want to execute a brief and generate deliverables.

#### Watch agent work live in the standalone dashboard

To see the standalone `integrated_innovations/` agents work and have the dashboard update live, first follow that implementation's setup instructions in [`integrated_innovations/README.md`](integrated_innovations/README.md) and install its dependencies. Then start the dashboard and run a project in separate terminals:

```bash
# Terminal 1: start the integrated innovations dashboard
cd integrated_innovations
python -m web.app

# Terminal 2: from the integrated_innovations directory, run a project brief
python main.py "Design a real-time crypto portfolio tracker"
```

Open `http://localhost:5000` to watch agent activity. The dashboard streams workflow events via Server-Sent Events and updates without a page reload. The standalone implementation also documents a combined `python main.py "..." --web` option; see its README for details. This live view applies to `integrated_innovations/` and is separate from the React workspace's client-side simulation and the root `officeboy/` dashboard.

The standalone `integrated_innovations/` implementation has separate setup and run instructions in [`integrated_innovations/README.md`](integrated_innovations/README.md).

## Configuration

### TypeScript Gemini endpoint

Set the key in the environment before starting the server. For local development, you can create a `.env` file in the repository root (do not commit it):

```dotenv
GEMINI_API_KEY=your-gemini-api-key
```

The server loads environment variables through `dotenv` dependencies. Keep API keys on the server side and out of browser code.

### Python AI providers

The Python implementation supports provider integrations through its agent configuration. Set only the provider key required by the implementation you are running, for example:

```bash
export GEMINI_API_KEY="your-gemini-api-key"
# or
export ANTHROPIC_API_KEY="your-anthropic-api-key"
# or
export OPENAI_API_KEY="your-openai-api-key"
```

On Windows PowerShell, use `$env:GEMINI_API_KEY="your-gemini-api-key"` (replace the variable name for a different provider). Consult the Python agent implementation and `integrated_innovations/README.md` for provider-specific details.

## API endpoints

The TypeScript server exposes these routes:

- `GET /api/health` — returns service status and whether `GEMINI_API_KEY` is configured.
- `POST /api/agent/call` — accepts an agent role, prompt, and optional context. When configured, the server sends the request to Gemini.

Example request:

```bash
curl -X POST http://localhost:3000/api/agent/call \
  -H "Content-Type: application/json" \
  -d '{"role":"Developer","prompt":"Outline a safe approach to processing invoice data."}'
```

Do not include secrets in request bodies or commit them to the repository.

## Project layout

```text
.
├── src/                         # React workspace, components, data, and simulation engine
├── server.ts                    # Express + Vite server and Gemini agent endpoint
├── package.json                 # Node scripts and dependencies
├── officeboy/                   # Python package, CLI, orchestration, and dashboard
├── main.py                      # Python CLI entry point
├── requirements.txt             # Root Python dependencies
├── integrated_innovations/      # Standalone Python multi-agent implementation
└── output_deliverables/         # Example/generated deliverable files
```

## Development

Available Node scripts:

```bash
npm run dev      # Start the TypeScript/Vite development server
npm run build    # Build the frontend and bundle the server
npm start        # Start the production server after building
npm run preview  # Preview the Vite frontend build
npm run lint     # Run TypeScript checks (tsc --noEmit)
```

No automated test command is currently defined in the root `package.json`.

## Security

- Never commit `.env` files, API keys, or other credentials.
- Keep provider keys in server-side environment variables; do not expose them in frontend code.
- Review generated code and deliverables before using them in production or with sensitive data.
- Treat AI-generated output as a draft that requires appropriate human review.

## Contributing

Contributions are welcome. For substantial changes, open an issue to discuss the proposed approach before submitting a pull request. Please include a clear description of the change and any relevant setup or verification steps.

## License

No license file is currently included in this repository. Unless a license is added, standard copyright restrictions apply; please contact the repository owner before redistributing or reusing the code.
