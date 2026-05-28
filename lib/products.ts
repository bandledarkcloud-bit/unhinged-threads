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
};

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
    metaDescription: "For men who prefer experience over innocence. Premium Bella + Canvas tee with savage humor. Unisex fit, high-quality DTG print.",
  },
  
  {
    slug: "no-fat-chicks",
    title: "NO FAT CHICKS",
    price: 29.99,
    flavor: "MENTAL HEALTH",
    bullets: [
      { icon: "⚡️", text: "Zero subtlety. Maximum offense." },
      { icon: "🐱", text: "For when you want the room to go silent" },
      { icon: "👕", text: "Premium Bella + Canvas 3001 — Stupid soft from day one" },
      { icon: "🌩", text: "Vibrant neon synthwave print — Blue and purple that hits different" },
      { icon: "📏", text: "Unisex fit — True to size. Size up for oversized streetwear look" },
      { icon: "🔥", text: "High-quality DTG print — Won't crack, peel, or fade" },
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    metaTitle: "No Fat Chicks T-Shirt | Unhinged Threads",
    metaDescription: "Zero subtlety. Maximum offense. The shirt that makes the room go silent. Premium soft tee with neon print.",
  },

  {
    slug: "good-girl",
    title: "CALL ME A GOOD GIRL",
    price: 29.99,
    flavor: "FLIRTY / SPICY",
    bullets: [
      { icon: "⚡️", text: "Call me a good girl. Say it like you mean it." },
      { icon: "🎀", text: "Pink bows and zero shame. For the ones who like being told what to do" },
      { icon: "👕", text: "Premium Bella + Canvas 3001 — Stupid soft and comfortable" },
      { icon: "🌩", text: "Vibrant neon glitch print — Hot pink that actually pops" },
      { icon: "📏", text: "Unisex fit — True to size. Size up for oversized streetwear look" },
      { icon: "🔥", text: "High-quality DTG print — Won't crack, peel, or fade" },
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    metaTitle: "Call Me A Good Girl T-Shirt | Unhinged Threads",
    metaDescription: "Call Me A Good Girl t-shirt. Pink bows and unhinged energy on a premium Bella + Canvas tee. Perfect for soft girl aesthetic and bratcore looks.",
  },

  {
    slug: "white-boy-summer",
    title: "WHITE BOY SUMMER",
    price: 29.99,
    flavor: "MENTAL HEALTH",
    bullets: [
      { icon: "⚡️", text: "White Boy Summer is a lifestyle, not a season" },
      { icon: "🌴", text: "For when you want to make everyone uncomfortable at the beach" },
      { icon: "👕", text: "Premium Bella + Canvas 3001 — Stupid soft from day one" },
      { icon: "🌩", text: "Vibrant neon synthwave print — Blue and purple that hits different" },
      { icon: "📏", text: "Unisex fit — True to size. Size up for oversized streetwear look" },
      { icon: "🔥", text: "High-quality DTG print — Won't crack, peel, or fade" },
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    metaTitle: "White Boy Summer T-Shirt | Unhinged Threads",
    metaDescription: "White Boy Summer t-shirt. Neon vaporwave synthwave design on a premium Bella + Canvas tee. Peak chaotic summer energy.",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
