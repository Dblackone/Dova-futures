import type { Metadata } from 'next';
import { PlaceholderPage } from '@/components/PlaceholderPage';

export const metadata: Metadata = {
  title: 'Founder',
  description: 'Professional profile of the founder of Dova Futures.',
};

export default function FounderPage() {
  return (
    <PlaceholderPage
      kicker="Professional profile"
      title="Meet the founder."
      intro="A full professional profile is being prepared from the founder’s CV."
      note="This page is being built from source material. Check back shortly, or reach us directly below."
    />
  );
}
