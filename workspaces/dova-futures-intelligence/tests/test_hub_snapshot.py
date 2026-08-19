import tempfile
import unittest
from pathlib import Path

from hub.build_snapshot import build


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
