import unittest

from core.contracts import EventType, Risk, ToolCall, ToolDefinition, UserRequest
from core.orchestrator import JarvisOrchestrator
from core.registry import CapabilityRegistry


def make_registry():
    registry = CapabilityRegistry()
    registry.register(
        ToolDefinition(
            name="test.read",
            version="1.0.0",
            description="Returns a value without side effects.",
            input_schema={"type": "object", "required": ["value"]},
            output_schema={"type": "string"},
            risk=Risk.READ_ONLY,
            requires_confirmation=False,
            idempotent=True,
        ),
        lambda params: params["value"],
    )
    registry.register(
        ToolDefinition(
            name="test.write",
            version="1.0.0",
            description="Controlled mutating test capability.",
            input_schema={"type": "object", "required": ["value"]},
            output_schema={"type": "string"},
            risk=Risk.HIGH,
            requires_confirmation=True,
        ),
        lambda params: f"wrote {params['value']}",
    )
    return registry


class OrchestrationCoreTests(unittest.TestCase):
    def test_read_only_tool_executes_and_emits_events(self):
        events = []
        orchestrator = JarvisOrchestrator(make_registry(), emit=events.append)
        result = orchestrator.execute(UserRequest("read"), ToolCall("test.read", {"value": "ok"}))
        self.assertTrue(result.success)
        self.assertEqual(result.output, "ok")
        self.assertEqual([event.event_type for event in events], [
            EventType.RECEIVED,
            EventType.POLICY_CHECKED,
            EventType.TOOL_STARTED,
            EventType.TOOL_COMPLETED,
        ])

    def test_mutating_tool_requires_approval_before_handler_runs(self):
        orchestrator = JarvisOrchestrator(make_registry())
        result = orchestrator.execute(UserRequest("write"), ToolCall("test.write", {"value": "x"}))
        self.assertFalse(result.success)
        self.assertTrue(result.requires_approval)

    def test_approved_mutating_tool_executes(self):
        orchestrator = JarvisOrchestrator(make_registry())
        result = orchestrator.execute(UserRequest("write"), ToolCall("test.write", {"value": "x"}), approved=True)
        self.assertTrue(result.success)
        self.assertEqual(result.output, "wrote x")

    def test_required_schema_input_is_validated(self):
        orchestrator = JarvisOrchestrator(make_registry())
        with self.assertRaisesRegex(ValueError, "Missing required input"):
            orchestrator.execute(UserRequest("read"), ToolCall("test.read"))


if __name__ == "__main__":
    unittest.main()
