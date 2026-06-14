import Link from 'next/link';
import { AccentBar } from '@/components/AccentBar';
import { Pill } from '@/components/Pill';
import { SectionHeader } from '@/components/SectionHeader';
import { SafeImage } from '@/components/SafeImage';
import { RevealFrame } from '@/components/RevealFrame';
import { CTABlock } from '@/components/CTABlock';
import { SERVICES } from '@/lib/brand';

// Featured work strip — real imagery only (no fabricated stats).
const FEATURED = [
  {
    src: '/images/ado-finished-alt.jpg',
    alt: 'Ado hall of worship — finished exterior render.',
    title: 'Ado Hall of Worship',
    discipline: 'Architecture · Visualization',
  },
  {
    src: '/images/ikeja-interior.jpg',
    alt: 'Ikeja conference room — finished interior render.',
    title: 'Ikeja Conference Room',
    discipline: 'Interior Design',
  },
  {
    src: '/images/schema-massing.jpg',
    alt: 'Architectural massing model of a residential scheme.',
    title: 'Residential Scheme',
    discipline: 'Architecture · BIM',
  },
];

export default function HomePage() {
  return (
    <>
      {/* ============================ HERO ============================ */}
      {/* Asymmetric: copy left, RevealFrame right. NOT centered. */}
      <section className="container-site grid items-center gap-10 pb-section pt-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:pt-24">
        <div className="flex gap-5 sm:gap-6">
          <AccentBar className="mt-2" />
          <div className="animate-reveal-up">
            <p className="text-meta text-terracotta">Design · Build · Digital</p>
            <h1 className="mt-4 font-display text-display-lg font-bold text-charcoal">
              Built with precision.
            </h1>
            <p className="mt-6 max-w-prose text-lead text-grey">
              Dova Futures takes a project from the first model to the finished
              build — architecture, BIM, interiors, landscape and construction,
              coordinated under one roof in Lagos.
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-terracotta px-7 py-4 text-base font-semibold text-white transition-colors duration-300 ease-spring hover:bg-terracotta-hover"
              >
                Start Your Project
              </Link>
            </div>
            <p className="text-meta mt-6 text-grey">
              Drag, tap or hover the frame — design to build.
            </p>
          </div>
        </div>

        {/* Signature RevealFrame: raw model -> finished render. */}
        <div className="animate-reveal-up [animation-delay:120ms]">
          <RevealFrame
            raw="/images/ado-raw.jpg"
            finished="/images/ado-finished.jpg"
            rawAlt="Structural model of the Ado hall of worship."
            finishedAlt="Finished render of the Ado hall of worship."
            ratio="hero"
            mode="scrub"
            priority
            rawLabel="Design"
            finishedLabel="Build"
          />
        </div>
      </section>

      {/* ========================== SERVICES ========================== */}
      {/* Zig-zag rows — NOT a 3-equal-cards grid. */}
      <section className="bg-cream py-section" aria-labelledby="services-heading">
        <div className="container-site">
          <SectionHeader
            id="services-heading"
            kicker="What we do"
            title="One team, the whole build."
            intro="Each discipline informs the next, so the drawings, the model and the finished space all tell the same story."
          />

          <div className="mt-14 space-y-px overflow-hidden rounded-card border-hair border-hairline bg-hairline">
            {SERVICES.map((service, i) => (
              <div
                key={service.title}
                className={`grid items-baseline gap-2 bg-white px-6 py-7 sm:grid-cols-[auto_1fr] sm:gap-10 sm:px-10 ${
                  i % 2 === 1 ? 'sm:pl-24' : ''
                }`}
              >
                <h3 className="font-display text-display-sm font-semibold text-charcoal sm:w-64">
                  {service.title}
                </h3>
                <p className="max-w-prose text-grey">{service.summary}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 font-semibold text-terracotta transition-opacity hover:opacity-80"
            >
              See all services
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ======================= FEATURED WORK ======================= */}
      <section className="bg-cream pb-section" aria-labelledby="work-heading">
        <div className="container-site">
          <SectionHeader
            id="work-heading"
            kicker="Selected work"
            title="From model to finished space."
          />

          {/* Asymmetric work grid: first item spans wide, rest stack. */}
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            <Link
              href="/work"
              className="group lg:col-span-2"
              aria-label={`${FEATURED[0].title} — ${FEATURED[0].discipline}`}
            >
              <SafeImage
                src={FEATURED[0].src}
                alt={FEATURED[0].alt}
                ratio="hero"
                watermark
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="transition-transform duration-500 ease-spring group-hover:-translate-y-1"
              />
              <div className="mt-4 flex items-center justify-between gap-4">
                <h3 className="font-display text-xl font-semibold text-charcoal">
                  {FEATURED[0].title}
                </h3>
                <Pill>{FEATURED[0].discipline}</Pill>
              </div>
            </Link>

            <div className="flex flex-col gap-6">
              {FEATURED.slice(1).map((item) => (
                <Link
                  key={item.title}
                  href="/work"
                  className="group"
                  aria-label={`${item.title} — ${item.discipline}`}
                >
                  <SafeImage
                    src={item.src}
                    alt={item.alt}
                    ratio="card"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="transition-transform duration-500 ease-spring group-hover:-translate-y-1"
                  />
                  <div className="mt-3">
                    <h3 className="font-display text-lg font-semibold text-charcoal">
                      {item.title}
                    </h3>
                    <p className="text-meta mt-1 text-grey">{item.discipline}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 font-semibold text-terracotta transition-opacity hover:opacity-80"
            >
              View all work
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================== CTA =========================== */}
      <CTABlock />
    </>
  );
}
