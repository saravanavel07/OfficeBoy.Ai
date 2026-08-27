"""
OfficeBoy.ai — Autonomous AI Office Assistant Operating System
A multi-agent autonomous company engine in pure Python.
"""

__version__ = "2.0.0"
__author__ = "OfficeBoy.ai"

from officeboy.core.orchestrator import CompanyOrchestrator
from officeboy.models import ProjectBrief, AgentRole, TaskStatus, CompanyDeliverable

__all__ = [
    "CompanyOrchestrator",
    "ProjectBrief",
    "AgentRole",
    "TaskStatus",
    "CompanyDeliverable",
]
