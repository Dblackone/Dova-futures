"""Shared domain contracts for the initial Jarvis platform slice."""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime, timezone
from enum import Enum
from typing import Any, Mapping
from uuid import uuid4


def new_id() -> str:
    return str(uuid4())


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


class Risk(str, Enum):
    READ_ONLY = "read_only"
    LOW = "low"
    HIGH = "high"


class EventType(str, Enum):
    RECEIVED = "received"
    POLICY_CHECKED = "policy_checked"
    TOOL_STARTED = "tool_started"
    TOOL_COMPLETED = "tool_completed"
    FAILED = "failed"


class ProviderCapability(str, Enum):
    TEXT = "text"
    STREAMING_TEXT = "streaming_text"
    STRUCTURED_JSON = "structured_json"
    TOOL_CALLING = "tool_calling"
    VISION = "vision"
    AUDIO = "audio"
    EMBEDDINGS = "embeddings"


@dataclass(frozen=True)
class UserRequest:
    text: str
    request_id: str = field(default_factory=new_id)
    channel: str = "text"
    metadata: Mapping[str, Any] = field(default_factory=dict)


@dataclass(frozen=True)
class TaskContext:
    request_id: str
    task_id: str = field(default_factory=new_id)
    user_id: str | None = None
    metadata: Mapping[str, Any] = field(default_factory=dict)


@dataclass(frozen=True)
class ToolDefinition:
    name: str
    version: str
    description: str
    input_schema: Mapping[str, Any]
    output_schema: Mapping[str, Any]
    risk: Risk
    requires_confirmation: bool
    supported_platforms: tuple[str, ...] = ("windows",)
    required_permissions: tuple[str, ...] = ()
    idempotent: bool = False


@dataclass(frozen=True)
class ToolCall:
    tool_name: str
    parameters: Mapping[str, Any] = field(default_factory=dict)
    call_id: str = field(default_factory=new_id)


@dataclass(frozen=True)
class ToolResult:
    call_id: str
    tool_name: str
    success: bool
    output: Any = None
    error: str | None = None
    requires_approval: bool = False


@dataclass(frozen=True)
class PlanStep:
    step: int
    description: str
    tool_call: ToolCall | None = None
    critical: bool = False


@dataclass(frozen=True)
class Plan:
    goal: str
    steps: tuple[PlanStep, ...] = ()
    plan_id: str = field(default_factory=new_id)


@dataclass(frozen=True)
class AgentDefinition:
    name: str
    version: str
    description: str
    supported_intents: tuple[str, ...] = ()


@dataclass(frozen=True)
class ApprovalRequest:
    request_id: str
    task_id: str
    tool_name: str
    reason: str
    risk: Risk


@dataclass(frozen=True)
class ExecutionEvent:
    event_type: EventType
    request_id: str
    task_id: str
    timestamp: datetime = field(default_factory=utc_now)
    data: Mapping[str, Any] = field(default_factory=dict)


@dataclass(frozen=True)
class ProviderRequest:
    prompt: str
    model: str | None = None
    metadata: Mapping[str, Any] = field(default_factory=dict)


@dataclass(frozen=True)
class ProviderDefinition:
    name: str
    version: str
    capabilities: frozenset[ProviderCapability]
    models: tuple[str, ...] = ()


@dataclass(frozen=True)
class ProviderResponse:
    text: str
    provider: str
    model: str | None = None
    usage: Mapping[str, Any] = field(default_factory=dict)


@dataclass(frozen=True)
class MemoryQuery:
    text: str
    scopes: tuple[str, ...] = ()
    limit: int = 10


@dataclass(frozen=True)
class MemoryResult:
    text: str
    source: str
    confidence: float = 0.0
    metadata: Mapping[str, Any] = field(default_factory=dict)
