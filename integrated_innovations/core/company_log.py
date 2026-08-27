"""
INTEGRATED INNOVATIONS
Company Log — Real-Time Shared Memory Bus & Event Store
Thread-safe, append-only JSON file logger tracking all agent actions, handoffs, and deliverables.
"""

import os
import json
import time
import threading
from typing import Any, Callable, Dict, List, Optional


class CompanyLog:
    """
    Central shared state bus.
    Persists live execution timeline and current agent statuses to company_log.json.
    """

    def __init__(self, filepath: str = "company_log.json"):
        self.filepath = filepath
        self._lock = threading.Lock()
        self._listeners: List[Callable[[Dict[str, Any]], None]] = []
        self._init_storage()

    def _init_storage(self) -> None:
        """Initialize the storage structure if the file does not exist."""
        with self._lock:
            if not os.path.exists(self.filepath):
                initial_data = {
                    "company": "INTEGRATED INNOVATIONS",
                    "version": "2.0.0",
                    "brief": None,
                    "status": "idle",
                    "current_step": 0,
                    "total_steps": 0,
                    "progress": 0,
                    "active_agents": {
                        "MD": {"name": "Aegis", "status": "idle", "task": "Awaiting incoming client brief", "progress": 0},
                        "Developer": {"name": "Vega", "status": "idle", "task": "Standby for code generation", "progress": 0},
                        "Designer": {"name": "Nova", "status": "idle", "task": "Standby for UX tokens", "progress": 0},
                        "Reviewer": {"name": "Iris", "status": "idle", "task": "Standby for QA audit", "progress": 0},
                        "Writer": {"name": "Sable", "status": "idle", "task": "Standby for documentation", "progress": 0},
                        "Marketer": {"name": "Rune", "status": "idle", "task": "Standby for GTM positioning", "progress": 0},
                    },
                    "events": [],
                    "deliverables": {},
                    "final_deliverable": None,
                    "last_updated": time.time()
                }
                with open(self.filepath, "w", encoding="utf-8") as f:
                    json.dump(initial_data, f, indent=2)

    def subscribe(self, callback: Callable[[Dict[str, Any]], None]) -> None:
        """Register a callback listener for real-time SSE broadcasts."""
        self._listeners.append(callback)

    def read_state(self) -> Dict[str, Any]:
        """Thread-safe read of the current company state."""
        with self._lock:
            if not os.path.exists(self.filepath):
                return {}
            try:
                with open(self.filepath, "r", encoding="utf-8") as f:
                    return json.load(f)
            except Exception:
                return {}

    def log_event(
        self,
        from_agent: str,
        to_agent: Optional[str],
        action: str,  # 'brief_received' | 'assign' | 'output' | 'review' | 'compile' | 'status'
        content: str,
        payload: Optional[Any] = None,
        progress: Optional[int] = None,
        agent_updates: Optional[Dict[str, Dict[str, Any]]] = None,
        deliverable_key: Optional[str] = None,
        deliverable_content: Optional[Any] = None
    ) -> Dict[str, Any]:
        """
        Atomically append an event and update agent states in company_log.json.
        """
        with self._lock:
            state = self.read_state()
            if not state:
                self._init_storage()
                state = self.read_state()

            event_id = f"evt-{len(state.get('events', [])) + 1:04d}"
            timestamp = time.strftime("%H:%M:%S")

            new_event = {
                "id": event_id,
                "timestamp": timestamp,
                "from": from_agent,
                "to": to_agent,
                "action": action,
                "content": content,
                "payload": payload
            }

            state.setdefault("events", []).append(new_event)
            state["last_updated"] = time.time()

            if progress is not None:
                state["progress"] = min(100, max(0, progress))

            # Apply any agent-specific status updates
            if agent_updates:
                for agent_role, update in agent_updates.items():
                    if agent_role in state["active_agents"]:
                        state["active_agents"][agent_role].update(update)

            # Store specialist deliverables
            if deliverable_key and deliverable_content is not None:
                if deliverable_key == "final_deliverable":
                    state["final_deliverable"] = deliverable_content
                    state["status"] = "completed"
                else:
                    state.setdefault("deliverables", {})[deliverable_key] = deliverable_content

            # Write back atomically
            tmp_file = f"{self.filepath}.tmp"
            with open(tmp_file, "w", encoding="utf-8") as f:
                json.dump(state, f, indent=2)
            os.replace(tmp_file, self.filepath)

        # Notify any active listeners (e.g. SSE stream)
        for listener in self._listeners:
            try:
                listener(state)
            except Exception:
                pass

        return state

    def reset(self, brief_title: Optional[str] = None) -> None:
        """Reset the shared memory log for a new project brief."""
        with self._lock:
            initial_data = {
                "company": "INTEGRATED INNOVATIONS",
                "version": "2.0.0",
                "brief": brief_title,
                "status": "running" if brief_title else "idle",
                "current_step": 0,
                "total_steps": 0,
                "progress": 0,
                "active_agents": {
                    "MD": {"name": "Aegis", "status": "active" if brief_title else "idle", "task": "Decomposing brief & scheduling subtasks", "progress": 10},
                    "Developer": {"name": "Vega", "status": "idle", "task": "Standby for code generation", "progress": 0},
                    "Designer": {"name": "Nova", "status": "idle", "task": "Standby for UX tokens", "progress": 0},
                    "Reviewer": {"name": "Iris", "status": "idle", "task": "Standby for QA audit", "progress": 0},
                    "Writer": {"name": "Sable", "status": "idle", "task": "Standby for documentation", "progress": 0},
                    "Marketer": {"name": "Rune", "status": "idle", "task": "Standby for GTM positioning", "progress": 0},
                },
                "events": [],
                "deliverables": {},
                "final_deliverable": None,
                "last_updated": time.time()
            }
            with open(self.filepath, "w", encoding="utf-8") as f:
                json.dump(initial_data, f, indent=2)
