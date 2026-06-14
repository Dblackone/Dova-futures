import type { Metadata } from 'next';
import { PlaceholderPage } from '@/components/PlaceholderPage';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Dova Futures Limited — a Lagos studio joining design, build and digital under one roof.',
};

export default function AboutPage() {
  return (
    <PlaceholderPage
      kicker="About"
      title="Design, build and digital, together."
      intro="The full company story — and how the founder’s profile folds into it — is being prepared."
    />
  );
}
