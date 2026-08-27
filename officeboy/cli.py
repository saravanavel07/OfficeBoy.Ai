"""
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
        return "\033[92m[COMPLETED]\033[0m"
    elif status == TaskStatus.IN_PROGRESS:
        return "\033[93m[IN PROGRESS]\033[0m"
    elif status == TaskStatus.FAILED:
        return "\033[91m[FAILED]\033[0m"
    return "\033[90m[PENDING]\033[0m"


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
        print("\033[1;37mEnter your Project Brief / Operational Directive:\033[0m")
        print("\033[90m(Example: Build a real-time invoice intelligence parser with anomaly alerts)\033[0m")
        try:
            brief_text = input("\033[36m> \033[0m").strip()
        except (KeyboardInterrupt, EOFError):
            print("\nExiting OfficeBoy CLI.")
            sys.exit(0)

        if not brief_text:
            brief_text = "Architect a real-time enterprise AI assistant workspace with automated deliverables."

    orchestrator = CompanyOrchestrator(output_dir=output_dir)

    print("\n" + "=" * 70)
    print(f"\033[1;36mInitializing Project Intake via Aegis (Managing Director)...\033[0m")
    brief = orchestrator.initialize_brief(
        problem_statement=brief_text,
        client_name=client_name,
        budget=budget,
        deadline=deadline
    )

    print(f"Project Title: \033[1m{brief.title}\033[0m")
    print(f"Client:        {brief.client_name}")
    print(f"Budget:        {brief.budget} | Timeline: {brief.deadline}")
    print(f"Workflow:      {len(brief.workflow_steps)} sequential milestones")
    print("=" * 70 + "\n")

    # Step update hook
    def on_step_progress(idx: int, step: WorkflowStep):
        status_badge = format_status(step.status)
        print(f"  Stage {step.step_number}/5 {status_badge} \033[1;37m{step.title}\033[0m")
        print(f"    \033[90mAssignee:\033[0m {step.assigned_name} ({step.assigned_role.value})")
        if step.output:
            print(f"    \033[92m-> Output:\033[0m {step.output}")
        print()

    print("\033[1;33m>>> COMMENCING AUTONOMOUS SPRINT EXECUTION <<<\033[0m\n")
    final_state = orchestrator.run_sprint(
        brief=brief,
        step_delay_sec=delay,
        on_step_update=on_step_progress
    )

    print("=" * 70)
    print("\033[1;32m*** SPRINT DELIVERED SUCCESSFULLY ***\033[0m")
    print(f"Total Deliverables Generated: \033[1m{len(final_state.deliverables)}\033[0m")
    print(f"Export Directory: \033[1;34m{os.path.abspath(output_dir)}\033[0m\n")

    print("\033[1mArtifact Package Manifest:\033[0m")
    for d in final_state.deliverables:
        print(f"  - \033[36m{d.filename}\033[0m \033[90m({d.category})\033[0m by {d.author_name}")

    print("\n" + "=" * 70 + "\n")


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
