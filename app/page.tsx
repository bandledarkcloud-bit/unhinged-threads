import Link from 'next/link';
import type { Metadata } from 'next';
import { products } from '@/lib/products';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: "UNHINGED THREADS™ | Respect The Glitch",
  description: "We say what you’re thinking but shouldn’t. Chaotic, unfiltered, degenerate streetwear for people who are one bad decision away from greatness.",
  openGraph: {
    title: "UNHINGED THREADS™ | Respect The Glitch",
    description: "We say what you’re thinking but shouldn’t. Chaotic, unfiltered, degenerate streetwear for people who are one bad decision away from greatness.",
    images: [{ url: "/og-image.png" }],
  },
};

const weeklyProduct = {
  title: "FIREWORKS DIRECTOR",
  price: 29.99,
  tag: "4TH OF JULY",
  desc: "I run, you run.",
};

export default function UnhingedHome() {
  const slug = "fireworks-director";

  const flavorRows = [
    { header: "FLIRTY / SPICY", sub: "Say less. Mean more. Get in trouble faster." },
    { header: "MENTAL HEALTH", sub: "Therapy is $150. Being unhinged is $29.99. We chose the cheaper option." },
    { header: "RELATIONSHIP CHAOS", sub: "We don't fix relationships. We make shirts for the aftermath." },
    { header: "CORPORATE HATRED", sub: "Fuck your job. Wear the shirt that agrees with you." },
  ];

  // Best Sellers - pull from real products (first 5)
  const bestSellers = products.slice(0, 5);

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <Header />

      {/* HERO SECTION */}
      <section className="relative h-[620px] flex items-center justify-center bg-black overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/Hero-Desktop.png')" }}
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="flex items-center justify-between w-full">
            {/* Left spacer for logo balance */}
            <div className="w-[340px] hidden md:block" />
            
            {/* Center content */}
            <div className="flex-1 max-w-2xl">
              <h1 className="text-6xl md:text-7xl font-black tracking-[-4px] leading-none mb-4">
                UNFILTERED.<br />UNAPOLOGETIC.<br />UNHINGED.
              </h1>
              <div className="text-[#ff0088] text-3xl font-black tracking-[-1px] mb-8 animate-glitch">
                RESPECT THE GLITCH ⚡️
              </div>
              <Link 
                href="/shop"
                className="inline-block px-12 py-4 bg-black text-white border-2 border-[#ff0088] font-black text-lg tracking-[2px] hover:bg-[#ff0088] hover:text-black active:bg-[#9b00ff] active:border-[#9b00ff] transition-all"
              >
                SHOP THE CHAOS
              </Link>
            </div>

            {/* Right spacer */}
            <div className="w-[340px] hidden md:block" />
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="py-16 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="text-[#ff0088] text-sm font-black tracking-[4px] mb-1">TOP DEGENERACY</div>
            <h2 className="text-5xl font-black tracking-[-3px]">BEST SELLERS</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {bestSellers.map((product) => (
              <Link 
                key={product.slug} 
                href={`/shop/${product.slug}`}
                className="product-card border border-white/10 bg-black hover:border-[#39ff14] transition-all flex flex-col"
              >
                <div className="aspect-[4/3] bg-zinc-900 border-b border-white/10 overflow-hidden">
                  <img 
                    src={`/products/${product.slug}/roxy.png`} 
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-black text-lg tracking-[-1px] text-[#ff0088] hover:text-[#39ff14] transition-colors mb-1">
                    {product.title}
                  </h3>
                  
                  <div className="mt-auto pt-3">
                    <div className="text-2xl font-black">${product.price}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WEEKLY DROP - Larger featured section */}
      <section className="py-16 bg-black border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-6 text-center">
            <div className="text-[#ff0088] text-sm font-black tracking-[4px] mb-1">THIS WEEK&apos;S DEGENERACY</div>
            <h2 className="text-[#9b00ff] text-6xl font-black tracking-[-4px] leading-none">FRESH CHAOS</h2>
          </div>

          <div className="max-w-md mx-auto">
            <div className="product-card border border-white/10 p-2 bg-zinc-950 hover:border-[#39ff14] transition-all">
              <div className="aspect-square bg-black border border-white/10 overflow-hidden">
                <Link href={`/shop/${slug}`}>
                  <img 
                    src={`/products/${slug}/roxy.png`} 
                    alt={weeklyProduct.title}
                    className="w-full h-full object-cover"
                  />
                </Link>
              </div>
              <div className="p-6">
                <Link href={`/shop/${slug}`}>
                  <h3 className="font-black text-3xl tracking-[-1px] text-[#ff0088] hover:text-[#39ff14] transition-colors mb-2">
                    {weeklyProduct.title}
                  </h3>
                </Link>
                <div className="text-lg text-white/70 mb-4">{weeklyProduct.desc}</div>
                <div className="flex items-center justify-between">
                  <div className="text-4xl font-black">${weeklyProduct.price}</div>
                  <Link 
                    href={`/shop/${slug}`}
                    className="px-8 py-3 bg-white text-black text-sm font-black active:bg-[#ff0088] active:text-white transition-all"
                  >
                    VIEW CHAOS
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <a href="/shop" className="inline-block px-8 py-3 bg-black text-white text-sm font-black tracking-[1px] border-2 border-[#ff0088] hover:bg-[#ff0088] hover:text-white active:bg-[#9b00ff] active:border-[#9b00ff] transition-all">
              SHOP ALL CHAOS
            </a>
          </div>
        </div>
      </section>

      {/* RESPECT THE GLITCH - Full lower section */}
      <section className="py-20 bg-zinc-950 border-t border-white/10">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="text-[#ff0088] text-sm font-black tracking-[4px] mb-4">STAY UNHINGED</div>
          <h2 className="text-[#ff0088] text-6xl font-black tracking-[-3px] mb-6">RESPECT THE GLITCH</h2>
          <p className="text-xl text-white/70 mb-8">
            Every shirt is a middle finger to the algorithm.<br />Wear it loud. Wear it proud.
          </p>
          <Link 
            href="/shop"
            className="inline-block px-12 py-4 bg-[#ff0088] text-white font-black text-lg tracking-[1px] hover:bg-white hover:text-black active:bg-[#39ff14] active:text-black transition-all"
          >
            ENTER THE CHAOS
          </Link>
        </div>
      </section>

      <footer className="bg-black border-t border-white/10 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-white/50">
          <div>© {new Date().getFullYear()} UNHINGED THREADS™</div>
          <div className="mt-2 md:mt-0">Made for people who say the quiet part out loud.</div>
        </div>
      </footer>
    </div>
  );
}
