'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/cn';
import { Watermark } from './Watermark';

// Per-context aspect-ratio tokens (defined once, reused everywhere).
export const RATIO = {
  hero: '16 / 9',
  card: '4 / 3',
  portrait: '3 / 4',
  square: '1 / 1',
  wide: '21 / 9',
  auto: 'auto',
} as const;

export type RatioToken = keyof typeof RATIO;

// SafeImage — wraps EVERY image so nothing distorts and there is no layout
// shift. A fixed aspect-ratio box + object-fit handles sizing; a cream skeleton
// fills the box until the image loads. Use `fit="contain"` for logos/diagrams.
export function SafeImage({
  src,
  alt,
  ratio = 'card',
  fit = 'cover',
  className,
  imgClassName,
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
  watermark = false,
  watermarkTone = 'light',
  rounded = true,
}: {
  src: string;
  alt: string;
  ratio?: RatioToken;
  fit?: 'cover' | 'contain';
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
  watermark?: boolean;
  watermarkTone?: 'light' | 'dark';
  rounded?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={cn(
        'relative isolate overflow-hidden bg-cream',
        rounded && 'rounded-card',
        className,
      )}
      style={{ aspectRatio: RATIO[ratio] }}
    >
      {/* Cream skeleton — matches the box exactly, prevents layout shift. */}
      {!loaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 overflow-hidden bg-cream"
        >
          <div className="absolute inset-0 -translate-x-full animate-skeleton-sweep bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </div>
      )}

      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        onLoad={() => setLoaded(true)}
        className={cn(
          'transition-opacity duration-700 ease-spring',
          fit === 'cover' ? 'object-cover' : 'object-contain',
          loaded ? 'opacity-100' : 'opacity-0',
          imgClassName,
        )}
      />

      {watermark && <Watermark tone={watermarkTone} />}
    </div>
  );
}
