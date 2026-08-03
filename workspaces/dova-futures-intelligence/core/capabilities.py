"""Small local capabilities used to prove the registry with real I/O."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from .contracts import Risk, ToolDefinition
from .registry import CapabilityRegistry


class WorkspaceFiles:
    """Constrained filesystem adapter for the first local-first milestone."""

    def __init__(self, root: str | Path) -> None:
        self.root = Path(root).resolve()

    def _resolve(self, raw_path: str) -> Path:
        candidate = (self.root / raw_path).resolve()
        try:
            candidate.relative_to(self.root)
        except ValueError as exc:
            raise ValueError("Path must remain inside the configured workspace") from exc
        return candidate

    def list_directory(self, params: dict[str, Any]) -> list[dict[str, Any]]:
        directory = self._resolve(str(params.get("path", ".")))
        if not directory.is_dir():
            raise ValueError(f"Directory does not exist: {params.get('path', '.')}")
        return [
            {"name": item.name, "directory": item.is_dir(), "size": item.stat().st_size if item.is_file() else None}
            for item in sorted(directory.iterdir(), key=lambda value: value.name.lower())
            if params.get("include_hidden", False) or not item.name.startswith(".")
        ]

    def write_text(self, params: dict[str, Any]) -> str:
        relative_path = str(params["path"])
        target = self._resolve(relative_path)
        if target.name.lower() in {"api_keys.json", ".env"} or "secret" in target.name.lower():
            raise PermissionError("Credential and secret files are protected")
        if any(part == ".git" for part in target.relative_to(self.root).parts):
            raise PermissionError("Git metadata is protected")
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(str(params["content"]), encoding="utf-8")
        return f"Wrote {target.relative_to(self.root)}"


def register_workspace_capabilities(registry: CapabilityRegistry, root: str | Path) -> WorkspaceFiles:
    files = WorkspaceFiles(root)
    registry.register(
        ToolDefinition(
            name="filesystem.list",
            version="1.0.0",
            description="List entries in the configured workspace.",
            input_schema={"type": "object", "required": [], "properties": {"path": {"type": "string"}}},
            output_schema={"type": "array"},
            risk=Risk.READ_ONLY,
            requires_confirmation=False,
            idempotent=True,
        ),
        files.list_directory,
    )
    registry.register(
        ToolDefinition(
            name="filesystem.write_text",
            version="1.0.0",
            description="Write UTF-8 text inside the configured workspace.",
            input_schema={"type": "object", "required": ["path", "content"]},
            output_schema={"type": "string"},
            risk=Risk.HIGH,
            requires_confirmation=True,
        ),
        files.write_text,
    )
    return files
