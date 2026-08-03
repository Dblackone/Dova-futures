import tempfile
import unittest
from pathlib import Path

from core.gateway import create_local_gateway


class GatewayTests(unittest.TestCase):
    def test_gateway_routes_read_request_end_to_end(self):
        with tempfile.TemporaryDirectory() as directory:
            Path(directory, "hello.txt").write_text("hello", encoding="utf-8")
            gateway = create_local_gateway(directory)
            result = gateway.submit(
                "list the workspace",
                tool_name="filesystem.list",
                parameters={},
            )
            self.assertTrue(result.success)
            self.assertEqual(result.output[0]["name"], "hello.txt")
            self.assertEqual(gateway.events[-1].data["success"], True)

    def test_gateway_returns_approval_required_for_write(self):
        with tempfile.TemporaryDirectory() as directory:
            gateway = create_local_gateway(directory)
            result = gateway.submit(
                "write a note",
                tool_name="filesystem.write_text",
                parameters={"path": "note.txt", "content": "DOVA"},
            )
            self.assertTrue(result.requires_approval)
            self.assertFalse(Path(directory, "note.txt").exists())

    def test_gateway_can_resume_after_approval(self):
        with tempfile.TemporaryDirectory() as directory:
            gateway = create_local_gateway(directory)
            result = gateway.submit(
                "write a note",
                tool_name="filesystem.write_text",
                parameters={"path": "note.txt", "content": "DOVA"},
                approved=True,
            )
            self.assertTrue(result.success)
            self.assertEqual(Path(directory, "note.txt").read_text(encoding="utf-8"), "DOVA")

    def test_local_command_can_be_approved_after_the_boundary(self):
        with tempfile.TemporaryDirectory() as directory:
            gateway = create_local_gateway(directory)
            blocked_handled, blocked = gateway.submit_local_command(
                "/core write note.txt DOVA"
            )
            self.assertTrue(blocked_handled)
            self.assertTrue(blocked.requires_approval)
            self.assertTrue(gateway.approval_pending)

            result = gateway.approve_pending()

            self.assertTrue(result.success)
            self.assertFalse(gateway.approval_pending)
            self.assertEqual(Path(directory, "note.txt").read_text(encoding="utf-8"), "DOVA")

    def test_approval_without_a_pending_action_is_rejected(self):
        with tempfile.TemporaryDirectory() as directory:
            result = create_local_gateway(directory).approve_pending()
            self.assertFalse(result.success)
            self.assertIn("No local action", result.error)

    def test_gateway_does_not_guess_a_tool_from_plain_text(self):
        with tempfile.TemporaryDirectory() as directory:
            gateway = create_local_gateway(directory)
            result = gateway.submit("please do something")
            self.assertFalse(result.success)
            self.assertIn("planning is not enabled", result.error)


if __name__ == "__main__":
    unittest.main()
