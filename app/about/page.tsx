import type { Metadata } from 'next';
import Link from 'next/link';
import { AccentBar } from '@/components/AccentBar';
import { SectionHeader } from '@/components/SectionHeader';
import { SafeImage } from '@/components/SafeImage';
import { CTABlock } from '@/components/CTABlock';

export const metadata: Metadata = {
  title: 'About — Dova Futures',
  description:
    'Dova Futures is a Lagos architecture and construction studio — design, BIM, interiors, landscape, and construction under one roof on Victoria Island.',
};

const BELIEFS = [
  {
    kicker: 'Design',
    body: 'A building starts with a problem and a constraint. Good architecture finds a solution that works for both — and makes the finished space feel like the only answer.',
  },
  {
    kicker: 'Build',
    body: 'The drawing and the site should tell the same story. BIM-led coordination means the contractor gets a model that is honest about every junction, not a set of sheets that conflict on site.',
  },
  {
    kicker: 'Digital',
    body: '3D visualisation is not decoration — it is how a client understands what they are approving. Every render we produce is labelled as a 3D visualisation, not a photograph.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ========================= HERO ========================= */}
      <section className="container-site pb-section pt-16 lg:pt-24">
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Left: copy */}
          <div className="flex gap-5 sm:gap-6">
            <AccentBar className="mt-2" />
            <div className="animate-reveal-up">
              <p className="text-meta text-terracotta">About Dova Futures</p>
              <h1 className="mt-4 font-display text-display-lg font-bold text-charcoal">
                Design, build and digital, together.
              </h1>
              <p className="mt-6 max-w-prose text-lead text-grey">
                Dova Futures is a Lagos-based architecture and construction studio
                that takes a project from the first sketch to the finished space —
                architecture, BIM, interiors, landscape, and construction
                coordinated under one roof.
              </p>
              <p className="mt-5 max-w-prose text-grey">
                Founded on the principle that design and build work better when
                they share one team, one model, and one standard of finish, the
                studio operates from Victoria Island, Lagos, with a practice built
                around Building Information Modelling at its core.
              </p>
            </div>
          </div>

          {/* Right: architectural image */}
          <SafeImage
            src="/images/schema-massing.jpg"
            alt="Architectural massing model — structural coordination phase."
            ratio="portrait"
            watermark
            priority
            className="animate-reveal-up [animation-delay:120ms]"
          />
        </div>
      </section>

      {/* =================== WHAT WE BELIEVE =================== */}
      <section className="bg-charcoal" aria-labelledby="beliefs-heading">
        <div className="container-site py-section">
          <SectionHeader
            id="beliefs-heading"
            tone="dark"
            kicker="What we believe"
            title="Principles behind the practice."
          />

          <div className="mt-14 space-y-0 divide-y divide-white/10">
            {BELIEFS.map((belief, i) => (
              <div
                key={belief.kicker}
                className={`grid gap-6 py-10 lg:grid-cols-[14rem_1fr] lg:gap-16 ${
                  i % 2 === 1 ? 'lg:pl-20' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className="font-display text-display-sm font-bold text-terracotta">
                    0{i + 1}
                  </span>
                  <p className="text-meta pt-1 uppercase tracking-meta text-white/60">
                    {belief.kicker}
                  </p>
                </div>
                <p className="max-w-prose text-lead text-white/80">{belief.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================== FOUNDER SNAPSHOT =================== */}
      <section className="bg-cream py-section" aria-labelledby="founder-heading">
        <div className="container-site">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            {/* Image: interior project placeholder */}
            <SafeImage
              src="/images/ikeja-interior.jpg"
              alt="Interior design project — finished render."
              ratio="card"
              watermark
            />

            {/* Copy */}
            <div>
              <p className="text-meta text-terracotta">The founder</p>
              <h2
                id="founder-heading"
                className="mt-3 font-display text-display-md font-bold text-charcoal"
              >
                Vollmann Olamide Akarakiri
              </h2>
              <p className="mt-2 text-meta text-grey">CEO &amp; Managing Director</p>
              <p className="mt-5 max-w-prose text-grey">
                Vollmann leads the practice as a multidisciplinary construction
                professional spanning BIM, architectural design, and site
                engineering. His work moves between the model and the site —
                designing in Revit and Lumion, then supervising the build through
                to handover.
              </p>
              <div className="mt-8">
                <Link
                  href="/founder"
                  className="inline-flex items-center gap-2 font-semibold text-terracotta transition-opacity hover:opacity-80"
                >
                  Full professional profile <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= STUDIO LOCATION ======================= */}
      <section className="container-site py-section" aria-labelledby="studio-heading">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="flex gap-5 sm:gap-6">
            <AccentBar className="mt-2" />
            <div>
              <p className="text-meta text-terracotta">The studio</p>
              <h2
                id="studio-heading"
                className="mt-3 font-display text-display-md font-bold text-charcoal"
              >
                Victoria Island, Lagos.
              </h2>
              <p className="mt-5 max-w-prose text-grey">
                The studio operates from Victoria Island, Lagos. Clients reach us
                directly — by email, WhatsApp, or through the contact form. We
                work with clients across Nigeria and take on project work
                regionally.
              </p>
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-terracotta px-7 py-4 text-base font-semibold text-white transition-colors duration-300 ease-spring hover:bg-terracotta-hover"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 pt-2">
            <div>
              <p className="text-meta uppercase tracking-meta text-grey">Location</p>
              <p className="mt-2 text-charcoal">Victoria Island, Lagos</p>
            </div>
            <div>
              <p className="text-meta uppercase tracking-meta text-grey">Email</p>
              <a
                href="mailto:info@dovafutures.com"
                className="mt-2 block text-charcoal transition-opacity hover:opacity-70"
              >
                info@dovafutures.com
              </a>
            </div>
            <div>
              <p className="text-meta uppercase tracking-meta text-grey">WhatsApp</p>
              <a
                href="https://wa.me/2348163675439?text=Hello%20Dova%20Futures%2C%20I%27d%20like%20to%20start%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-charcoal transition-opacity hover:opacity-70"
              >
                +234 816 367 5439
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================== CTA =========================== */}
      <CTABlock />
    </>
  );
}
