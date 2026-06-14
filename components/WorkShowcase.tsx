'use client';

import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProjectCard } from './ProjectCard';
import { Pill } from './Pill';
import {
  PROJECTS,
  DISCIPLINE_LABELS,
  DISCIPLINE_ORDER,
  activeDisciplines,
  projectDisciplines,
  type Discipline,
} from '@/content/projects';

type Filter = 'all' | Discipline;

// useSearchParams must sit inside Suspense for static export.
export function WorkShowcase() {
  return (
    <Suspense fallback={<WorkGrid initial="all" />}>
      <WorkShowcaseInner />
    </Suspense>
  );
}

function WorkShowcaseInner() {
  const params = useSearchParams();
  const raw = params.get('discipline');
  const initial: Filter =
    raw && (DISCIPLINE_ORDER as string[]).includes(raw)
      ? (raw as Discipline)
      : 'all';
  return <WorkGrid initial={initial} />;
}

// Client-side discipline filter + asymmetric editorial grid. The lead project
// spans wide; the rest vary in span so it never reads as a 3-equal-cards row.
function WorkGrid({ initial }: { initial: Filter }) {
  const [filter, setFilter] = useState<Filter>(initial);
  const chips = activeDisciplines();

  const projects = useMemo(() => {
    if (filter === 'all') return PROJECTS;
    return PROJECTS.filter((p) => projectDisciplines(p).includes(filter));
  }, [filter]);

  return (
    <div>
      {/* Filter chips — real <button>s, 44px tap targets, single accent. */}
      <div
        role="group"
        aria-label="Filter projects by discipline"
        className="mt-12 flex flex-wrap gap-3 pl-9 sm:pl-10"
      >
        <FilterChip
          active={filter === 'all'}
          onClick={() => setFilter('all')}
          label="All work"
        />
        {chips.map((d) => (
          <FilterChip
            key={d}
            active={filter === d}
            onClick={() => setFilter(d)}
            label={DISCIPLINE_LABELS[d]}
          />
        ))}
      </div>

      {/* Asymmetric grid. The first card leads wide, the rest stagger. */}
      <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-6">
        {projects.map((project, i) => {
          // Editorial rhythm: lead spans wide, then alternating 4/2 + 3/3.
          const span =
            i === 0
              ? 'md:col-span-4'
              : i % 3 === 1
                ? 'md:col-span-2'
                : 'md:col-span-3';
          const ratio = i === 0 ? 'hero' : i % 3 === 1 ? 'portrait' : 'card';
          return (
            <div
              key={project.slug}
              className={`${span} animate-reveal-up`}
              style={{ animationDelay: `${Math.min(i, 5) * 70}ms` }}
            >
              <ProjectCard
                project={project}
                ratio={ratio}
                featured={i === 0}
                priority={i === 0}
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

      {/* Composed empty state (no "no data" void) — only if a filter clears all. */}
      {projects.length === 0 && (
        <div className="mt-12 max-w-prose pl-9 sm:pl-10">
          <Pill>Nothing here yet</Pill>
          <p className="mt-5 text-grey">
            No projects in {filter !== 'all' ? DISCIPLINE_LABELS[filter] : 'this view'} yet.
            Tell us what you need and we’ll talk through the approach directly.
          </p>
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        'text-meta inline-flex min-h-[44px] items-center rounded-full px-4 py-2',
        'transition-colors duration-300 ease-spring',
        active
          ? 'border-hair border-terracotta bg-terracotta text-white'
          : 'border-hair border-grey/60 bg-cream text-charcoal hover:border-charcoal',
      ].join(' ')}
    >
      {label}
    </button>
  );
}
