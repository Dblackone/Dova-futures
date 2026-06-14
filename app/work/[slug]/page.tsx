import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AccentBar } from '@/components/AccentBar';
import { Pill } from '@/components/Pill';
import { SafeImage } from '@/components/SafeImage';
import { RevealFrame } from '@/components/RevealFrame';
import { CaseStudySection } from '@/components/CaseStudySection';
import { CTABlock } from '@/components/CTABlock';
import {
  PROJECTS,
  getProject,
  allSlugs,
  projectDisciplines,
  DISCIPLINE_LABELS,
} from '@/content/projects';

// Pre-render every project at build time (static export — no server runtime).
export function generateStaticParams() {
  return allSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: 'Project not found' };
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const disciplines = projectDisciplines(project);
  const hasReveal = Boolean(project.media.raw && project.media.finished);

  // Sibling projects for "next" navigation (keeps the page from dead-ending).
  const index = PROJECTS.findIndex((p) => p.slug === project.slug);
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  return (
    <article>
      {/* ============================ HERO ============================ */}
      {/* Asymmetric: copy left, lead media right. NOT centered. */}
      <section className="container-site grid gap-10 pb-12 pt-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16 lg:pb-16 lg:pt-20">
        <div className="flex gap-5 sm:gap-6">
          <AccentBar className="mt-1" />
          <div className="animate-reveal-up">
            <Link
              href="/work"
              className="text-meta text-grey transition-opacity hover:opacity-80"
            >
              &larr; All work
            </Link>
            <h1 className="mt-4 font-display text-display-lg font-bold text-charcoal">
              {project.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {disciplines.map((d) => (
                <Pill key={d}>{DISCIPLINE_LABELS[d]}</Pill>
              ))}
            </div>
            <p className="mt-6 max-w-prose text-lead text-grey">
              {project.summary}
            </p>
            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              <div>
                <dt className="text-meta text-grey/70">Location</dt>
                <dd className="mt-1 text-charcoal">{project.location}</dd>
              </div>
              {project.clientType && (
                <div>
                  <dt className="text-meta text-grey/70">Type</dt>
                  <dd className="mt-1 text-charcoal">{project.clientType}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        {/* Lead media: RevealFrame where a raw/finished pair exists; else cover. */}
        <div className="animate-reveal-up [animation-delay:120ms]">
          {hasReveal ? (
            <RevealFrame
              raw={project.media.raw!.src}
              finished={project.media.finished!.src}
              rawAlt={project.media.raw!.alt}
              finishedAlt={project.media.finished!.alt}
              ratio="hero"
              mode="scrub"
              priority
              rawLabel="Design"
              finishedLabel="Build"
            />
          ) : (
            <SafeImage
              src={project.media.cover.src}
              alt={project.media.cover.alt}
              ratio="hero"
              priority
              watermark
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          )}
        </div>
      </section>

      {/* ========================= NARRATIVE ========================= */}
      <div className="container-site pb-section">
        <CaseStudySection label="Overview">
          <p className="text-lead text-grey">{project.overview}</p>
        </CaseStudySection>

        <CaseStudySection label="Scope" title="What we took on">
          <p className="text-grey">{project.scope}</p>
        </CaseStudySection>

        <CaseStudySection label="Approach" title="How we got there">
          <p className="text-grey">{project.approach}</p>
        </CaseStudySection>

        <CaseStudySection label="Key features">
          <ul className="space-y-4">
            {project.keyFeatures.map((feature) => (
              <li key={feature} className="flex gap-4 text-grey">
                <AccentBar className="h-6 w-1 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CaseStudySection>

        <CaseStudySection label="Deliverables">
          <ul className="flex flex-wrap gap-3">
            {project.deliverables.map((d) => (
              <li key={d}>
                <Pill>{d}</Pill>
              </li>
            ))}
          </ul>
        </CaseStudySection>

        {/* Gallery — asymmetric masonry-ish grid via SafeImage. */}
        {project.media.gallery && project.media.gallery.length > 0 && (
          <section className="border-t border-hairline py-12 md:py-16">
            <p className="text-meta text-terracotta">Gallery</p>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
              {project.media.gallery.map((img, i) => {
                const span =
                  i % 3 === 0
                    ? 'lg:col-span-4'
                    : 'lg:col-span-2';
                const ratio = i % 3 === 0 ? 'wide' : 'portrait';
                return (
                  <div key={img.src} className={`relative ${span}`}>
                    <SafeImage
                      src={img.src}
                      alt={img.alt}
                      ratio={ratio}
                      watermark
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    {/* Renders are always labelled (brand rule). */}
                    <div className="absolute left-4 top-4">
                      <Pill>3D Visualisation</Pill>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Next project — keeps the journey moving (no dead end). */}
        <section className="border-t border-hairline pt-12">
          <p className="text-meta text-grey">Next project</p>
          <Link
            href={`/work/${next.slug}`}
            className="group mt-3 inline-flex items-baseline gap-3"
          >
            <span className="font-display text-display-sm font-semibold text-charcoal transition-colors group-hover:text-terracotta">
              {next.title}
            </span>
            <span
              aria-hidden="true"
              className="text-terracotta transition-transform duration-300 ease-spring group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </Link>
        </section>
      </div>

      <CTABlock />
    </article>
  );
}
