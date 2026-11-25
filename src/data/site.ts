/**
 * Site content for Northlight Studio.
 * Everything is local data — no CMS, no API keys, no environment variables.
 * Project imagery uses free Unsplash CDN URLs with a gradient fallback
 * rendered by <SmartImage /> if a URL ever fails to load.
 */

export const CATEGORIES = [
  "Branding",
  "Web",
  "Mobile Apps",
  "Illustration",
  "Motion",
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Project {
  slug: string;
  index: number;
  title: string;
  client: string;
  category: Category;
  year: number;
  tools: string[];
  summary: string;
  description: [string, string];
  tags: string[];
  image: string;
  likes: number;
  saves: number;
  featured?: boolean;
}

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const projects: Project[] = [
  {
    slug: "aurora-credit-union",
    index: 1,
    title: "Aurora Credit Union",
    client: "Aurora CU, Reykjavík",
    category: "Branding",
    year: 2025,
    tools: ["Figma", "Glyphs", "Illustrator", "After Effects"],
    summary:
      "A member-first identity for a 74-year-old credit union, rebuilt around a variable wordmark that shifts with interest rates.",
    description: [
      "Aurora had eleven regional branches, four logos in circulation and a brand book nobody had opened since 2011. We ran a two-week audit with branch staff, then rebuilt the system from the wordmark out: a custom variable typeface whose stroke weight responds to the live base rate, so every printed statement quietly reflects the day's numbers.",
      "The palette holds to indigo for institutional trust, magenta for member-facing warmth and amber for anything actionable. Rollout covered signage, card printing, a 180-page design system and a Figma library the in-house team now extends without us — branch staff ship a campaign in an afternoon instead of a fortnight.",
    ],
    tags: ["Identity", "Variable type", "Design system", "Signage"],
    image: img("photo-1618005182384-a83a8bd57fbe"),
    likes: 1284,
    saves: 462,
    featured: true,
  },
  {
    slug: "meridian-health",
    index: 2,
    title: "Meridian Health",
    client: "Meridian Health, Berlin",
    category: "Web",
    year: 2025,
    tools: ["Figma", "Next.js", "Framer Motion", "Storybook"],
    summary:
      "A patient portal redesign that cut appointment booking from nine steps to three — and lifted conversion 34%.",
    description: [
      "Meridian's portal was built by three vendors over eight years: 41 distinct button styles, a booking flow with nine steps and a support inbox full of screenshots. We mapped every task patients actually performed, then designed a single-column flow that surfaces the next action before the user has to look for it.",
      "The build ships as a typed component library in Storybook, documented for their engineers and mirrored in Figma. Median time to book fell from 2m 40s to 48s, support tickets tagged “can't find” dropped 61%, and the first month after launch saw signup conversion move 34%.",
    ],
    tags: ["Product design", "Design system", "Accessibility", "Next.js"],
    image: img("photo-1551288049-bebda4e38f71"),
    likes: 942,
    saves: 388,
  },
  {
    slug: "tidepool",
    index: 3,
    title: "Tidepool",
    client: "Tidepool Labs, Lisbon",
    category: "Mobile Apps",
    year: 2024,
    tools: ["Figma", "SwiftUI", "Lottie", "Mapbox"],
    summary:
      "A coastal conditions app for swimmers, surfers and harbour crews — 40,000 downloads in its first season.",
    description: [
      "Tidepool packs tide, swell, wind and water temperature into one glanceable screen. The hard part was hierarchy: a swimmer at 06:30 and a harbourmaster at 14:00 need opposite things from the same data. We designed a priority stack that reorders itself by activity, saved as a single dial the user can override.",
      "Everything is drawn on-device in SwiftUI so the app stays under 12 MB, with Lottie handling the two-second “conditions coming in” transition that has become the app's signature. First season: 40,000 downloads, 4.8 stars across 6,100 ratings and a Apple Design Award shortlist.",
    ],
    tags: ["iOS", "Data visualisation", "SwiftUI", "Maps"],
    image: img("photo-1559028012-481c04fa702d"),
    likes: 1567,
    saves: 604,
  },
  {
    slug: "paper-cities",
    index: 4,
    title: "Paper Cities",
    client: "Frame Magazine",
    category: "Illustration",
    year: 2024,
    tools: ["Procreate", "Illustrator", "Riso"],
    summary:
      "Twelve editorial illustrations on urban density, printed risograph and syndicated across nine countries.",
    description: [
      "Commissioned for Frame's September issue on density, the series compresses twelve cities into single continuous cut-paper compositions — each one built from no more than four ink layers so it could run on a two-colour riso press without losing structure.",
      "The originals were exhibited at Copenhagen's Designmuseum for six weeks, the print run of 300 sold out in eleven days, and the series now runs as Frame's recurring opener for urbanist features.",
    ],
    tags: ["Editorial", "Risograph", "Print", "Series"],
    image: img("photo-1541701494587-cb58502866ab"),
    likes: 2103,
    saves: 871,
  },
  {
    slug: "foundry-in-motion",
    index: 5,
    title: "Foundry in Motion",
    client: "Kern Type Foundry",
    category: "Motion",
    year: 2025,
    tools: ["After Effects", "Cavalry", "Glyphs", "Rive"],
    summary:
      "A specimen film that sells a 14-weight typeface in 90 seconds — 1.2M views and a 22% specimen download rate.",
    description: [
      "Kern was launching a 14-weight superfamily into a crowded market where every specimen is a scrolling webpage. We proposed the opposite: a 90-second film where each weight is performed by a physical material — extruded metal for the black, blown glass for the light, ink in water for the italic.",
      "Every frame was rendered from the actual font files, so nothing on screen is faked. The film opened the launch, ran on three conference screens and reached 1.2M views in a month; specimen downloads in the same window were up 22% year on year.",
    ],
    tags: ["Type specimen", "3D", "Film", "Art direction"],
    image: img("photo-1579546929518-9e396f3cc809"),
    likes: 1789,
    saves: 733,
  },
  {
    slug: "ember-roasters",
    index: 6,
    title: "Ember Roasters",
    client: "Ember Roasters, Oslo",
    category: "Branding",
    year: 2023,
    tools: ["Illustrator", "Figma", "InDesign", "Photoshop"],
    summary:
      "Specialty coffee packaging built on a modular label system — 14 single origins, one press sheet, zero redesigns.",
    description: [
      "Ember roasts 14 single origins a season and could not afford a designer for each bag. We built a modular label: a fixed typographic frame, a rotating colour field derived from roast level, and a data block that prints origin, altitude and process without ever needing reflow.",
      "The system runs on a single two-colour press sheet per origin, cutting print costs 31%. Retail listings tripled after the rebrand, and the packaging was picked up by Monocle's Christmas guide two years running.",
    ],
    tags: ["Packaging", "Print", "Identity", "Retail"],
    image: img("photo-1495474472287-4d71bcdd2085"),
    likes: 864,
    saves: 342,
  },
  {
    slug: "harbor-logistics",
    index: 7,
    title: "Harbor",
    client: "Harbor Freight Systems",
    category: "Web",
    year: 2023,
    tools: ["Figma", "React", "D3", "TypeScript"],
    summary:
      "A logistics control room for the web: 1.4M shipment events a day rendered as something a dispatcher can read at a glance.",
    description: [
      "Dispatchers were running eleven browser tabs and a whiteboard. Harbor replaces all of it with one live board: shipments as horizontal rails, exceptions surfaced by contrast rather than colour, and a density control that lets a supervisor zoom from fleet-wide to a single container without changing pages.",
      "We designed against real shift data — 6am peak, 22:00 skeleton crew — and tested with four dispatchers over six weeks. Tab count dropped from eleven to two, exception response time fell 47%, and the board now runs on wall displays in two depots.",
    ],
    tags: ["Dashboard", "Data viz", "Real-time", "React"],
    image: img("photo-1460925895917-afdab827c52f"),
    likes: 721,
    saves: 297,
  },
  {
    slug: "cadence",
    index: 8,
    title: "Cadence",
    client: "Cadence Running, Amsterdam",
    category: "Mobile Apps",
    year: 2025,
    tools: ["Figma", "Kotlin", "Rive", "HealthKit"],
    summary:
      "A running coach that reads effort instead of pace, with haptic-guided intervals you can follow without looking.",
    description: [
      "Most run apps shout splits at you. Cadence works from heart-rate effort and cadence instead, translating a training plan into haptic patterns — two taps for accelerate, a slow pulse for hold — so the phone stays in a pocket.",
      "The visual system is deliberately quiet: one accent hue per effort zone, tabular figures everywhere, and a single animated gradient on the weekly load chart that fills as the week completes. Retention at week eight sits at 41%, roughly double the category median.",
    ],
    tags: ["Android", "Wearables", "Haptics", "Health"],
    image: img("photo-1571019613454-1cb2f99b2d8b"),
    likes: 1102,
    saves: 458,
  },
  {
    slug: "wild-almanac",
    index: 9,
    title: "Wild Almanac",
    client: "Wild Almanac Press",
    category: "Illustration",
    year: 2023,
    tools: ["Procreate", "InDesign", "Watercolour", "Glyphs"],
    summary:
      "A 240-page field guide with 180 hand-drawn species plates and a wayfinding system that works in rain.",
    description: [
      "Wild Almanac wanted a field guide that could be used one-handed, in wet weather, by people who had never read one. We drew 180 species plates in watercolour and ink, then built a four-colour tab system keyed to habitat so the book opens at the right page without a bookmark.",
      "The typography is set in a single text face at three sizes with tabular figures for every measurement, so numbers align down the column. First printing of 5,000 sold through in four months; the second edition added 30 plates and a trail-marker companion app.",
    ],
    tags: ["Book design", "Natural history", "Watercolour", "Wayfinding"],
    image: img("photo-1470071459604-3b5ec3a7fe05"),
    likes: 1655,
    saves: 690,
  },
  {
    slug: "nocturne-festival",
    index: 10,
    title: "Nocturne Festival",
    client: "Nocturne, Rotterdam",
    category: "Motion",
    year: 2024,
    tools: ["After Effects", "Cavalry", "Houdini", "TouchDesigner"],
    summary:
      "A broadcast and stage package for a three-night electronic festival, generated live from the sound desk.",
    description: [
      "Nocturne's identity had to survive on a 40-metre LED wall, a phone screen and a 6-second story. We built a motion system from a single rule — light travelling through a slit — rendered in indigo, magenta and amber, then wired it to the sound desk so stage visuals react to the actual signal.",
      "The same rig generated 1,800 unique artist cards for social, each derived from that artist's own set. The festival sold out three nights for the first time and the aftermovie passed 2M views.",
    ],
    tags: ["Broadcast", "Generative", "Stage design", "Social"],
    image: img("photo-1470229722913-7c0e2dbbafd3"),
    likes: 1974,
    saves: 812,
  },
  {
    slug: "lumen-skincare",
    index: 11,
    title: "Lumen Skincare",
    client: "Lumen, Copenhagen",
    category: "Branding",
    year: 2025,
    tools: ["Figma", "Illustrator", "Blender", "Framer"],
    summary:
      "Identity and packaging for a five-SKU skincare line — a shelf presence built to be recognised from four metres.",
    description: [
      "Lumen launched into a category where every bottle is pale, matte and identical. We went the other way: a black glass range with a single gradient band that encodes the active ingredient, so a customer can find the right product across a shelf without reading a word.",
      "We art-directed the photography and rendered the 3D pack shots in-house, which let the founders prototype the full range before a single bottle was manufactured. Lumen landed its first two national retailers on the strength of the render deck.",
    ],
    tags: ["Packaging", "Art direction", "3D", "E-commerce"],
    image: img("photo-1596462502278-27bfdc403348"),
    likes: 1338,
    saves: 549,
  },
  {
    slug: "kite-reader",
    index: 12,
    title: "Kite Reader",
    client: "Kite Learning",
    category: "Mobile Apps",
    year: 2022,
    tools: ["Figma", "React Native", "Lottie", "Firebase"],
    summary:
      "A reading app for 6–10 year-olds that turns library loans into a shared family ritual.",
    description: [
      "Kite is built for the ten minutes before lights-out. Children pick a book by cover art alone, parents get a weekly summary without a dashboard, and progress is celebrated with an animated kite that climbs a little higher with every finished chapter.",
      "We designed the whole illustration set and the reading animations, then shipped to React Native so iOS and Android stayed identical. Kite now runs in 340 school libraries and was named one of the year's ten best learning apps by the Nordic Education Council.",
    ],
    tags: ["Kids", "React Native", "Illustration", "Education"],
    image: img("photo-1512820790803-83ca734da794"),
    likes: 986,
    saves: 401,
  },
];

/* --------------------------------- stats --------------------------------- */

export const stats = [
  {
    value: 148,
    suffix: "",
    label: "Projects shipped",
    note: "Since the studio opened in 2016",
  },
  {
    value: 62,
    suffix: "",
    label: "Clients worldwide",
    note: "Across 14 countries and 9 time zones",
  },
  {
    value: 19,
    suffix: "",
    label: "Awards & mentions",
    note: "D&AD, ADC, Webby and Danish Design",
  },
];

/* ------------------------------ testimonials ------------------------------ */

export const testimonials = [
  {
    quote:
      "Northlight didn't hand us a logo, they handed us a system we could grow into. Two years on we still haven't needed to call them — which is the highest compliment I can pay a studio.",
    name: "Ingrid Halvorsen",
    role: "Brand Director",
    company: "Aurora Credit Union",
  },
  {
    quote:
      "The rebrand and portal redesign shipped in eleven weeks. Signup conversion moved 34% in the first month, and our support inbox went quiet for the first time in years.",
    name: "Daniel Okonkwo",
    role: "VP Product",
    company: "Meridian Health",
  },
  {
    quote:
      "They treat motion like typography — every easing curve has a reason. The stage package they built reacts to our sound desk live, and it made the festival look twice its budget.",
    name: "Sofia Reyes",
    role: "Creative Lead",
    company: "Nocturne Festival",
  },
  {
    quote:
      "A rare studio that will argue with you in the right places. They cut three ideas I loved and were right to, then made the one we shipped worth four times what we paid.",
    name: "Marcus Feld",
    role: "Founder",
    company: "Ember Roasters",
  },
];

/* -------------------------------- studio --------------------------------- */

export const services = [
  {
    n: "01",
    title: "Brand systems",
    body: "Naming, identity, variable type, packaging and the guidelines that keep it alive after we leave.",
  },
  {
    n: "02",
    title: "Digital products",
    body: "Research, interface design and design systems shipped hand-in-hand with your engineers.",
  },
  {
    n: "03",
    title: "Illustration & editorial",
    body: "Commissioned series, book design and print work built for presses, not just screens.",
  },
  {
    n: "04",
    title: "Motion & film",
    body: "Specimen films, broadcast packages and generative systems wired to live data.",
  },
];

export const studio = {
  founded: 2016,
  place: "Vesterbro, Copenhagen",
  team: 11,
  awards: 19,
};

export const marqueeWords = [
  "Brand systems",
  "Digital products",
  "Illustration",
  "Motion & film",
  "Design systems",
  "Editorial",
  "Packaging",
  "Art direction",
];

export const CONTACT_EMAIL = "studio@northlight.studio";
