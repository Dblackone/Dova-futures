'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Pill } from './Pill';
import { RATIO, type RatioToken } from './SafeImage';
import { cn } from '@/lib/cn';

// Signature component — RevealFrame (Raw -> Reveal -> Finished).
// Takes a { raw, finished } pair. The `finished` (rendered/3D) state is the
// base layer; the `raw` (design/structural) state is clipped on top and
// "wiped" away to reveal the finished build underneath.
//
// Interaction modes (no hover dependency — primary audience is mobile Nigeria):
//   - mode="scrub"  : drag-scrub slider (pointer + touch) + keyboard arrows
//                     + tap-toggle on touch; desktop ALSO reveals on hover.
//   - mode="scroll" : scroll-driven reveal as the frame crosses the viewport
//                     (for hero use). Falls back to scrub interaction too.
//
// Accessible: the handle is a real slider (role="slider", arrow keys, Home/End).
// No layout shift: fixed aspect-ratio box; images use fill + object-cover.

type RevealMode = 'scrub' | 'scroll';

export function RevealFrame({
  raw,
  finished,
  rawAlt,
  finishedAlt,
  ratio = 'hero',
  mode = 'scrub',
  priority = false,
  className,
  rawLabel = 'DESIGN',
  finishedLabel = 'BUILD',
}: {
  raw: string;
  finished: string;
  rawAlt: string;
  finishedAlt: string;
  ratio?: RatioToken;
  mode?: RevealMode;
  priority?: boolean;
  className?: string;
  rawLabel?: string;
  finishedLabel?: string;
}) {
  // position 0 = fully RAW (design), 100 = fully FINISHED (build).
  const [pos, setPos] = useState(35);
  const [dragging, setDragging] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  const setFromClientX = useCallback((clientX: number) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  }, []);

  // --- Pointer drag-scrub (covers mouse, pen, touch) -----------------------
  const onPointerDown = (e: React.PointerEvent) => {
    if (mode === 'scroll') return;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setDragging(true);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setFromClientX(e.clientX);
  };
  const onPointerUp = () => setDragging(false);

  // --- Desktop hover-reveal (pointer:fine only; never the sole interaction)--
  const onMouseMove = (e: React.MouseEvent) => {
    if (mode === 'scroll' || dragging) return;
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      setFromClientX(e.clientX);
    }
  };

  // --- Tap-toggle on touch (snap between states) ---------------------------
  const onClick = () => {
    if (mode === 'scroll' || dragging) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      setPos((p) => (p < 50 ? 100 : 0));
    }
  };

  // --- Keyboard (the handle is a slider) -----------------------------------
  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 4;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      setPos((p) => Math.min(100, p + step));
      e.preventDefault();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      setPos((p) => Math.max(0, p - step));
      e.preventDefault();
    } else if (e.key === 'Home') {
      setPos(0);
      e.preventDefault();
    } else if (e.key === 'End') {
      setPos(100);
      e.preventDefault();
    }
  };

  // --- Scroll-driven variant (hero) ----------------------------------------
  useEffect(() => {
    if (mode !== 'scroll') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPos(100);
      return;
    }
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = frameRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        // Map the frame's travel through the viewport to 0->100.
        const progress = 1 - (rect.top + rect.height * 0.5) / (vh + rect.height * 0.5);
        setPos(Math.min(100, Math.max(0, progress * 130 - 5)));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [mode]);

  const showingFinished = pos > 50;

  return (
    <figure className={cn('m-0', className)}>
      <div
        ref={frameRef}
        className={cn(
          'group relative isolate select-none overflow-hidden rounded-card bg-cream shadow-card',
          mode === 'scrub' ? 'cursor-ew-resize touch-none' : '',
        )}
        style={{ aspectRatio: RATIO[ratio] }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onMouseMove={onMouseMove}
        onClick={onClick}
      >
        {/* Skeleton until the base (finished) image loads. */}
        {!loaded && (
          <div
            aria-hidden="true"
            className="absolute inset-0 overflow-hidden bg-cream"
          >
            <div className="absolute inset-0 -translate-x-full animate-skeleton-sweep bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          </div>
        )}

        {/* BASE layer — finished / rendered build. */}
        <Image
          src={finished}
          alt={finishedAlt}
          fill
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 60vw"
          onLoad={() => setLoaded(true)}
          className="object-cover"
        />

        {/* TOP layer — raw / design model, clipped from the right edge. */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Image
            src={raw}
            alt={rawAlt}
            fill
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
          />
        </div>

        {/* 3D VISUALISATION pill on the rendered (finished) state. */}
        <div
          className={cn(
            'absolute left-4 top-4 transition-opacity duration-300 ease-spring',
            showingFinished ? 'opacity-100' : 'opacity-0',
          )}
        >
          <Pill>3D Visualisation</Pill>
        </div>

        {/* AFTER marker (Success Green) on the finished state. */}
        <div
          className={cn(
            'absolute right-4 top-4 transition-opacity duration-300 ease-spring',
            showingFinished ? 'opacity-100' : 'opacity-0',
          )}
        >
          <Pill variant="after">After</Pill>
        </div>

        {/* State labels bottom corners. */}
        <span className="text-meta absolute bottom-4 left-4 rounded-full bg-charcoal/70 px-3 py-1 text-white backdrop-blur-sm">
          {rawLabel}
        </span>
        <span className="text-meta absolute bottom-4 right-4 rounded-full bg-charcoal/70 px-3 py-1 text-white backdrop-blur-sm">
          {finishedLabel}
        </span>

        {/* Terracotta scrub handle (also the accessible slider). */}
        {mode === 'scrub' && (
          <div
            className="absolute inset-y-0 z-10 w-0.5 bg-terracotta"
            style={{ left: `${pos}%` }}
          >
            <div
              role="slider"
              tabIndex={0}
              aria-label="Reveal finished build"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(pos)}
              aria-valuetext={`${Math.round(pos)}% revealed`}
              onKeyDown={onKeyDown}
              className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-hair border-terracotta bg-cream shadow-soft transition-transform duration-300 ease-spring group-hover:scale-105"
            >
              <span aria-hidden="true" className="font-display text-sm font-bold leading-none text-terracotta">
                &#8596;
              </span>
            </div>
          </div>
        )}
      </div>

      <figcaption className="sr-only">
        {rawAlt} revealed into {finishedAlt}.
      </figcaption>
    </figure>
  );
}
