"""
INTEGRATED INNOVATIONS
Flask Web Dashboard Server
Serves the live multi-agent monitoring dashboard and streams real-time SSE updates.
"""

import os
import json
import time
import threading
from flask import Flask, render_template, jsonify, Response, request
from ..core.company_log import CompanyLog
from ..core.orchestrator import CompanyOrchestrator

app = Flask(
    __name__,
    template_folder="templates",
    static_folder="static"
)

log_store = CompanyLog("company_log.json")
active_orchestrator = CompanyOrchestrator(log_path="company_log.json", delay_between_steps=1.5)


@app.route("/")
def index():
    """Render the main dark theme dashboard."""
    state = log_store.read_state()
    return render_template("dashboard.html", state=state)


@app.route("/api/state")
def get_state():
    """Return the raw JSON shared memory state."""
    return jsonify(log_store.read_state())


@app.route("/api/events")
def stream_events():
    """Server-Sent Events (SSE) stream broadcasting live agent events."""
    def event_generator():
        last_timestamp = 0
        while True:
            state = log_store.read_state()
            current_time = state.get("last_updated", 0)
            if current_time > last_timestamp:
                last_timestamp = current_time
                yield f"data: {json.dumps(state)}\n\n"
            time.sleep(0.5)

    return Response(
        event_generator(),
        mimetype="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
            "Connection": "keep-alive"
        }
    )


@app.route("/api/run", methods=["POST"])
def run_project():
    """Trigger an autonomous agency run in a background thread."""
    data = request.get_json() or {}
    brief = data.get("brief", "Develop an automated Python invoice processing and audit engine.")
    client = data.get("client", "Enterprise Client")

    def run_worker():
        active_orchestrator.run_project(client_brief=brief, client_name=client)

    thread = threading.Thread(target=run_worker, daemon=True)
    thread.start()

    return jsonify({"status": "started", "brief": brief, "client": client})


def start_server(port: int = 5000, host: str = "0.0.0.0", debug: bool = False):
    """Start the Flask web dashboard."""
    print(f"\n=======================================================")
    print(f"  INTEGRATED INNOVATIONS — Live Dashboard Online")
    print(f"  URL: http://localhost:{port}")
    print(f"=======================================================\n")
    app.run(host=host, port=port, debug=debug)


if __name__ == "__main__":
    start_server()
