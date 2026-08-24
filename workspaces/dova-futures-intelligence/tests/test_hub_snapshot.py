import importlib.util
import tempfile
import unittest
from pathlib import Path


HUB_BUILDER = Path(__file__).resolve().parents[3] / "hub" / "build_snapshot.py"
SPEC = importlib.util.spec_from_file_location("dova_hub_build_snapshot", HUB_BUILDER)
if SPEC is None or SPEC.loader is None:  # pragma: no cover - import guard
    raise RuntimeError(f"Unable to load Hub snapshot builder at {HUB_BUILDER}")
MODULE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MODULE)
build = MODULE.build


class HubSnapshotTests(unittest.TestCase):
    def test_includes_registered_and_unregistered_workspaces(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "company").mkdir()
            (root / "company" / "registry.md").write_text(
                "| [`website`](../workspaces/website/PROJECT.md) | public site | root | Pages | Live |\n",
                encoding="utf-8",
            )
            for slug in ("website", "intelligence"):
                workspace = root / "workspaces" / slug
                (workspace / "memory").mkdir(parents=True)
                (workspace / "PROJECT.md").write_text(
                    f"- **One-line purpose:** {slug} workspace\n",
                    encoding="utf-8",
                )
                (workspace / "memory" / "status.md").write_text(
                    "**Status:** Active\n",
                    encoding="utf-8",
                )
                (workspace / "memory" / "next-up.md").write_text(
                    "1. Review the workspace\n",
                    encoding="utf-8",
                )

            snapshot = build(root)

            self.assertEqual([item["slug"] for item in snapshot["workspaces"]], ["intelligence", "website"])
            self.assertTrue(next(item for item in snapshot["workspaces"] if item["slug"] == "website")["registered"])
            self.assertFalse(next(item for item in snapshot["workspaces"] if item["slug"] == "intelligence")["registered"])


if __name__ == "__main__":
    unittest.main()
