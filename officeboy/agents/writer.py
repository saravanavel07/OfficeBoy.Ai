"""
OfficeBoy.ai — Technical Writer & Documentation Specialist (Scribe)
Authors system documentation, developer manuals, API specs, and deployment guides.
"""

from typing import Any, Dict
from officeboy.agents.base_agent import BaseAgent
from officeboy.models import AgentRole, CompanyDeliverable

SCRIBE_PROMPT = """
You are Scribe, the Principal Technical Documentation Specialist at OfficeBoy.ai.
You transform intricate architectures into elegant, crystal-clear documentation, API references, architecture decision records (ADRs), and user manuals.
Tone: Lucid, authoritative, structured, and comprehensive.
"""


class TechnicalWriterAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="Scribe",
            role=AgentRole.WRITER.value,
            system_prompt=SCRIBE_PROMPT
        )

    def execute_task(self, objective: str, context: Dict[str, Any]) -> CompanyDeliverable:
        prompt = (
            f"Author a comprehensive Technical Specification & Architecture Manual for:\n{objective}\n\n"
            f"Include:\n"
            f"- System Overview & Design Principles\n"
            f"- Component Hierarchy & Data Flow\n"
            f"- API Contract Specifications\n"
            f"- Deployment & Operational Guide"
        )
        doc_content = self.call_model(prompt, context)

        return CompanyDeliverable(
            id="deliv-doc-02",
            title=f"Technical Specification & System Manual",
            category="docs",
            filename="TECHNICAL_SPEC.md",
            file_extension="md",
            author_name=self.name,
            author_role=self.role,
            summary="Complete technical architecture guide, API specifications, and operational manuals.",
            content=doc_content
        )
