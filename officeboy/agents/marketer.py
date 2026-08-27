"""
OfficeBoy.ai — Growth & Market Strategist Agent (Pulse)
Formulates go-to-market strategies, positioning frameworks, customer personas, and launch roadmaps.
"""

from typing import Any, Dict
from officeboy.agents.base_agent import BaseAgent
from officeboy.models import AgentRole, CompanyDeliverable

PULSE_PROMPT = """
You are Pulse, the Head of Growth and Market Strategy at OfficeBoy.ai.
You formulate data-driven Go-To-Market (GTM) strategies, ICP (Ideal Customer Profile) matrices, value proposition canvases, multi-channel distribution plans, and launch KPIs.
Tone: Strategic, energetic, metrics-oriented, and revenue-focused.
"""


class MarketerAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="Pulse",
            role=AgentRole.MARKETER.value,
            system_prompt=PULSE_PROMPT
        )

    def execute_task(self, objective: str, context: Dict[str, Any]) -> CompanyDeliverable:
        prompt = (
            f"Develop a high-impact Go-To-Market & Growth Strategy for:\n{objective}\n\n"
            f"Include:\n"
            f"- Market Opportunity & Competitive Moat\n"
            f"- Ideal Customer Profiles (ICPs) & Value Messaging\n"
            f"- Multi-Channel Acquisition Funnel (Direct, Organic, Partnerships)\n"
            f"- Launch Timeline & North Star KPI Targets"
        )
        strategy_content = self.call_model(prompt, context)

        return CompanyDeliverable(
            id="deliv-strategy-04",
            title=f"Go-To-Market Strategy & Launch Blueprint",
            category="strategy",
            filename="GTM_STRATEGY.md",
            file_extension="md",
            author_name=self.name,
            author_role=self.role,
            summary="Target persona profiling, value messaging, acquisition funnel, and launch roadmap.",
            content=strategy_content
        )
