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
  title: "GOOD GIRL",
  price: 29.99,
  tag: "ADULT HUMOR",
  desc: "She wants to hear it even when she's not.",
};

export default function UnhingedHome() {
  const slug = "good-girl";

  const flavorRows = [
    { header: "FLIRTY / SPICY", sub: "Say less. Mean more. Get in trouble faster." },
    { header: "MENTAL HEALTH", sub: "Therapy is $150. Being unhinged is $29.99. We chose the cheaper option." },
    { header: "RELATIONSHIP CHAOS", sub: "We don't fix relationships. We make shirts for the aftermath." },
    { header: "CORPORATE HATRED", sub: "Fuck your job. Wear the shirt that agrees with you." },
    { header: "CHAOTIC PATRIOTISM", sub: "America, but make it feral." },
    { header: "HOLIDAY CHAOS", sub: "Santa's watching. And he's disappointed." },
  ];

  const productsByFlavor = products.reduce((acc, product) => {
    if (!acc[product.flavor]) acc[product.flavor] = [];
    acc[product.flavor].push(product);
    return acc;
  }, {} as Record<string, typeof products>);

  return (
    <div className="min-h-screen bg-black text-white font-mono font-bebas overflow-x-hidden">
      <Header />

      {/* HERO */}
      <section className="hero pt-6 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-row items-center justify-between gap-8">
            <div className="flex-shrink-0">
              <img src="/header.png" alt="Unhinged Threads - Respect The Glitch" className="max-w-[420px] w-full" />
            </div>

            <div className="flex flex-col items-center max-w-xs text-center">
              <div className="mb-4">
                <p className="text-5xl font-black tracking-[-1.5px] text-[#39ff14] leading-tight">
                  Unfiltered. Unapologetic. Unhinged.
                </p>
                <p className="glitch-text text-sm mt-2 whitespace-nowrap" style={{fontSize: "2rem"}}>Respect The Glitch ⚡️</p>
              </div>

              <div className="flex flex-col gap-2 w-full">
                <a href="/shop" className="px-6 py-2.5 bg-white text-black border-2 border-[#ff0088] text-sm font-black tracking-[1px] active:bg-[#ff0088] active:text-white transition-all text-center">
                  SHOP THE CHAOS
                </a>
              </div>
            </div>

            <div className="flex-shrink-0 w-[260px]">
              <div className="mb-2">
                <div className="text-[#ff0088] text-[10px] font-black tracking-[3px] mb-0.5">THIS WEEK&apos;S DEGENERACY</div>
                <h2 className="text-[#9b00ff] text-5xl font-black tracking-[-3px] leading-none">FRESH CHAOS</h2>
              </div>
              <div className="product-card border border-white/10 p-1 bg-zinc-950 hover:border-[#39ff14] transition-all">
                <div className="aspect-square bg-black border border-white/10 overflow-hidden">
                  <Link href={`/shop/${slug}`}>
                    <img 
                      src={`/products/${slug}/roxy.png`} 
                      alt="Good Girl Shirt"
                      className="w-full h-full object-cover"
                    />
                  </Link>
                </div>
                <div className="p-4">
                  <Link href={`/shop/${slug}`}>
                    <h3 className="font-black text-xl tracking-[-1px] text-[#ff0088] hover:text-[#39ff14] transition-colors mb-1">
                      {weeklyProduct.title}
                    </h3>
                  </Link>
                  <div className="text-sm text-white/70 mb-3">{weeklyProduct.desc}</div>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-black">${weeklyProduct.price}</div>
                    <Link 
                      href={`/shop/${slug}`}
                      className="px-5 py-1.5 bg-white text-black text-xs font-black active:bg-[#ff0088] active:text-white transition-all"
                    >
                      ADD TO CART
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="pb-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 pt-10">
          <div className="mb-8">
            <div className="text-[#ff0088] text-xs tracking-[4px] mb-1">TOP DEGENERACY</div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-[-3px] text-[#9b00ff]">BEST SELLERS</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {products.map((product) => (
              <div 
                key={product.slug} 
                className="border border-white/10 bg-black flex flex-col"
              >
                <Link href={`/shop/${product.slug}`} className="block">
                  <div className="aspect-square bg-black overflow-hidden border-b border-white/10">
                    <img 
                      src={`/products/${product.slug}/roxy.png`} 
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
                
                <div className="p-4 flex flex-col flex-1">
                  <Link href={`/shop/${product.slug}`}>
                    <h3 className="font-black text-lg tracking-[-1px] text-[#ff0088] hover:text-[#39ff14] transition-colors mb-1">
                      {product.title}
                    </h3>
                  </Link>
                  
                  <div className="mt-auto pt-3 flex items-center justify-between">
                    <div className="text-2xl font-black">${product.price}</div>
                    <Link 
                      href={`/shop/${product.slug}`}
                      className="px-2 py-0.5 bg-white text-black text-[8px] font-black inline-flex items-center justify-center text-center active:bg-[#ff0088] active:text-white transition-all md:px-2.5 md:text-[9px]"
                    >
                      ADD TO CART
                    </Link>
                  </div>
                </div>
              </div>
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
                    alt="Good Girl Shirt"
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
                    ADD TO CART
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESPECT THE GLITCH - Full lower section */}
      <section className="py-20 bg-black border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto space-y-4 text-lg mb-10">
            <p className="text-[#ff0088]">We don't make clothes for people who want to fit in.</p>
            <p className="text-[#39ff14]">We make clothes for people who want to be remembered — even if it's for all the wrong reasons.</p>
            <p className="text-[#9b00ff]">Every shirt is a warning label. Every print is a confession.</p>
            <p className="text-[#ff0088]">If you're still reading this, you already know you need one.</p>
          </div>

          <div 
            className="text-[52px] md:text-[96px] font-black tracking-[-4px] leading-none"
            style={{ 
              color: '#ff0088',
              textShadow: '0 0 10px #39ff14, 0 0 20px #ff0088, 0 0 40px #39ff14'
            }}
          >
            RESPECT THE GLITCH.
          </div>
        </div>
      </section>
    </div>
  );
}

