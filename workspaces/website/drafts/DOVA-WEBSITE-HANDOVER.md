# DOVA Futures Website — New Repository Handover

**Prepared:** 11 August 2026  
**Prepared by:** @lead/vector [codex]  
**Source repository:** `Dova-futures`  
**Destination:** export this file with the website source into the new website repository

> “Dora” in the request is treated as **DOVA Futures**. No separate Dora-named
> website subtree exists in this repository.

## 1. Handover scope

This document extracts the current public website product, its content model,
runtime behaviour, assets, brand/design-system rules, deployment constraints,
known inconsistencies and the work required before rebuilding it in a new repo.

The extraction is based on the current files, not on assumptions:

- `index.html` — live frontend SPA, including inline CSS and JavaScript.
- `server.js` — Express static server and contact-email endpoint.
- `data/projects.js` — intended project data source; currently not imported by
  `index.html`.
- `assets/`, `public/` — logo, project media, icons and app-shell assets.
- `documents/_ds/dova-futures-design-system-*/` — canonical token package,
  manifest and compiled design-system bundle.
- `company/brand.md` and `company/voice-and-tone.md` — governing brand and copy
  sources.
- `memory/archive/session-handoff-2026-06.md` — historical website handoff;
  useful context only, superseded by the current workspace files.

## 2. Product brief

DOVA Futures is a premium Nigerian design-build construction firm based in
Victoria Island, Lagos. The website exists to:

1. generate qualified project enquiries through email and WhatsApp;
2. establish premium brand credibility for HNI developers, corporate clients
   and aspirational homeowners in Lagos, Port Harcourt, Abuja and other Nigerian
   locations; and
3. explain the integrated design-build model: architecture, engineering,
   construction, interior finishing and handover under one roof.

The public voice is confident, precise and premium. Use British/Nigerian English,
short sentences, concrete nouns and restrained claims. Do not invent project
metrics, photographs, testimonials, prices or completion claims.

Canonical company details are maintained in `company/brand.md`; the current
website exposes the phone, email, Victoria Island office and CEO details listed
there. Do not create a second competing source of truth in the new repository.

## 3. Current source map

| Source | Role in the current product | New-repo treatment |
|---|---|---|
| `index.html` | Entire frontend: shell, seven views, styles, interactions and content | Extract as the behaviour/content reference; rebuild without changing the approved information architecture until reviewed |
| `server.js` | Express server, static serving, `POST /api/contact`, SPA catch-all | Preserve endpoint contract; deploy separately from static hosting |
| `data/projects.js` | Nine-record intended project catalogue and image pool | Normalise into the new content model; reconcile with hardcoded cards first |
| `assets/logo/` | Logo lockups | Preserve approved variants; use white lockup on dark surfaces and dark lockup on light surfaces |
| `assets/projects/` | Active card covers plus before/after hero pair | Keep referenced paths stable during migration; replace placeholders only with approved assets |
| `assets/Project Pictures/` | Larger project-photo archive used by some cards | Audit rights, status and filenames before carrying into a public repo |
| `assets/widgets/icons/` | WhatsApp, Instagram and TikTok SVG icons | Reuse; no emoji substitutes |
| `public/` | Favicons, app icons and legacy image/logo split | Preserve URL compatibility until a migration plan is approved |
| `documents/_ds/...` | Token files, manifest and compiled design-system bundle | Export the token files and the component contract; do not treat the README’s stale claims as current copy |
| `workspaces/website/memory/` | Operational status and backlog | Do not export as product code; use this handover as the clean transfer document |

## 4. Information architecture and features

The site is one HTML document with client-side navigation. Each view is a
`#page-*` container; `navigateTo(page)` hides every other view and scrolls the
main container to the top. There is no server-side router and no build step.

### Global shell

- Fixed/translucent dark navigation with blur and a thin architectural underline
  on hover.
- Desktop links: Home, About, Services, Projects, Process, Why Us, Contact.
- Primary nav CTA: **Start a Project** → Contact.
- Secondary external CTA: **Preorder Store** → `https://preorder.dovafutures.com`.
- Mobile full-screen menu with the same navigation and preorder link.
- Logo is an image link back to Home.
- Footer repeats DOVA FUTURES DEVELOPERS and the copyright line on each view.
- Social/contact links include WhatsApp, Instagram and TikTok; verify handles
  before finalising a new build.

### Home (`#page-home`)

1. **Hero:** “Designed With Intent. Built With Precision.” with supporting copy,
   Start Your Project and View Portfolio CTAs.
2. **Draft → Render reveal:** Ado Hall before/after pair. Mouse movement changes
   the split on desktop; touch dragging changes it on mobile. Split is clamped
   between 5% and 95%.
3. **About preview:** “Building Tomorrow’s Landmarks”, two paragraphs, CTA and a
   randomly selected project image from four active cover images.
4. **Services snapshot:** Architectural Planning, Building Construction and
   Premium Interior Finishing.
5. **Design-build proposition:** “Design & Build Under One Roof”, four benefits:
   unified methodology, streamlined approvals, reduced timeline/cost overruns,
   and direct accountability.
6. **Five-step process summary:** Consultation, Design, Engineering,
   Construction, Handover.
7. **Featured projects:** six cards with location labels and View All Projects.
8. **Why DOVA:** Design + Build Under One Roof, Cost Transparency, Structured
   Supervision and Premium Finishing.
9. **Preorder Store promotion:** external link for buyers and admin users.
10. **Closing CTA:** “Let’s Build It Properly.” with phone, email and project CTA.

### About (`#page-about`)

- “Who We Are” and “Company Introduction”.
- Positioning: integrated design-build construction and premium delivery.
- Three principles: Our Philosophy, Our Vision and Our Commitment.
- Closing statement: “Building Trust, One Project at a Time.”
- CTA: Work With Us.

### Services (`#page-services`)

Four service groups with descriptions and bullet lists:

- **Architectural Planning & Design:** concept development/master planning,
  schematic design/3D visualisation, construction documentation, permit and
  approval coordination.
- **Full-Scale Construction:** residential and commercial buildings, industrial
  facilities, infrastructure projects, renovations and expansions.
- **Premium Interior Finishing:** luxury residential interiors, corporate/office
  fit-outs, custom millwork/joinery, premium material selection.
- **Project Management:** budget planning/cost control, schedule management,
  quality assurance and stakeholder communication.

### Projects (`#page-projects`)

- Filter tabs: All, Residential, Commercial, Infrastructure, Interiors.
- Nine hardcoded cards in the current HTML:
  The Body Shop Retail Fit-Out; Palm Oil Drainage Infrastructure; Ikotun
  6-Flat Apartment; Ikeja Conference Room Fit-Out; Ado Hall of Worship; NCS
  Landscape Estate; Premium Residential Interior; Uselu Family Residence; and
  Hillside Concept Development.
- Filtering toggles each `.project-item` between `display: block` and `display:
  none` based on `data-category`.
- Some display tags do not equal filter categories: Ado is tagged “Civic” while
  filtered as Commercial; NCS is tagged “Landscape” while filtered as
  Infrastructure. Decide whether tags or categories are authoritative.

### Process (`#page-process`)

Five detailed stages, each with explanation and four delivery activities:

1. Consultation — requirements analysis, site assessment, budget framework,
   timeline planning.
2. Design — concept development, 3D visualisation, material selection, design
   refinement.
3. Engineering — structural engineering, MEP systems, permit documentation,
   cost engineering.
4. Construction — site preparation, structural works, systems installation,
   quality inspections.
5. Handover — final inspections, documentation package, client orientation,
   warranty support.

### Why Us (`#page-why`)

- Three introductory stat labels: Design–Build, Precision, Client.
- Four proof blocks: integrated design-build, cost transparency, structured
  supervision and premium finishing.
- Each block pairs a thin line icon with explanatory copy and an image.

### Contact (`#page-contact`)

- Contact details: phone, email, Victoria Island, Lagos and Nigeria.
- Leadership: Vollmann Akarakiri, CEO & Managing Director.
- Social icons: WhatsApp, Instagram and TikTok.
- Form fields: first name, last name, email, phone, project type, project details
  and hidden honeypot `website`.
- Project types: Residential, Commercial, Industrial, Infrastructure, Interior
  Finishing and Other.
- Actions: Send Email and Send via WhatsApp.
- Client-side validation requires first name, last name, email, project type and
  message, and checks a basic email pattern.

## 5. Runtime and integration contract

### Frontend

- Vanilla HTML/CSS/JS; no React, TypeScript, bundler or framework.
- Tailwind CSS `3.4.17` is loaded from CDN, with a large inline style block.
- Bebas Neue and Inter are loaded from Google Fonts.
- `/_sdk/element_sdk.js` and `/_sdk/data_sdk.js` are referenced by the current
  app shell; preserve only if the new hosting environment still supplies them.
- An Element SDK config hook can update company name, hero headline/subtext,
  CEO name, phone and email. It also exposes colour-editing capabilities, but
  the current DOVA token CSS is the intended visual authority.
- `prefers-reduced-motion` is handled in the inline CSS.

### Contact endpoint

`POST /api/contact` accepts JSON or URL-encoded data:

```json
{
  "firstName": "Test",
  "lastName": "User",
  "email": "t@t.com",
  "phone": "+234…",
  "projectType": "Residential",
  "message": "Hello",
  "website": ""
}
```

Server behaviour:

- requires `firstName`, `lastName`, `email`, `projectType` and `message`;
- validates email with `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`;
- rejects a non-empty `website` honeypot as a successful-looking “Message
  accepted.” response to avoid teaching bots the filter;
- creates a Nodemailer SMTP transport from environment variables;
- sends to `CONTACT_TO_EMAIL`, from `CONTACT_FROM_EMAIL`, and sets `replyTo` to
  the visitor’s email;
- returns JSON success/error messages; and
- logs server-side contact failures without logging the message body.

Required environment variables are `PORT`, `SMTP_HOST`, `SMTP_PORT`,
`SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO_EMAIL` and
`CONTACT_FROM_EMAIL`. Never place actual values in this handover or a public
repository.

### WhatsApp flow

The browser builds a URL for `https://wa.me/2348163675439` with the visitor’s
name, project type and details encoded as a message, then opens it in a new tab.
The phone number must remain sourced from the canonical brand/contact record.

## 6. Design system handover

### Authority and source files

Use the canonical files, in this order:

1. `company/brand.md` — legal identity, approved contact details, brand tokens.
2. `company/voice-and-tone.md` — public writing style.
3. `documents/_ds/dova-futures-design-system-*/tokens/*.css` — programmatic
   tokens.
4. `documents/_ds/dova-futures-design-system-*/styles.css` — consumer entry
   point importing fonts, colours, typography, spacing and effects.
5. `_ds_manifest.json` and `_ds_bundle.js` — component/UI-kit inventory and
   compiled preview implementation.

The new website should consume the token package rather than inventing local
hex values. The current `index.html` duplicates the token system inline; this
is a migration opportunity, not permission to change the visual language.

### Colour tokens

| Group | Tokens |
|---|---|
| Forest green | `--green-950 #0B221A`, `--green-900 #102A20`, `--green-800 #16382B`, `--green-700 #1C4636`, `--green-600 #265C46`, `--green-500 #357A5B`, `--green-400 #5AA17C`, `--green-300 #8FC4A9`, `--green-200 #BFDDCC`, `--green-100 #DCEBE2` |
| Natural neutrals | `--cream #F5EFE8`, `--sand #E8E1D5`, `--stone #D1CBC6`, `--ash #B9B3AD`, `--white #FFFFFF` |
| Ink/text | `--ink-900 #1A1A1A`, `--ink-800 #242424`, `--ink-700 #2C2C2C`, `--slate #4A4F5C`, `--slate-400 #6B7280` |
| Clay accent | `--clay #B85C38`, `--clay-dark #9E4F30`, `--clay-100 #F0DDD8` |
| Semantic | `--success #357A5B`, `--warning #C8881F`, `--danger #B23A2E`, `--info #2F6B7D` |
| Surface aliases | `--surface-page`, `--surface-card`, `--surface-sunken`, `--surface-tint`, `--surface-dark`, `--surface-darkest` |
| Text aliases | `--text-strong`, `--text-body`, `--text-muted`, `--text-on-dark`, `--text-on-dark-mut`, `--text-inverse` |
| Interaction aliases | `--brand`, `--brand-hover`, `--brand-active`, `--brand-soft`, `--accent`, `--accent-hover`, `--border-light`, `--border-dark`, `--focus-ring` |

Colour usage is intentionally restrained: deep green for primary/dark sections,
cream for material/light sections, clay as a small natural accent, ink/slate for
light-surface text and hairline borders for framing.

### Typography tokens

- Display: `--font-display: "Bebas Neue", "Arial Narrow", sans-serif`.
- Body/UI: `--font-body: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.
- Display scale: `--fs-display-2xl clamp(64px, 9vw, 128px)`, `--fs-display-xl
  clamp(48px, 6vw, 88px)`, `--fs-display-lg clamp(36px, 4.5vw, 60px)`,
  `--fs-display-md clamp(28px, 3vw, 40px)`.
- UI/body scale: 32px, 24px, 20px, 17px, 15px, 13px and 11px through
  `--fs-2xl` to `--fs-2xs`.
- Inter weights: 300, 400, 500, 600, 700 and 800.
- Line heights: `--lh-tight 1.12`, `--lh-snug 1.3`, `--lh-normal 1.6`,
  `--lh-relaxed 1.75`.
- Tracking: display `0.02em`, eyebrow `0.28em`, wide `0.08em`, tight `-0.02em`.
- Eyebrows are short uppercase Inter labels with wide tracking; display headings
  are condensed and all-caps; body copy is sentence case.

### Spacing, layout and effects

- Base grid: 8px rhythm, with the defined scale from 0 through 120px.
- Section padding: 120px desktop, 80px small screens.
- Container: 1280px maximum width and 32px horizontal padding.
- Radii: mostly sharp (`0`, `2px`, `4px`); use `8px`/`12px` only where the
  component needs softening; pills are for tags only.
- Borders: 1px hairlines; 2px for framing/outlined controls.
- Shadows: restrained `xs`, `sm`, `md`, `lg` plus green-tinted primary shadow.
- Motion: calm easing `cubic-bezier(0.22, 0.61, 0.36, 1)` with 0.18s, 0.3s
  and 0.55s durations. Respect reduced-motion preferences.
- Dark hero texture: 60px blueprint grid at low opacity.
- Image treatment: real architectural/project imagery with bottom or hero
  protection gradients for legibility; avoid decorative purple/blue gradients.
- Nav treatment: approximately 90% opaque surface plus 12px backdrop blur.

### Iconography and components

Use 1.5px-stroke geometric line icons on a 24px grid. Reuse the supplied social
SVGs; Lucide is the documented closest substitute when a new line icon is
needed. Do not use emoji in the rebuilt premium surface, even though the current
HTML still contains a shopping-cart emoji and a reveal-handle glyph.

The design-system manifest exposes these components:

- Core: `Badge`, `Button`, `Eyebrow`, `SectionHeader`, `Stat`, `Tag`.
- Forms: `Field`, `Input`, `Textarea`.
- Surfaces: `Card`, `ServiceCard`, `ProjectCard`.

Component intent:

- Buttons support primary, secondary, cream and outline-light variants with
  small/medium/large sizing, disabled state and restrained hover lift/inversion.
- Eyebrow and SectionHeader provide the standard kicker-plus-display-heading
  pattern.
- Stat provides a large Bebas value and compact uppercase trust label.
- Badge/Tag provide small category/status treatments; pills are not a general
  card shape.
- Field wraps a label, control and optional hint/error.
- Input/Textarea use cream-tinted surfaces, inset treatment and green focus ring.
- Card uses a hairline border, soft shadow and a 4px hover lift.
- ServiceCard uses an icon framed in a box plus title and description.
- ProjectCard uses a 4:3 image, bottom protection gradient, category tag and
  caption reveal.

### Design-system package caveat

The current disk snapshot contains token CSS, `styles.css`, `_ds_manifest.json`,
`_ds_bundle.js`, README and adherence configuration. The manifest/bundle reference
component and UI-kit source paths, but those individual JSX/guideline files are
not present as separate files in this repository snapshot. Treat the bundle as a
preview/reference artifact; reconstruct or export source components deliberately
in the new repo rather than assuming those paths are available.

The design-system README also contains an older product narrative (“Rethink the
future”, founder details and sample metrics) that conflicts with the current
canonical brand policy. Carry over the visual rules and component contract, but
re-validate all public claims against `company/brand.md` and supplied evidence.

## 7. Content and asset migration notes

- `data/projects.js` contains nine generic catalogue records, while the live HTML
  contains nine different/harder-coded presentation records. Consolidate them
  into one reviewed data source before rebuilding.
- Several card images come from `assets/Project Pictures/` with spaces and mixed
  capitalisation. Normalise filenames only after updating every reference and
  checking public asset rights.
- The hero pair currently uses Ado Hall imagery labelled “Draft” and “Render”.
  The design-system guidance allows draft/render imagery, but the new repo should
  preserve accurate labels and never present an AI render as a built photograph.
- `assets/projects/*.jpg` includes tiny placeholder files. Do not mistake those
  placeholders for approved project photography.
- The OG image currently points to the white logo PNG and is explicitly marked
  for replacement with an approved 1200×630 project image.
- The site footer still says © 2025; update only when the new site’s legal/copy
  review confirms the correct year.
- The current nav contains an emoji preorder label; replace it with the supplied
  icon or text-only treatment in the new build.

## 8. Deployment constraints

The current production website ships from the repository root through
`.github/workflows/deploy.yml` and `CNAME`. Until the migration is separately
planned and verified, do not move or rename `index.html`, `server.js`,
`data/`, `public/`, `assets/`, `package.json`, `CNAME` or the workflow.

The Express backend is not provided by GitHub Pages. It needs a separate host and
SMTP environment. The current workspace records that SMTP is not live and the
contact flow still needs a real test submission to `info@dovafutures.com`.

## 9. Open decisions and acceptance checklist

Before the new repository is considered ready:

- [ ] Approve the destination repo structure and hosting split.
- [ ] Preserve the `/api/contact` contract or document an approved replacement.
- [ ] Configure SMTP on the backend host and complete a real email test.
- [ ] Reconcile the nine hardcoded project cards with `data/projects.js`.
- [ ] Confirm project-photo permissions and replace placeholders.
- [ ] Confirm Instagram/TikTok handles and all social URLs.
- [ ] Produce and wire an approved 1200×630 OG image.
- [ ] Decide whether Element SDK files remain in the product.
- [ ] Replace emoji/glyph shortcuts with approved icons.
- [ ] Verify keyboard navigation, focus states, reduced motion, image alt text,
  mobile layout and form error states.
- [ ] Test the static site and API independently; do not assume GitHub Pages can
  run Express.
- [ ] Run a visual review against the canonical tokens and the approved DOVA
  voice before promotion.

## 10. Archive and cleanup boundary

An archive index has been created at `workspaces/website/archive/README.md`.
No live runtime files were moved in this extraction. That is intentional:

- the website is deployed from the repo root;
- `assets/` and `public/` contain referenced public URLs and mixed-use imagery;
- no isolated obsolete “Dora features” source package was found; and
- the older website handoff is already retained at
  `memory/archive/session-handoff-2026-06.md`.

Moving live assets or root app files into an archive without a migration plan
would create broken URLs or break deployment. The archive index records this
decision so the new-repo export is not confused with a destructive cleanup.

## 11. Verification record

This handover was compiled from direct file inspection on 11 August 2026. The
following were checked:

- seven page containers and their navigation targets;
- hero reveal, mobile menu, project filtering, random about image and contact
  handlers;
- current server validation, honeypot and SMTP contract;
- project data/configuration and referenced asset paths;
- design-system README, token CSS, `_ds_manifest.json`, `_ds_bundle.js` and the
  actual on-disk file inventory;
- current workspace memory, next-up queues, decision logs and archive history.

No website runtime code, public asset or design-system token was changed by this
handover task. The generated Markdown is a draft for export and new-repo
development; principal approval and independent checker review remain required
before promotion or publication.
