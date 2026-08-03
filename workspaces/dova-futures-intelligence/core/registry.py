"""Single capability registry used by the new orchestration path."""

from __future__ import annotations

from collections.abc import Callable, Iterable
from typing import Any

from .contracts import ToolCall, ToolDefinition, ToolResult


ToolHandler = Callable[[dict[str, Any]], Any]


class CapabilityRegistry:
    def __init__(self) -> None:
        self._definitions: dict[str, ToolDefinition] = {}
        self._handlers: dict[str, ToolHandler] = {}

    def register(self, definition: ToolDefinition, handler: ToolHandler) -> None:
        if definition.name in self._definitions:
            raise ValueError(f"Capability already registered: {definition.name}")
        self._definitions[definition.name] = definition
        self._handlers[definition.name] = handler

    def get(self, name: str) -> ToolDefinition:
        try:
            return self._definitions[name]
        except KeyError as exc:
            raise KeyError(f"Unknown capability: {name}") from exc

    def list(self) -> Iterable[ToolDefinition]:
        return tuple(self._definitions.values())

    def validate(self, call: ToolCall) -> None:
        definition = self.get(call.tool_name)
        required = definition.input_schema.get("required", ())
        missing = [key for key in required if key not in call.parameters]
        if missing:
            raise ValueError(f"Missing required input for {call.tool_name}: {', '.join(missing)}")

    def invoke(self, call: ToolCall) -> ToolResult:
        self.validate(call)
        definition = self.get(call.tool_name)
        try:
            output = self._handlers[call.tool_name](dict(call.parameters))
            return ToolResult(call.call_id, call.tool_name, True, output=output)
        except Exception as exc:
            return ToolResult(call.call_id, call.tool_name, False, error=str(exc))
