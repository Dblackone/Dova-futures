import { SectionHeader } from './SectionHeader';
import { Pill } from './Pill';
import { CTABlock } from './CTABlock';

// On-brand placeholder for pages later agents will flesh out. No fabricated
// content — a clear "in progress" state, composed (not an empty void).
export function PlaceholderPage({
  kicker,
  title,
  intro,
  note,
}: {
  kicker: string;
  title: string;
  intro: string;
  note?: string;
}) {
  return (
    <>
      <section className="container-site min-h-[60dvh] py-section">
        <SectionHeader kicker={kicker} title={title} intro={intro} />
        <div className="mt-10 pl-9 sm:pl-10">
          <Pill>In progress</Pill>
          <p className="mt-5 max-w-prose text-grey">
            {note ??
              'This page is being built. In the meantime, tell us what you need and we’ll respond directly.'}
          </p>
        </div>
      </section>
      <CTABlock />
    </>
  );
}
