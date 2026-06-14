import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionHeader } from '@/components/SectionHeader';
import { CTABlock } from '@/components/CTABlock';
import { Pill } from '@/components/Pill';
import { SERVICES } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Services — Dova Futures',
  description:
    'Architecture, BIM/Revit, interior design, landscape, construction and visualization from Dova Futures. One team from concept to handover.',
};

const SERVICE_DETAILS: Record<string, string> = {
  Architecture:
    'From site appraisal and feasibility through to permitted drawings ready for the contractor.',
  'BIM / Revit':
    'Revit models built to LOD 300 minimum, coordinated across structure, MEP, and architecture.',
  'Interior Design':
    'FF&E schedules, material boards, lighting plans, and construction detailing for interiors.',
  Landscape:
    'Planting plans, hardscape drawings, drainage routing, and specification to match the build standard.',
  Construction:
    'Site presence, contractor briefing, snagging, and quality sign-off at each stage.',
  Visualization:
    'Lumion and photorealistic renders for client approval, planning, and marketing — watermarked as 3D visualisations.',
};

const BIM_PILLS = [
  'Revit Modeling',
  'Clash Detection',
  'Design Automation',
  'Parametric Design',
  'Quantity Extraction',
  'Construction Documentation',
  'BIM Coordination',
  'Dynamo Scripts',
];

export default function ServicesPage() {
  return (
    <>
      {/* ========================= INTRO ========================= */}
      <section className="container-site py-section">
        <SectionHeader
          kicker="Our disciplines"
          title="One team, the whole build."
          intro="Six disciplines, one studio. Architecture, BIM, interiors, landscape, construction, and visualization — coordinated from brief to handover."
        />

        {/* ===================== ZIG-ZAG LIST ===================== */}
        <div className="mt-14 space-y-px overflow-hidden rounded-card border-hair border-hairline bg-hairline">
          {SERVICES.map((service, i) => (
            <div
              key={service.title}
              className={`grid items-start gap-2 bg-white px-6 py-7 sm:grid-cols-[auto_1fr] sm:gap-10 sm:px-10 ${
                i % 2 === 1 ? 'sm:pl-24' : ''
              }`}
            >
              <h3 className="font-display text-display-sm font-semibold text-charcoal sm:w-64">
                {service.title}
              </h3>
              <div>
                <p className="max-w-prose text-grey">{service.summary}</p>
                <p className="mt-3 max-w-prose text-sm text-grey/80">
                  {SERVICE_DETAILS[service.title]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =================== BIM CONSULTING DARK =================== */}
      <section className="bg-charcoal text-white" aria-labelledby="bim-heading">
        <div className="container-site py-section">
          <SectionHeader
            id="bim-heading"
            tone="dark"
            kicker="BIM consulting"
            title="Coordination before site saves more than it costs."
            intro="We run BIM coordination as a standalone service — bringing discipline models together, running clash detection, and producing coordinated documentation that reduces RFIs and re-work on site."
          />

          <div className="mt-10 flex flex-wrap gap-3">
            {BIM_PILLS.map((label) => (
              <Pill key={label} variant="accent">
                {label}
              </Pill>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-terracotta px-7 py-4 text-base font-semibold text-white transition-colors duration-300 ease-spring hover:bg-terracotta-hover"
            >
              Discuss a BIM project
            </Link>
          </div>
        </div>
      </section>

      {/* =========================== CTA =========================== */}
      <CTABlock />
    </>
  );
}
