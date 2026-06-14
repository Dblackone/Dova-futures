import type { Metadata } from 'next';
import Link from 'next/link';
import { AccentBar } from '@/components/AccentBar';
import { SectionHeader } from '@/components/SectionHeader';
import { SafeImage } from '@/components/SafeImage';
import { Pill } from '@/components/Pill';
import { CTABlock } from '@/components/CTABlock';

export const metadata: Metadata = {
  title: 'Founder — Dova Futures',
  description:
    'Vollmann Olamide Akarakiri — CEO & Managing Director of Dova Futures Limited. BIM specialist, architectural designer, and site engineer.',
};

const BIM_SOFTWARE = [
  'Autodesk Revit',
  'Dynamo for Revit',
  'Lumion',
  'Qmotion',
  'AutoCAD',
  'Archicad',
];

const BIM_FOCUS = [
  'BIM Modeling',
  'BIM Coordination',
  'Construction Documentation',
  'Design Automation',
  'Parametric Design',
  'Architectural Visualization',
  'Quantity Extraction',
  'Clash Detection',
  'Digital Construction Workflows',
];

const ARCH_CAPABILITIES = [
  'Concept Design',
  'Design Development',
  'Architectural Documentation',
  'Space Planning',
  'Residential Design',
  'Commercial Design',
  'Mixed-Use Developments',
  'Renovation Projects',
  'Design Presentations',
  'Construction Drawings',
];

const SITE_STAGES: { stage: string; items: string[] }[] = [
  {
    stage: 'Pre-Construction',
    items: [
      'Site Assessments',
      'Feasibility Reviews',
      'Design Coordination',
      'Quantity Reviews',
      'Project Planning',
    ],
  },
  {
    stage: 'Construction Stage',
    items: [
      'Excavation Works',
      'Foundations',
      'Drainage Construction',
      'Concrete Works',
      'Blockwork',
      'Reinforcement Supervision',
      'Structural Construction',
      'Roofing Coordination',
      'Quality Control',
      'Contractor Management',
    ],
  },
  {
    stage: 'Finishing Stage',
    items: [
      'Interior Fit-Out',
      'Mechanical Coordination',
      'Electrical Coordination',
      'Plumbing Coordination',
      'Flooring Works',
      'Ceiling Works',
      'Painting Works',
      'External Works',
    ],
  },
  {
    stage: 'Landscape Stage',
    items: [
      'Hardscape Installation',
      'Softscape Development',
      'Drainage Integration',
      'Site Beautification',
      'Landscape Construction Management',
    ],
  },
];

const SECTORS = [
  'Residential Developments',
  'Commercial Buildings',
  'Mixed-Use Facilities',
  'Interior Fit-Out Projects',
  'Landscape Developments',
  'Drainage Infrastructure Projects',
  'Retail Store Construction',
  'Renovation Projects',
  'Design & Build Projects',
];

export default function FounderPage() {
  return (
    <>
      {/* ========================= HERO ========================= */}
      <section className="container-site pb-section pt-16 lg:pt-24">
        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Left: copy */}
          <div className="flex gap-5 sm:gap-6">
            <AccentBar className="mt-2" />
            <div className="animate-reveal-up">
              <p className="text-meta text-terracotta">Professional profile</p>
              <h1 className="mt-4 font-display text-display-lg font-bold text-charcoal">
                Vollmann Olamide Akarakiri
              </h1>
              <p className="mt-3 text-meta text-grey">
                CEO &amp; Managing Director · Dova Futures Limited
              </p>
              <p className="mt-6 max-w-prose text-lead text-grey">
                Multidisciplinary construction professional, BIM specialist,
                architectural designer, and site engineer with practical experience
                spanning the full project lifecycle — from concept development and
                design coordination to construction execution, finishing works, and
                landscaping.
              </p>
            </div>
          </div>

          {/* Right: profile image */}
          <SafeImage
            src="/images/vollmann-akarakiri.jpg"
            alt="Vollmann Olamide Akarakiri — CEO and Managing Director, Dova Futures Limited."
            ratio="portrait"
            fit="cover"
            priority
            className="animate-reveal-up [animation-delay:120ms]"
          />
        </div>
      </section>

      {/* ================== BIM & DIGITAL DELIVERY ================== */}
      <section className="bg-cream py-section" aria-labelledby="bim-heading">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <SectionHeader
                id="bim-heading"
                kicker="Discipline 01"
                title="BIM & Digital Delivery"
                intro="Design coordination and model delivery using industry-standard BIM tools, with Revit at the centre of every project model."
              />
            </div>
            <div className="pt-2">
              <p className="text-meta mb-4 uppercase tracking-meta text-grey">Software</p>
              <div className="flex flex-wrap gap-2">
                {BIM_SOFTWARE.map((s) => (
                  <Pill key={s} variant="accent">
                    {s}
                  </Pill>
                ))}
              </div>

              <p className="text-meta mb-4 mt-8 uppercase tracking-meta text-grey">
                Areas of focus
              </p>
              <div className="flex flex-wrap gap-2">
                {BIM_FOCUS.map((f) => (
                  <Pill key={f} variant="default">
                    {f}
                  </Pill>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================== ARCHITECTURAL DESIGN ================== */}
      <section className="container-site py-section" aria-labelledby="arch-heading">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pl-20">
          <div className="order-2 pt-2 lg:order-1">
            <p className="max-w-prose text-grey">
              Architectural design work covers the full range of building types —
              residential, commercial, mixed-use, and renovation. Deliverables range
              from early concept sketches and feasibility layouts through to
              permit-ready documentation sets and construction details.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {ARCH_CAPABILITIES.map((c) => (
                <Pill key={c} variant="default">
                  {c}
                </Pill>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeader
              id="arch-heading"
              kicker="Discipline 02"
              title="Architectural Design"
              intro="Concept-to-documentation design grounded in how a space is used, built, and experienced."
            />
          </div>
        </div>
      </section>

      {/* ================== SITE ENGINEERING ================== */}
      <section className="bg-charcoal py-section" aria-labelledby="site-heading">
        <div className="container-site">
          <SectionHeader
            id="site-heading"
            tone="dark"
            kicker="Discipline 03"
            title="Site Engineering"
            intro="Hands-on construction experience from ground-break to landscape completion — supervising each stage and holding the build to the drawing standard."
          />

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {SITE_STAGES.map((stage) => (
              <div key={stage.stage}>
                <p className="text-meta mb-4 uppercase tracking-meta text-terracotta">
                  {stage.stage}
                </p>
                <ul className="list-disc space-y-1 pl-5 text-grey">
                  {stage.items.map((item) => (
                    <li key={item} className="text-sm text-white/70">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================== SECTORS ================== */}
      <section className="container-site py-section" aria-labelledby="sectors-heading">
        <SectionHeader
          id="sectors-heading"
          kicker="Experience sectors"
          title="Project types."
          intro="Professional experience spans a range of building types across design, coordination, and construction."
        />
        <div className="mt-10 flex flex-wrap gap-3">
          {SECTORS.map((sector) => (
            <Pill key={sector} variant="default">
              {sector}
            </Pill>
          ))}
        </div>
      </section>

      {/* ============================================================
          CV SLOT — Education, Certifications & Formal Timeline
          Replace this section when the formal CV is provided.
          Content should include: degrees, institutions, graduation dates,
          professional certifications (e.g. ARB, NIOB, NIA membership),
          and the employment/project timeline.
          ============================================================ */}
      <section className="bg-cream" aria-label="Education and certifications">
        <div className="container-site py-section">
          <SectionHeader
            kicker="Education & credentials"
            title="Formal profile."
            intro="Full education history and professional certifications to follow."
          />
          {/* TODO: replace with real CV content */}
        </div>
      </section>

      {/* ================== PORTFOLIO LINK ================== */}
      <section className="container-site py-section" aria-labelledby="portfolio-heading">
        <div className="flex gap-5 sm:gap-6">
          <AccentBar className="mt-2" />
          <div>
            <p className="text-meta text-terracotta">Project work</p>
            <h2
              id="portfolio-heading"
              className="mt-3 font-display text-display-md font-bold text-charcoal"
            >
              The full portfolio.
            </h2>
            <p className="mt-5 max-w-prose text-grey">
              See the full project portfolio at dovafutures.com/portfolio — a
              collection of completed and in-progress work across architecture, BIM,
              interiors, landscape, and visualization.
            </p>
            <div className="mt-8">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 font-semibold text-terracotta transition-opacity hover:opacity-80"
              >
                View project portfolio <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================== CTA =========================== */}
      <CTABlock />
    </>
  );
}
