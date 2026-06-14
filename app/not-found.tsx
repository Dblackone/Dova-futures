import Link from 'next/link';
import { AccentBar } from '@/components/AccentBar';

export default function NotFound() {
  return (
    <section className="container-site flex min-h-[60dvh] items-center py-section">
      <div className="flex gap-5 sm:gap-6">
        <AccentBar className="mt-2" />
        <div>
          <p className="text-meta text-terracotta">404</p>
          <h1 className="mt-4 font-display text-display-md font-bold text-charcoal">
            This page isn’t here.
          </h1>
          <p className="mt-5 max-w-prose text-lead text-grey">
            The link may have moved. Head back to the home page to find your way.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-terracotta px-6 py-3.5 text-base font-semibold text-white transition-colors duration-300 ease-spring hover:bg-terracotta-hover"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
