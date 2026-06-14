/**
 * Project data configuration.
 * To add images: drop photos into /assets/projects/<project-id>/
 * then update coverImage and gallery paths below.
 */

const PROJECTS = [
  {
    id: 'ado-hall',
    title: 'Ado Hall of Worship',
    category: 'civic',
    location: 'Nigeria',
    coverImage: '/assets/projects/ado-hall/after.png',
    gallery: [
      '/assets/projects/ado-hall/before.jpg',
      '/assets/projects/ado-hall/after.png',
      '/assets/projects/ado-hall/ado-hall-drawing-sheet.png'
    ]
  },
  {
    id: 'hillside',
    title: 'Hillside Residence',
    category: 'residential',
    location: 'Nigeria',
    coverImage: '/assets/projects/hillside/hillside-render-01.png',
    gallery: [
      '/assets/projects/hillside/hillside-render-01.png',
      '/assets/projects/hillside/hillside-render-02.png',
      '/assets/projects/hillside/hillside-render-details.png'
    ]
  },
  {
    id: 'civil-defence-hq',
    title: 'Civil Defence Corps HQ Landscape',
    category: 'civic',
    location: 'Akure, Ondo State',
    coverImage: '/assets/projects/civil-defence-hq/civil-defence-hq-landscape-aerial.png',
    gallery: [
      '/assets/projects/civil-defence-hq/civil-defence-hq-landscape-aerial.png',
      '/assets/projects/civil-defence-hq/civil-defence-hq-landscape-entrance.png'
    ]
  },
  {
    id: 'ikotun-6flat',
    title: '6-Flat Apartment Development',
    category: 'residential',
    location: 'Ikotun, Lagos',
    description: 'Architectural design, structural design, and building CAAS development.',
    coverImage: null,
    gallery: []
  },
  {
    id: 'uselu-apartment',
    title: 'Residential Apartment',
    category: 'residential',
    location: 'Uselu, Benin City',
    description: '3D visualisation.',
    coverImage: null,
    gallery: []
  },
  {
    id: 'ikeja-gra-interior',
    title: 'Interior Visualisation',
    category: 'interiors',
    location: 'Ikeja GRA, Lagos',
    coverImage: null,
    gallery: []
  }
];

// Hero image pool — drawn from projects with real cover images
const HERO_IMAGES = PROJECTS
  .filter(p => p.coverImage)
  .map(p => p.coverImage)
  .filter((v, i, a) => a.indexOf(v) === i);
