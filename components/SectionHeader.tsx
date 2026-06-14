import { AccentBar } from './AccentBar';
import { cn } from '@/lib/cn';

// Kicker + headline block led by the AccentBar device. Asymmetric (left-aligned
// by default — never centered). `tone` switches text colour on dark sections.
export function SectionHeader({
  kicker,
  title,
  intro,
  tone = 'light',
  className,
  id,
}: {
  kicker?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  tone?: 'light' | 'dark';
  className?: string;
  id?: string;
}) {
  const onDark = tone === 'dark';
  return (
    <div className={cn('flex gap-5 sm:gap-6', className)}>
      <AccentBar className="mt-1" />
      <div className="max-w-prose">
        {kicker && (
          <p
            className={cn(
              'text-meta mb-3',
              onDark ? 'text-terracotta' : 'text-terracotta',
            )}
          >
            {kicker}
          </p>
        )}
        <h2
          id={id}
          className={cn(
            'font-display text-display-md font-bold',
            onDark ? 'text-white' : 'text-charcoal',
          )}
        >
          {title}
        </h2>
        {intro && (
          <p
            className={cn(
              'mt-5 text-lead',
              onDark ? 'text-white/80' : 'text-grey',
            )}
          >
            {intro}
          </p>
        )}
      </div>
    </div>
  );
}
