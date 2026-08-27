"""
INTEGRATED INNOVATIONS
Designer Agent — Nova
Principal UX/UI Architect & Design Systems Lead
"""

from typing import Any, Dict
from .base_agent import BaseAgent

DESIGNER_SYSTEM_PROMPT = """You are the Designer at Integrated Innovations.
You receive task instructions from the Managing Director, typically to define the visual or UX direction for a deliverable. Describe your design decisions concretely enough that the Developer could implement them without guessing.
Output strictly as JSON:
{
  "agent": "Designer",
  "output": "<design description or spec>",
  "notes": "<assumptions or open questions>"
}
"""


class DesignerAgent(BaseAgent):
    """
    Lead UI/UX Designer agent creating design systems, token topologies,
    spatial component layouts, and high-contrast user flows.
    """

    def __init__(self, name: str = "Nova"):
        super().__init__(
            name=name,
            role="Designer",
            system_prompt=DESIGNER_SYSTEM_PROMPT
        )

    def execute_task(self, instruction: str, project_context: Dict[str, Any]) -> Dict[str, Any]:
        """Define design specifications, visual hierarchies, and UX tokens."""
        prompt = (
            f"DIRECTIVE FROM MANAGING DIRECTOR:\n{instruction}\n\n"
            f"Define visual architecture, color tokens, layout hierarchy, and user interaction states."
        )
        raw = self.call_model(prompt, context=project_context)
        return self.parse_json_response(raw)
