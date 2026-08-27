"""
OfficeBoy.ai — Embedded Web Dashboard & REST API
Pure Python web server providing real-time UI, WebSocket/polling logs, and live sprint dispatch.
"""

import json
import threading
from typing import Optional
from flask import Flask, jsonify, render_template_string, request

from officeboy.core.orchestrator import CompanyOrchestrator
from officeboy.models import TaskStatus

app = Flask(__name__)
orchestrator = CompanyOrchestrator()

DASHBOARD_HTML = """
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OfficeBoy.ai — Pure Python Autonomous Workspace</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Space Grotesk', sans-serif; background-color: #0b0e14; color: #f1f5f9; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }
  </style>
</head>
<body class="min-h-screen p-6 md:p-10">
  <div class="max-w-6xl mx-auto space-y-8">
    
    <!-- Top Header -->
    <header class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-2xl bg-[#141820] border border-[#232a38] shadow-2xl">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-b from-[#ffffff] to-[#94a3b8] flex items-center justify-center text-[#0b0e14] font-black text-xl shadow-lg">
          🤖
        </div>
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            OfficeBoy<span class="text-slate-400 font-mono text-lg font-normal">.ai</span>
            <span class="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700">Python Engine</span>
          </h1>
          <p class="text-xs text-slate-400">Autonomous Multi-Agent AI Office Operating System</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <span id="statusBadge" class="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-800">
          Standby
        </span>
      </div>
    </header>

    <!-- Brief Dispatcher -->
    <div class="p-6 rounded-2xl bg-[#141820] border border-[#232a38] space-y-4">
      <h2 class="text-lg font-semibold text-white">Dispatch New Project Brief</h2>
      <div class="flex flex-col sm:flex-row gap-3">
        <input 
          id="briefInput"
          type="text" 
          placeholder="e.g. Build an autonomous real-time crypto anomaly detector with WebSocket feed..." 
          class="flex-1 px-4 py-3 rounded-xl bg-[#0b0e14] border border-[#2b3548] text-white focus:outline-none focus:border-slate-400 text-sm font-sans"
        />
        <button 
          onclick="startSprint()"
          id="startBtn"
          class="px-6 py-3 rounded-xl bg-gradient-to-r from-slate-100 to-slate-300 text-slate-900 font-bold text-sm hover:from-white hover:to-slate-200 transition-all cursor-pointer shadow-lg"
        >
          Launch Sprint
        </button>
      </div>
    </div>

    <!-- Active Workflow & Agent Roster -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Workflow Stages -->
      <div class="lg:col-span-2 p-6 rounded-2xl bg-[#141820] border border-[#232a38] space-y-4">
        <h3 class="text-sm font-mono uppercase tracking-wider text-slate-400">5-Stage Sequential Sprint</h3>
        <div id="stepsList" class="space-y-3">
          <p class="text-sm text-slate-500 italic">No active sprint dispatched yet.</p>
        </div>
      </div>

      <!-- Deliverables List -->
      <div class="p-6 rounded-2xl bg-[#141820] border border-[#232a38] space-y-4">
        <h3 class="text-sm font-mono uppercase tracking-wider text-slate-400">Generated Deliverables</h3>
        <div id="deliverablesList" class="space-y-2.5">
          <p class="text-sm text-slate-500 italic">Deliverables will populate here.</p>
        </div>
      </div>
    </div>

    <!-- Live Event Feed -->
    <div class="p-6 rounded-2xl bg-[#141820] border border-[#232a38] space-y-4">
      <h3 class="text-sm font-mono uppercase tracking-wider text-slate-400">Live Agent Telemetry Feed</h3>
      <div id="feedList" class="h-64 overflow-y-auto space-y-2 p-4 rounded-xl bg-[#0b0e14] border border-[#1e2430] font-mono text-xs text-slate-300">
        <p class="text-slate-600">> OfficeBoy agent bus initialized.</p>
      </div>
    </div>

  </div>

  <script>
    async function startSprint() {
      const brief = document.getElementById('briefInput').value.trim();
      if (!brief) return;
      document.getElementById('startBtn').disabled = true;
      document.getElementById('startBtn').innerText = 'Sprint In Progress...';

      await fetch('/api/sprint/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brief: brief })
      });
      pollStatus();
    }

    async function pollStatus() {
      const res = await fetch('/api/state');
      const data = await res.json();

      const statusBadge = document.getElementById('statusBadge');
      statusBadge.innerText = data.is_running ? 'Active Sprint' : 'Delivered';

      // Render steps
      if (data.current_brief && data.current_brief.workflow_steps) {
        const list = document.getElementById('stepsList');
        list.innerHTML = data.current_brief.workflow_steps.map(s => `
          <div class="p-3.5 rounded-xl border ${s.status === 'completed' ? 'border-emerald-500/30 bg-emerald-950/20' : s.status === 'in_progress' ? 'border-amber-500/40 bg-amber-950/20' : 'border-slate-800 bg-[#0e1117]'}">
            <div class="flex items-center justify-between text-xs font-mono">
              <span class="font-bold text-white">${s.step_number}. ${s.title}</span>
              <span class="uppercase ${s.status === 'completed' ? 'text-emerald-400' : 'text-slate-400'}">${s.status}</span>
            </div>
            <p class="text-xs text-slate-400 mt-1">${s.assigned_name} (${s.assigned_role})</p>
          </div>
        `).join('');
      }

      // Render deliverables
      if (data.deliverables && data.deliverables.length > 0) {
        const delivList = document.getElementById('deliverablesList');
        delivList.innerHTML = data.deliverables.map(d => `
          <div class="p-3 rounded-lg bg-[#0b0e14] border border-slate-800 text-xs">
            <p class="font-bold text-slate-200">${d.filename}</p>
            <p class="text-[11px] text-slate-400 mt-0.5">${d.summary}</p>
          </div>
        `).join('');
      }

      // Render messages
      if (data.messages) {
        const feed = document.getElementById('feedList');
        feed.innerHTML = data.messages.map(m => `
          <div class="leading-relaxed">
            <span class="text-slate-500">[${m.timestamp}]</span> 
            <span class="text-cyan-400 font-bold">${m.sender_name}:</span> 
            <span>${m.content}</span>
          </div>
        `).join('');
        feed.scrollTop = feed.scrollHeight;
      }

      if (data.is_running) {
        setTimeout(pollStatus, 1000);
      } else {
        document.getElementById('startBtn').disabled = false;
        document.getElementById('startBtn').innerText = 'Launch Sprint';
      }
    }
  </script>
</body>
</html>
"""


@app.route("/")
def index():
    return render_template_string(DASHBOARD_HTML)


@app.route("/api/state")
def get_state():
    state = orchestrator.state
    messages = [m.__dict__ for m in orchestrator.log.get_messages()]
    deliverables = [d.__dict__ for d in state.deliverables]
    brief_data = None
    if state.current_brief:
        brief_dict = state.current_brief.__dict__.copy()
        brief_dict["workflow_steps"] = [s.__dict__ for s in state.current_brief.workflow_steps]
        brief_data = brief_dict

    return jsonify({
        "is_running": state.is_running,
        "current_step_index": state.current_step_index,
        "progress_percentage": state.progress_percentage,
        "current_brief": brief_data,
        "messages": messages,
        "deliverables": deliverables
    })


@app.route("/api/sprint/start", methods=["POST"])
def start_sprint_api():
    data = request.json or {}
    brief_text = data.get("brief", "Enterprise Python Operating System Deliverable")
    
    if orchestrator.state.is_running:
        return jsonify({"status": "already_running"}), 400

    def async_runner():
        brief = orchestrator.initialize_brief(brief_text)
        orchestrator.run_sprint(brief, step_delay_sec=1.0)

    threading.Thread(target=async_runner, daemon=True).start()
    return jsonify({"status": "started"})


def start_web_server(port: int = 5000):
    print(f"\n\033[1;32mOfficeBoy.ai Web Dashboard running at http://localhost:{port}\033[0m")
    app.run(host="0.0.0.0", port=port, debug=False)
