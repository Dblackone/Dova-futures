"""Render completed company-document-builder HTML as a branded A4 PDF.

The renderer uses two identical pagination passes. The first pass adds the
compact running header and footer; the second pass keeps the document's full
first-page letterhead. Page one from the second pass is spliced with pages two
onward from the first pass.
"""

from __future__ import annotations

import argparse
import html
import os
import re
import tempfile
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent
OUTPUT_PDF = PROJECT_ROOT / "output" / "pdf"
DEFAULT_CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"


class DocumentRenderError(Exception):
    """An expected PDF rendering failure."""


def safe_filename(value: str, default: str) -> str:
    candidate = value or default
    candidate = re.sub(r"\.(?:html?|pdf)$", "", candidate, flags=re.IGNORECASE)
    candidate = re.sub(r"[^A-Za-z0-9._-]+", "-", candidate).strip(".-_")
    return candidate or default


def document_metadata(input_path: Path) -> tuple[str, str]:
    source = input_path.read_text(encoding="utf-8")
    title_match = re.search(r"<title[^>]*>(.*?)</title>", source, flags=re.IGNORECASE | re.DOTALL)
    title = re.sub(r"\s+", " ", html.unescape(title_match.group(1))).strip() if title_match else input_path.stem
    reference_match = re.search(
        r"\b(?:RPT|QUO|QTE|INV|CC|SAL|IL|EL|PR|MPR|MPA)[-A-Z0-9/]+\b", source, flags=re.IGNORECASE
    )
    reference = reference_match.group(0) if reference_match else input_path.stem
    return title, reference


def running_header(title: str) -> str:
    safe_title = html.escape(title)
    return f"""
    <div style="font-size:8px;font-family:Arial,Helvetica,sans-serif;width:100%;
                padding:7mm 12.7mm 0;box-sizing:border-box;
                -webkit-print-color-adjust:exact;">
      <table style="width:100%;border-collapse:collapse;font-size:8px;"><tr>
        <td style="text-align:left;font-size:8px;font-weight:bold;color:#1C4636;letter-spacing:.14em;">DOVA FUTURES LIMITED</td>
        <td style="text-align:right;font-size:7.5px;color:#6B7280;letter-spacing:.05em;">{safe_title}</td>
      </tr></table>
      <div style="height:1.5px;background:#B85C38;width:100%;margin-top:3px;"></div>
    </div>
    """


def running_footer(reference: str) -> str:
    safe_reference = html.escape(reference)
    return f"""
    <div style="font-size:7px;font-family:Arial,Helvetica,sans-serif;width:100%;
                padding:0 12.7mm 6mm;box-sizing:border-box;color:#6B7280;
                -webkit-print-color-adjust:exact;">
      <div style="height:1px;background:#D1CBC6;width:100%;margin-bottom:3px;"></div>
      <table style="width:100%;border-collapse:collapse;font-size:7px;"><tr>
        <td style="text-align:left;color:#6B7280;">DOVA Futures Limited · RC No. 8219604</td>
        <td style="text-align:center;color:#1C4636;font-weight:bold;letter-spacing:.12em;">DOVAFUTURES.COM</td>
        <td style="text-align:right;color:#6B7280;">{safe_reference} · Page <span class="pageNumber"></span> of <span class="totalPages"></span></td>
      </tr></table>
    </div>
    """


def render_passes(input_path: Path, title: str, reference: str, temporary: Path) -> tuple[Path, Path]:
    try:
        from playwright.sync_api import sync_playwright
    except Exception as exc:
        raise DocumentRenderError(f"Playwright is required for the two-pass branded renderer: {exc}") from exc

    chrome = os.environ.get("CHROME_PATH") or DEFAULT_CHROME
    if not Path(chrome).exists():
        raise DocumentRenderError(f"Chrome executable not found: {chrome}")

    header_pdf = temporary / "with-running-header.pdf"
    first_page_pdf = temporary / "first-page-letterhead.pdf"
    footer = running_footer(reference)
    common = {
        "format": "A4",
        "print_background": True,
        "prefer_css_page_size": False,
        "display_header_footer": True,
        "margin": {"top": "20mm", "bottom": "16mm", "left": "0", "right": "0"},
        "footer_template": footer,
    }

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(executable_path=chrome, headless=True)
        try:
            page = browser.new_page()
            page.goto(input_path.resolve().as_uri(), wait_until="load")
            page.add_style_tag(content=".footer { display: none !important; }")
            page.add_style_tag(content="@page { size: A4; margin: 20mm 0 16mm 0 !important; } @page :first { margin-top: 0 !important; }")
            page.pdf(path=str(header_pdf), header_template=running_header(title), **common)
            page.pdf(path=str(first_page_pdf), header_template="<div></div>", **common)
        finally:
            browser.close()
    return header_pdf, first_page_pdf


def splice_pages(header_pdf: Path, first_page_pdf: Path, target: Path) -> int:
    try:
        from pypdf import PdfReader, PdfWriter
    except Exception as exc:
        raise DocumentRenderError(f"pypdf is required to combine the two PDF passes: {exc}") from exc

    running = PdfReader(str(header_pdf))
    first_page = PdfReader(str(first_page_pdf))
    if len(running.pages) != len(first_page.pages):
        raise DocumentRenderError(
            f"Pagination drift between renderer passes: running-header={len(running.pages)}, "
            f"first-page={len(first_page.pages)}"
        )
    writer = PdfWriter()
    writer.add_page(first_page.pages[0])
    for page in running.pages[1:]:
        writer.add_page(page)
    with target.open("wb") as stream:
        writer.write(stream)
    return len(running.pages)


def render_pdf(input_path: Path, output_name: str | None = None) -> Path:
    if not input_path.exists():
        raise DocumentRenderError(f"Input HTML not found: {input_path}")
    if input_path.suffix.lower() not in {".html", ".htm"}:
        raise DocumentRenderError(f"Input must be an HTML file: {input_path}")
    target = OUTPUT_PDF / f"{safe_filename(output_name, input_path.stem)}.pdf"
    target.parent.mkdir(parents=True, exist_ok=True)
    title, reference = document_metadata(input_path)
    try:
        with tempfile.TemporaryDirectory(prefix="dova-pdf-") as directory:
            header_pdf, first_page_pdf = render_passes(input_path, title, reference, Path(directory))
            pages = splice_pages(header_pdf, first_page_pdf, target)
    except DocumentRenderError:
        raise
    except Exception as exc:
        raise DocumentRenderError(f"Could not render branded PDF from {input_path}: {exc}") from exc
    print(f"INFO: rendered {pages} page(s); full letterhead on page 1, running header from page 2")
    return target


def main() -> int:
    parser = argparse.ArgumentParser(description="Render completed company document HTML as a branded A4 PDF.")
    parser.add_argument("--input", required=True, type=Path)
    parser.add_argument("--output", dest="output_name")
    args = parser.parse_args()
    try:
        path = render_pdf(args.input, args.output_name)
    except DocumentRenderError as exc:
        print(f"ERROR: {exc}")
        return 1
    print(f"OK PDF -> {path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
