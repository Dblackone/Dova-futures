import Link from 'next/link';
import Image from 'next/image';
import { NAV_LINKS, COMPANY } from '@/lib/brand';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-hairline/70 bg-cream">
      <div className="container-site py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Image
              src="/logo/dova-logo-dark.png"
              alt={COMPANY.name}
              width={132}
              height={84}
              className="h-12 w-auto object-contain"
            />
            <p className="mt-4 max-w-xs text-[0.95rem] leading-relaxed text-grey">
              {COMPANY.name}. {COMPANY.location}.
            </p>
            <p className="text-meta mt-4 text-charcoal">{COMPANY.tagline}</p>
          </div>

          {/* Sitemap */}
          <nav aria-label="Footer">
            <p className="text-meta mb-4 text-grey">Pages</p>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.95rem] text-charcoal/80 transition-colors hover:text-terracotta"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="text-meta mb-4 text-grey">Contact</p>
            <ul className="space-y-2.5 text-[0.95rem]">
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="text-charcoal/80 transition-colors hover:text-terracotta"
                >
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <a
                  href={COMPANY.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-charcoal/80 transition-colors hover:text-terracotta"
                >
                  WhatsApp {COMPANY.whatsapp.display}
                </a>
              </li>
              <li className="flex gap-4 pt-1">
                <a href={COMPANY.social.instagram} className="text-charcoal/80 transition-colors hover:text-terracotta">
                  Instagram
                </a>
                <a href={COMPANY.social.tiktok} className="text-charcoal/80 transition-colors hover:text-terracotta">
                  TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-hairline/70 pt-6 text-[0.85rem] text-grey sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {COMPANY.name}. All rights reserved.
          </p>
          <p>{COMPANY.domain}</p>
        </div>
      </div>
    </footer>
  );
}
