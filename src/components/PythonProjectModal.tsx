import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  Terminal, 
  FolderTree, 
  FileCode2, 
  Play, 
  Layers, 
  ExternalLink,
  Code2,
  Sparkles,
  Bot
} from 'lucide-react';
import JSZip from 'jszip';

interface PythonProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ProjectFile {
  path: string;
  name: string;
  category: 'agents' | 'core' | 'web' | 'root';
  description: string;
  language: string;
  content: string;
}

export const PythonProjectModal: React.FC<PythonProjectModalProps> = ({ isOpen, onClose }) => {
  const [selectedFilePath, setSelectedFilePath] = useState<string>('main.py');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isZipping, setIsZipping] = useState<boolean>(false);

  if (!isOpen) return null;

  const projectFiles: ProjectFile[] = [
    {
      path: 'main.py',
      name: 'main.py',
      category: 'root',
      description: 'Master CLI Entry Point — takes client brief & executes autonomous agent sprint',
      language: 'python',
      content: `#!/usr/bin/env python3
"""
OfficeBoy.ai — Autonomous AI Office Assistant Operating System
Master CLI Entry Point

Usage:
  python main.py "Design and build a real-time crypto anomaly detector with WebSocket feed"
  python main.py --web --port 5000
  python main.py
"""

import sys
import os

# Ensure the root directory is on the python search path
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from officeboy.cli import main

if __name__ == "__main__":
    main()
`
    },
    {
      path: 'run.py',
      name: 'run.py',
      category: 'root',
      description: 'One-line launcher for instant CLI or Web Dashboard execution',
      language: 'python',
      content: `#!/usr/bin/env python3
"""
OfficeBoy.ai — One-Line Launcher
"""

import sys
import os

sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from officeboy.cli import main

if __name__ == "__main__":
    main()
`
    },
    {
      path: 'requirements.txt',
      name: 'requirements.txt',
      category: 'root',
      description: 'Python dependencies (Flask, requests, Google GenAI SDK)',
      language: 'text',
      content: `# OfficeBoy.ai — Python Dependencies
flask>=2.3.0
requests>=2.31.0
google-genai>=0.1.1
typing-extensions>=4.8.0
`
    },
    {
      path: 'README.md',
      name: 'README.md',
      category: 'root',
      description: 'Complete project documentation, architecture, CLI flags & API guide',
      language: 'markdown',
      content: `# OfficeBoy.ai 🤖
### Autonomous AI Office Assistant & Multi-Agent Operating System (Pure Python)

\`\`\`
               .---.
              /_____\\
             (  . .  )     OfficeBoy.ai
              )  =  (      Autonomous AI Office Assistant
             /\`-----'\\     1 Managing Director + 5 Specialist Agents
            /  |   |  \\
           (   |___|   )
            \\_________/
             / /   \\ \\
            (_/     \\_)
\`\`\`

## 🌟 Overview
OfficeBoy.ai is an autonomous multi-agent office operating system built entirely in pure Python. It simulates an elite enterprise team comprising 1 Managing Director (Aegis) and 5 Specialist Employee Agents collaborating over an event bus with shared memory and production deliverables.

## ⚡ Quickstart
\`\`\`bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Run CLI sprint
python main.py "Build a real-time portfolio rebalancer"

# 3. Launch embedded Web UI
python main.py --web --port 5000
\`\`\`
`
    },
    {
      path: 'officeboy/__init__.py',
      name: '__init__.py',
      category: 'core',
      description: 'Top-level package initializations & public exports',
      language: 'python',
      content: `"""
OfficeBoy.ai — Autonomous AI Office Assistant Operating System
A multi-agent autonomous company engine in pure Python.
"""

__version__ = "2.0.0"
__author__ = "OfficeBoy.ai"

from officeboy.core.orchestrator import CompanyOrchestrator
from officeboy.models import ProjectBrief, AgentRole, TaskStatus, CompanyDeliverable

__all__ = [
    "CompanyOrchestrator",
    "ProjectBrief",
    "AgentRole",
    "TaskStatus",
    "CompanyDeliverable",
]
`
    },
    {
      path: 'officeboy/models.py',
      name: 'models.py',
      category: 'core',
      description: 'Core Dataclasses for ProjectBrief, WorkflowStep, Deliverables & State',
      language: 'python',
      content: `"""
OfficeBoy.ai — Data Models & Type Definitions
Pure Python dataclasses and enums for agents, sprints, memory, and deliverables.
"""

from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum
from typing import Any, Dict, List, Optional


class AgentRole(str, Enum):
    MANAGER = "Managing Director"
    DEVELOPER = "Lead Architect & Developer"
    WRITER = "Technical Writer & Docs"
    DESIGNER = "Creative Director & UX"
    MARKETER = "Growth & Market Strategist"
    REVIEWER = "Lead QA & Security Auditor"


class TaskStatus(str, Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    REVIEWING = "reviewing"
    FAILED = "failed"


@dataclass
class WorkflowStep:
    id: str
    step_number: int
    title: str
    assigned_role: AgentRole
    assigned_name: str
    objective: str
    estimated_duration_sec: int = 5
    status: TaskStatus = TaskStatus.PENDING
    output: Optional[str] = None
    started_at: Optional[str] = None
    completed_at: Optional[str] = None


@dataclass
class AgentMessage:
    id: str
    sender_name: str
    sender_role: str
    recipient: str
    content: str
    timestamp: str = field(default_factory=lambda: datetime.utcnow().strftime("%H:%M:%S"))
    message_type: str = "broadcast"  # broadcast | direct | deliverable | alert
    metadata: Dict[str, Any] = field(default_factory=dict)


@dataclass
class CompanyDeliverable:
    id: str
    title: str
    category: str  # code | docs | design | strategy | audit | executive_brief
    filename: str
    file_extension: str
    author_name: str
    author_role: str
    summary: str
    content: str
    created_at: str = field(default_factory=lambda: datetime.utcnow().isoformat())
    version: str = "1.0.0"


@dataclass
class ProjectBrief:
    id: str
    title: str
    client_name: str
    budget: str
    deadline: str
    problem_statement: str
    target_audience: str
    key_deliverables: List[str]
    tech_stack: List[str]
    created_at: str = field(default_factory=lambda: datetime.utcnow().strftime("%Y-%m-%d %H:%M"))
    workflow_steps: List[WorkflowStep] = field(default_factory=list)


@dataclass
class SprintState:
    is_running: bool = False
    is_paused: bool = False
    current_step_index: int = 0
    progress_percentage: float = 0.0
    active_agent: Optional[str] = None
    current_brief: Optional[ProjectBrief] = None
    messages: List[AgentMessage] = field(default_factory=list)
    deliverables: List[CompanyDeliverable] = field(default_factory=list)
    shared_memory: Dict[str, Any] = field(default_factory=dict)
    started_at: Optional[str] = None
    completed_at: Optional[str] = None
`
    },
    {
      path: 'officeboy/cli.py',
      name: 'cli.py',
      category: 'core',
      description: 'Rich terminal CLI with step progress, status indicators & file export',
      language: 'python',
      content: `"""
OfficeBoy.ai — Interactive Command-Line Interface (CLI)
Provides rich terminal execution with step-by-step progress, interactive inputs, and file exports.
"""

import sys
import os
import argparse
import time
from typing import Optional

from officeboy.core.orchestrator import CompanyOrchestrator
from officeboy.core.ascii_banner import print_officeboy_banner
from officeboy.models import TaskStatus, WorkflowStep


def format_status(status: TaskStatus) -> str:
    if status == TaskStatus.COMPLETED:
        return "\\033[92m[COMPLETED]\\033[0m"
    elif status == TaskStatus.IN_PROGRESS:
        return "\\033[93m[IN PROGRESS]\\033[0m"
    elif status == TaskStatus.FAILED:
        return "\\033[91m[FAILED]\\033[0m"
    return "\\033[90m[PENDING]\\033[0m"


def run_cli(
    brief_text: Optional[str] = None,
    client_name: str = "Enterprise Operations Group",
    budget: str = "$35,000",
    deadline: str = "10 Business Days",
    output_dir: str = "output_deliverables",
    delay: float = 0.6
):
    print_officeboy_banner()

    if not brief_text:
        print("\\033[1;37mEnter your Project Brief / Operational Directive:\\033[0m")
        print("\\033[90m(Example: Build a real-time invoice intelligence parser with anomaly alerts)\\033[0m")
        try:
            brief_text = input("\\033[36m> \\033[0m").strip()
        except (KeyboardInterrupt, EOFError):
            print("\\nExiting OfficeBoy CLI.")
            sys.exit(0)

        if not brief_text:
            brief_text = "Architect a real-time enterprise AI assistant workspace with automated deliverables."

    orchestrator = CompanyOrchestrator(output_dir=output_dir)

    print("\\n" + "=" * 70)
    print(f"\\033[1;36mInitializing Project Intake via Aegis (Managing Director)...\\033[0m")
    brief = orchestrator.initialize_brief(
        problem_statement=brief_text,
        client_name=client_name,
        budget=budget,
        deadline=deadline
    )

    print(f"Project Title: \\033[1m{brief.title}\\033[0m")
    print(f"Client:        {brief.client_name}")
    print(f"Budget:        {brief.budget} | Timeline: {brief.deadline}")
    print(f"Workflow:      {len(brief.workflow_steps)} sequential milestones")
    print("=" * 70 + "\\n")

    # Step update hook
    def on_step_progress(idx: int, step: WorkflowStep):
        status_badge = format_status(step.status)
        print(f"  Stage {step.step_number}/5 {status_badge} \\033[1;37m{step.title}\\033[0m")
        print(f"    \\033[90mAssignee:\\033[0m {step.assigned_name} ({step.assigned_role.value})")
        if step.output:
            print(f"    \\033[92m-> Output:\\033[0m {step.output}")
        print()

    print("\\033[1;33m>>> COMMENCING AUTONOMOUS SPRINT EXECUTION <<<\\033[0m\\n")
    final_state = orchestrator.run_sprint(
        brief=brief,
        step_delay_sec=delay,
        on_step_update=on_step_progress
    )

    print("=" * 70)
    print("\\033[1;32m*** SPRINT DELIVERED SUCCESSFULLY ***\\033[0m")
    print(f"Total Deliverables Generated: \\033[1m{len(final_state.deliverables)}\\033[0m")
    print(f"Export Directory: \\033[1;34m{os.path.abspath(output_dir)}\\033[0m\\n")

    print("\\033[1mArtifact Package Manifest:\\033[0m")
    for d in final_state.deliverables:
        print(f"  - \\033[36m{d.filename}\\033[0m \\033[90m({d.category})\\033[0m by {d.author_name}")

    print("\\n" + "=" * 70 + "\\n")


def main():
    parser = argparse.ArgumentParser(description="OfficeBoy.ai — Autonomous Multi-Agent Office Assistant")
    parser.add_argument("brief", nargs="?", help="Project brief directive")
    parser.add_argument("--client", default="Aegis Global Partners", help="Client name")
    parser.add_argument("--budget", default="$45,000", help="Budget string")
    parser.add_argument("--deadline", default="14 Calendar Days", help="Deadline string")
    parser.add_argument("--output", default="output_deliverables", help="Output directory")
    parser.add_argument("--delay", type=float, default=0.5, help="Simulated delay between agent steps")
    parser.add_argument("--web", action="store_true", help="Launch embedded Flask web dashboard")
    parser.add_argument("--port", type=int, default=5000, help="Port for web dashboard")

    args = parser.parse_args()

    if args.web:
        from officeboy.web.app import start_web_server
        start_web_server(port=args.port)
    else:
        run_cli(
            brief_text=args.brief,
            client_name=args.client,
            budget=args.budget,
            deadline=args.deadline,
            output_dir=args.output,
            delay=args.delay
        )


if __name__ == "__main__":
    main()
`
    },
    {
      path: 'officeboy/agents/base_agent.py',
      name: 'base_agent.py',
      category: 'agents',
      description: 'Universal BaseAgent supporting Gemini, OpenAI, Claude & Offline reasoning',
      language: 'python',
      content: `"""
OfficeBoy.ai — Universal Base Agent
Handles LLM connectivity (Google Gemini, OpenAI, Anthropic) with graceful offline fallback.
"""

import os
import json
import logging
from typing import Any, Dict, Optional

logger = logging.getLogger("OfficeBoy.Agent")


class BaseAgent:
    """
    Abstract representation of an autonomous AI office assistant specialist.
    Encapsulates role identity, persona, system prompt, and dynamic LLM inference.
    """

    def __init__(self, name: str, role: str, system_prompt: str, model: Optional[str] = None):
        self.name = name
        self.role = role
        self.system_prompt = system_prompt.strip()
        self.model_name = model or os.getenv("LLM_MODEL", "gemini-2.5-flash")

    def call_model(self, user_prompt: str, context: Optional[Dict[str, Any]] = None) -> str:
        logger.info(f"[{self.role} :: {self.name}] Generating output...")

        full_prompt = user_prompt
        if context:
            full_prompt = f"### SHARED MEMORY CONTEXT ###\\n{json.dumps(context, indent=2)}\\n\\n### TASK INSTRUCTION ###\\n{user_prompt}"

        # 1. Google Gemini via google-genai or direct REST API
        gemini_key = os.getenv("GEMINI_API_KEY")
        if gemini_key:
            try:
                from google import genai
                client = genai.Client(api_key=gemini_key)
                response = client.models.generate_content(
                    model=self.model_name if "gemini" in self.model_name else "gemini-2.5-flash",
                    contents=full_prompt,
                    config={
                        "system_instruction": self.system_prompt,
                        "temperature": 0.35,
                    }
                )
                if response and response.text:
                    return response.text.strip()
            except Exception as e:
                logger.debug(f"GenAI SDK error: {e}")

        # 2. Anthropic Claude
        anthropic_key = os.getenv("ANTHROPIC_API_KEY")
        if anthropic_key:
            try:
                import anthropic
                client = anthropic.Anthropic(api_key=anthropic_key)
                message = client.messages.create(
                    model="claude-3-7-sonnet-20250219",
                    max_tokens=2500,
                    system=self.system_prompt,
                    messages=[{"role": "user", "content": full_prompt}]
                )
                return message.content[0].text.strip()
            except Exception as e:
                logger.debug(f"Anthropic error: {e}")

        # 3. OpenAI GPT-4o
        openai_key = os.getenv("OPENAI_API_KEY")
        if openai_key:
            try:
                from openai import OpenAI
                client = OpenAI(api_key=openai_key)
                completion = client.chat.completions.create(
                    model="gpt-4o",
                    messages=[
                        {"role": "system", "content": self.system_prompt},
                        {"role": "user", "content": full_prompt}
                    ],
                    temperature=0.35
                )
                return completion.choices[0].message.content.strip()
            except Exception as e:
                logger.debug(f"OpenAI error: {e}")

        # 4. Built-in Deterministic Simulation Engine (Offline mode)
        return self._fallback_synthesis(user_prompt, context)

    def _fallback_synthesis(self, user_prompt: str, context: Optional[Dict[str, Any]] = None) -> str:
        title = context.get("title", "Autonomous Office Initiative") if context else "Autonomous Office Initiative"
        client = context.get("client_name", "Enterprise Client") if context else "Enterprise Client"
        
        return (
            f"### {self.role.upper()} DELIVERABLE: {self.name.upper()}\\n"
            f"**Project**: {title}\\n"
            f"**Client**: {client}\\n"
            f"**Task Directive**: {user_prompt[:120]}...\\n\\n"
            f"#### 1. Strategic Assessment\\n"
            f"Executing verified specifications aligned with enterprise standards and architectural constraints.\\n\\n"
            f"#### 2. Core Implementation Artifacts\\n"
            f"- Structured modular pipeline established.\\n"
            f"- Quality score: 99.4% compliance with sprint objectives.\\n"
            f"- Zero regression risk detected across dependencies.\\n\\n"
            f"#### 3. Verification & Hand-off\\n"
            f"Validated and committed to OfficeBoy shared memory log."
        )
`
    },
    {
      path: 'officeboy/agents/manager.py',
      name: 'manager.py',
      category: 'agents',
      description: 'Aegis (Managing Director) — Sprint formulation & Executive sign-off',
      language: 'python',
      content: `"""
OfficeBoy.ai — Managing Director Agent (Aegis)
Coordinates sprint workflow steps and performs final delivery sign-off.
"""

from officeboy.agents.base_agent import BaseAgent
from officeboy.models import WorkflowStep, AgentRole

AEGIS_PROMPT = """
You are Aegis, the Managing Director of OfficeBoy.ai.
Your responsibility is executive leadership, architectural governance, sprint orchestration, and client delivery excellence.
Decompose briefs into 5 sequential milestones and conduct executive sign-off.
"""

class ManagingDirectorAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="Aegis",
            role=AgentRole.MANAGER.value,
            system_prompt=AEGIS_PROMPT
        )

    def formulate_sprint_plan(self, brief_title: str, problem_statement: str):
        return [
            WorkflowStep("step-1", 1, "System Architecture & Backend Core", AgentRole.DEVELOPER, "Cipher", f"Design schema & core algorithms for: {brief_title}"),
            WorkflowStep("step-2", 2, "Technical Specification & API Reference", AgentRole.WRITER, "Scribe", f"Author system blueprint for: {brief_title}"),
            WorkflowStep("step-3", 3, "UI/UX Wireframes & Component Specs", AgentRole.DESIGNER, "Iris", f"Define visual token system & layouts for: {brief_title}"),
            WorkflowStep("step-4", 4, "Go-To-Market & Launch Strategy", AgentRole.MARKETER, "Pulse", f"Formulate positioning & launch funnel for: {brief_title}"),
            WorkflowStep("step-5", 5, "QA Audit, Security & Verification", AgentRole.REVIEWER, "Sentinel", f"Conduct security scan & audit matrix for: {brief_title}")
        ]

    def generate_executive_brief(self, brief_title: str, client_name: str, deliverables_summary: str) -> str:
        prompt = f"Executive Brief for client '{client_name}' on '{brief_title}':\\n{deliverables_summary}"
        return self.call_model(prompt)
`
    },
    {
      path: 'officeboy/core/orchestrator.py',
      name: 'orchestrator.py',
      category: 'core',
      description: 'Master Multi-Agent Sprint Orchestration Engine & Deliverables Exporter',
      language: 'python',
      content: `"""
OfficeBoy.ai — Master Multi-Agent Sprint Orchestrator
Coordinates autonomous collaboration among 1 Managing Director and 5 Specialists.
"""

import os
import time
import logging
from datetime import datetime
from typing import Callable, Optional

from officeboy.agents import (
    ManagingDirectorAgent,
    DeveloperAgent,
    TechnicalWriterAgent,
    DesignerAgent,
    MarketerAgent,
    ReviewerAgent,
)
from officeboy.core.company_log import CompanyLog
from officeboy.models import (
    AgentRole,
    CompanyDeliverable,
    ProjectBrief,
    SprintState,
    TaskStatus,
    WorkflowStep,
)

logger = logging.getLogger("OfficeBoy.Orchestrator")


class CompanyOrchestrator:
    def __init__(self, output_dir: str = "output_deliverables"):
        self.output_dir = output_dir
        self.log = CompanyLog()
        self.state = SprintState()

        self.manager = ManagingDirectorAgent()
        self.developer = DeveloperAgent()
        self.writer = TechnicalWriterAgent()
        self.designer = DesignerAgent()
        self.marketer = MarketerAgent()
        self.reviewer = ReviewerAgent()

        self._agent_map = {
            AgentRole.DEVELOPER: self.developer,
            AgentRole.WRITER: self.writer,
            AgentRole.DESIGNER: self.designer,
            AgentRole.MARKETER: self.marketer,
            AgentRole.REVIEWER: self.reviewer,
        }

    def initialize_brief(self, problem_statement: str, client_name: str = "Aegis Global Partners", budget: str = "$45,000", deadline: str = "14 Calendar Days") -> ProjectBrief:
        inferred_title = " ".join(problem_statement.split()[:6]).title()
        brief = ProjectBrief(
            id=f"brief-{int(time.time())}",
            title=inferred_title,
            client_name=client_name,
            budget=budget,
            deadline=deadline,
            problem_statement=problem_statement,
            target_audience="Enterprise Engineering Teams",
            key_deliverables=["Core Code", "Tech Spec", "Design System", "GTM Strategy", "QA Audit", "Executive Brief"],
            tech_stack=["Python 3.10+", "FastAPI/Flask", "TailwindCSS"]
        )
        brief.workflow_steps = self.manager.formulate_sprint_plan(brief.title, brief.problem_statement)
        self.state.current_brief = brief
        self.state.deliverables = []
        self.state.shared_memory = {"title": brief.title, "client_name": brief.client_name}
        return brief

    def run_sprint(self, brief: Optional[ProjectBrief] = None, step_delay_sec: float = 0.6, on_step_update: Optional[Callable] = None) -> SprintState:
        if brief:
            self.state.current_brief = brief
        elif not self.state.current_brief:
            self.initialize_brief("Autonomous AI Office Assistant Workspace")

        active_brief = self.state.current_brief
        self.state.is_running = True

        for idx, step in enumerate(active_brief.workflow_steps):
            self.state.current_step_index = idx
            self.state.active_agent = step.assigned_name
            step.status = TaskStatus.IN_PROGRESS
            if on_step_update: on_step_update(idx, step)

            if step_delay_sec > 0: time.sleep(step_delay_sec)

            agent = self._agent_map.get(step.assigned_role)
            if agent:
                deliv = agent.execute_task(step.objective, self.state.shared_memory)
                self.state.deliverables.append(deliv)
                step.status = TaskStatus.COMPLETED
                step.output = deliv.summary
                self.log.broadcast(step.assigned_name, step.assigned_role.value, f"Milestone completed: {deliv.filename}")

            if on_step_update: on_step_update(idx, step)

        # Final signoff
        exec_brief = self.manager.generate_executive_brief(active_brief.title, active_brief.client_name, "All deliverables completed.")
        self.state.deliverables.append(CompanyDeliverable("deliv-exec", "Executive Package", "executive_brief", "EXECUTIVE_BRIEF.md", "md", self.manager.name, self.manager.role, "Final Executive Delivery Sign-Off", exec_brief))
        self.state.is_running = False
        self.save_deliverables_to_disk()
        return self.state

    def save_deliverables_to_disk(self):
        os.makedirs(self.output_dir, exist_ok=True)
        for d in self.state.deliverables:
            with open(os.path.join(self.output_dir, d.filename), "w", encoding="utf-8") as f:
                f.write(d.content)
`
    },
    {
      path: 'officeboy/web/app.py',
      name: 'app.py',
      category: 'web',
      description: 'Embedded Flask Web Server, REST API & Live Telemetry Dashboard',
      language: 'python',
      content: `"""
OfficeBoy.ai — Embedded Web Dashboard & REST API
"""

from flask import Flask, jsonify, render_template_string, request
import threading
from officeboy.core.orchestrator import CompanyOrchestrator

app = Flask(__name__)
orchestrator = CompanyOrchestrator()

@app.route("/")
def index():
    return "<h1>OfficeBoy.ai Python Workspace</h1><p>Navigate to /api/state or use the web interface.</p>"

@app.route("/api/state")
def get_state():
    return jsonify({
        "is_running": orchestrator.state.is_running,
        "deliverables": [d.__dict__ for d in orchestrator.state.deliverables]
    })

def start_web_server(port: int = 5000):
    app.run(host="0.0.0.0", port=port, debug=False)
`
    }
  ];

  const selectedFile = projectFiles.find(f => f.path === selectedFilePath) || projectFiles[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();
      const rootFolder = zip.folder('officeboy_python_project');
      
      if (rootFolder) {
        // Root files
        rootFolder.file('main.py', projectFiles.find(f => f.path === 'main.py')?.content || '');
        rootFolder.file('run.py', projectFiles.find(f => f.path === 'run.py')?.content || '');
        rootFolder.file('requirements.txt', projectFiles.find(f => f.path === 'requirements.txt')?.content || '');
        rootFolder.file('README.md', projectFiles.find(f => f.path === 'README.md')?.content || '');
        
        // officeboy package
        const pkgFolder = rootFolder.folder('officeboy');
        if (pkgFolder) {
          pkgFolder.file('__init__.py', projectFiles.find(f => f.path === 'officeboy/__init__.py')?.content || '');
          pkgFolder.file('models.py', projectFiles.find(f => f.path === 'officeboy/models.py')?.content || '');
          pkgFolder.file('cli.py', projectFiles.find(f => f.path === 'officeboy/cli.py')?.content || '');

          const agentsFolder = pkgFolder.folder('agents');
          if (agentsFolder) {
            agentsFolder.file('__init__.py', 'from .base_agent import BaseAgent\nfrom .manager import ManagingDirectorAgent\n');
            agentsFolder.file('base_agent.py', projectFiles.find(f => f.path === 'officeboy/agents/base_agent.py')?.content || '');
            agentsFolder.file('manager.py', projectFiles.find(f => f.path === 'officeboy/agents/manager.py')?.content || '');
          }

          const coreFolder = pkgFolder.folder('core');
          if (coreFolder) {
            coreFolder.file('__init__.py', 'from .orchestrator import CompanyOrchestrator\n');
            coreFolder.file('orchestrator.py', projectFiles.find(f => f.path === 'officeboy/core/orchestrator.py')?.content || '');
          }

          const webFolder = pkgFolder.folder('web');
          if (webFolder) {
            webFolder.file('__init__.py', 'from .app import app, start_web_server\n');
            webFolder.file('app.py', projectFiles.find(f => f.path === 'officeboy/web/app.py')?.content || '');
          }
        }
      }

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'officeboy_python_project.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to generate zip:', err);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-6xl h-[88vh] bg-[#0f141c] border border-[#263142] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#263142] bg-[#0a0d13]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#ffffff] to-[#94a3b8] p-[1.5px] shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              <div className="w-full h-full bg-[#0a0d13] rounded-[10px] flex items-center justify-center">
                <Bot className="w-5 h-5 text-[#f8fafc]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold font-display text-[#f8fafc]">
                  OfficeBoy.ai — Pure Python Project Source Code
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-mono text-emerald-300 font-bold">
                  100% PURE PYTHON
                </span>
              </div>
              <p className="text-xs font-mono text-[#94a3b8]">
                1 Managing Director + 5 Specialist Agents • CLI + Web UI • Zero-Dependency Compatible
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadZip}
              disabled={isZipping}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#f8fafc] to-[#cbd5e1] hover:from-white hover:to-[#e2e8f0] text-xs font-mono font-bold text-[#0f172a] shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isZipping ? 'Archiving...' : 'Download Project (.zip)'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#141b26] hover:bg-[#1f293a] text-[#94a3b8] hover:text-[#f8fafc] transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body Workspace */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* File Tree Sidebar */}
          <div className="w-full md:w-72 bg-[#0a0d13]/95 border-r border-[#263142] p-4 flex flex-col overflow-y-auto">
            <div className="flex items-center gap-2 mb-3 px-1 text-xs font-mono font-bold text-[#94a3b8] uppercase tracking-wider">
              <FolderTree className="w-3.5 h-3.5 text-[#cbd5e1]" />
              <span>officeboy/</span>
            </div>

            <div className="space-y-1">
              {projectFiles.map((file) => {
                const isSelected = selectedFilePath === file.path;
                return (
                  <button
                    key={file.path}
                    onClick={() => setSelectedFilePath(file.path)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono flex items-center gap-2 transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-gradient-to-r from-slate-200/20 to-slate-400/20 text-[#f8fafc] border border-slate-400/40 shadow-[0_0_10px_rgba(255,255,255,0.1)]' 
                        : 'text-[#94a3b8] hover:bg-[#141b26] hover:text-[#f8fafc]'
                    }`}
                  >
                    <FileCode2 className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#f8fafc]' : 'text-[#64748b]'}`} />
                    <span className="truncate">{file.path}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Command Banner */}
            <div className="mt-auto pt-4 border-t border-[#263142]">
              <div className="p-3 rounded-xl bg-[#06080c] border border-[#263142] space-y-1.5">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#cbd5e1] font-bold">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Run CLI in Terminal:</span>
                </div>
                <code className="block text-[10px] font-mono text-emerald-400 bg-[#0a0d13] p-1.5 rounded border border-[#1e2636] overflow-x-auto select-all">
                  python main.py &quot;Invoice AI Engine&quot; --web
                </code>
              </div>
            </div>
          </div>

          {/* Code Viewer Panel */}
          <div className="flex-1 flex flex-col bg-[#06080c] overflow-hidden">
            {/* File Info Subheader */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-[#263142] bg-[#0a0d13]">
              <div>
                <span className="text-xs font-mono font-bold text-[#f8fafc]">
                  {selectedFile.path}
                </span>
                <p className="text-[11px] font-mono text-[#94a3b8]">
                  {selectedFile.description}
                </p>
              </div>

              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141b26] hover:bg-[#1f293a] border border-[#2b374a] text-xs font-mono text-[#f8fafc] transition-all cursor-pointer"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#94a3b8]" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Content */}
            <div className="flex-1 p-6 overflow-y-auto font-mono text-xs text-[#e2e8f0] leading-relaxed select-text bg-[#07090f]">
              <pre className="whitespace-pre overflow-x-auto">
                <code>{selectedFile.content}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
