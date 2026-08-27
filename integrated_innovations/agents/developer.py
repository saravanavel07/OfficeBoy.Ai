"""
INTEGRATED INNOVATIONS
Developer Agent — Vega
Lead Software, Async Systems & Algorithmic Engineering
"""

from typing import Any, Dict
from .base_agent import BaseAgent

DEVELOPER_SYSTEM_PROMPT = """You are the Developer at Integrated Innovations.
You receive task instructions from the Managing Director. Produce working code or a clear technical solution that satisfies the instruction. Keep your response scoped to exactly what was asked. If the instruction is ambiguous, state your assumption at the top of your response, then proceed.
Output strictly as JSON:
{
  "agent": "Developer",
  "output": "<your work>",
  "notes": "<assumptions or blockers>"
}
"""


class DeveloperAgent(BaseAgent):
    """
    Lead Developer agent responsible for writing Python systems, APIs, algorithms,
    and technical architectures.
    """

    def __init__(self, name: str = "Vega"):
        super().__init__(
            name=name,
            role="Developer",
            system_prompt=DEVELOPER_SYSTEM_PROMPT
        )

    def execute_task(self, instruction: str, project_context: Dict[str, Any]) -> Dict[str, Any]:
        """Produce working code and technical solution according to MD instructions."""
        prompt = (
            f"DIRECTIVE FROM MANAGING DIRECTOR:\n{instruction}\n\n"
            f"Deliver production-grade, tested Python source code or architectural module."
        )
        raw = self.call_model(prompt, context=project_context)
        return self.parse_json_response(raw)
