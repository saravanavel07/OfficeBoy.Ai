"""
OfficeBoy.ai — Thread-Safe Real-Time Event & Broadcast Log
Manages structured logs, subscribers for websocket/SSE streaming, and message persistence.
"""

import threading
from typing import Callable, List, Optional
from officeboy.models import AgentMessage


class CompanyLog:
    def __init__(self):
        self._lock = threading.Lock()
        self._messages: List[AgentMessage] = []
        self._subscribers: List[Callable[[AgentMessage], None]] = []

    def subscribe(self, callback: Callable[[AgentMessage], None]):
        with self._lock:
            self._subscribers.append(callback)

    def unsubscribe(self, callback: Callable[[AgentMessage], None]):
        with self._lock:
            if callback in self._subscribers:
                self._subscribers.remove(callback)

    def broadcast(
        self,
        sender_name: str,
        sender_role: str,
        content: str,
        recipient: str = "all",
        message_type: str = "broadcast",
        metadata: Optional[dict] = None
    ) -> AgentMessage:
        msg = AgentMessage(
            id=f"msg-{len(self._messages) + 1:04d}",
            sender_name=sender_name,
            sender_role=sender_role,
            recipient=recipient,
            content=content,
            message_type=message_type,
            metadata=metadata or {}
        )

        with self._lock:
            self._messages.append(msg)
            subscribers_copy = list(self._subscribers)

        for callback in subscribers_copy:
            try:
                callback(msg)
            except Exception:
                pass

        return msg

    def get_messages(self, limit: Optional[int] = None) -> List[AgentMessage]:
        with self._lock:
            if limit:
                return list(self._messages[-limit:])
            return list(self._messages)

    def clear(self):
        with self._lock:
            self._messages.clear()
