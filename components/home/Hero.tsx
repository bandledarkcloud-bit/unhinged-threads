import Link from 'next/link';
import { products } from '@/lib/products';

export default function Hero() {
  // Find the product marked as weekly
  const weeklyProduct = products.find(p => p.weekly) || products[0];
  const slug = weeklyProduct.slug;

  return (
    <section className="hero pt-6 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-row items-center justify-between gap-8">
          <div className="flex-shrink-0">
            <img 
              src="/header.png" 
              alt="Unhinged Threads - Respect The Glitch" 
              className="max-w-[420px] w-full" 
            />
          </div>

          <div className="flex-1 max-w-xs text-center">
            <div className="text-[#39ff14] text-xs tracking-[4px] mb-2">WEEKLY DROP</div>
            <div className="font-black text-4xl tracking-[-2px] leading-none mb-2">
              {weeklyProduct.title}
            </div>
            <div className="text-sm text-white/70 mb-4">
              {weeklyProduct.metaDescription?.split('.')[0] || "Limited drop."}
            </div>
            
            <Link 
              href={`/shop/${slug}`}
              className="inline-block px-8 py-3 bg-white text-black font-black text-sm tracking-[1px] active:bg-[#ff0088] active:text-white transition-all"
            >
              SHOP THIS DROP
            </Link>
          </div>

          <div className="flex-shrink-0 w-48 text-right">
            <div className="text-6xl font-black tracking-[-3px]">${weeklyProduct.price}</div>
            <div className="text-xs tracking-[3px] text-white/60 mt-1">USD</div>
          </div>
        </div>
      </div>
    </section>
  );
}
