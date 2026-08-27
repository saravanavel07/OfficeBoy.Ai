"""
OfficeBoy.ai — Managing Director Agent (Aegis)
Coordinates the autonomous company sprint, synthesizes client briefs into workflow steps,
and conducts final executive sign-off.
"""

from typing import Any, Dict, List
from officeboy.agents.base_agent import BaseAgent
from officeboy.models import WorkflowStep, AgentRole, TaskStatus

AEGIS_PROMPT = """
You are Aegis, the Managing Director of OfficeBoy.ai.
Your responsibility is executive leadership, architectural governance, sprint orchestration, and client delivery excellence.
When given a client brief, you decompose it into logical sequential milestones, assign them to specialist agents (Developer, Writer, Designer, Marketer, Reviewer), and ensure zero hallucinations.
Tone: Executive, decisive, precise, and articulate.
"""


class ManagingDirectorAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="Aegis",
            role=AgentRole.MANAGER.value,
            system_prompt=AEGIS_PROMPT
        )

    def formulate_sprint_plan(self, brief_title: str, problem_statement: str) -> List[WorkflowStep]:
        """
        Deconstructs project brief into a 5-stage sequential workflow.
        """
        steps = [
            WorkflowStep(
                id="step-1",
                step_number=1,
                title="System Architecture & Backend Core",
                assigned_role=AgentRole.DEVELOPER,
                assigned_name="Cipher",
                objective=f"Design schema, data pipelines, and core algorithms for: {brief_title}",
                estimated_duration_sec=3
            ),
            WorkflowStep(
                id="step-2",
                step_number=2,
                title="Technical Specification & API Reference",
                assigned_role=AgentRole.WRITER,
                assigned_name="Scribe",
                objective=f"Author system blueprint, endpoint schemas, and setup documentation for: {brief_title}",
                estimated_duration_sec=3
            ),
            WorkflowStep(
                id="step-3",
                step_number=3,
                title="UI/UX Wireframes & Component Specs",
                assigned_role=AgentRole.DESIGNER,
                assigned_name="Iris",
                objective=f"Define visual design token system, responsive layouts, and user journeys for: {brief_title}",
                estimated_duration_sec=3
            ),
            WorkflowStep(
                id="step-4",
                step_number=4,
                title="Go-To-Market & Launch Strategy",
                assigned_role=AgentRole.MARKETER,
                assigned_name="Pulse",
                objective=f"Formulate positioning, ICP definition, and multi-channel launch campaign for: {brief_title}",
                estimated_duration_sec=3
            ),
            WorkflowStep(
                id="step-5",
                step_number=5,
                title="QA Audit, Security & Verification",
                assigned_role=AgentRole.REVIEWER,
                assigned_name="Sentinel",
                objective=f"Conduct vulnerability scan, code audit, and release readiness verification for: {brief_title}",
                estimated_duration_sec=3
            )
        ]
        return steps

    def generate_executive_brief(self, brief_title: str, client_name: str, deliverables_summary: str) -> str:
        prompt = (
            f"Generate an Executive Brief and Final Sign-Off for client '{client_name}' on project '{brief_title}'.\n"
            f"Deliverables completed by specialist team:\n{deliverables_summary}\n\n"
            f"Provide: Executive Summary, Key Milestones Achieved, Value Impact, and Final Sign-Off."
        )
        return self.call_model(prompt)
