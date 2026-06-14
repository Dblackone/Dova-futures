import Link from 'next/link';
import { SafeImage, type RatioToken } from './SafeImage';
import { Pill } from './Pill';
import {
  DISCIPLINE_LABELS,
  projectDisciplines,
  type Project,
} from '@/content/projects';

// A single project entry, linking to its case study. Used across /work and
// /portfolio. `ratio` and `sizes` let callers vary spans in an asymmetric grid.
// `featured` enlarges the title for the lead card in an editorial layout.
export function ProjectCard({
  project,
  ratio = 'card',
  sizes = '(max-width: 768px) 100vw, 33vw',
  featured = false,
  priority = false,
}: {
  project: Project;
  ratio?: RatioToken;
  sizes?: string;
  featured?: boolean;
  priority?: boolean;
}) {
  const disciplines = projectDisciplines(project);

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block focus:outline-none"
      aria-label={`${project.title} — ${disciplines
        .map((d) => DISCIPLINE_LABELS[d])
        .join(', ')}`}
    >
      <SafeImage
        src={project.media.cover.src}
        alt={project.media.cover.alt}
        ratio={ratio}
        sizes={sizes}
        priority={priority}
        watermark
        className="transition-transform duration-500 ease-spring group-hover:-translate-y-1 group-focus-visible:-translate-y-1"
      />

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {disciplines.map((d) => (
          <Pill key={d}>{DISCIPLINE_LABELS[d]}</Pill>
        ))}
      </div>

      <h3
        className={
          featured
            ? 'mt-4 font-display text-display-sm font-semibold text-charcoal'
            : 'mt-3 font-display text-xl font-semibold text-charcoal'
        }
      >
        {project.title}
      </h3>

      <p className="mt-2 max-w-prose text-grey">{project.summary}</p>

      <p className="text-meta mt-3 text-grey">{project.location}</p>
    </Link>
  );
}
