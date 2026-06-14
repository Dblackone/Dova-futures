import { cn } from '@/lib/cn';

// Monogram watermark — bottom-right, 24px from edges, 60-70% opacity.
// Used over imagery where the brand requires it (via SafeImage `watermark`).
export function Watermark({
  tone = 'light',
  className,
}: {
  tone?: 'light' | 'dark';
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute bottom-6 right-6 select-none',
        'font-display text-2xl font-bold leading-none',
        tone === 'light' ? 'text-white/70' : 'text-charcoal/60',
        className,
      )}
    >
      D
    </span>
  );
}
