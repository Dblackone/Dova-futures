"""Provider registration and deterministic fallback selection."""

from __future__ import annotations

from collections.abc import Iterable

from .contracts import ProviderCapability, ProviderDefinition, ProviderRequest, ProviderResponse
from .providers import Provider


class ProviderRouter:
    def __init__(self, preferred: str | None = None) -> None:
        self.preferred = preferred
        self._definitions: dict[str, ProviderDefinition] = {}
        self._providers: dict[str, Provider] = {}

    def register(self, definition: ProviderDefinition, provider: Provider) -> None:
        if definition.name in self._providers:
            raise ValueError(f"Provider already registered: {definition.name}")
        if definition.name != provider.name:
            raise ValueError("Provider definition name must match provider.name")
        self._definitions[definition.name] = definition
        self._providers[definition.name] = provider

    def list(self) -> Iterable[ProviderDefinition]:
        return tuple(self._definitions.values())

    def select(self, capability: ProviderCapability, preferred: str | None = None) -> Provider:
        candidates = []
        requested = preferred or self.preferred
        if requested:
            candidates.append(requested)
        candidates.extend(name for name in self._providers if name not in candidates)
        for name in candidates:
            if name not in self._definitions:
                continue
            definition = self._definitions[name]
            if capability in definition.capabilities:
                return self._providers[name]
        raise LookupError(f"No provider supports capability: {capability.value}")

    def generate(self, request: ProviderRequest, preferred: str | None = None) -> ProviderResponse:
        return self.select(ProviderCapability.TEXT, preferred).generate(request)
