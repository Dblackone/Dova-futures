from __future__ import annotations

import json
from pathlib import Path

import pytest

import build
import render


ROOT = Path(__file__).resolve().parents[1]
EXAMPLE = ROOT / "data" / "quotation-example.json"


def test_valid_quotation_builds_and_contains_content(tmp_path, monkeypatch):
    monkeypatch.setattr(build, "OUTPUT_HTML", tmp_path)
    output = build.build_document("quotation", EXAMPLE)
    html = output.read_text(encoding="utf-8")
    assert "Example Company Limited" in html
    assert "Construction of Aluminium Protectors" in html
    assert "₦ 1,698,800.00" in html


def test_optional_client_company_and_signature_are_supported(tmp_path, monkeypatch):
    data = json.loads(EXAMPLE.read_text(encoding="utf-8"))
    data["client"].pop("company")
    data["authorised_signatory"].pop("signature_image")
    path = tmp_path / "optional.json"
    path.write_text(json.dumps(data), encoding="utf-8")
    monkeypatch.setattr(build, "OUTPUT_HTML", tmp_path / "out")
    output = build.build_document("quotation", path)
    assert "The Client Representative" in output.read_text(encoding="utf-8")


def test_unknown_document_type_fails():
    with pytest.raises(build.DocumentBuildError, match="Unknown document type"):
        build.build_document("unknown", EXAMPLE)


def test_missing_json_file_fails(tmp_path):
    with pytest.raises(build.DocumentBuildError, match="input data not found"):
        build.build_document("quotation", tmp_path / "missing.json")


def test_invalid_json_fails(tmp_path):
    path = tmp_path / "invalid.json"
    path.write_text("{", encoding="utf-8")
    with pytest.raises(build.DocumentBuildError, match="Invalid JSON"):
        build.build_document("quotation", path)


def test_missing_required_fields_fail(tmp_path):
    data = json.loads(EXAMPLE.read_text(encoding="utf-8"))
    del data["client"]
    path = tmp_path / "missing-field.json"
    path.write_text(json.dumps(data), encoding="utf-8")
    with pytest.raises(build.DocumentBuildError, match="client"): 
        build.build_document("quotation", path)


def test_negative_rates_fail(tmp_path):
    data = json.loads(EXAMPLE.read_text(encoding="utf-8"))
    data["items"][0]["rate"] = -1
    path = tmp_path / "negative.json"
    path.write_text(json.dumps(data), encoding="utf-8")
    with pytest.raises(build.DocumentBuildError, match="items.*rate"): 
        build.build_document("quotation", path)


def test_missing_template_fails(tmp_path, monkeypatch):
    monkeypatch.setattr(build, "REGISTRY_PATH", tmp_path / "registry.json")
    build.REGISTRY_PATH.write_text(json.dumps({"quotation": {"template": "missing/template.html"}}), encoding="utf-8")
    with pytest.raises(build.DocumentBuildError, match="Template not found"):
        build.build_document("quotation", EXAMPLE)


def test_safe_output_filename(tmp_path, monkeypatch):
    monkeypatch.setattr(build, "OUTPUT_HTML", tmp_path)
    output = build.build_document("quotation", EXAMPLE, "Client quote / unsafe:name")
    assert output.name == "Client-quote-unsafe-name.html"


def test_financial_totals_use_decimal():
    data = json.loads(EXAMPLE.read_text(encoding="utf-8"))
    data["items"][0]["quantity"] = 2
    data["items"][0]["rate"] = 0.1
    data["tax"] = {"enabled": True, "rate_percent": 7.5}
    calculated = build.calculate_quotation(data)
    assert calculated["calculations"]["subtotal"] == "0.2"
    assert calculated["calculations"]["tax_amount"] == "0.015"
    assert calculated["calculations"]["grand_total"] == "0.215"


def test_render_rejects_non_html(tmp_path):
    path = tmp_path / "not-a-document.txt"
    path.write_text("hello", encoding="utf-8")
    with pytest.raises(render.DocumentRenderError, match="HTML file"):
        render.render_pdf(path)


def test_print_layout_is_edge_to_edge_and_has_identifiable_footer():
    css = (ROOT / "shared" / "base.css").read_text(encoding="utf-8")
    template = (ROOT / "templates" / "quotation" / "template.html").read_text(encoding="utf-8")
    assert "size: A4;\n  margin: 0;" in css
    assert 'data-wrap' in template
    assert "DOVA FUTURES LIMITED · RC No. 8219604" in template
    assert "DOVAFUTURES.COM" in template
    assert "Page 1 of 1" in template
    assert "position:fixed" in template
    renderer = (ROOT / "render.py").read_text(encoding="utf-8")
    assert "render_passes" in renderer
    assert "running_header" in renderer
    assert "totalPages" in renderer
