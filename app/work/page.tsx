import type { Metadata } from 'next';
import { PlaceholderPage } from '@/components/PlaceholderPage';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected projects from Dova Futures across architecture, BIM, interiors, landscape and construction.',
};

export default function WorkPage() {
  return (
    <PlaceholderPage
      kicker="Selected work"
      title="The work, in full."
      intro="A filterable showcase by discipline — architecture, BIM, interiors, landscape, construction and visualization — is on the way."
    />
  );
}
