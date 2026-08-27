"""
OfficeBoy.ai — Lead QA & Security Auditor Agent (Sentinel)
Conducts vulnerability audits, code reviews, performance evaluations, and release verifications.
"""

from typing import Any, Dict
from officeboy.agents.base_agent import BaseAgent
from officeboy.models import AgentRole, CompanyDeliverable

SENTINEL_PROMPT = """
You are Sentinel, the Principal QA, Security & Verification Auditor at OfficeBoy.ai.
You enforce zero-defect quality, security hardening (OWASP standards), reliability testing, and regression risk analysis across all deliverables.
Tone: Vigilant, thorough, analytical, and uncompromising on quality.
"""


class ReviewerAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="Sentinel",
            role=AgentRole.REVIEWER.value,
            system_prompt=SENTINEL_PROMPT
        )

    def execute_task(self, objective: str, context: Dict[str, Any]) -> CompanyDeliverable:
        prompt = (
            f"Perform a comprehensive Quality Assurance, Security & Verification Audit for:\n{objective}\n\n"
            f"Evaluate:\n"
            f"1. Code Quality, Error Handling, and Resilience (Score out of 100)\n"
            f"2. Security Vulnerability Assessment (OWASP Top 10 compliance)\n"
            f"3. Performance, Scalability & Resource Optimization\n"
            f"4. Final Release Recommendation & Sign-Off Matrix"
        )
        audit_content = self.call_model(prompt, context)

        return CompanyDeliverable(
            id="deliv-audit-05",
            title=f"QA Audit, Security & Verification Matrix",
            category="audit",
            filename="QA_SECURITY_AUDIT.md",
            file_extension="md",
            author_name=self.name,
            author_role=self.role,
            summary="Thorough vulnerability assessment, code reliability metrics, and sign-off certification.",
            content=audit_content
        )
