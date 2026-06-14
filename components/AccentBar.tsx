import { cn } from '@/lib/cn';

// Signature device 1 — terracotta vertical bar, 8x64px, top-left beside the
// kicker. The ONE accent colour. Decorative only.
export function AccentBar({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn('block h-16 w-2 shrink-0 rounded-full bg-terracotta', className)}
    />
  );
}
