import type { Metadata } from 'next';
import { PlaceholderPage } from '@/components/PlaceholderPage';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Architecture, BIM/Revit, interior design, landscape, construction and visualization from Dova Futures.',
};

export default function ServicesPage() {
  return (
    <PlaceholderPage
      kicker="What we do"
      title="One team, the whole build."
      intro="Detailed service lines — including BIM consulting — are being written up. The summary on the home page covers the disciplines we span."
    />
  );
}
