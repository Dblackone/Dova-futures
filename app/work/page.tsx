import type { Metadata } from 'next';
import { SectionHeader } from '@/components/SectionHeader';
import { CTABlock } from '@/components/CTABlock';
import { WorkShowcase } from '@/components/WorkShowcase';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected projects from Dova Futures across architecture, BIM, interiors, landscape, construction and visualization. Filter by discipline.',
};

export default function WorkPage() {
  return (
    <>
      <section className="container-site min-h-[60dvh] pb-section pt-16 lg:pt-24">
        <SectionHeader
          kicker="Selected work"
          title="The work, in full."
          intro="Each project below carries one team from the first model to the finished build. Filter by discipline, or open a case study to see how it came together."
        />
        <WorkShowcase />
      </section>
      <CTABlock />
    </>
  );
}
