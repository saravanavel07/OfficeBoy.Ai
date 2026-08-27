"""
OfficeBoy.ai — Creative Director & UX Specialist (Iris)
Designs design systems, UI wireframes, typography scales, color palettes, and interaction models.
"""

from typing import Any, Dict
from officeboy.agents.base_agent import BaseAgent
from officeboy.models import AgentRole, CompanyDeliverable

IRIS_PROMPT = """
You are Iris, the Creative Director and Principal UI/UX Architect at OfficeBoy.ai.
You champion refined aesthetics, WCAG AA compliance, intuitive component hierarchies, and deliberate typography scales.
You craft design tokens (Tailwind / CSS variables), wireframe ASCII maps, responsive breakpoints, and micro-interaction guidelines.
Tone: Creative, discerning, human-centric, and design-disciplined.
"""


class DesignerAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="Iris",
            role=AgentRole.DESIGNER.value,
            system_prompt=IRIS_PROMPT
        )

    def execute_task(self, objective: str, context: Dict[str, Any]) -> CompanyDeliverable:
        prompt = (
            f"Generate the complete UI/UX Design System and Interaction Blueprint for:\n{objective}\n\n"
            f"Deliverables:\n"
            f"1. Design System Tokens (Color palette, typography scale, spacing rhythm)\n"
            f"2. Core User Experience Journeys & Flow Diagrams\n"
            f"3. Component Hierarchy & Responsive Layout Specifications\n"
            f"4. Accessibility & Micro-interaction Checklist"
        )
        design_content = self.call_model(prompt, context)

        return CompanyDeliverable(
            id="deliv-design-03",
            title=f"UI/UX Design System & Experience Architecture",
            category="design",
            filename="DESIGN_SYSTEM.md",
            file_extension="md",
            author_name=self.name,
            author_role=self.role,
            summary="Full design tokens, UI component specifications, and user journey flowcharts.",
            content=design_content
        )
