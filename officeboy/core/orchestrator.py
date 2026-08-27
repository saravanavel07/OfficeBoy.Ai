"""
OfficeBoy.ai — Master Multi-Agent Sprint Orchestrator
Coordinates autonomous collaboration among 1 Managing Director and 5 Specialists.
"""

import os
import time
import logging
from datetime import datetime
from typing import Any, Callable, Dict, List, Optional

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
    """
    Coordinates the autonomous execution loop of OfficeBoy.ai.
    """

    def __init__(self, output_dir: str = "output_deliverables"):
        self.output_dir = output_dir
        self.log = CompanyLog()
        self.state = SprintState()

        # Initialize the 6 core autonomous agents
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

    def initialize_brief(
        self,
        problem_statement: str,
        title: Optional[str] = None,
        client_name: str = "Aegis Global Partners",
        budget: str = "$45,000",
        deadline: str = "14 Calendar Days"
    ) -> ProjectBrief:
        """
        Creates a structured project brief and generates the 5-stage sprint workflow.
        """
        inferred_title = title or " ".join(problem_statement.split()[:6]).title()
        
        brief = ProjectBrief(
            id=f"brief-{int(time.time())}",
            title=inferred_title,
            client_name=client_name,
            budget=budget,
            deadline=deadline,
            problem_statement=problem_statement,
            target_audience="Enterprise Engineering & Operations Teams",
            key_deliverables=[
                "Production Architecture & Code",
                "Technical Specification Manual",
                "UI/UX Design System Spec",
                "Go-To-Market & Growth Strategy",
                "QA, Security & Audit Matrix",
                "Executive Summary & Sign-off"
            ],
            tech_stack=["Python 3.10+", "FastAPI/Flask", "TailwindCSS", "SQLite/PostgreSQL"]
        )

        # Managing Director breaks down the brief into sequential steps
        brief.workflow_steps = self.manager.formulate_sprint_plan(
            brief_title=brief.title,
            problem_statement=brief.problem_statement
        )

        self.state.current_brief = brief
        self.state.current_step_index = 0
        self.state.progress_percentage = 0.0
        self.state.deliverables = []
        self.state.shared_memory = {
            "title": brief.title,
            "client_name": brief.client_name,
            "problem_statement": brief.problem_statement,
            "started_at": datetime.utcnow().isoformat(),
        }

        return brief

    def run_sprint(
        self,
        brief: Optional[ProjectBrief] = None,
        step_delay_sec: float = 0.8,
        on_step_update: Optional[Callable[[int, WorkflowStep], None]] = None
    ) -> SprintState:
        """
        Executes the entire autonomous sprint across all 5 workflow milestones,
        followed by Managing Director executive sign-off.
        """
        if brief:
            self.state.current_brief = brief
        elif not self.state.current_brief:
            self.initialize_brief("Autonomous AI Office Assistant Production Deployment")

        active_brief = self.state.current_brief
        self.state.is_running = True
        self.state.started_at = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")

        # Broadcast Kick-off
        self.log.broadcast(
            sender_name=self.manager.name,
            sender_role=self.manager.role,
            content=(
                f"Sponsor brief received for '{active_brief.title}'. "
                f"Dispatching 5-stage sprint to specialist roster. Objective: Zero defect execution."
            ),
            message_type="broadcast"
        )

        total_steps = len(active_brief.workflow_steps)

        for idx, step in enumerate(active_brief.workflow_steps):
            self.state.current_step_index = idx
            self.state.active_agent = step.assigned_name
            self.state.progress_percentage = round((idx / (total_steps + 1)) * 100, 1)

            step.status = TaskStatus.IN_PROGRESS
            step.started_at = datetime.utcnow().strftime("%H:%M:%S")

            if on_step_update:
                on_step_update(idx, step)

            # Announce task start
            self.log.broadcast(
                sender_name=step.assigned_name,
                sender_role=step.assigned_role.value,
                content=f"Commencing milestone {step.step_number}: '{step.title}'. Objective: {step.objective}",
                message_type="broadcast"
            )

            # Simulated pacing for realism/readability if running in CLI or Web
            if step_delay_sec > 0:
                time.sleep(step_delay_sec)

            # Execute task with the designated agent
            agent = self._agent_map.get(step.assigned_role)
            if agent:
                deliverable = agent.execute_task(step.objective, self.state.shared_memory)
                self.state.deliverables.append(deliverable)
                self.state.shared_memory[step.assigned_role.value] = deliverable.summary

                step.status = TaskStatus.COMPLETED
                step.completed_at = datetime.utcnow().strftime("%H:%M:%S")
                step.output = deliverable.summary

                self.log.broadcast(
                    sender_name=step.assigned_name,
                    sender_role=step.assigned_role.value,
                    content=(
                        f"Milestone {step.step_number} completed. Generated deliverable: '{deliverable.filename}'. "
                        f"Summary: {deliverable.summary}"
                    ),
                    message_type="deliverable",
                    metadata={"filename": deliverable.filename, "category": deliverable.category}
                )

            if on_step_update:
                on_step_update(idx, step)

        # Final Executive Sign-off by Aegis
        self.state.current_step_index = total_steps
        self.state.active_agent = self.manager.name
        self.state.progress_percentage = 100.0

        deliverables_summary = "\n".join(
            [f"- {d.title} ({d.filename}) by {d.author_name}" for d in self.state.deliverables]
        )

        executive_brief_content = self.manager.generate_executive_brief(
            brief_title=active_brief.title,
            client_name=active_brief.client_name,
            deliverables_summary=deliverables_summary
        )

        exec_deliverable = CompanyDeliverable(
            id="deliv-exec-final",
            title="Executive Sign-Off & Delivery Package",
            category="executive_brief",
            filename="EXECUTIVE_BRIEF.md",
            file_extension="md",
            author_name=self.manager.name,
            author_role=self.manager.role,
            summary="Final executive delivery synthesis and sign-off certification.",
            content=executive_brief_content
        )
        self.state.deliverables.append(exec_deliverable)

        self.log.broadcast(
            sender_name=self.manager.name,
            sender_role=self.manager.role,
            content=(
                f"All 5 sprint milestones verified. Final Executive Sign-Off package formulated for {active_brief.client_name}. "
                f"Sprint status: DELIVERED."
            ),
            message_type="alert"
        )

        self.state.is_running = False
        self.state.completed_at = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")

        # Write output files to disk
        self.save_deliverables_to_disk()

        return self.state

    def save_deliverables_to_disk(self) -> List[str]:
        """
        Saves all generated deliverables into the output directory.
        """
        os.makedirs(self.output_dir, exist_ok=True)
        saved_paths = []

        for deliv in self.state.deliverables:
            filepath = os.path.join(self.output_dir, deliv.filename)
            try:
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(deliv.content)
                saved_paths.append(filepath)
                logger.info(f"Saved deliverable to {filepath}")
            except Exception as e:
                logger.error(f"Error saving {filepath}: {e}")

        return saved_paths
