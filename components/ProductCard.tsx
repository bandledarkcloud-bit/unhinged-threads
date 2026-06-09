'use client';

import Link from 'next/link';
import { Product } from '@/lib/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link 
      href={`/shop/${product.slug}`}
      className="group block bg-zinc-900 border border-zinc-700 hover:border-white/30 rounded-2xl overflow-hidden transition-all"
    >
      {/* Placeholder image until real images are added */}
      <div className="aspect-[4/5] bg-zinc-800 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="text-6xl mb-3 opacity-30">👕</div>
          <p className="text-sm text-white/40">Product Image</p>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-lg tracking-[-0.5px] group-hover:text-[#39ff14] transition-colors">
            {product.title}
          </h3>
          <span className="text-[#39ff14] font-mono text-sm mt-1">
            ${product.price}
          </span>
        </div>

        <div className="text-xs text-white/50 tracking-[2px] mb-3">
          {product.flavor}
        </div>

        {product.weekly && (
          <div className="inline-block px-3 py-0.5 bg-[#39ff14] text-black text-[10px] font-bold tracking-widest mb-3">
            WEEKLY DROP
          </div>
        )}
      </div>
    </Link>
  );
}
