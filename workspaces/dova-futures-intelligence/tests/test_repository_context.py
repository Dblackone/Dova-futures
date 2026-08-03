import tempfile
import unittest
from pathlib import Path

from core.repository_context import RepositorySnapshot


class RepositoryContextTests(unittest.TestCase):
    def test_loads_registered_projects_and_workspace_state(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "company").mkdir()
            memory = root / "workspaces" / "dova-futures-intelligence" / "memory"
            memory.mkdir(parents=True)
            (root / "company" / "registry.md").write_text(
                "| [`website`](../workspaces/website/PROJECT.md) | public | root | Pages | Live |\n"
                "| [`client-jobs`](../workspaces/client-jobs/PROJECT.md) | jobs | projects | - | 3 active |\n",
                encoding="utf-8",
            )
            (memory / "status.md").write_text("**Status:** Active - indexed\n", encoding="utf-8")
            (memory / "next-up.md").write_text("1. Build project cards\n", encoding="utf-8")

            snapshot = RepositorySnapshot.load(root)

            self.assertEqual([project.slug for project in snapshot.projects], ["website", "client-jobs"])
            self.assertEqual(snapshot.intelligence_status, "Active - indexed")
            self.assertEqual(snapshot.next_action, "Build project cards")

    def test_missing_metadata_is_safe(self):
        with tempfile.TemporaryDirectory() as directory:
            snapshot = RepositorySnapshot.load(directory)
            self.assertEqual(snapshot.projects, ())
            self.assertIn("unavailable", snapshot.intelligence_status)


if __name__ == "__main__":
    unittest.main()
