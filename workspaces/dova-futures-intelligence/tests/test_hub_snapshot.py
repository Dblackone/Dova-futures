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
    def test_exposes_only_curated_public_product_metadata(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            private_workspace = root / "workspaces" / "client-jobs" / "memory"
            private_workspace.mkdir(parents=True)
            (private_workspace / "status.md").write_text(
                "**Status:** Confidential Client Name\n",
                encoding="utf-8",
            )

            snapshot = build(root)

            slugs = [item["slug"] for item in snapshot["workspaces"]]
            self.assertEqual(slugs, ["dova-futures-intelligence", "website", "preorder-store"])
            self.assertNotIn("client-jobs", slugs)
            self.assertNotIn("Confidential Client Name", str(snapshot))


if __name__ == "__main__":
    unittest.main()
