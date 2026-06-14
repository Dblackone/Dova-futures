import type { Metadata } from 'next';
import { SectionHeader } from '@/components/SectionHeader';
import { ContactForm } from '@/components/ContactForm';
import { COMPANY } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Start a project with Dova Futures — send a brief or reach us on WhatsApp. Victoria Island, Lagos.',
};

export default function ContactPage() {
  return (
    <section className="container-site py-section">
      <SectionHeader
        kicker="Start your project"
        title="Tell us what you’re planning."
        intro="Send a short brief and we’ll come back with next steps. For anything time-sensitive, WhatsApp is fastest."
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
        {/* Form */}
        <div>
          <ContactForm />
        </div>

        {/* Direct channels */}
        <aside className="space-y-8">
          <div>
            <p className="text-meta mb-2 text-grey">WhatsApp</p>
            <a
              href={COMPANY.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-xl font-semibold text-charcoal transition-colors hover:text-terracotta"
            >
              {COMPANY.whatsapp.display}
            </a>
          </div>
          <div>
            <p className="text-meta mb-2 text-grey">Email</p>
            <a
              href={`mailto:${COMPANY.email}`}
              className="font-display text-xl font-semibold text-charcoal transition-colors hover:text-terracotta"
            >
              {COMPANY.email}
            </a>
          </div>
          <div>
            <p className="text-meta mb-2 text-grey">Studio</p>
            <p className="text-lg text-charcoal">{COMPANY.location}</p>
          </div>
          <div>
            <p className="text-meta mb-2 text-grey">Follow</p>
            <div className="flex gap-4">
              <a href={COMPANY.social.instagram} className="text-charcoal transition-colors hover:text-terracotta">
                Instagram
              </a>
              <a href={COMPANY.social.tiktok} className="text-charcoal transition-colors hover:text-terracotta">
                TikTok
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
