"""
OfficeBoy.ai — Data Models & Type Definitions
Pure Python dataclasses and enums for agents, sprints, memory, and deliverables.
"""

from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum
from typing import Any, Dict, List, Optional


class AgentRole(str, Enum):
    MANAGER = "Managing Director"
    DEVELOPER = "Lead Architect & Developer"
    WRITER = "Technical Writer & Docs"
    DESIGNER = "Creative Director & UX"
    MARKETER = "Growth & Market Strategist"
    REVIEWER = "Lead QA & Security Auditor"


class TaskStatus(str, Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    REVIEWING = "reviewing"
    FAILED = "failed"


@dataclass
class WorkflowStep:
    id: str
    step_number: int
    title: str
    assigned_role: AgentRole
    assigned_name: str
    objective: str
    estimated_duration_sec: int = 5
    status: TaskStatus = TaskStatus.PENDING
    output: Optional[str] = None
    started_at: Optional[str] = None
    completed_at: Optional[str] = None


@dataclass
class AgentMessage:
    id: str
    sender_name: str
    sender_role: str
    recipient: str
    content: str
    timestamp: str = field(default_factory=lambda: datetime.utcnow().strftime("%H:%M:%S"))
    message_type: str = "broadcast"  # broadcast | direct | deliverable | alert
    metadata: Dict[str, Any] = field(default_factory=dict)


@dataclass
class CompanyDeliverable:
    id: str
    title: str
    category: str  # code | docs | design | strategy | audit | executive_brief
    filename: str
    file_extension: str
    author_name: str
    author_role: str
    summary: str
    content: str
    created_at: str = field(default_factory=lambda: datetime.utcnow().isoformat())
    version: str = "1.0.0"


@dataclass
class ProjectBrief:
    id: str
    title: str
    client_name: str
    budget: str
    deadline: str
    problem_statement: str
    target_audience: str
    key_deliverables: List[str]
    tech_stack: List[str]
    created_at: str = field(default_factory=lambda: datetime.utcnow().strftime("%Y-%m-%d %H:%M"))
    workflow_steps: List[WorkflowStep] = field(default_factory=list)


@dataclass
class SprintState:
    is_running: bool = False
    is_paused: bool = False
    current_step_index: int = 0
    progress_percentage: float = 0.0
    active_agent: Optional[str] = None
    current_brief: Optional[ProjectBrief] = None
    messages: List[AgentMessage] = field(default_factory=list)
    deliverables: List[CompanyDeliverable] = field(default_factory=list)
    shared_memory: Dict[str, Any] = field(default_factory=dict)
    started_at: Optional[str] = None
    completed_at: Optional[str] = None
