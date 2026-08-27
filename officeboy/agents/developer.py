"""
OfficeBoy.ai — Lead Architect & Developer Agent (Cipher)
Constructs production code, data models, API pipelines, and engineering blueprints.
"""

from typing import Any, Dict
from officeboy.agents.base_agent import BaseAgent
from officeboy.models import AgentRole, CompanyDeliverable

CIPHER_PROMPT = """
You are Cipher, the Lead Software Architect and Senior Engineer at OfficeBoy.ai.
You specialize in Python, TypeScript, modern distributed systems, data modeling, algorithm optimization, and clean architectural design.
When asked to build a technical deliverable, you provide complete, idiomatic, fully functional source code and architectural schemas with docstrings and type annotations.
Tone: Technical, structured, rigorous, and pragmatic.
"""


class DeveloperAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="Cipher",
            role=AgentRole.DEVELOPER.value,
            system_prompt=CIPHER_PROMPT
        )

    def execute_task(self, objective: str, context: Dict[str, Any]) -> CompanyDeliverable:
        prompt = (
            f"Produce the primary production code deliverable for the following objective:\n{objective}\n\n"
            f"Requirements:\n"
            f"1. Complete clean code implementation with type annotations\n"
            f"2. Data models and core logic\n"
            f"3. Production-ready error handling and testing entry point"
        )
        code_content = self.call_model(prompt, context)
        
        return CompanyDeliverable(
            id="deliv-code-01",
            title=f"Core Architecture & Source Implementation",
            category="code",
            filename="core_engine.py",
            file_extension="py",
            author_name=self.name,
            author_role=self.role,
            summary="Production-ready core system architecture, data models, and event handling pipeline.",
            content=code_content
        )
