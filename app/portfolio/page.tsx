import type { Metadata } from 'next';
import { PlaceholderPage } from '@/components/PlaceholderPage';

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'An accessible portfolio of Dova Futures project work, including a BIM discipline view.',
};

export default function PortfolioPage() {
  return (
    <PlaceholderPage
      kicker="Portfolio"
      title="The portfolio, accessible."
      intro="A detailed portfolio — including a dedicated BIM discipline view — is being migrated here."
    />
  );
}
