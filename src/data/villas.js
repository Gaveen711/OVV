// Source of truth: OVV Brochure (Villa Plan pages, B.U.A schedule, Key Features).
// The brochure defines three layouts - Type A, B and C. Type 04 is offered on the
// Type C layout, so it shares that plan set.

const UPPER_GROUND_FEATURES = [
  'Dining space + living room',
  'Plunge pool with jacuzzi + pool bed',
  'Pool deck / balcony',
  'Private garden',
  'Pantry',
  'Powder room / guest toilet',
  'Master suite (bedroom, closet, large toilet)',
  'Wet kitchen + kitchen yard',
  'Foyer',
];

const FIRST_FLOOR_FEATURES = [
  'Bedroom 1 with toilet',
  'Bedroom 2 with toilet',
  'Bedroom 1 + 2 shared balcony',
  'Premium suite (bedroom, closet, large toilet) with balcony',
  'Family room',
  'Laundry with balcony',
];

const LOWER_GROUND_A = [
  '2 car garage',
  'Secure foyer',
  "Maid's / driver's quarters",
  'Service room',
  'Side walkway',
];

const LOWER_GROUND_BC = [
  '2 car garage',
  'Secure foyer',
  "Maid's / driver's quarters",
  'Service room',
  'Domestic yard',
  'Domestic toilet',
  'Sheltered entrance',
];

const PLAN_SETS = {
  A: [
    {
      name: 'Lower Ground Floor',
      sqft: 1685,
      image: '/images/ovv/plans/type-a-lower-ground.webp',
      features: LOWER_GROUND_A,
    },
    {
      name: 'Upper Ground Floor',
      sqft: 2050,
      image: '/images/ovv/plans/type-a-upper-ground.webp',
      features: UPPER_GROUND_FEATURES,
    },
    {
      name: 'First Floor',
      sqft: 1715,
      image: '/images/ovv/plans/type-a-first.webp',
      features: FIRST_FLOOR_FEATURES,
    },
  ],
  B: [
    {
      name: 'Lower Ground Floor',
      sqft: 1685,
      image: '/images/ovv/plans/type-b-lower-ground.webp',
      features: LOWER_GROUND_BC,
    },
    {
      name: 'Upper Ground Floor',
      sqft: 2050,
      image: '/images/ovv/plans/type-b-upper-ground.webp',
      features: UPPER_GROUND_FEATURES,
    },
    {
      name: 'First Floor',
      sqft: 1740,
      image: '/images/ovv/plans/type-b-first.webp',
      features: FIRST_FLOOR_FEATURES,
    },
  ],
  C: [
    {
      name: 'Lower Ground Floor',
      sqft: 1685,
      image: '/images/ovv/plans/type-c-lower-ground.webp',
      features: LOWER_GROUND_BC,
    },
    {
      name: 'Upper Ground Floor',
      sqft: 2050,
      image: '/images/ovv/plans/type-c-upper-ground.webp',
      features: UPPER_GROUND_FEATURES,
    },
    {
      name: 'First Floor',
      sqft: 1840,
      image: '/images/ovv/plans/type-c-first.webp',
      features: FIRST_FLOOR_FEATURES,
    },
  ],
};

const AMENITIES = [
  'Plunge pool',
  'Jacuzzi',
  'Pool deck',
  'Private garden',
  'Family room',
  '2 car garage',
  "Maid's quarters",
  '24/7 CCTV',
  'On-site security',
  'Beach access',
];

const SHARED = {
  category: 'Villa',
  listedBy: 'Partner',
  location: 'Uswetakeiyawa, Sri Lanka',
  priceUsd: 2200000,
  priceLkr: 750000000,
  bedrooms: 4,
  bathrooms: 5,
  parking: 2,
  floors: 3,
  architect: 'Design One Studio',
  developer: 'Swastik Investments (Private) Limited',
  contractor: 'Vonlan Constructions (Pvt) Ltd',
  amenities: AMENITIES,
};

export const villas = [
  {
    ...SHARED,
    slug: 'type-01',
    name: 'Type 01',
    planType: 'A',
    tagline: 'Corner residence with a side walkway approach.',
    summary:
      'Type 01 is laid out on the brochure Type A plan. Its lower ground level opens through a secure foyer served by a private side walkway, giving the villa a discreet second approach alongside the two-car garage. Above it, the upper ground floor carries the full-width living and dining volume out to the plunge pool and private garden, while the first floor holds a second master suite, two en-suite bedrooms and a family room.',
    gallery: [
      { src: '/images/ovv/ocean-suite.webp', alt: 'Ocean-facing master suite in Type 01' },
      { src: '/images/ovv/suite-vaulted.webp', alt: 'Vaulted bedroom in Type 01' },
      { src: '/images/ovv/open-living.webp', alt: 'Open-plan living room in Type 01' },
      { src: '/images/ovv/private-balcony.webp', alt: 'Private balcony overlooking the coast' },
      { src: '/images/ovv/property-aerial.webp', alt: 'Aerial view of Ocean View Villas' },
      { src: '/images/ovv/plunge-pool.webp', alt: 'Private plunge pool at Type 01' },
    ],
  },
  {
    ...SHARED,
    slug: 'type-02',
    name: 'Type 02',
    planType: 'B',
    tagline: 'Sheltered entrance with a full domestic yard.',
    summary:
      'Type 02 follows the brochure Type B plan. The lower ground level trades the side walkway for a sheltered entrance, a dedicated domestic yard and a separate domestic toilet, keeping service circulation entirely apart from the family route. The upper ground floor is identical to the rest of the collection, and the first floor gains additional area over Type 01 across its bedrooms and family room.',
    gallery: [
      { src: '/images/ovv/open-living.webp', alt: 'Open-plan living room in Type 02' },
      { src: '/images/ovv/kitchen.webp', alt: 'Kitchen and dining detail in Type 02' },
      { src: '/images/ovv/suite-study.webp', alt: 'Bedroom with study in Type 02' },
      { src: '/images/ovv/bath-twin.webp', alt: 'Twin vanity bathroom in Type 02' },
      { src: '/images/ovv/table-setting.webp', alt: 'Dining table setting in Type 02' },
      { src: '/images/ovv/family-room.webp', alt: 'First floor family room in Type 02' },
    ],
  },
  {
    ...SHARED,
    slug: 'type-03',
    name: 'Type 03',
    planType: 'C',
    tagline: 'The largest first floor in the collection.',
    summary:
      'Type 03 is built on the brochure Type C plan, the most generous of the three. Its first floor runs to 1,840 sq. ft. - the largest upper level offered here - giving noticeably more room across the second master suite, the two en-suite bedrooms and the shared family room. The lower ground level keeps the sheltered entrance and domestic yard arrangement, and the upper ground floor opens directly onto the plunge pool and garden.',
    gallery: [
      { src: '/images/ovv/plunge-pool.webp', alt: 'Private plunge pool opening into Type 03' },
      { src: '/images/ovv/family-room.webp', alt: 'Family room in Type 03' },
      { src: '/images/ovv/suite-mezzanine.webp', alt: 'Mezzanine suite in Type 03' },
      { src: '/images/ovv/sea-kitchen.webp', alt: 'Kitchen looking through to the sea' },
      { src: '/images/ovv/bath-shower.webp', alt: 'Walk-in shower in Type 03' },
      { src: '/images/ovv/property-aerial.webp', alt: 'Aerial view of Ocean View Villas' },
    ],
  },
  {
    ...SHARED,
    slug: 'type-04',
    name: 'Type 04',
    planType: 'C',
    tagline: 'Type C layout with a west-facing outlook.',
    summary:
      'Type 04 is offered on the same Type C plan as Type 03, carrying the collection’s largest first floor at 1,840 sq. ft. Three levels connect a secure lower ground arrival through to an upper ground living volume that opens onto the plunge pool, jacuzzi and private garden, with the bedroom floor and family room set above.',
    gallery: [
      { src: '/images/ovv/sea-kitchen.webp', alt: 'Kitchen looking through Type 04 to the sea' },
      { src: '/images/ovv/bath-stone.webp', alt: 'Stone-clad bathroom in Type 04' },
      { src: '/images/ovv/suite-oceanfan.webp', alt: 'Ocean-facing bedroom in Type 04' },
      { src: '/images/ovv/table-setting.webp', alt: 'Dining table setting in Type 04' },
      { src: '/images/ovv/private-balcony.webp', alt: 'Private balcony overlooking the coast' },
      { src: '/images/ovv/plunge-pool.webp', alt: 'Private plunge pool at Type 04' },
    ],
  },
].map((villa) => {
  // PLAN_SETS is authored bottom-up, the order the building is drawn in. The
  // page presents it top-down - First Floor first, Lower Ground last - so the
  // reversal happens once here rather than being baked into every plan set.
  const plans = [...PLAN_SETS[villa.planType]].reverse();
  return {
    ...villa,
    plans,
    sizeSqft: plans.reduce((total, plan) => total + plan.sqft, 0),
  };
});

export function getVilla(slug) {
  return villas.find((villa) => villa.slug === slug);
}
