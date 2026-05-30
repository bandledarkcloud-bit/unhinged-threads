'use client';

import { useState } from 'react';
import { Product } from '@/lib/products';
import { addToCart } from '@/lib/cart';

interface ProductClientProps {
  product: Product;
  selectedSize: string;
  onSizeChange: (size: string) => void;
}

export default function ProductClient({ product, selectedSize, onSizeChange }: ProductClientProps) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = async () => {
    await addToCart(product.slug, 1, selectedSize);
    window.dispatchEvent(new Event('cartUpdated'));
    
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button 
      onClick={handleAddToCart}
      className={`mt-4 w-full py-3 md:py-4 text-lg md:text-xl font-black transition-all ${
        added 
          ? 'bg-[#39ff14] text-black' 
          : 'bg-white text-black active:bg-[#ff0088] active:text-white'
      }`}
    >
      {added ? 'ADDED TO CART ✓' : `ADD TO CART — $${product.price} (Size ${selectedSize})`}
    </button>
  );
}
