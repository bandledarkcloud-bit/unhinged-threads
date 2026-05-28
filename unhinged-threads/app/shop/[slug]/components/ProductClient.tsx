'use client';

import { useState } from 'react';
import { Product } from '@/lib/products';

export default function ProductClient({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState("L");

  return (
    <>
      {/* Size Selector */}
      <div className="mb-8">
        <div className="text-sm tracking-[3px] text-white/70 mb-3">SIZE</div>
        <div className="flex gap-2 flex-wrap">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-5 py-2 border text-sm font-black transition-all ${
                selectedSize === size
                  ? 'bg-white text-black border-white'
                  : 'border-white/40 hover:border-white/80'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <button 
        onClick={() => alert(`Added ${product.title} - Size ${selectedSize} to cart (demo)`)}
        className="mt-10 w-full py-4 bg-white text-black text-xl font-black active:bg-[#ff0088] active:text-white transition-all"
      >
        ADD TO CART — ${product.price} (Size {selectedSize})
      </button>
    </>
  );
}