"""Build deterministic company documents from registered Jinja templates."""

from __future__ import annotations

import argparse
import copy
import json
import re
from decimal import Decimal, InvalidOperation, ROUND_HALF_UP
from pathlib import Path
from typing import Any

from jinja2 import Environment, FileSystemLoader, StrictUndefined, TemplateError, select_autoescape
from jsonschema import Draft202012Validator, FormatChecker
from jsonschema.exceptions import SchemaError


PROJECT_ROOT = Path(__file__).resolve().parent
OUTPUT_HTML = PROJECT_ROOT / "output" / "html"
REGISTRY_PATH = PROJECT_ROOT / "config" / "documents.json"


class DocumentBuildError(Exception):
    """An expected document build failure with a user-facing message."""


def load_json(path: Path, label: str) -> dict[str, Any]:
    if not path.exists():
        raise DocumentBuildError(f"{label} not found: {path}")
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        raise DocumentBuildError(f"Invalid JSON in {label} {path}: line {exc.lineno}, column {exc.colno}: {exc.msg}") from exc
    if not isinstance(value, dict):
        raise DocumentBuildError(f"{label} must contain a JSON object: {path}")
    return value


def load_registry() -> dict[str, Any]:
    registry = load_json(REGISTRY_PATH, "document registry")
    if not registry:
        raise DocumentBuildError("Document registry is empty")
    return registry


def format_validation_error(error: Any) -> str:
    path = ".".join(str(part) for part in error.absolute_path) or "document"
    return f"{path}: {error.message}"


def validate_data(data: dict[str, Any], schema_path: Path) -> None:
    schema = load_json(schema_path, "JSON schema")
    try:
        validator = Draft202012Validator(schema, format_checker=FormatChecker())
        errors = sorted(validator.iter_errors(data), key=lambda item: list(item.absolute_path))
    except SchemaError as exc:
        raise DocumentBuildError(f"Invalid JSON schema {schema_path}: {exc.message}") from exc
    if errors:
        details = "; ".join(format_validation_error(error) for error in errors)
        raise DocumentBuildError(f"Input data failed schema validation: {details}")


def decimal(value: Any, field: str) -> Decimal:
    try:
        number = Decimal(str(value))
    except (InvalidOperation, ValueError, TypeError) as exc:
        raise DocumentBuildError(f"{field} must be a valid number") from exc
    if not number.is_finite():
        raise DocumentBuildError(f"{field} must be finite")
    return number


def money(value: Decimal, places: int) -> str:
    quantum = Decimal(1).scaleb(-places)
    return f"{value.quantize(quantum, rounding=ROUND_HALF_UP):,.{places}f}"


def calculate_quotation(data: dict[str, Any]) -> dict[str, Any]:
    result = copy.deepcopy(data)
    currency = result.setdefault("currency", {"symbol": "₦", "decimal_places": 2})
    places = int(currency.get("decimal_places", 2))
    if places < 0 or places > 6:
        raise DocumentBuildError("currency.decimal_places must be between 0 and 6")
    symbol = str(currency.get("symbol", "₦"))

    subtotal = Decimal("0")
    for index, item in enumerate(result["items"], start=1):
        quantity = decimal(item["quantity"], f"items[{index}].quantity")
        rate = decimal(item["rate"], f"items[{index}].rate")
        amount = quantity * rate
        subtotal += amount
        item["formatted_quantity"] = f"{quantity:g}"
        item["formatted_rate"] = money(rate, places)
        item["amount"] = str(amount)
        item["formatted_amount"] = money(amount, places)

    tax_config = result.get("tax") or {"enabled": False, "rate_percent": 0}
    tax_rate = decimal(tax_config.get("rate_percent", 0), "tax.rate_percent")
    tax_amount = (subtotal * tax_rate / Decimal("100")) if tax_config.get("enabled") else Decimal("0")
    discount_config = result.get("discount") or {"enabled": False, "amount": 0}
    discount = decimal(discount_config.get("amount", 0), "discount.amount") if discount_config.get("enabled") else Decimal("0")
    grand_total = subtotal + tax_amount - discount
    if grand_total < 0:
        raise DocumentBuildError("Calculated grand total cannot be negative")

    result["currency"]["symbol"] = symbol
    result["currency"]["decimal_places"] = places
    result["calculations"] = {
        "subtotal": str(subtotal),
        "tax_amount": str(tax_amount),
        "discount_amount": str(discount),
        "grand_total": str(grand_total),
        "formatted_subtotal": money(subtotal, places),
        "formatted_tax_amount": money(tax_amount, places),
        "formatted_discount_amount": money(discount, places),
        "formatted_grand_total": money(grand_total, places),
        "tax_rate_percent": f"{tax_rate:g}",
        "tax_enabled": bool(tax_config.get("enabled")),
        "discount_enabled": bool(discount_config.get("enabled")),
    }
    return result


CALCULATORS = {"quotation": calculate_quotation}


def prepare_data(document_type: str, data: dict[str, Any], calculator: str | None) -> dict[str, Any]:
    if not calculator:
        return data
    try:
        return CALCULATORS[calculator](data)
    except KeyError as exc:
        raise DocumentBuildError(f"No calculator is registered for '{calculator}'") from exc


def safe_filename(value: str, default: str) -> str:
    candidate = value or default
    candidate = re.sub(r"\.(?:html?|pdf)$", "", candidate, flags=re.IGNORECASE)
    candidate = re.sub(r"[^A-Za-z0-9._-]+", "-", candidate).strip(".-_")
    return candidate or default


def build_document(document_type: str, data_path: Path, output_name: str | None = None) -> Path:
    registry = load_registry()
    if document_type not in registry:
        known = ", ".join(sorted(registry))
        raise DocumentBuildError(f"Unknown document type '{document_type}'. Registered types: {known}")
    config = registry[document_type]
    data = load_json(data_path, "input data")
    schema_value = config.get("schema")
    if schema_value:
        validate_data(data, PROJECT_ROOT / "data" / schema_value)
    data = prepare_data(document_type, data, config.get("calculator"))

    template_value = config.get("template")
    if not template_value:
        raise DocumentBuildError(f"Document type '{document_type}' has no template configured")
    template_path = PROJECT_ROOT / "templates" / template_value
    if not template_path.exists():
        raise DocumentBuildError(f"Template not found for '{document_type}': {template_path}")

    environment = Environment(
        loader=FileSystemLoader(str(PROJECT_ROOT / "templates")),
        undefined=StrictUndefined,
        autoescape=select_autoescape(["html", "xml"]),
    )
    try:
        rendered = environment.get_template(template_value).render(**data)
    except TemplateError as exc:
        raise DocumentBuildError(f"Could not render '{document_type}' template: {exc}") from exc

    default_name = f"{config.get('output_prefix', document_type)}-{data.get('document_reference', 'draft')}"
    target = OUTPUT_HTML / f"{safe_filename(output_name, default_name)}.html"
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(rendered, encoding="utf-8")
    return target


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Build a company document HTML file from JSON data.")
    parser.add_argument("--type", required=True, dest="document_type")
    parser.add_argument("--data", required=True, type=Path)
    parser.add_argument("--output", dest="output_name")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    try:
        path = build_document(args.document_type, args.data, args.output_name)
    except DocumentBuildError as exc:
        print(f"ERROR: {exc}")
        return 1
    print(f"OK HTML -> {path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
