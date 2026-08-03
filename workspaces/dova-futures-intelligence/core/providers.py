"""Provider interface and deterministic test implementation."""

from __future__ import annotations

from typing import Protocol

from .contracts import ProviderRequest, ProviderResponse


class Provider(Protocol):
    name: str

    def generate(self, request: ProviderRequest) -> ProviderResponse:
        ...


class MockProvider:
    name = "mock"

    def generate(self, request: ProviderRequest) -> ProviderResponse:
        return ProviderResponse(
            text=f"Mock response: {request.prompt}",
            provider=self.name,
            model=request.model,
        )
