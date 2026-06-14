import { cn } from '@/lib/cn';

type PillVariant = 'default' | 'after' | 'accent';

// Signature device 2 — rounded-full pill. Default: 1.5px grey border, cream
// fill, charcoal Medium text. `after` = Success-Green functional state.
// `accent` = terracotta (use sparingly, accents only).
export function Pill({
  children,
  variant = 'default',
  className,
}: {
  children: React.ReactNode;
  variant?: PillVariant;
  className?: string;
}) {
  const variants: Record<PillVariant, string> = {
    default: 'border-hair border-grey/60 bg-cream text-charcoal',
    after: 'border-hair border-success bg-success text-white',
    accent: 'border-hair border-terracotta bg-terracotta text-white',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5',
        'text-meta',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
