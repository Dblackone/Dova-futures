"""Composition root for using the new core without the desktop UI."""

from __future__ import annotations

from pathlib import Path

from .capabilities import register_workspace_capabilities
from .orchestrator import JarvisOrchestrator
from .provider_router import ProviderRouter
from .providers import MockProvider
from .registry import CapabilityRegistry
from .contracts import ProviderCapability, ProviderDefinition


def create_local_orchestrator(root: str | Path | None = None) -> JarvisOrchestrator:
    workspace = Path(root or Path.cwd()).resolve()
    registry = CapabilityRegistry()
    register_workspace_capabilities(registry, workspace)
    return JarvisOrchestrator(registry)


def create_local_provider_router() -> ProviderRouter:
    router = ProviderRouter(preferred="mock")
    router.register(
        ProviderDefinition(
            name="mock",
            version="1.0.0",
            capabilities=frozenset({ProviderCapability.TEXT, ProviderCapability.STRUCTURED_JSON}),
            models=("mock-default",),
        ),
        MockProvider(),
    )
    return router
