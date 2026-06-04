export type Product = {
  slug: string;
  title: string;
  price: number;
  flavor: string;
  bullets: Array<{
    icon: string;
    text: string;
  }>;
  sizes: string[];
  metaTitle?: string;
  metaDescription?: string;
  catalogVariantIds?: Record<string, number>;
  printfulVariants?: Record<string, number>;
  weekly?: boolean;
};

export function getProduct(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export const products: Product[] = [
  {
    slug: "certified-cougar-bait",
    title: "CERTIFIED COUGAR BAIT",
    price: 29.99,
    flavor: "FLIRTY / SPICY",
    bullets: [
      { icon: "⚡️", text: "Certified Cougar Bait — For men who prefer experience over innocence" },
      { icon: "🐱", text: "Here Kitty Kitty Kitty — Classic degenerate humor that hits different" },
      { icon: "👕", text: "Premium Bella + Canvas 3001 — Stupid soft and comfortable from day one" },
      { icon: "📏", text: "Unisex fit — True to size. Size up for oversized streetwear look" },
      { icon: "🔥", text: "High-quality DTG print — Won't crack, peel, or fade" },
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    metaTitle: "Certified Cougar Bait T-Shirt | Unhinged Threads",
    metaDescription: "Certified Cougar Bait. For men who prefer experience over innocence.",
    catalogVariantIds: { S: 4016, M: 4017, L: 4018, XL: 4019, "2XL": 4020 }, // SHORT catalog IDs for shipping rates
    printfulVariants: {
      S: 5334281393,
      M: 5334281394,
      L: 5334281395,
      XL: 5334281396,
      "2XL": 5334281397,
    },
  },
  {
    slug: "no-fat-chicks",
    title: "NO FAT CHICKS",
    price: 29.99,
    flavor: "MENTAL HEALTH",
    bullets: [
      { icon: "🚫", text: "No Fat Chicks — Brutal. Direct. Zero filter." },
      { icon: "😂", text: "The shirt that ends friendships and starts conversations" },
      { icon: "👕", text: "Premium Bella + Canvas 3001 — Soft, durable, actually good quality" },
      { icon: "⚪", text: "Silver color — Not white, a soft metallic gray" },
      { icon: "📏", text: "Unisex fit — True to size. Size up for that oversized streetwear look" },
      { icon: "🔥", text: "High-quality DTG print — Will not crack, peel, or fade" },
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    metaTitle: "No Fat Chicks T-Shirt | Unhinged Threads",
    metaDescription: "No Fat Chicks. Brutal honesty on a shirt.",
    catalogVariantIds: { S: 4016, M: 4017, L: 4018, XL: 4019, "2XL": 4020 }, // SHORT catalog IDs for shipping rates
    printfulVariants: {
      S: 5334280273,
      M: 5334280275,
      L: 5334280277,
      XL: 5334280279,
      "2XL": 5334280281,
    },
  },
  {
    slug: "good-girl",
    title: "GOOD GIRL",
    price: 29.99,
    flavor: "FLIRTY / SPICY",
    weekly: true,
    bullets: [
      { icon: "😇", text: "Good Girl — She wants to hear it even when she's not" },
      { icon: "🐱", text: "Perfect for when you're anything but" },
      { icon: "👕", text: "Premium Bella + Canvas 3001 — Soft, durable, actually good quality" },
      { icon: "⚪", text: "Silver color — Not white, a soft metallic gray" },
      { icon: "📏", text: "Unisex fit — True to size. Size up for that oversized streetwear look" },
      { icon: "🔥", text: "High-quality DTG print — Won't crack, peel, or fade" },
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    metaTitle: "Good Girl T-Shirt | Unhinged Threads",
    metaDescription: "Good Girl. She wants to hear it even when she's not.",
    catalogVariantIds: { S: 4016, M: 4017, L: 4018, XL: 4019, "2XL": 4020 }, // SHORT catalog IDs for shipping rates
    printfulVariants: {
      S: 5332833314,
      M: 5332833315,
      L: 5332833316,
      XL: 5332833317,
      "2XL": 5332833318,
    },
  },
  {
    slug: "white-boy-summer",
    title: "WHITE BOY SUMMER",
    price: 29.99,
    flavor: "MENTAL HEALTH",
    bullets: [
      { icon: "☀️", text: "White Boy Summer — Certified" },
      { icon: "🧴", text: "SPF 50 and zero shame" },
      { icon: "👕", text: "Premium Bella + Canvas 3001 — Soft, durable, actually good quality" },
      { icon: "⚪", text: "Silver color — Not white, a soft metallic gray" },
      { icon: "📏", text: "Unisex fit — True to size. Size up for that oversized streetwear look" },
      { icon: "🔥", text: "High-quality DTG print — Won't crack, peel, or fade" },
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    metaTitle: "White Boy Summer T-Shirt | Unhinged Threads",
    metaDescription: "White Boy Summer. Certified.",
    catalogVariantIds: { S: 4016, M: 4017, L: 4018, XL: 4019, "2XL": 4020 }, // SHORT catalog IDs for shipping rates
    printfulVariants: {
      S: 5330249069,
      M: 5330249070,
      L: 5330249071,
      XL: 5330249072,
      "2XL": 5330249073,
    },
  },
  {
    slug: "not-responsible-face",
    title: "NOT RESPONSIBLE FOR MY FACE",
    price: 29.99,
    flavor: "RELATIONSHIP CHAOS",
    bullets: [
      { icon: "😶", text: "I am not responsible for what my face does when you talk" },
      { icon: "👕", text: "Premium Bella + Canvas 3001 — Soft, durable, actually good quality" },
      { icon: "⚪", text: "Silver color — Not white, a soft metallic gray" },
      { icon: "📏", text: "Unisex fit — True to size. Size up for that oversized streetwear look" },
      { icon: "🔥", text: "High-quality DTG print — Will not crack, peel, or fade" },
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    metaTitle: "Not Responsible For My Face T-Shirt | Unhinged Threads",
    metaDescription: "I am not responsible for what my face does when you talk.",
    catalogVariantIds: { S: 4016, M: 4017, L: 4018, XL: 4019, "2XL": 4020 }, // SHORT catalog IDs for shipping rates
    printfulVariants: {
      S: 5334281381,
      M: 5334281382,
      L: 5334281383,
      XL: 5334281384,
      "2XL": 5334281386,
    },
  },
  {
    slug: "fireworks-director",
    title: "FIREWORKS DIRECTOR",
    price: 29.99,
    flavor: "CHAOTIC PATRIOTISM",
    weekly: true,
    bullets: [
      { icon: "🎆", text: "Fireworks Director — I run, you run" },
      { icon: "🇺🇸", text: "Official 4th of July chaos uniform" },
      { icon: "👕", text: "Premium Bella + Canvas 3001 — Soft, durable, actually good quality" },
      { icon: "⚪", text: "Silver color — Not white, a soft metallic gray" },
      { icon: "📏", text: "Unisex fit — True to size. Size up for that oversized streetwear look" },
      { icon: "🔥", text: "High-quality DTG print — Will not crack, peel, or fade" },
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    metaTitle: "Fireworks Director T-Shirt | Unhinged Threads",
    metaDescription: "Fireworks Director. I run, you run. 4th of July chaos.",
    catalogVariantIds: { S: 4111, M: 4112, L: 4113, XL: 4114, "2XL": 4115 }, // SHORT catalog IDs for shipping rates
    printfulVariants: {
      S: 5334289252,
      M: 5334289253,
      L: 5334289254,
      XL: 5334289255,
      "2XL": 5334289256,
    },
  },
  {
    slug: "just-here-to-bang",
    title: "JUST HERE TO BANG",
    price: 29.99,
    flavor: "4TH OF JULY CHAOS",
    bullets: [
      { icon: "🎆", text: "Just Here To Bang — Exactly what it says on the tin" },
      { icon: "🚀", text: "Pin-up girl on a firework. Zero subtlety" },
      { icon: "👕", text: "Premium Bella + Canvas 3001 — Soft, durable, actually good quality" },
      { icon: "⚪", text: "Silver color — Not white, a soft metallic gray" },
      { icon: "📏", text: "Unisex fit — True to size. Size up for that oversized streetwear look" },
      { icon: "🔥", text: "High-quality DTG print — Will not crack, peel, or fade" },
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    metaTitle: "Just Here To Bang T-Shirt | Unhinged Threads",
    metaDescription: "Just Here To Bang. Pin-up girl on a firework. 4th of July chaos.",
    catalogVariantIds: { S: 6948, M: 6949, L: 6950, XL: 6951, "2XL": 6952 },
    printfulVariants: {
      S: 5338187307,
      M: 5338187308,
      L: 5338187309,
      XL: 5338187310,
      "2XL": 5338187311,
    },
  },
  {
    slug: "stop-staring",
    title: "STOP STARING",
    price: 29.99,
    flavor: "CHAOTIC ENERGY",
    bullets: [
      { icon: "🐓", text: "Stop Staring — At my cock. The rooster makes it classy." },
      { icon: "😈", text: "Zero subtlety. Maximum chaos." },
      { icon: "👕", text: "Premium Bella + Canvas 3001 — Soft, durable, actually good quality" },
      { icon: "⚫", text: "Asphalt color — Dark gray with a cool undertone" },
      { icon: "📏", text: "Unisex fit — True to size. Size up for that oversized streetwear look" },
      { icon: "🔥", text: "High-quality DTG print — Will not crack, peel, or fade" },
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    metaTitle: "Stop Staring T-Shirt | Unhinged Threads",
    metaDescription: "Stop Staring. At my cock. The rooster makes it classy.",
    catalogVariantIds: {},
    printfulVariants: {},
  },
  {
    slug: "stop-staring",
    title: "STOP STARING",
    price: 29.99,
    flavor: "CHAOTIC ENERGY",
    bullets: [
      { icon: "🐓", text: "Stop Staring — At my cock. The rooster makes it classy." },
      { icon: "😈", text: "Zero subtlety. Maximum chaos." },
      { icon: "👕", text: "Premium Bella + Canvas 3001 — Soft, durable, actually good quality" },
      { icon: "⚫", text: "Asphalt color — Dark gray with a cool undertone" },
      { icon: "📏", text: "Unisex fit — True to size. Size up for that oversized streetwear look" },
      { icon: "🔥", text: "High-quality DTG print — Will not crack, peel, or fade" },
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    metaTitle: "Stop Staring T-Shirt | Unhinged Threads",
    metaDescription: "Stop Staring. At my cock. The rooster makes it classy.",
    catalogVariantIds: { S: 4031, M: 4032, L: 4033, XL: 4034, "2XL": 4035 },
    printfulVariants: {
      S: 5338212054,
      M: 5338212055,
      L: 5338212056,
      XL: 5338212057,
      "2XL": 5338212058,
    },
  },
];
