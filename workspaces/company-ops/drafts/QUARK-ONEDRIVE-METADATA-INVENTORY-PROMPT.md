# Quark prompt — metadata-only OneDrive inventory and reorganization plan

Paste the prompt below into Quark / ChatGPT Workflow. This is an **inventory and
planning run only**. It does not authorize any file or folder reorganization.

---

## Prompt

Act as a forensic information architect for DOVA Futures Limited. Inspect my
local OneDrive tree using **filesystem metadata only**, produce a complete
inventory report, and propose a future reorganization plan. Do not execute the
plan.

### 1. Scope

Inventory this exact root and all permitted descendants:

`C:\Users\User\OneDrive`

If that exact path does not exist or is not accessible, stop and tell me. Do
not silently substitute another root.

### 2. Absolute GitHub exclusion

The following folder and every descendant are completely out of scope:

`C:\Users\User\OneDrive\Documents\GitHub`

For that excluded folder:

- Do not enter it.
- Do not enumerate or list its children.
- Do not count its files or subfolders.
- Do not read or stat any child item.
- Do not resolve any path, shortcut, symbolic link, junction, or reparse point
  into it.
- Do not open, rename, move, copy, delete, modify, hydrate, or otherwise touch
  anything in it.
- In the report, record only that the excluded folder exists and was excluded.
  Do not provide details about its contents.

This exclusion overrides every other instruction in this prompt.

### 3. Metadata-only rule — never open file contents

Do not open, read, parse, preview, render, execute, import, OCR, transcribe, or
inspect the contents of any file. Do not create thumbnails. Do not inspect
Office document properties when that operation opens/parses the document. Do
not calculate hashes. Do not use content search. Do not download or force
hydration of cloud-only OneDrive placeholders.

You may collect only metadata already exposed by the filesystem, such as:

- file or folder name;
- extension / filesystem type;
- full path and parent path;
- size, where already available without hydration;
- created, modified, and last-accessed timestamps, where available;
- filesystem attributes such as hidden or read-only;
- OneDrive availability state, where exposed without downloading;
- hierarchy depth;
- folder/file counts for permitted folders;
- repeated names, similar names, extension distributions, and size summaries.

Any conclusion about a file's subject or relationship must be labelled as an
inference from its name/path/metadata. Never claim that two files contain the
same content merely because their names or sizes look similar.

Do not follow shortcuts, symbolic links, junctions, or other reparse points.
Record each as a link-like item and its visible target only if the target is
available as metadata; never traverse it. This is especially strict for links
that point outside the OneDrive root or into the excluded GitHub folder.

### 4. No-change rule

This is Phase A: inventory and planning only.

Do not move, rename, copy, delete, deduplicate, archive, create project folders,
or change any existing item. Do not alter permissions or OneDrive status. The
only file you may create is the Markdown report requested below. Do not
overwrite an existing report: if the output name already exists, append a
timestamp to the new filename.

### 5. Required report

Write the complete report incrementally to:

`C:\Users\User\OneDrive\DOVA-OneDrive-Metadata-Inventory-and-Reorganisation-Plan.md`

The Markdown file is the primary deliverable and must be understandable when I
bring it into another ChatGPT/Codex session. Do not rely on facts that appear
only in your chat response. If the inventory is large, continue writing to the
same Markdown file in grouped sections rather than omitting permitted items.

Use these sections:

1. **Scope and safety attestation** — root inspected, exact GitHub exclusion,
   confirmation that no contents were opened and no existing item was changed.
2. **Method and metadata fields** — tools/commands used, metadata collected,
   cloud-placeholder handling, errors, inaccessible paths, and limitations.
3. **Executive summary** — total permitted files/folders, known total size,
   local/cloud-only counts if available, oldest/newest metadata dates, repeated
   names, and key organization risks.
4. **Top-level OneDrive map** — one table per top-level folder with path,
   purpose inferred from names, file/folder counts, known size, latest modified
   date, dominant types, and confidence.
5. **Full hierarchy overview** — every permitted folder, grouped logically,
   with counts and dominant file types.
6. **Project candidates** — infer and group likely company/construction
   projects from names only. Explicitly look for variants related to FHS / pool
   / Ibafo, C.K. Musa / CK Mustapha / Afuze, ICM / Ikeja Mall, Grail Centre,
   and any other project candidates. Show evidence from names/paths and a
   confidence rating; do not force uncertain mappings.
7. **File-type and size analysis** — extension totals, known size totals,
   unusually large items, cloud-only items, likely BIM/CAD/Revit files,
   documents, spreadsheets, images, media, archives, and unknown types.
8. **Name-based duplicate and anomaly review** — exact duplicate names,
   near-duplicate names, apparent revisions, `copy`, `new`, `latest`, `final`,
   inconsistent dates/casing/spelling, and likely temporary files. These are
   candidates only, not content-confirmed duplicates.
9. **Risks and manual-review queue** — ambiguous ownership, sensitive-looking
   names, conflicting project mappings, broken/inaccessible items, path-length
   risks, and anything that must be decided by a person.
10. **Proposed target OneDrive architecture** — recommend, but do not create,
    a clear company tree based on the evidence. Use this as the starting model
    and change it only with an explained reason:

    ```text
    DOVA Futures Limited/
    ├── 00_Company_Admin/
    ├── 01_Projects/
    ├── 02_Standards_and_Templates/
    ├── 03_BIM_Library/
    ├── 04_Business_Development/
    ├── 05_Training_and_Reference/
    ├── 90_Inbox_and_Needs_Review/
    └── 99_Archive/
    ```

11. **Proposed project folder standard** — for each construction project,
    recommend this internal tree without creating it:

    ```text
    00_Project_Admin/
    01_Site_Information/
    02_Planning_and_Compliance/
    03_Design/
    04_BIM_and_CAD/
      01_WIP/
      02_Shared/
      03_Published/
      04_Archive/
      Families/
      Exports/
      Templates/
    05_Consultants/
    06_Applications/
    07_Issued_Documents/
    08_Exports/
    09_Construction/
    99_Archive/
    ```

12. **Proposed naming rules and examples** — use the DOVA conventions below,
    but do not rename anything:

    - Project code form: `DOVA-[YY]-[SEQ]-[SHORT-NAME]`.
    - Never invent or assign `SEQ`. New codes will later come from the
      append-only project register after human approval.
    - Preserve existing historical project codes unless a later approved
      mapping explicitly changes them.
    - General file: `[ProjectCode]_[FilePurpose]_[Discipline]_[Phase]_[Revision].[ext]`.
    - Revit model: `[ProjectCode]_[Discipline]_[Phase].rvt`.
    - Site photo: `[ProjectCode]_SITE-PHOTO_G_NA_YYYYMMDD_001.jpg`.
    - Do not recommend ambiguous lifecycle labels such as `final`, `latest`, or
      `new`; use controlled revisions and archive superseded versions.

13. **Migration waves and rollback plan** — propose small, reviewable waves,
    beginning with a dry run and path-mapping approval. Include checkpoints,
    conflict handling, OneDrive sync precautions, validation after each wave,
    and a reversible rollback strategy. Do not execute any wave.
14. **Path Mapping Register** — include a proposal table with these exact
    columns:

    `CurrentPath | ProposedPath | Category | Confidence | MetadataEvidence | Reason | ConflictOrRisk | RequiresHumanApproval`

    Every row is a proposal only. Do not assign new project codes in this table.
15. **Questions and unknowns** — decisions needed before any reorganization.
16. **Full metadata appendix** — list every permitted file and folder grouped by
    parent folder. For files include path, extension/type, known size,
    timestamps, attributes, and OneDrive state where available. Mark missing
    metadata as unavailable. Do not include any GitHub descendant.

### 6. Quality checks before finishing

Before you finish, verify and record that:

- no file content was opened or parsed;
- no cloud-only item was hydrated;
- no existing item was moved, renamed, copied, deleted, or modified;
- `C:\Users\User\OneDrive\Documents\GitHub` was never traversed;
- the report contains no GitHub child names or counts;
- every recommendation is clearly separated from observed metadata;
- uncertain project mappings and duplicate candidates are labelled uncertain;
- the Markdown report exists and its exact final path is stated.

In chat, return only a concise completion summary, major limitations, and the
exact path of the Markdown report. Do not reorganize anything until I return
with an approved plan.

---

When Quark finishes, bring the resulting Markdown file back into this task. We
will use it to review the proposed OneDrive structure, confirm project mappings,
and define the final naming/path register before authorizing any file moves.
