import type { Metadata } from 'next';
import Link from 'next/link';
import { AccentBar } from '@/components/AccentBar';
import { Pill } from '@/components/Pill';
import { Card } from '@/components/Card';
import { SectionHeader } from '@/components/SectionHeader';
import { ProjectCard } from '@/components/ProjectCard';
import { CTABlock } from '@/components/CTABlock';
import {
  DISCIPLINE_LABELS,
  projectsByDiscipline,
  type Discipline,
} from '@/content/projects';

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'The Dova Futures portfolio, organized by specialist discipline — architecture, BIM/Revit, interiors, landscape, construction, visualization and project management.',
};

// SEVEN specialist disciplines. The first six map to project work; the seventh
// (project management) is a real capability from the founder profile and links
// out to /founder rather than fabricating a project for it.
type Specialism = {
  key: Discipline | 'management';
  label: string;
  blurb: string;
  // Where this discipline links to: a filtered /work view, or a profile page.
  href: string;
  cta: string;
};

const SPECIALISMS: Specialism[] = [
  {
    key: 'architecture',
    label: DISCIPLINE_LABELS.architecture,
    blurb:
      'Concept-to-permit building design — residential, religious and mixed-use — worked through massing, site, and façade.',
    href: '/work?discipline=architecture',
    cta: 'See architecture work',
  },
  {
    key: 'bim',
    label: DISCIPLINE_LABELS.bim,
    blurb:
      'Coordinated Revit models, Dynamo automation, Navisworks coordination, and construction documentation.',
    href: '/portfolio/bim',
    cta: 'Open BIM specialism',
  },
  {
    key: 'interior',
    label: DISCIPLINE_LABELS.interior,
    blurb:
      'Interiors planned around light, flow and material, developed from the client’s palette into rendered space.',
    href: '/work?discipline=interior',
    cta: 'See interior work',
  },
  {
    key: 'landscape',
    label: DISCIPLINE_LABELS.landscape,
    blurb:
      'Site, drainage and circulation designed alongside the building — not bolted on afterward.',
    href: '/work?discipline=landscape',
    cta: 'See landscape work',
  },
  {
    key: 'construction',
    label: DISCIPLINE_LABELS.construction,
    blurb:
      'Construction documentation, approval drawings and methodology that hold the build to the drawings.',
    href: '/work?discipline=construction',
    cta: 'See construction work',
  },
  {
    key: 'visualization',
    label: DISCIPLINE_LABELS.visualization,
    blurb:
      'High-resolution renders that show the real outcome before a wall is built — every one labelled a 3D visualisation.',
    href: '/work?discipline=visualization',
    cta: 'See visualization work',
  },
  {
    key: 'management',
    label: 'Project Management',
    blurb:
      'Construction project management — taking a brief through design, documentation, and delivery on site.',
    href: '/founder',
    cta: 'Read the founder profile',
  },
];

export default function PortfolioPage() {
  return (
    <>
      {/* ============================ INTRO ============================ */}
      <section className="container-site pb-section pt-16 lg:pt-24">
        <div className="flex gap-5 sm:gap-6">
          <AccentBar className="mt-1" />
          <div className="max-w-prose">
            <p className="text-meta text-terracotta">Portfolio</p>
            <h1 className="mt-4 font-display text-display-lg font-bold text-charcoal">
              The work, by specialism.
            </h1>
            <p className="mt-6 text-lead text-grey">
              Vollmann Akarakiri’s practice now sits inside Dova Futures. The same
              body of work is organized here by specialist discipline, so you can
              go straight to the area you care about.
            </p>
            <p className="mt-4 text-grey">
              For the story behind the practice, read the{' '}
              <Link
                href="/founder"
                className="font-semibold text-terracotta transition-opacity hover:opacity-80"
              >
                founder profile
              </Link>{' '}
              or{' '}
              <Link
                href="/about"
                className="font-semibold text-terracotta transition-opacity hover:opacity-80"
              >
                about Dova Futures
              </Link>
              .
            </p>
          </div>
        </div>

        {/* SEVEN discipline cards — asymmetric grid, varied spans. */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-6">
          {SPECIALISMS.map((s, i) => {
            const count =
              s.key === 'management'
                ? 0
                : projectsByDiscipline(s.key as Discipline).length;
            // Asymmetric rhythm: alternate wide/narrow rather than equal thirds.
            const span =
              i === 0 ? 'md:col-span-4' : i % 2 === 1 ? 'md:col-span-2' : 'md:col-span-3';
            return (
              <Link
                key={s.key}
                href={s.href}
                className={`${span} group block focus:outline-none`}
              >
                <Card interactive className="flex h-full flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-display text-display-sm font-semibold text-charcoal">
                        {s.label}
                      </h2>
                      {count > 0 && (
                        <Pill>
                          {count} {count === 1 ? 'project' : 'projects'}
                        </Pill>
                      )}
                    </div>
                    <p className="mt-4 max-w-prose text-grey">{s.blurb}</p>
                  </div>
                  <span className="mt-8 inline-flex items-center gap-2 font-semibold text-terracotta">
                    {s.cta}
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 ease-spring group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </span>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ===================== SELECTED CASE STUDIES ===================== */}
      <section className="bg-cream pb-section" aria-labelledby="cases-heading">
        <div className="container-site">
          <SectionHeader
            id="cases-heading"
            kicker="Case studies"
            title="A closer look."
            intro="Open any project to see the overview, scope, approach, and the deliverables that came out of it."
          />
          <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-6">
            {projectsByDiscipline('architecture')
              .concat(
                projectsByDiscipline('interior').filter(
                  (p) => p.discipline === 'interior',
                ),
              )
              // De-dupe while preserving order.
              .filter((p, i, arr) => arr.findIndex((x) => x.slug === p.slug) === i)
              .map((project, i) => {
                const span =
                  i === 0 ? 'md:col-span-4' : i % 3 === 1 ? 'md:col-span-2' : 'md:col-span-3';
                const ratio = i === 0 ? 'hero' : i % 3 === 1 ? 'portrait' : 'card';
                return (
                  <div key={project.slug} className={span}>
                    <ProjectCard
                      project={project}
                      ratio={ratio}
                      featured={i === 0}
                      sizes={
                        i === 0
                          ? '(max-width: 768px) 100vw, 66vw'
                          : '(max-width: 768px) 100vw, 40vw'
                      }
                    />
                  </div>
                );
              })}
          </div>
          <div className="mt-10">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 font-semibold text-terracotta transition-opacity hover:opacity-80"
            >
              View all work
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      <CTABlock />
    </>
  );
}
