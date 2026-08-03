"""Policy boundary for tool side effects."""

from __future__ import annotations

from dataclasses import dataclass

from .contracts import ApprovalRequest, Risk, TaskContext, ToolCall, ToolDefinition


@dataclass(frozen=True)
class PolicyDecision:
    allowed: bool
    approval_request: ApprovalRequest | None = None
    reason: str = ""


class PolicyEngine:
    def evaluate(
        self,
        context: TaskContext,
        definition: ToolDefinition,
        call: ToolCall,
        approved: bool = False,
    ) -> PolicyDecision:
        if definition.risk is Risk.READ_ONLY and not definition.requires_confirmation:
            return PolicyDecision(True, reason="read-only capability")
        if approved:
            return PolicyDecision(True, reason="explicit approval supplied")
        approval = ApprovalRequest(
            request_id=context.request_id,
            task_id=context.task_id,
            tool_name=call.tool_name,
            reason=f"{call.tool_name} is classified as {definition.risk.value}",
            risk=definition.risk,
        )
        return PolicyDecision(False, approval_request=approval, reason="approval required")
