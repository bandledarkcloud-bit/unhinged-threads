'use client';

import { useState } from 'react';
import { Product } from '@/lib/products';
import { addToCart } from '@/lib/cart';

export default function ProductClient({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "L");
  const [added, setAdded] = useState(false);

  const handleAddToCart = async () => {
    await addToCart(product.slug, 1, selectedSize);
    window.dispatchEvent(new Event('cartUpdated'));
    
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

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
        onClick={handleAddToCart}
        className={`mt-10 w-full py-3 md:py-4 text-lg md:text-xl font-black transition-all ${
          added 
            ? 'bg-[#39ff14] text-black' 
            : 'bg-white text-black active:bg-[#ff0088] active:text-white'
        }`}
      >
        {added ? 'ADDED TO CART ✓' : `ADD TO CART — $${product.price} (Size ${selectedSize})`}
      </button>
    </>
  );
}
