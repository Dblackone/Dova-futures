// Canonical project content model — the single source for /work, /work/[slug],
// and /portfolio. Content is migrated FAITHFULLY from the Job-Portfolio package
// READMEs (project-01 … project-05). No fabricated facts: where a field is
// genuinely unknown in the source, it is omitted rather than invented.
//
// Image paths point at the already-optimized files in public/images (see
// scripts/optimize-images.mjs). Every render carries a "3D Visualisation" label
// at the component layer (SafeImage watermark / RevealFrame pill).

export type Discipline =
  | 'architecture'
  | 'bim'
  | 'interior'
  | 'landscape'
  | 'construction'
  | 'visualization';

// Human-readable discipline labels (used by chips, pills, sections).
export const DISCIPLINE_LABELS: Record<Discipline, string> = {
  architecture: 'Architecture',
  bim: 'BIM / Revit',
  interior: 'Interior Design',
  landscape: 'Landscape',
  construction: 'Construction',
  visualization: 'Visualization',
};

// Ordered list for filter chips and discipline sections.
export const DISCIPLINE_ORDER: Discipline[] = [
  'architecture',
  'bim',
  'interior',
  'landscape',
  'construction',
  'visualization',
];

export type ProjectImage = {
  src: string;
  alt: string;
};

export type Project = {
  slug: string;
  title: string;
  // Primary discipline (drives the dominant tag / default grouping).
  discipline: Discipline;
  // A project can span several disciplines.
  disciplines?: Discipline[];
  location: string;
  clientType?: string;
  status?: string;
  // One-line summary for cards.
  summary: string;
  // Narrative blocks (verbatim-faithful to the source READMEs).
  overview: string;
  scope: string;
  approach: string;
  keyFeatures: string[];
  deliverables: string[];
  media: {
    cover: ProjectImage;
    // raw/finished pair powers the RevealFrame where one genuinely exists.
    raw?: ProjectImage;
    finished?: ProjectImage;
    progress?: ProjectImage[];
    gallery?: ProjectImage[];
  };
};

export const PROJECTS: Project[] = [
  // ----------------------------------------------------------------- 01
  {
    slug: 'ikeja-living-dining-interior',
    title: 'Residential Living & Dining Interior Visualization',
    discipline: 'interior',
    disciplines: ['interior', 'visualization'],
    location: 'Ikeja, Lagos, Nigeria',
    clientType: 'Residential Interior Design',
    summary:
      'Interior design and 3D visualization of a living and dining area, developed from the client’s palette and material brief.',
    overview:
      'This project involved the interior visualization and design development of a residential living and dining area for a client in Ikeja, Lagos. The client required a realistic representation of how the proposed space would appear before implementation. Based on the client’s preferred colour palette, material selections, and aesthetic direction, a detailed interior design concept was developed and transformed into high-quality visualizations. The objective was to create a functional, elegant, and visually balanced living environment that aligned with the client’s vision while maximizing the available space.',
    scope:
      'The client provided detailed information regarding preferred colours, finishes, materials, and overall design expectations. Based on these requirements, a customized interior design solution was developed, including space planning, furniture arrangement, material selection, and 3D visualization of the proposed living and dining areas.',
    approach:
      'Following an initial briefing session with the client, the design requirements and visual references were reviewed to establish a clear direction for the project. A preliminary design concept was developed and presented to the client to ensure alignment with the intended design vision. After confirmation and feedback, additional resources, materials, and references were sourced and incorporated into the final design process. The project was then modeled and rendered to produce realistic visual representations of the proposed interior space.',
    keyFeatures: [
      'Custom TV entertainment unit with fluted wall panels, an integrated display niche, and a floating console',
      'Custom dining setup tuned to the open-plan layout for function and visual balance',
      'Space planning for efficient circulation, functional furniture placement, and visual harmony between zones',
    ],
    deliverables: [
      'Interior design visualization',
      'High-resolution rendered images',
      'Construction documentation',
    ],
    media: {
      cover: {
        src: '/images/ikeja-interior.jpg',
        alt: 'Living and dining interior render with a fluted-panel TV feature wall.',
      },
      gallery: [
        {
          src: '/images/ikeja-interior-2.jpg',
          alt: 'Living area render showing the floating TV console and display niche.',
        },
        {
          src: '/images/ikeja-interior-3.jpg',
          alt: 'Open-plan living and dining render with the proposed material palette.',
        },
        {
          src: '/images/ikeja-interior-4.jpg',
          alt: 'Dining area render within the open-plan layout.',
        },
      ],
    },
  },

  // ----------------------------------------------------------------- 02
  {
    slug: 'hillside-terrace-residence',
    title: 'Hillside Terrace Residence Concept',
    discipline: 'architecture',
    disciplines: ['architecture', 'visualization'],
    location: 'Conceptual project',
    clientType: 'Residential Concept Design',
    summary:
      'A two-storey terrace residence designed to emerge from steep, uneven terrain rather than resist it.',
    overview:
      'The Hillside Terrace Residence Concept is a residential design exploration that investigates how contemporary architecture can respond effectively to challenging topographical conditions. The concept proposes a two-storey terrace residence carefully integrated into a steep and uneven terrain. Rather than resisting the site’s natural form, the design embraces the existing landscape, allowing portions of the building to emerge organically from the terrain while maintaining functionality, accessibility, and visual appeal. The project demonstrates how thoughtful architectural planning can transform difficult land conditions into unique design opportunities.',
    scope:
      'Develop a conceptual residential terrace design capable of responding to a complex topographical environment. The project focused on site-responsive design development, building integration with natural terrain, spatial organization across varying levels, architectural visualization, and concept presentation.',
    approach:
      'The inspiration for this concept originated from observing difficult and irregular terrain conditions within the local environment. The objective was to explore how residential architecture could successfully occupy and adapt to steep land formations while minimizing disruption to the natural landscape. Through careful massing studies and level manipulation, the building was designed to work with the terrain rather than against it, resulting in a structure that feels naturally embedded within its surroundings.',
    keyFeatures: [
      'Site-responsive two-storey terrace residence',
      'Building form emergent from the natural terrain',
      'Spatial organization across varying ground levels',
      'Massing designed to minimize landscape disruption',
      'Contemporary architectural expression on challenging topography',
    ],
    deliverables: [
      'Concept design development',
      'Architectural visualizations',
      'Design presentation materials',
    ],
    media: {
      cover: {
        src: '/images/terrace-raw.jpg',
        alt: 'Massing model of a two-storey terrace residence set into sloping terrain.',
      },
      gallery: [
        {
          src: '/images/loft-raw.jpg',
          alt: 'Design model studying the terrace levels and building form.',
        },
        {
          src: '/images/schema-massing.jpg',
          alt: 'Massing study of the residence within its site context.',
        },
      ],
    },
  },

  // ----------------------------------------------------------------- 03
  {
    slug: 'urban-vista-apartments',
    title: 'Urban Vista Apartments Concept',
    discipline: 'architecture',
    disciplines: ['architecture', 'bim', 'visualization'],
    location: 'Conceptual project',
    clientType: 'Residential Concept Design',
    summary:
      'A five-storey apartment building of ten two-bedroom units over a dedicated parking level.',
    overview:
      'Urban Vista Apartments Concept is a multi-family residential development proposal exploring efficient medium-density housing solutions within an urban environment. The concept consists of a five-storey apartment building containing ten two-bedroom residential units above a dedicated parking level. The project focuses on balancing residential comfort, circulation efficiency, and contemporary architectural expression. The development was conceived as a design exercise aimed at exploring practical apartment planning while maintaining strong visual identity.',
    scope:
      'Develop a conceptual apartment building containing ten two-bedroom residential units, a dedicated parking level, shared circulation spaces, a contemporary architectural façade, and residential amenities planning.',
    approach:
      'The project was developed as an architectural exploration of efficient urban residential living. The primary objective was to create a functional and visually appealing apartment building that maximizes space utilization while maintaining comfort for occupants. Particular attention was given to circulation, unit arrangement, parking integration, and overall building proportion.',
    keyFeatures: [
      'Five-storey multi-family residential building',
      'Ten two-bedroom residential units',
      'Dedicated ground-level parking',
      'Efficient shared circulation design',
      'Contemporary façade and architectural expression',
      'Space-maximizing unit layouts',
    ],
    deliverables: [
      'Concept design development',
      'Architectural visualizations',
      'BIM development',
      'Design presentation materials',
    ],
    media: {
      cover: {
        src: '/images/schema-massing-2.jpg',
        alt: 'Massing model of a five-storey urban apartment building.',
      },
      gallery: [
        {
          src: '/images/schema-massing.jpg',
          alt: 'Massing study of the apartment scheme showing building proportion.',
        },
        {
          src: '/images/loft-raw.jpg',
          alt: 'Design model exploring unit arrangement and circulation.',
        },
      ],
    },
  },

  // ----------------------------------------------------------------- 04
  {
    slug: 'st-andrews-anglican-church',
    title: "St. Andrew's Anglican Church Redevelopment",
    discipline: 'architecture',
    disciplines: [
      'architecture',
      'landscape',
      'construction',
      'visualization',
    ],
    location: 'Ado Ekiti, Ekiti State, Nigeria',
    clientType: 'Religious Facility Renovation and Redevelopment',
    summary:
      'Redesign and modernization of an existing Anglican worship centre, pairing architecture with landscape.',
    overview:
      'This project involved the redesign and modernization of an existing Anglican church facility in Ado Ekiti. The objective was to transform the existing worship centre into a more visually appealing, functional, and welcoming environment while preserving the church’s identity and minimizing unnecessary reconstruction. The proposal combined architectural redesign and landscape development to create a cohesive worship environment that enhances circulation, aesthetics, and overall user experience.',
    scope:
      'The project included architectural redesign of the church building, landscape design and development, site circulation planning, exterior façade enhancement, construction documentation, and approval drawings preparation.',
    approach:
      'The church leadership provided an existing building concept that they wished to improve and modernize. The design process began by studying the existing structure and identifying opportunities for architectural enhancement while retaining the core identity of the facility. Landscape elements and circulation routes were then integrated into the overall design to create a more organized and visually attractive worship environment.',
    keyFeatures: [
      'Redesigned front elevation with strong geometric divisions and a prominent cross feature',
      'Contemporary visual character and an enhanced entrance experience',
      'Landscape development improving visual appeal and pedestrian circulation',
      'Site organization tuned to the quality of the worship environment',
    ],
    deliverables: [
      'Architectural visualizations',
      'Complete construction documentation',
      'Approval drawings',
      'Landscape design documentation',
      'Construction methodology documentation',
    ],
    media: {
      cover: {
        src: '/images/ado-finished.jpg',
        alt: "Finished render of St. Andrew's church redesigned façade.",
      },
      // Genuine raw -> finished pair: structural model to finished render.
      raw: {
        src: '/images/ado-raw.jpg',
        alt: "Structural model of St. Andrew's church redevelopment.",
      },
      finished: {
        src: '/images/ado-finished.jpg',
        alt: "Finished render of St. Andrew's church redesigned façade.",
      },
      gallery: [
        {
          src: '/images/ado-finished-alt.jpg',
          alt: 'Alternate finished render of the church exterior and entrance.',
        },
        {
          src: '/images/ado-raw-2.jpg',
          alt: 'Structural model showing the redesigned geometry of the façade.',
        },
      ],
    },
  },

  // ----------------------------------------------------------------- 05
  {
    slug: 'ogor-event-lifestyle-estate',
    title: 'Ogor Event & Lifestyle Estate Masterplan',
    discipline: 'architecture',
    disciplines: [
      'architecture',
      'landscape',
      'construction',
      'visualization',
    ],
    location: 'To be confirmed',
    clientType: 'Mixed-Use Masterplan — Event, Hospitality & Residential',
    summary:
      'A mixed-use masterplan spanning an event centre, chalet accommodation, and a mini-estate.',
    overview:
      'The Ogor Event & Lifestyle Estate Masterplan covers event centre design, chalet accommodation, mini-estate development, and master-planning aspects of the Ogor Estate development.',
    scope:
      'The project spans the event centre, hospitality, and residential components of the estate. Further scope detail will be added as the project package is completed.',
    approach:
      'Master-planning brings the event, hospitality, and residential components into a single coherent site strategy. Further approach detail will be added as the project package is completed.',
    keyFeatures: [
      'Event centre design',
      'Chalet accommodation',
      'Mini-estate residential development',
      'Comprehensive site masterplan',
    ],
    deliverables: [
      'Masterplan drawings',
      'Architectural visualizations',
      'Design presentation materials',
      'Construction documentation',
    ],
    media: {
      cover: {
        src: '/images/landscape-hotel-2.jpg',
        alt: 'Render of the estate hospitality and landscape setting.',
      },
      gallery: [
        {
          src: '/images/landscape-ijare.jpg',
          alt: 'Site-context render of the estate masterplan.',
        },
        {
          src: '/images/landscape-ncs.jpg',
          alt: 'Landscape and circulation render within the estate.',
        },
        {
          src: '/images/landscape-plan.jpg',
          alt: 'Landscape site plan for the estate development.',
        },
      ],
    },
  },
];

// --- Lookups -------------------------------------------------------------

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function allSlugs(): string[] {
  return PROJECTS.map((p) => p.slug);
}

// All disciplines a project belongs to (primary + spanned), de-duplicated.
export function projectDisciplines(project: Project): Discipline[] {
  const set = new Set<Discipline>([project.discipline, ...(project.disciplines ?? [])]);
  return DISCIPLINE_ORDER.filter((d) => set.has(d));
}

export function projectsByDiscipline(discipline: Discipline): Project[] {
  return PROJECTS.filter((p) => projectDisciplines(p).includes(discipline));
}

// Disciplines that actually have at least one project (for filter chips).
export function activeDisciplines(): Discipline[] {
  return DISCIPLINE_ORDER.filter((d) => projectsByDiscipline(d).length > 0);
}
