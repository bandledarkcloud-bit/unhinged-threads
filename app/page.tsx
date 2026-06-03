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
  tag: "CHAOTIC PATRIOTISM",
  desc: "I run, you run.",
};

export default function UnhingedHome() {
  const slug = "fireworks-director";

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

            {/* DESKTOP HERO (Hidden on mobile, flex on desktop) */}
      <section 
        className="hero relative h-[620px] hidden md:flex items-center bg-black overflow-hidden"
        style={{
          backgroundImage: "url(/Hero-Desktop.png)",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        {/* 1. THE LOGO: Centered in left dead space and upscaled to max-w-[420px] */}
        <div className="absolute left-[12%] top-1/2 -translate-y-1/2 z-20">
          <img 
            src="/header.png" 
            alt="Unhinged Threads - Respect The Glitch" 
            className="max-w-[420px] w-full object-contain" 
          />
        </div>

        {/* 2. THE TEXT & CTA: Centered precisely and upscaled for maximum impact */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center text-center w-full max-w-[550px]">
          {/* Upscaled Slogan Text Stack */}
          <div className="mb-8 flex flex-col items-center w-full">
            <p className="text-6xl font-black tracking-[-2px] text-[#39ff14] uppercase leading-none mb-1">
              Unfiltered.
            </p>
            <p className="text-6xl font-black tracking-[-2px] text-[#39ff14] uppercase leading-none mb-1">
              Unapologetic.
            </p>
            <p className="text-6xl font-black tracking-[-2px] text-[#39ff14] uppercase leading-none">
              Unhinged.
            </p>
            <p 
              className="glitch-text font-black block pt-6 text-[#39ff14]" 
              style={{ fontSize: "2.25rem", textShadow: "0 0 12px #39ff14" }}
            >
              Respect The Glitch ⚡️
            </p>
          </div>

          {/* Centered CTA Button scaled to match */}
          <a 
            href="/shop" 
            className="w-full max-w-[260px] px-8 py-4 bg-black text-white border-2 border-[#ff0088] text-base font-black tracking-[2px] hover:bg-[#ff0088] hover:text-white hover:shadow-[0_0_20px_#ff0088] active:bg-[#9b00ff] active:border-[#9b00ff] transition-all duration-200 text-center uppercase"
          >
            SHOP THE CHAOS
          </a>
        </div>
      </section>

                                          {/* MOBILE HERO (Flex on mobile, hidden on desktop) */}
      <section 
        className="hero relative min-h-[480px] flex md:hidden flex-col items-center justify-center bg-black px-6 pt-6 pb-10 border-b border-zinc-900 overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(0,0,0,0.95)), url(/Hero-Desktop.png)",
          backgroundSize: "cover",
          backgroundPosition: "left center"
        }}
      >
        {/* Content Container */}
        <div className="z-10 flex flex-col items-center text-center w-full max-w-sm mx-auto relative">
          {/* Mobile Logo */}
          <img 
            src="/header.png" 
            alt="Unhinged Threads" 
            className="max-w-[240px] w-full object-contain mb-4" 
          />
          
          {/* Mobile Taglines */}
          <div className="mb-6 flex flex-col items-center w-full">
            <p className="text-4xl font-black tracking-[-1px] text-[#39ff14] uppercase leading-none mb-1">Unfiltered.</p>
            <p className="text-4xl font-black tracking-[-1px] text-[#39ff14] uppercase leading-none mb-1">Unapologetic.</p>
            <p className="text-4xl font-black tracking-[-1px] text-[#39ff14] uppercase leading-none mb-3">Unhinged.</p>
            <p 
              className="glitch-text font-black block text-[#39ff14] tracking-wide uppercase whitespace-nowrap"
              style={{ 
                fontSize: "calc(14px + 1.2vw)", 
                textShadow: '0 0 8px #39ff14',
                maxWidth: '100%'
              }}
            >
              Respect The Glitch ⚡️
            </p>
          </div>

          {/* Mobile CTA Button */}
          <a 
            href="/shop" 
            className="w-full max-w-[280px] px-6 py-3.5 bg-black text-white border-2 border-[#ff0088] text-sm font-black tracking-[2px] active:bg-[#ff0088] text-center uppercase"
          >
            SHOP THE CHAOS
          </a>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="pb-20 bg-zinc-950">
        <div className="max-w-[1800px] mx-auto px-6 pt-10">
          <div className="mb-8">
            <div className="text-[#ff0088] text-xs tracking-[4px] mb-1">TOP DEGENERACY</div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-[-3px] text-[#9b00ff]">BEST SELLERS</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.slice(0, 4).map((product) => (
              <Link 
                key={product.slug} 
                href={`/shop/${product.slug}`}
                className="border border-white/10 bg-black flex flex-col hover:border-[#39ff14] transition-all"
              >
                <div className="aspect-square bg-black overflow-hidden border-b border-white/10">
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

      {/* WEEKLY DROP - Two column layout */}
      <section className="py-16 bg-black border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-8 text-center">
            <div className="text-[#ff0088] text-sm font-black tracking-[4px] mb-1">THIS WEEK&apos;S DEGENERACY</div>
            <h2 className="text-[#9b00ff] text-6xl font-black tracking-[-4px] leading-none">FRESH CHAOS</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left: Weekly Drop Card */}
            <div className="max-w-md mx-auto w-full">
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
                  <div>
                    <div className="text-4xl font-black">${weeklyProduct.price}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Joke Ad Image */}
            <div className="max-w-lg mx-auto w-full">
              <img 
                src="/joke-ad.png" 
                alt="Joke Ad"
                className="w-full h-auto object-contain rounded"
              />
            </div>
          </div>

          <div className="text-center mt-10">
            <a href="/shop" className="inline-block px-8 py-3 bg-black text-white text-sm font-black tracking-[1px] border-2 border-[#ff0088] hover:bg-[#ff0088] hover:text-white active:bg-[#9b00ff] active:border-[#9b00ff] transition-all">
              SHOP ALL CHAOS
            </a>
          </div>
        </div>
      </section>      {/* RESPECT THE GLITCH - Full lower section */}
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

