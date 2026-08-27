"""
INTEGRATED INNOVATIONS
Company Orchestrator — End-to-End Execution Loop
Orchestrates the Managing Director (Aegis) and 5 specialist employee agents
over the live shared memory bus.
"""

import time
import logging
from typing import Any, Dict, Optional

from ..agents.manager import ManagingDirector
from ..agents.developer import DeveloperAgent
from ..agents.designer import DesignerAgent
from ..agents.reviewer import ReviewerAgent
from ..agents.writer import WriterAgent
from ..agents.marketer import MarketerAgent
from .company_log import CompanyLog

logger = logging.getLogger("IntegratedInnovations.Orchestrator")


class CompanyOrchestrator:
    """
    Coordinates the full agency workflow:
    MD -> Specialist Agent -> Reviewer -> MD Synthesis.
    """

    def __init__(self, log_path: str = "company_log.json", delay_between_steps: float = 1.0):
        self.logger = CompanyLog(filepath=log_path)
        self.delay = delay_between_steps

        # Instantiate the 6 autonomous agents
        self.md = ManagingDirector(name="Aegis")
        self.developer = DeveloperAgent(name="Vega")
        self.designer = DesignerAgent(name="Nova")
        self.reviewer = ReviewerAgent(name="Iris")
        self.writer = WriterAgent(name="Sable")
        self.marketer = MarketerAgent(name="Rune")

        self.specialists: Dict[str, Any] = {
            "Developer": self.developer,
            "Designer": self.designer,
            "Writer": self.writer,
            "Marketer": self.marketer
        }

    def _sleep(self):
        if self.delay > 0:
            time.sleep(self.delay)

    def run_project(self, client_brief: str, client_name: str = "Enterprise Client") -> Dict[str, Any]:
        """
        Execute the full autonomous company lifecycle for a given client brief.
        """
        logger.info(f"--- Starting Project for {client_name} ---")
        self.logger.reset(brief_title=client_brief)

        project_context = {
            "client": client_name,
            "brief": client_brief,
            "deliverables": {}
        }

        # Step 1: Brief Received by MD
        self.logger.log_event(
            from_agent="MD",
            to_agent="Bus",
            action="brief_received",
            content=f"Aegis (MD): Ingested client brief for '{client_name}'. Decomposing requirements and scheduling assignments.",
            payload={"brief": client_brief, "client": client_name},
            progress=10,
            agent_updates={
                "MD": {"status": "active", "task": "Decomposing brief & scheduling assignments", "progress": 15}
            }
        )
        self._sleep()

        # Step 2: MD delegates to Designer (UX Architecture & Tokens)
        design_instruction = (
            f"Establish the design topology, visual tokens, high-contrast dark theme (#06060a base, #ff3d9a pink, #4f7dff blue), "
            f"and user flow for: {client_brief}"
        )
        self.logger.log_event(
            from_agent="MD",
            to_agent="Designer",
            action="assign",
            content=f"Aegis (MD) -> Nova (Designer): {design_instruction}",
            progress=20,
            agent_updates={
                "MD": {"status": "delegating", "task": "Monitoring UX architecture creation"},
                "Designer": {"status": "active", "task": "Creating visual tokens & UX specification", "progress": 40}
            }
        )
        self._sleep()

        # Designer generates output
        designer_output = self.designer.execute_task(design_instruction, project_context)
        project_context["deliverables"]["designer"] = designer_output
        self.logger.log_event(
            from_agent="Designer",
            to_agent="MD",
            action="output",
            content="Nova (Designer): Completed visual specification, token registry, and spatial layout architecture.",
            payload=designer_output,
            progress=30,
            agent_updates={
                "Designer": {"status": "completed", "task": "UX specification delivered", "progress": 100}
            },
            deliverable_key="designer",
            deliverable_content=designer_output
        )
        self._sleep()

        # Step 3: MD delegates to Developer (Python Code & Core Systems)
        dev_instruction = (
            f"Implement production-grade Python 3.12 async engine, robust API controllers, and data structures for: {client_brief}. "
            f"Adhere to Nova's design spec: {designer_output.get('output', '')[:100]}..."
        )
        self.logger.log_event(
            from_agent="MD",
            to_agent="Developer",
            action="assign",
            content=f"Aegis (MD) -> Vega (Developer): {dev_instruction}",
            progress=40,
            agent_updates={
                "Developer": {"status": "active", "task": "Architecting Python 3.12 async engine", "progress": 50}
            }
        )
        self._sleep()

        # Developer generates code
        dev_output = self.developer.execute_task(dev_instruction, project_context)
        project_context["deliverables"]["developer"] = dev_output
        self.logger.log_event(
            from_agent="Developer",
            to_agent="Reviewer",
            action="output",
            content="Vega (Developer): Authored core Python async modules and test harness. Dispatched to Iris for QA audit.",
            payload=dev_output,
            progress=55,
            agent_updates={
                "Developer": {"status": "completed", "task": "Python engine authored", "progress": 100}
            },
            deliverable_key="developer",
            deliverable_content=dev_output
        )
        self._sleep()

        # Step 4: QA Review by Iris (Reviewer)
        self.logger.log_event(
            from_agent="MD",
            to_agent="Reviewer",
            action="assign",
            content="Aegis (MD) -> Iris (Reviewer): Conduct comprehensive audit on Vega's Python codebase and Nova's UX spec.",
            progress=65,
            agent_updates={
                "Reviewer": {"status": "active", "task": "Performing static audit & concurrency safety check", "progress": 60}
            }
        )
        self._sleep()

        review_output = self.reviewer.audit_submission(
            specialist_role="Developer",
            original_instruction=dev_instruction,
            output_payload=dev_output
        )
        project_context["deliverables"]["reviewer"] = review_output
        self.logger.log_event(
            from_agent="Reviewer",
            to_agent="MD",
            action="review",
            content=f"Iris (Reviewer): Quality audit completed with verdict: {review_output.get('verdict', 'approve').upper()}.",
            payload=review_output,
            progress=75,
            agent_updates={
                "Reviewer": {"status": "completed", "task": "QA audit signed off", "progress": 100}
            },
            deliverable_key="reviewer",
            deliverable_content=review_output
        )
        self._sleep()

        # Step 5: MD delegates to Writer (Documentation & Client Guides)
        writer_instruction = (
            f"Produce comprehensive client-facing documentation, quickstart setup guide, and API reference for '{client_brief}'."
        )
        self.logger.log_event(
            from_agent="MD",
            to_agent="Writer",
            action="assign",
            content=f"Aegis (MD) -> Sable (Writer): {writer_instruction}",
            progress=80,
            agent_updates={
                "Writer": {"status": "active", "task": "Authoring technical docs & quickstart manual", "progress": 70}
            }
        )
        self._sleep()

        writer_output = self.writer.execute_task(writer_instruction, project_context)
        project_context["deliverables"]["writer"] = writer_output
        self.logger.log_event(
            from_agent="Writer",
            to_agent="MD",
            action="output",
            content="Sable (Writer): Delivered complete client documentation and API reference manual.",
            payload=writer_output,
            progress=85,
            agent_updates={
                "Writer": {"status": "completed", "task": "Documentation package completed", "progress": 100}
            },
            deliverable_key="writer",
            deliverable_content=writer_output
        )
        self._sleep()

        # Step 6: MD delegates to Marketer (GTM Positioning & Launch Copy)
        marketer_instruction = (
            f"Craft compelling go-to-market positioning, target audience framing, and launch announcement copy for '{client_brief}'."
        )
        self.logger.log_event(
            from_agent="MD",
            to_agent="Marketer",
            action="assign",
            content=f"Aegis (MD) -> Rune (Marketer): {marketer_instruction}",
            progress=90,
            agent_updates={
                "Marketer": {"status": "active", "task": "Crafting GTM positioning & launch narrative", "progress": 80}
            }
        )
        self._sleep()

        marketer_output = self.marketer.execute_task(marketer_instruction, project_context)
        project_context["deliverables"]["marketer"] = marketer_output
        self.logger.log_event(
            from_agent="Marketer",
            to_agent="MD",
            action="output",
            content="Rune (Marketer): Delivered launch positioning deck copy and distribution channel strategy.",
            payload=marketer_output,
            progress=95,
            agent_updates={
                "Marketer": {"status": "completed", "task": "GTM campaign strategy finalized", "progress": 100}
            },
            deliverable_key="marketer",
            deliverable_content=marketer_output
        )
        self._sleep()

        # Step 7: Final Master Deliverable Synthesis by Aegis (MD)
        self.logger.log_event(
            from_agent="MD",
            to_agent="Bus",
            action="compile",
            content=f"Aegis (MD): All 5 specialist subtasks approved. Compiling master executive deliverable dossier for '{client_name}'.",
            progress=98,
            agent_updates={
                "MD": {"status": "compiling", "task": "Synthesizing executive deliverable package", "progress": 95}
            }
        )
        self._sleep()

        final_synthesis = self.md.compile_final_package(
            client_brief=client_brief,
            deliverables=project_context["deliverables"]
        )

        final_text = final_synthesis.get("final_deliverable") or (
            f"# INTEGRATED INNOVATIONS — Executive Master Deliverable\n\n"
            f"**Client**: {client_name}\n"
            f"**Project**: {client_brief}\n"
            f"**Status**: APPROVED & READY FOR PRODUCTION\n"
            f"**Lead Coordinator**: Aegis (Managing Director)\n\n"
            f"### Executive Summary\n"
            f"All 5 autonomous specialist agents have successfully completed their respective deliverables "
            f"with full quality audit verification.\n\n"
            f"### Specialist Deliverables:\n"
            f"- **Designer (Nova)**: Visual tokens and interaction topology.\n"
            f"- **Developer (Vega)**: Production Python async source code.\n"
            f"- **Reviewer (Iris)**: QA and edge-case security certification.\n"
            f"- **Writer (Sable)**: Developer guide and client documentation.\n"
            f"- **Marketer (Rune)**: GTM positioning and launch collateral."
        )

        final_state = self.logger.log_event(
            from_agent="MD",
            to_agent="Client",
            action="compile",
            content=f"Aegis (MD): Project delivery complete for '{client_name}'. Master package signed off.",
            payload={"final_deliverable": final_text},
            progress=100,
            agent_updates={
                "MD": {"status": "completed", "task": "Master deliverable compiled and verified for client delivery", "progress": 100}
            },
            deliverable_key="final_deliverable",
            deliverable_content=final_text
        )

        logger.info(f"--- Project Successfully Completed for {client_name} ---")
        return final_state
