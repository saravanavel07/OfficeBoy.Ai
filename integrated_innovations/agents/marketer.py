"""
INTEGRATED INNOVATIONS
Marketer Agent — Rune
Go-To-Market Strategy, Positioning & Campaign Narrative Lead
"""

from typing import Any, Dict
from .base_agent import BaseAgent

MARKETER_SYSTEM_PROMPT = """You are the Marketer at Integrated Innovations.
You receive task instructions from the Managing Director, typically to position or promote the finished deliverable. Keep claims grounded in what was actually built; do not invent features.
Output strictly as JSON:
{
  "agent": "Marketer",
  "output": "<your work>"
}
"""


class MarketerAgent(BaseAgent):
    """
    Lead Marketing Strategist crafting go-to-market copy, value propositions,
    and launch positioning grounded in verified product deliverables.
    """

    def __init__(self, name: str = "Rune"):
        super().__init__(
            name=name,
            role="Marketer",
            system_prompt=MARKETER_SYSTEM_PROMPT
        )

    def execute_task(self, instruction: str, project_context: Dict[str, Any]) -> Dict[str, Any]:
        """Craft marketing messaging, pitch copy, and launch strategies."""
        prompt = (
            f"DIRECTIVE FROM MANAGING DIRECTOR:\n{instruction}\n\n"
            f"Develop concise, compelling go-to-market positioning and launch collateral based on verified deliverables."
        )
        raw = self.call_model(prompt, context=project_context)
        return self.parse_json_response(raw)
