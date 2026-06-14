import Link from 'next/link';
import { AccentBar } from './AccentBar';
import { COMPANY } from '@/lib/brand';
import { cn } from '@/lib/cn';

// Signature device 5 — CTA block / outro strip on charcoal.
// Carries: dovafutures.com · DESIGN · BUILD · DIGITAL · Follow @dovafutures
export function CTABlock({ className }: { className?: string }) {
  return (
    <section className={cn('bg-charcoal text-white', className)}>
      <div className="container-site py-section">
        <div className="flex gap-5 sm:gap-6">
          <AccentBar className="mt-1" />
          <div className="w-full">
            <p className="text-meta text-terracotta">Let&apos;s build</p>
            <h2 className="mt-3 max-w-[14ch] font-display text-display-md font-bold text-white">
              Built with precision.
            </h2>
            <p className="mt-5 max-w-prose text-lead text-white/80">
              Tell us what you&apos;re planning. We&apos;ll take it from a clear
              brief to a coordinated set of drawings and a finished build.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-terracotta px-6 py-3.5 text-base font-semibold text-white transition-colors duration-300 ease-spring hover:bg-terracotta-hover"
              >
                Start Your Project
              </Link>
              <a
                href={COMPANY.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border-hair border-white/30 px-6 py-3.5 text-base font-semibold text-white transition-colors duration-300 hover:border-white/70"
              >
                WhatsApp us
              </a>
            </div>

            {/* The brand strip. */}
            <div className="text-meta mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-white/15 pt-6 text-white/70">
              <span className="text-white">{COMPANY.domain}</span>
              <span aria-hidden="true">·</span>
              <span>Design</span>
              <span aria-hidden="true">·</span>
              <span>Build</span>
              <span aria-hidden="true">·</span>
              <span>Digital</span>
              <span aria-hidden="true">·</span>
              <span>
                Follow{' '}
                <a
                  href={COMPANY.social.instagram}
                  className="text-terracotta transition-opacity hover:opacity-80"
                >
                  {COMPANY.social.handle}
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
