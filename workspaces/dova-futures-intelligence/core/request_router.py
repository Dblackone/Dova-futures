"""Explicit metadata-to-tool routing for channel adapters."""

from __future__ import annotations

from typing import Any

from .contracts import ToolCall, UserRequest


class RequestRouter:
    """Translate a normalized request into a direct tool call when one is declared.

    Natural-language planning remains a later milestone. Refusing to guess a
    mutating action is intentional until a planner and approval UX are wired in.
    """

    def route(self, request: UserRequest) -> ToolCall | None:
        tool_name = request.metadata.get("tool_name")
        if not tool_name:
            return None
        parameters: Any = request.metadata.get("parameters", {})
        if not isinstance(parameters, dict):
            raise ValueError("Request metadata.parameters must be an object")
        return ToolCall(str(tool_name), parameters)
