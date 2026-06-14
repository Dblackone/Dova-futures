// Canonical business facts + brand constants. Single source — see DESIGN.md.
// Do NOT invent project counts, years, or stats. Use real data only.

export const COMPANY = {
  name: 'Dova Futures Limited',
  shortName: 'Dova Futures',
  location: 'Victoria Island, Lagos',
  tagline: 'DESIGN · BUILD · DIGITAL',
  domain: 'dovafutures.com',
  url: 'https://dovafutures.com',
  email: 'info@dovafutures.com',
  whatsapp: {
    display: '+234 816 367 5439',
    // wa.me deep link with a prefilled, no-hype message.
    href: 'https://wa.me/2348163675439?text=Hello%20Dova%20Futures%2C%20I%27d%20like%20to%20start%20a%20project.',
  },
  // Exact social URLs are TBD — placeholders only, do not fabricate.
  social: {
    handle: '@dovafutures',
    instagram: '#',
    tiktok: '#',
  },
} as const;

// Primary navigation (order matters).
export const NAV_LINKS = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Founder', href: '/founder' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contact', href: '/contact' },
] as const;

// Disciplines Dova spans (real services — no fabricated extras).
export const SERVICES = [
  {
    title: 'Architecture',
    summary:
      'Concept-to-permit building design grounded in how a space is actually used, built, and lived in.',
  },
  {
    title: 'BIM / Revit',
    summary:
      'Coordinated 3D models that catch clashes before site — fewer surprises, tighter budgets.',
  },
  {
    title: 'Interior Design',
    summary:
      'Interiors planned around light, flow, and material so the finished room reads as one idea.',
  },
  {
    title: 'Landscape',
    summary:
      'Site, drainage, and planting designed alongside the building, not bolted on afterward.',
  },
  {
    title: 'Construction',
    summary:
      'Build supervision that holds the drawings and the finish to the same standard.',
  },
  {
    title: 'Visualization',
    summary:
      'Renders that show the client the real outcome — every one labelled as a 3D visualisation.',
  },
] as const;
