// Floor plans and areas: Floor Plans.pdf, pages 3-14 (T1-T4).
// T1: Unit 1; T2: Units 2 and 4; T3: Units 3 and 5; T4: Unit 6.

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
  T1: [
    {
      name: 'Lower Ground Floor',
      sqft: 1683,
      image: '/images/ovv/plans/t1-lower-ground.webp',
      features: LOWER_GROUND_A,
    },
    {
      name: 'Upper Ground Floor',
      sqft: 2048,
      image: '/images/ovv/plans/t1-upper-ground.webp',
      features: UPPER_GROUND_FEATURES,
    },
    {
      name: 'First Floor',
      sqft: 1716,
      image: '/images/ovv/plans/t1-first.webp',
      features: FIRST_FLOOR_FEATURES,
    },
  ],
  T2: [
    {
      name: 'Lower Ground Floor',
      sqft: 1684,
      image: '/images/ovv/plans/t2-lower-ground.webp',
      features: LOWER_GROUND_BC,
    },
    {
      name: 'Upper Ground Floor',
      sqft: 2048,
      image: '/images/ovv/plans/t2-upper-ground.webp',
      features: UPPER_GROUND_FEATURES,
    },
    {
      name: 'First Floor',
      sqft: 1738,
      image: '/images/ovv/plans/t2-first.webp',
      features: FIRST_FLOOR_FEATURES,
    },
  ],
  T3: [
    {
      name: 'Lower Ground Floor',
      sqft: 1733,
      image: '/images/ovv/plans/t3-lower-ground.webp',
      features: LOWER_GROUND_BC,
    },
    {
      name: 'Upper Ground Floor',
      sqft: 2074,
      image: '/images/ovv/plans/t3-upper-ground.webp',
      features: UPPER_GROUND_FEATURES,
    },
    {
      name: 'First Floor',
      sqft: 1736,
      image: '/images/ovv/plans/t3-first.webp',
      features: FIRST_FLOOR_FEATURES,
    },
  ],
  T4: [
    {
      name: 'Lower Ground Floor',
      sqft: 1684,
      image: '/images/ovv/plans/t4-lower-ground.webp',
      features: LOWER_GROUND_BC,
    },
    {
      name: 'Upper Ground Floor',
      sqft: 2027,
      image: '/images/ovv/plans/t4-upper-ground.webp',
      features: [],
    },
    {
      name: 'First Floor',
      sqft: 1842,
      image: '/images/ovv/plans/t4-first.webp',
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
    planType: 'T1',
    tagline: 'Corner residence with a side walkway approach.',
    summary:
      'Type 01 follows the T1 layout for Unit 1, with 5,447 sq. ft. across three levels. The lower ground floor provides 1,683 sq. ft., the upper ground floor 2,048 sq. ft., and the first floor 1,716 sq. ft.',
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
    planType: 'T2',
    tagline: 'Sheltered entrance with a full domestic yard.',
    summary:
      'Type 02 follows the T2 layout used for Units 2 and 4, with 5,470 sq. ft. across three levels. The lower ground floor provides 1,684 sq. ft., the upper ground floor 2,048 sq. ft., and the first floor 1,738 sq. ft.',
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
    planType: 'T3',
    tagline: 'Generous lower and upper ground living.',
    summary:
      'Type 03 follows the T3 layout used for Units 3 and 5, with 5,543 sq. ft. across three levels. It has the largest lower and upper ground floors in the collection, at 1,733 and 2,074 sq. ft., with a 1,736 sq. ft. first floor.',
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
    planType: 'T4',
    tagline: 'The largest first floor in the collection.',
    summary:
      'Type 04 follows the distinct T4 layout for Unit 6, with 5,553 sq. ft. across three levels. Its 1,842 sq. ft. first floor is the largest in the collection, above a 2,027 sq. ft. upper ground floor and a 1,684 sq. ft. lower ground floor.',
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
