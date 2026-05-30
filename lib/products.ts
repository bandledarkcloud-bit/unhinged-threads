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
    printfulVariants: {
      S: 32088638211,
      M: 32392530080,
      L: 32088638209,
      XL: 32088638207,
      "2XL": 32392530078,
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
      { icon: "📏", text: "Unisex fit — True to size. Size up for that oversized streetwear look" },
      { icon: "🔥", text: "High-quality DTG print — Won't crack, peel, or fade" },
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    metaTitle: "No Fat Chicks T-Shirt | Unhinged Threads",
    metaDescription: "No Fat Chicks. Brutal honesty on a shirt.",
    printfulVariants: {
      S: 32088638211,
      M: 32392530080,
      L: 32088638209,
      XL: 32088638207,
      "2XL": 32392530078,
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
      { icon: "📏", text: "Unisex fit — True to size. Size up for that oversized streetwear look" },
      { icon: "🔥", text: "High-quality DTG print — Won't crack, peel, or fade" },
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    metaTitle: "Good Girl T-Shirt | Unhinged Threads",
    metaDescription: "Good Girl. She wants to hear it even when she's not.",
    printfulVariants: {
      S: 32088638211,
      M: 32392530080,
      L: 32088638209,
      XL: 32088638207,
      "2XL": 32392530078,
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
      { icon: "📏", text: "Unisex fit — True to size. Size up for that oversized streetwear look" },
      { icon: "🔥", text: "High-quality DTG print — Won't crack, peel, or fade" },
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    metaTitle: "White Boy Summer T-Shirt | Unhinged Threads",
    metaDescription: "White Boy Summer. Certified.",
    printfulVariants: {
      S: 32088638211,
      M: 32392530080,
      L: 32088638209,
      XL: 32088638207,
      "2XL": 32392530078,
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
      { icon: "📏", text: "Unisex fit — True to size. Size up for that oversized streetwear look" },
      { icon: "🔥", text: "High-quality DTG print — Will not crack, peel, or fade" },
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    metaTitle: "Not Responsible For My Face T-Shirt | Unhinged Threads",
    metaDescription: "I am not responsible for what my face does when you talk.",
    printfulVariants: {
      S: 32197048323,
      M: 32505717324,
      L: 32505717322,
      XL: 32197048321,
      "2XL": 32505717320,
    },
  },
];