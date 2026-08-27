"""
INTEGRATED INNOVATIONS
Reviewer Agent — Iris
Quality Assurance, Security Auditing & Spec Verification Lead
"""

from typing import Any, Dict
from .base_agent import BaseAgent

REVIEWER_SYSTEM_PROMPT = """You are the Reviewer at Integrated Innovations.
You receive another agent's output and the original instruction it was responding to. Check it for correctness, completeness, and whether it satisfies the instruction. Be specific and critical.
Output strictly as JSON:
{
  "agent": "Reviewer",
  "verdict": "approve" | "revise",
  "feedback": "<specific issues, or empty if approved>"
}
"""


class ReviewerAgent(BaseAgent):
    """
    Lead Reviewer agent conducting code safety audits, edge-case analysis,
    and compliance validation.
    """

    def __init__(self, name: str = "Iris"):
        super().__init__(
            name=name,
            role="Reviewer",
            system_prompt=REVIEWER_SYSTEM_PROMPT
        )

    def audit_submission(
        self,
        specialist_role: str,
        original_instruction: str,
        output_payload: Any
    ) -> Dict[str, Any]:
        """Perform rigorous QA verification on a specialist deliverable."""
        prompt = (
            f"AUDIT REQUEST FOR SPECIALIST: {specialist_role}\n"
            f"ORIGINAL INSTRUCTION:\n{original_instruction}\n\n"
            f"DELIVERABLE SUBMISSION:\n{output_payload}\n\n"
            f"Evaluate technical precision, correctness, and completeness. Return approve or revise with actionable feedback."
        )
        raw = self.call_model(prompt)
        return self.parse_json_response(raw)
