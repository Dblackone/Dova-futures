import tempfile
import unittest
from pathlib import Path

from core.bootstrap import create_local_orchestrator
from core.contracts import ToolCall, UserRequest


class LocalCapabilityTests(unittest.TestCase):
    def test_workspace_list_is_available_without_approval(self):
        with tempfile.TemporaryDirectory() as directory:
            Path(directory, "note.txt").write_text("hello", encoding="utf-8")
            orchestrator = create_local_orchestrator(directory)
            result = orchestrator.execute(UserRequest("list files"), ToolCall("filesystem.list", {}))
            self.assertTrue(result.success)
            self.assertEqual(result.output[0]["name"], "note.txt")

    def test_workspace_write_requires_approval_then_writes(self):
        with tempfile.TemporaryDirectory() as directory:
            orchestrator = create_local_orchestrator(directory)
            call = ToolCall("filesystem.write_text", {"path": "output.txt", "content": "DOVA"})
            request = UserRequest("write a file")
            blocked = orchestrator.execute(request, call)
            self.assertTrue(blocked.requires_approval)
            allowed = orchestrator.execute(request, call, approved=True)
            self.assertTrue(allowed.success)
            self.assertEqual(Path(directory, "output.txt").read_text(encoding="utf-8"), "DOVA")

    def test_workspace_cannot_escape_root_or_write_credentials(self):
        with tempfile.TemporaryDirectory() as directory:
            orchestrator = create_local_orchestrator(directory)
            escape = ToolCall("filesystem.write_text", {"path": "../outside.txt", "content": "x"})
            result = orchestrator.execute(UserRequest("write"), escape, approved=True)
            self.assertFalse(result.success)
            secret = ToolCall("filesystem.write_text", {"path": "api_keys.json", "content": "x"})
            result = orchestrator.execute(UserRequest("write"), secret, approved=True)
            self.assertFalse(result.success)


if __name__ == "__main__":
    unittest.main()
