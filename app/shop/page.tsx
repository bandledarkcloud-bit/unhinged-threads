import Link from 'next/link';
import { products } from '@/lib/products';
import Header from '@/components/Header';

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <Header />

      <div className="max-w-7xl mx-auto px-6 pt-10 pb-20">
        <div className="mb-10">
          <div className="text-[#ff0088] text-xs tracking-[4px] mb-1">ALL THE DEGENERACY</div>
          <h1 className="text-5xl font-black tracking-[-3px]">SHOP ALL</h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key={product.slug} 
              className="border border-white/10 bg-zinc-950 flex flex-col hover:border-[#ff0088] transition-all"
            >
              <Link href={`/shop/${product.slug}`} className="block">
                <div className="aspect-square bg-black overflow-hidden border-b border-white/10">
                  <img 
                    src={`/products/${product.slug}/roxy.png`} 
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              </Link>
              
              <div className="p-4 flex flex-col flex-1">
                <Link href={`/shop/${product.slug}`}>
                  <div className="font-black text-lg tracking-[-1px] text-[#ff0088] hover:text-[#39ff14] transition-colors mb-1">
                    {product.title}
                  </div>
                </Link>
                
                <div className="mt-auto pt-3 flex items-center justify-between">
                  <div className="text-2xl font-black">${product.price}</div>
                  <Link 
                    href={`/shop/${product.slug}`}
                    className="px-2.5 py-0.5 bg-white text-black text-[9px] font-black inline-flex items-center justify-center active:bg-[#ff0088] active:text-white transition-all"
                  >
                    ADD TO CART
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
