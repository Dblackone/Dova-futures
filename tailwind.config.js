/** @type {import('tailwindcss').Config} */
// Brand tokens are the single source of truth — see DESIGN.md.
// Colour system is strict 60/30/10 with ONE accent (terracotta).
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // 60 — default background
        cream: '#F5EFEB',
        // 30 — headlines / dark sections (NEVER pure black)
        charcoal: '#2E2B2B',
        // 10 — the ONE accent (CTAs / accents only, never body text)
        terracotta: {
          DEFAULT: '#B85C38',
          hover: '#A24E2E',
        },
        // cards / text on dark
        white: '#FFFFFF',
        // secondary text (never <16px on charcoal)
        grey: '#666666',
        // FUNCTIONAL success / "AFTER" state ONLY — not a second accent
        success: '#3E7C4F',
        // borders
        hairline: '#DDDDDD',
        'hairline-strong': '#CFC7C0',
      },
      fontFamily: {
        // Wired behind CSS variables so brand fonts (Cabinet Grotesk +
        // Satoshi) can be dropped in later as a 2-file swap. See globals.css.
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Fluid clamp scale (weight + colour drive hierarchy, not just size).
        kicker: ['0.8125rem', { lineHeight: '1', letterSpacing: '0.05em' }],
        'display-sm': ['clamp(1.75rem, 4vw, 2.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2.25rem, 6vw, 3.5rem)', { lineHeight: '1.02', letterSpacing: '-0.025em' }],
        'display-lg': ['clamp(2.75rem, 8vw, 4.5rem)', { lineHeight: '0.98', letterSpacing: '-0.03em' }],
        lead: ['clamp(1.0625rem, 1.5vw, 1.25rem)', { lineHeight: '1.6' }],
      },
      maxWidth: {
        site: '1400px',
        prose: '65ch',
      },
      spacing: {
        // 64px rhythm — the whitespace device.
        gutter: '4rem',
        section: '6rem',
      },
      borderRadius: {
        card: '16px',
      },
      borderWidth: {
        hair: '1.5px',
      },
      boxShadow: {
        // Warm-tinted, <=10% opacity. NO neon / outer-glow.
        card: '0 12px 32px -12px rgba(46, 43, 43, 0.10)',
        'card-hover': '0 18px 44px -14px rgba(46, 43, 43, 0.14)',
        soft: '0 6px 18px -8px rgba(46, 43, 43, 0.08)',
      },
      letterSpacing: {
        meta: '0.05em',
      },
      transitionTimingFunction: {
        // Spring-like easing for reveals / micro-interactions.
        spring: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'reveal-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'skeleton-sweep': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'reveal-up': 'reveal-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        'skeleton-sweep': 'skeleton-sweep 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
