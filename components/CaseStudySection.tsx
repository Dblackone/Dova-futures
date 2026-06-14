import { cn } from '@/lib/cn';

// A narrative block for the case-study template: a left meta label and a wide
// body column (asymmetric two-column). Keeps generous whitespace and a single
// reading measure. Body can be a paragraph or a list (passed as children).
export function CaseStudySection({
  label,
  title,
  children,
  className,
}: {
  label: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        'grid gap-4 border-t border-hairline py-12 md:grid-cols-[0.4fr_1fr] md:gap-12 md:py-16',
        className,
      )}
    >
      <div>
        <p className="text-meta text-terracotta">{label}</p>
        {title && (
          <h2 className="mt-3 font-display text-display-sm font-semibold text-charcoal">
            {title}
          </h2>
        )}
      </div>
      <div className="max-w-prose">{children}</div>
    </section>
  );
}
