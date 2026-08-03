import tempfile
import unittest
from pathlib import Path

from core.gateway import create_local_gateway


class UiBridgeTests(unittest.TestCase):
    def test_explicit_list_command_is_handled_locally(self):
        with tempfile.TemporaryDirectory() as directory:
            Path(directory, "bridge.txt").write_text("ok", encoding="utf-8")
            handled, result = create_local_gateway(directory).submit_local_command("/core list")
            self.assertTrue(handled)
            self.assertTrue(result.success)
            self.assertEqual(result.output[0]["name"], "bridge.txt")

    def test_write_command_stops_at_approval_boundary(self):
        with tempfile.TemporaryDirectory() as directory:
            handled, result = create_local_gateway(directory).submit_local_command(
                "/core write bridge.txt hello"
            )
            self.assertTrue(handled)
            self.assertTrue(result.requires_approval)
            self.assertFalse(Path(directory, "bridge.txt").exists())

    def test_unrelated_text_is_left_for_the_existing_live_path(self):
        with tempfile.TemporaryDirectory() as directory:
            handled, result = create_local_gateway(directory).submit_local_command("hello Jarvis")
            self.assertFalse(handled)
            self.assertIsNone(result)


if __name__ == "__main__":
    unittest.main()
