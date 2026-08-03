import unittest

from core.bootstrap import create_local_provider_router
from core.contracts import ProviderCapability, ProviderDefinition, ProviderRequest, UserRequest
from core.provider_router import ProviderRouter
from core.providers import MockProvider
from core.request_router import RequestRouter


class RoutingTests(unittest.TestCase):
    def test_local_provider_generates_without_credentials(self):
        response = create_local_provider_router().generate(ProviderRequest("hello"))
        self.assertEqual(response.provider, "mock")
        self.assertIn("hello", response.text)

    def test_provider_router_falls_back_when_preferred_lacks_capability(self):
        router = ProviderRouter(preferred="text-only")

        class NamedMock(MockProvider):
            name = "fallback"

        router.register(
            ProviderDefinition("text-only", "1.0.0", frozenset({ProviderCapability.TEXT})),
            type("TextOnly", (MockProvider,), {"name": "text-only"})(),
        )
        router.register(
            ProviderDefinition("fallback", "1.0.0", frozenset({ProviderCapability.STRUCTURED_JSON})),
            NamedMock(),
        )
        selected = router.select(ProviderCapability.STRUCTURED_JSON)
        self.assertEqual(selected.name, "fallback")

    def test_request_router_only_routes_explicit_metadata(self):
        router = RequestRouter()
        self.assertIsNone(router.route(UserRequest("please do something")))
        request = UserRequest(
            "list files",
            metadata={"tool_name": "filesystem.list", "parameters": {"path": "."}},
        )
        call = router.route(request)
        self.assertEqual(call.tool_name, "filesystem.list")
        self.assertEqual(call.parameters["path"], ".")

    def test_request_router_rejects_non_object_parameters(self):
        request = UserRequest("bad", metadata={"tool_name": "x", "parameters": "bad"})
        with self.assertRaisesRegex(ValueError, "must be an object"):
            RequestRouter().route(request)


if __name__ == "__main__":
    unittest.main()
