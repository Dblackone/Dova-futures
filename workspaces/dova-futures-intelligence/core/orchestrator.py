"""Minimal request lifecycle for the first Jarvis orchestration slice."""

from __future__ import annotations

from collections.abc import Callable

from .contracts import (
    EventType,
    ExecutionEvent,
    TaskContext,
    ToolCall,
    ToolResult,
    UserRequest,
)
from .policy import PolicyEngine
from .registry import CapabilityRegistry


class JarvisOrchestrator:
    def __init__(
        self,
        registry: CapabilityRegistry,
        policy: PolicyEngine | None = None,
        emit: Callable[[ExecutionEvent], None] | None = None,
    ) -> None:
        self.registry = registry
        self.policy = policy or PolicyEngine()
        self.emit = emit or (lambda event: None)

    def execute(
        self,
        request: UserRequest,
        tool_call: ToolCall,
        *,
        approved: bool = False,
        context: TaskContext | None = None,
    ) -> ToolResult:
        context = context or TaskContext(request_id=request.request_id)
        self.emit(ExecutionEvent(EventType.RECEIVED, request.request_id, context.task_id, data={"text": request.text}))
        definition = self.registry.get(tool_call.tool_name)
        self.registry.validate(tool_call)
        decision = self.policy.evaluate(context, definition, tool_call, approved=approved)
        self.emit(ExecutionEvent(EventType.POLICY_CHECKED, request.request_id, context.task_id, data={"allowed": decision.allowed, "reason": decision.reason}))
        if not decision.allowed:
            result = ToolResult(tool_call.call_id, tool_call.tool_name, False, error=decision.reason, requires_approval=True)
            self.emit(ExecutionEvent(EventType.FAILED, request.request_id, context.task_id, data={"error": decision.reason}))
            return result
        self.emit(ExecutionEvent(EventType.TOOL_STARTED, request.request_id, context.task_id, data={"tool": tool_call.tool_name}))
        result = self.registry.invoke(tool_call)
        event_type = EventType.TOOL_COMPLETED if result.success else EventType.FAILED
        self.emit(ExecutionEvent(event_type, request.request_id, context.task_id, data={"tool": tool_call.tool_name, "success": result.success, "error": result.error}))
        return result
