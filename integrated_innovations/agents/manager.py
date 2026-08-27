"""
INTEGRATED INNOVATIONS
Managing Director (MD) Agent — Aegis
Strategic Orchestration, Task Decomposition, Quality Assurance & Compilation
"""

from typing import Any, Dict, List, Optional
from .base_agent import BaseAgent

MD_SYSTEM_PROMPT = """You are the Managing Director of Integrated Innovations, an AI-staffed company.

You receive a client project brief. Your job:
1. Read the brief and identify the concrete subtasks needed to deliver it, drawing from your five specialists: Developer, Designer, Reviewer, Writer, Marketer. Not every project needs all five — assign only what the brief actually calls for.
2. Assign each subtask to the correct specialist agent.
3. Write each assignment as a short, specific instruction the specialist can act on directly, including relevant context from the brief.
4. After each specialist reports back, review their output for whether it satisfies the assignment. If not, send it back with specific feedback (max 1 revision round per agent).
5. Once all subtasks are complete, compile the final deliverable and write a short company log summarizing who did what.

Output strictly as JSON:
{
  "step": "assign" | "review" | "compile",
  "target_agent": "<agent name or null>",
  "instruction_or_feedback": "<text>",
  "final_deliverable": "<text, only when step is 'compile'>"
}
"""


class ManagingDirector(BaseAgent):
    """
    Managing Director agent coordinating project planning, specialist assignments,
    review verifications, and master synthesis.
    """

    def __init__(self, name: str = "Aegis"):
        super().__init__(
            name=name,
            role="MD",
            system_prompt=MD_SYSTEM_PROMPT
        )

    def plan_project(self, client_brief: str) -> Dict[str, Any]:
        """Decompose the client project brief into an initial plan."""
        prompt = (
            f"A new client project has arrived at Integrated Innovations:\n\n"
            f"CLIENT BRIEF:\n{client_brief}\n\n"
            f"Analyze requirements and assign the first specialist subtask."
        )
        raw = self.call_model(prompt)
        return self.parse_json_response(raw)

    def review_specialist_output(
        self,
        specialist_role: str,
        original_instruction: str,
        output_payload: Any,
        revision_count: int = 0
    ) -> Dict[str, Any]:
        """Review an output submitted by a specialist agent."""
        prompt = (
            f"Reviewing completed output from specialist '{specialist_role}'.\n"
            f"ORIGINAL INSTRUCTION: {original_instruction}\n"
            f"SPECIALIST OUTPUT:\n{output_payload}\n"
            f"REVISION ROUND: {revision_count}/1\n\n"
            f"Determine if approved or if revisions are required, then proceed to the next assignment or compilation."
        )
        raw = self.call_model(prompt)
        return self.parse_json_response(raw)

    def compile_final_package(
        self,
        client_brief: str,
        deliverables: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Compile the master executive deliverable package once all specialist tasks pass QA."""
        prompt = (
            f"All specialist tasks are complete and verified.\n"
            f"CLIENT BRIEF: {client_brief}\n"
            f"COLLECTED DELIVERABLES:\n{deliverables}\n\n"
            f"Compile the comprehensive master deliverable with executive summary and complete specifications."
        )
        raw = self.call_model(prompt)
        return self.parse_json_response(raw)
