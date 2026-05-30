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
                      className="px-4 py-1.5 bg-white text-black text-xs font-black active:bg-[#ff0088] active:text-white transition-all"
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
            className="text-[96px] font-black tracking-[-4px] leading-none"
            style={{ 
              color: '#ff0088',
              textShadow: '0 0 10px #39ff14, 0 0 20px #ff0088, 0 0 40px #39ff14'
            }}
          >
            RESPECT THE GLITCH.
          </div>
        </div>
      </section>
      <footer className="border-t border-white/10 py-8 text-center">
        <div className="flex justify-center gap-6 mb-4">
          <a href="https://x.com/threadglitch" target="_blank" className="hover:text-[#39ff14] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25l-7.451 8.502L4.5 2.25H1.5l7.5 8.5L1.5 21.75h3l7.5-8.5 7.5 8.5h3l-7.5-8.5 7.5-8.5h-3z"/></svg>
          </a>
          <a href="https://instagram.com/threadglitch" target="_blank" className="hover:text-[#39ff14] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.849.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          <a href="https://facebook.com/threadglitch" target="_blank" className="hover:text-[#39ff14] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
          </a>
          <a href="https://tiktok.com/@threadglitch" target="_blank" className="hover:text-[#39ff14] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/></svg>
          </a>
        </div>
        <div className="text-xs text-[#ff0088] tracking-widest">
          © UNHINGED THREADS™ — NO REFUNDS. NO REGRETS.
        </div>
      </footer>
    </div>
  );
}
