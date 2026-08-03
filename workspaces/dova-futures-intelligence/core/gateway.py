"""Headless interaction gateway for UI, voice, and future channel adapters."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from .bootstrap import create_local_orchestrator
from .contracts import ExecutionEvent, ToolResult, UserRequest
from .orchestrator import JarvisOrchestrator
from .request_router import RequestRouter


class InteractionGateway:
    """Accept a normalized user interaction and send it through Jarvis."""

    def __init__(self, orchestrator: JarvisOrchestrator) -> None:
        self.orchestrator = orchestrator
        self.router = RequestRouter()
        self.events: list[ExecutionEvent] = []
        self._pending_approval: tuple[str, str, dict[str, Any]] | None = None

    def submit(
        self,
        text: str,
        *,
        tool_name: str | None = None,
        parameters: dict[str, Any] | None = None,
        approved: bool = False,
        channel: str = "headless",
    ) -> ToolResult:
        metadata: dict[str, Any] = {}
        if tool_name:
            metadata = {"tool_name": tool_name, "parameters": parameters or {}}
        request = UserRequest(text=text, channel=channel, metadata=metadata)
        call = self.router.route(request)
        if call is None:
            return ToolResult(
                call_id=request.request_id,
                tool_name="",
                success=False,
                error="No direct capability selected; planning is not enabled yet.",
            )
        return self.orchestrator.execute(request, call, approved=approved)

    def submit_local_command(self, text: str) -> tuple[bool, ToolResult | None]:
        """Handle the intentionally explicit local bridge used by the prototype UI.

        Supported forms are `/core list [relative-path]` and
        `/core write <relative-path> <content>`. The latter always returns an
        approval-required result until a UI approval control is available.
        """
        parts = text.strip().split(maxsplit=3)
        if not parts or parts[0].lower() != "/core":
            return False, None
        if len(parts) >= 2 and parts[1].lower() == "list":
            path = parts[2] if len(parts) >= 3 else "."
            return True, self.submit(text, tool_name="filesystem.list", parameters={"path": path})
        if len(parts) >= 4 and parts[1].lower() == "write":
            parameters = {"path": parts[2], "content": parts[3]}
            result = self.submit(
                text,
                tool_name="filesystem.write_text",
                parameters=parameters,
            )
            if result.requires_approval:
                self._pending_approval = (text, "filesystem.write_text", parameters)
            return True, result
        return True, ToolResult(
            call_id="",
            tool_name="",
            success=False,
            error="Usage: /core list [path] or /core write <path> <content>",
        )

    def approve_pending(self) -> ToolResult:
        """Resume the one pending local action after an explicit user approval."""
        if self._pending_approval is None:
            return ToolResult(call_id="", tool_name="", success=False, error="No local action is waiting for approval.")
        text, tool_name, parameters = self._pending_approval
        self._pending_approval = None
        return self.submit(text, tool_name=tool_name, parameters=parameters, approved=True)

    @property
    def approval_pending(self) -> bool:
        return self._pending_approval is not None


def create_local_gateway(root: str | Path | None = None) -> InteractionGateway:
    gateway: InteractionGateway | None = None

    def collect(event: ExecutionEvent) -> None:
        if gateway is not None:
            gateway.events.append(event)

    gateway = InteractionGateway(create_local_orchestrator(root))
    gateway.orchestrator.emit = collect
    return gateway
