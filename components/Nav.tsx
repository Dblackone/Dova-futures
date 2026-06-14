'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { NAV_LINKS, COMPANY } from '@/lib/brand';
import { cn } from '@/lib/cn';

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline/70 bg-cream/85 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="container-site flex h-16 items-center justify-between gap-6 sm:h-20"
      >
        {/* Logo — dark wordmark on cream. Never stretched/recoloured. */}
        <Link href="/" className="flex items-center" aria-label={`${COMPANY.shortName} home`}>
          <Image
            src="/logo/dova-logo-dark.png"
            alt={COMPANY.name}
            width={132}
            height={84}
            priority
            className="h-11 w-auto object-contain"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[0.95rem] font-medium text-charcoal/80 transition-colors duration-300 hover:text-terracotta"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop primary CTA — single, terracotta. */}
        <Link
          href="/contact"
          className="hidden items-center justify-center rounded-full bg-terracotta px-5 py-2.5 text-[0.9rem] font-semibold text-white transition-colors duration-300 ease-spring hover:bg-terracotta-hover lg:inline-flex"
        >
          Start Your Project
        </Link>

        {/* Mobile toggle — 44px tap target. */}
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
          className="grid h-11 w-11 place-items-center rounded-full border-hair border-hairline bg-white lg:hidden"
        >
          <span className="relative block h-3.5 w-5" aria-hidden="true">
            <span className={cn('absolute left-0 top-0 h-0.5 w-5 bg-charcoal transition-transform duration-300 ease-spring', open && 'translate-y-1.5 rotate-45')} />
            <span className={cn('absolute left-0 top-1.5 h-0.5 w-5 bg-charcoal transition-opacity duration-300', open && 'opacity-0')} />
            <span className={cn('absolute bottom-0 left-0 h-0.5 w-5 bg-charcoal transition-transform duration-300 ease-spring', open && '-translate-y-1.5 -rotate-45')} />
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          'overflow-hidden border-t border-hairline/70 transition-[max-height] duration-500 ease-spring lg:hidden',
          open ? 'max-h-96' : 'max-h-0',
        )}
      >
        <ul className="container-site flex flex-col gap-1 py-4">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-2 py-3 text-base font-medium text-charcoal/85 transition-colors hover:bg-white hover:text-terracotta"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="block rounded-full bg-terracotta px-5 py-3 text-center text-base font-semibold text-white"
            >
              Start Your Project
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
