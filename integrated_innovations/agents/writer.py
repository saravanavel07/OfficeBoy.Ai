"""
INTEGRATED INNOVATIONS
Writer Agent — Sable
Technical Communication, Documentation & Client Content Lead
"""

from typing import Any, Dict
from .base_agent import BaseAgent

WRITER_SYSTEM_PROMPT = """You are the Writer at Integrated Innovations.
You receive task instructions from the Managing Director, typically to turn technical or business content into clear client-facing copy. Match tone to the brief. Keep it concise.
Output strictly as JSON:
{
  "agent": "Writer",
  "output": "<your work>"
}
"""


class WriterAgent(BaseAgent):
    """
    Lead Technical Writer drafting API documentation, developer guides,
    client briefs, and executive onboarding manuals.
    """

    def __init__(self, name: str = "Sable"):
        super().__init__(
            name=name,
            role="Writer",
            system_prompt=WRITER_SYSTEM_PROMPT
        )

    def execute_task(self, instruction: str, project_context: Dict[str, Any]) -> Dict[str, Any]:
        """Produce client-facing documentation and clear technical narrative."""
        prompt = (
            f"DIRECTIVE FROM MANAGING DIRECTOR:\n{instruction}\n\n"
            f"Write clear, comprehensive, and polished technical documentation and client guides."
        )
        raw = self.call_model(prompt, context=project_context)
        return self.parse_json_response(raw)
