import type { Metadata } from 'next';
import Link from 'next/link';
import { AccentBar } from '@/components/AccentBar';
import { Pill } from '@/components/Pill';
import { Card } from '@/components/Card';
import { SectionHeader } from '@/components/SectionHeader';
import { ProjectCard } from '@/components/ProjectCard';
import { CTABlock } from '@/components/CTABlock';
import { projectsByDiscipline } from '@/content/projects';

export const metadata: Metadata = {
  title: 'BIM Specialist',
  description:
    'BIM and Revit specialism — coordinated models, Dynamo automation, Navisworks coordination, and construction documentation.',
};

// Software actually used (from the source bim.html). No fabricated metrics.
const SOFTWARE = [
  'Autodesk Revit',
  'Dynamo for Revit',
  'Navisworks',
  'AutoCAD',
  'Microsoft Project',
  'MS Excel',
];

// BIM-focused highlights — described faithfully from the source, no invented
// numbers. These are capability descriptions, not stats.
const HIGHLIGHTS = [
  {
    tag: 'Revit · Modelling',
    title: 'Coordinated 3D models',
    body: 'Architectural, structural and MEP elements modelled and coordinated in Autodesk Revit so the model is the single source the drawings come from.',
  },
  {
    tag: 'Dynamo · Automation',
    title: 'Design automation',
    body: 'Custom Dynamo scripts automate repetitive Revit tasks — sheet creation, data population and documentation workflows — cutting manual coordination errors.',
  },
  {
    tag: 'Documentation',
    title: 'Construction documentation',
    body: 'Complete, coordinated CD sets extracted directly from the Revit model: plans, sections, elevations, schedules and specifications.',
  },
  {
    tag: 'Navisworks · Coordination',
    title: 'Multi-discipline coordination',
    body: 'Clashes between architectural, structural and MEP models resolved before construction commences, using Navisworks coordination workflows.',
  },
  {
    tag: 'Revit · Schedules',
    title: 'Quantity extraction',
    body: 'Schedule-driven quantity take-offs linked directly to the model, so quantities update with the design for accurate cost planning.',
  },
  {
    tag: 'Visualisation',
    title: 'Model-based renders',
    body: 'High-fidelity renders and walkthroughs produced from the Revit model for client presentation and design review — labelled as 3D visualisations.',
  },
];

// BIM expertise areas (from the source "Capabilities" section). Real skills.
const CAPABILITIES = [
  {
    title: 'BIM execution planning',
    body: 'BIM Execution Plans (BEP) aligned with ISO 19650 and project-specific BIM requirements.',
  },
  {
    title: 'Revit family creation',
    body: 'Custom Revit families for project-specific elements, including parametric and annotative families.',
  },
  {
    title: 'Design automation',
    body: 'Dynamo scripts for sheet creation, data population, repetitive geometry, and documentation workflows.',
  },
  {
    title: 'Construction documentation',
    body: 'Complete, coordinated CD sets directly from the Revit model — drawings, schedules, keynotes and specifications.',
  },
];

export default function BimPortfolioPage() {
  // Projects that genuinely involve BIM (project-03 lists BIM development).
  const bimProjects = projectsByDiscipline('bim');

  return (
    <>
      {/* ============================ HERO ============================ */}
      {/* Dark section (charcoal), asymmetric — copy left. */}
      <section className="bg-charcoal text-white">
        <div className="container-site grid gap-10 py-section lg:grid-cols-[1fr_0.5fr] lg:items-end">
          <div className="flex gap-5 sm:gap-6">
            <AccentBar className="mt-1" />
            <div>
              <Link
                href="/portfolio"
                className="text-meta text-white/70 transition-opacity hover:opacity-80"
              >
                &larr; Back to portfolio
              </Link>
              <p className="text-meta mt-4 text-terracotta">BIM &amp; Revit</p>
              <h1 className="mt-3 font-display text-display-lg font-bold text-white">
                BIM Specialist
              </h1>
              <p className="mt-6 max-w-prose text-lead text-white/80">
                BIM modelling, Dynamo automation, Navisworks coordination and
                construction documentation — across residential, office and
                interior projects.
              </p>
            </div>
          </div>

          {/* Software pills. */}
          <div className="pl-9 lg:pl-0">
            <p className="text-meta text-white/60">Tools</p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {SOFTWARE.map((s) => (
                <Pill
                  key={s}
                  className="border-white/30 bg-white/10 text-white"
                >
                  {s}
                </Pill>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================= HIGHLIGHTS ========================= */}
      <section className="bg-cream py-section" aria-labelledby="bim-highlights">
        <div className="container-site">
          <SectionHeader
            id="bim-highlights"
            kicker="What BIM delivers"
            title="The model does the work."
            intro="Each of these comes out of one coordinated Revit model — fewer surprises on site, tighter documentation, and a clearer picture for the client."
          />

          {/* Asymmetric grid — wide/narrow pairs per row, never equal thirds. */}
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-6">
            {HIGHLIGHTS.map((h, i) => {
              // Row rhythm 4+2, 2+4, 4+2 — each row is lopsided, no equal trio.
              const spans = [
                'md:col-span-4',
                'md:col-span-2',
                'md:col-span-2',
                'md:col-span-4',
                'md:col-span-4',
                'md:col-span-2',
              ];
              const span = spans[i % spans.length];
              return (
                <Card key={h.title} className={span}>
                  <p className="text-meta text-terracotta">{h.tag}</p>
                  <h3 className="mt-3 font-display text-xl font-semibold text-charcoal">
                    {h.title}
                  </h3>
                  <p className="mt-3 max-w-prose text-grey">{h.body}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================= CAPABILITIES ======================= */}
      <section className="bg-white py-section" aria-labelledby="bim-capabilities">
        <div className="container-site">
          <SectionHeader
            id="bim-capabilities"
            kicker="Capabilities"
            title="BIM expertise areas."
          />
          <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2">
            {CAPABILITIES.map((c) => (
              <div key={c.title} className="flex gap-4">
                <AccentBar className="h-6 w-1 shrink-0" />
                <div className="max-w-prose">
                  <h3 className="font-display text-lg font-semibold text-charcoal">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-grey">{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== RELATED PROJECTS ===================== */}
      {bimProjects.length > 0 && (
        <section className="bg-cream pb-section" aria-labelledby="bim-projects">
          <div className="container-site">
            <SectionHeader
              id="bim-projects"
              kicker="On these projects"
              title="BIM in the work."
            />
            <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2">
              {bimProjects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  ratio="card"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABlock />
    </>
  );
}
