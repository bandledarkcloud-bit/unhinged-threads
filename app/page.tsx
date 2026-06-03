'use client';

import Link from 'next/link';
import { products } from '@/lib/products';
import Header from '@/components/Header';

const weeklyProduct = {
  title: "FIREWORKS DIRECTOR",
  price: 29.99,
  tag: "CHAOTIC PATRIOTISM",
  desc: "I run, you run.",
};

export default function UnhingedHome() {
  const slug = "fireworks-director";

  const handleAddToCart = (e: React.MouseEvent, itemTitle: string) => {
    e.preventDefault();
    e.stopPropagation();
    alert(`⚡️ ${itemTitle} ADDED TO THE CHAOS (CART)!`);
  };

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
            className="w-full max-w-[280px] px-6 py-3.5 bg-black text-white border-2 border-[#ff0088] text-sm font-black tracking-[2px] active:bg-[#ff0088] text-center uppercase relative z-10"
          >
            SHOP THE CHAOS
          </a>
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
            {products.slice(0, 5).map((product) => (
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
                    className="px-8 py-3 bg-white text-black text-sm font-black hover:bg-[#ff0088] hover:text-white active:bg-[#9b00ff] active:text-white transition-all"
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

      {/* LOWEST SECTION: Call To Action Banner */}
      <section className="relative py-24 bg-black border-t border-zinc-900 text-center flex flex-col items-center justify-center px-4">
        <span className="text-xs font-black tracking-[4px] text-[#ff0088] uppercase mb-4">
          STAY UNHINGED
        </span>
        <h2 className="text-5xl md:text-6xl font-black tracking-[-2px] text-white uppercase mb-6">
          RESPECT THE GLITCH
        </h2>
        <div className="max-w-xl mx-auto mb-10 space-y-2">
          <p className="text-zinc-400 font-mono text-sm md:text-base tracking-wide">
            Every shirt is a middle finger to the algorithm.
          </p>
          <p className="text-zinc-400 font-mono text-sm md:text-base tracking-wide">
            Wear it loud. Wear it proud.
          </p>
        </div>
        <a 
          href="/shop" 
          className="px-10 py-4 bg-[#ff0088] text-white text-sm font-black tracking-[3px] hover:bg-white hover:text-black hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] transition-all duration-200 uppercase"
        >
          ENTER THE CHAOS
        </a>
      </section>

      {/* FOOTER: Clean, Consolidated Single Container Layout */}
      <footer className="w-full bg-black border-t-2 border-zinc-900 pt-12 pb-8 px-6 md:px-12 font-mono text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col space-y-8">
          
          {/* Top Row: Copyright & Brand Statement */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-center md:text-left border-b border-zinc-950 pb-8">
            <p className="tracking-wider">
              © 2026 UNHINGED THREADS™
            </p>
            <p className="text-zinc-400 italic">
              Made for people who say the quiet part out loud.
            </p>
          </div>

          {/* Bottom Row: Socials, Legal Disclaimer, & Contact Email */}
          <div className="flex flex-col items-center space-y-4 pt-2">
            {/* Social Icons Stack */}
            <div className="flex items-center space-x-6 text-white text-lg">
              <a href="#" className="hover:text-[#39ff14] transition-colors duration-200"><i className="fab fa-x-twitter"></i></a>
              <a href="#" className="hover:text-[#ff0088] transition-colors duration-200"><i className="fab fa-instagram"></i></a>
              <a href="#" className="hover:text-[#9b00ff] transition-colors duration-200"><i className="fab fa-facebook"></i></a>
              <a href="#" className="hover:text-[#39ff14] transition-colors duration-200"><i className="fab fa-tiktok"></i></a>
            </div>

            {/* Legal / Policy Brand Banner */}
            <p className="text-[#ff0088] font-black tracking-[1.5px] uppercase text-center">
              © UNHINGED THREADS™ — NO REFUNDS. NO REGRETS.
            </p>

            {/* Support Email */}
            <a 
              href="mailto:hellothere@threadglitch.com" 
              className="text-zinc-400 hover:text-[#39ff14] underline underline-offset-4 transition-colors duration-200"
            >
              hellothere@threadglitch.com
            </a>
          </div>

        </div>
      </footer>
    </div>
  );
}
