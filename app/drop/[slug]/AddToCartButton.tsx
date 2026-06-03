'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addToCart } from '@/lib/cart';
import type { Product } from '@/lib/products';

export default function AddToCartButton({ product, size }: { product: Product; size: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAddToCart = async () => {
    setLoading(true);
    
    addToCart(product.slug, 1, size);
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    router.push('/cart');
    setLoading(false);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className="w-full bg-black border border-[#ff0088] hover:bg-[#9b00ff] hover:border-[#9b00ff] active:bg-[#6b00b3] text-white font-bold py-4 text-lg tracking-[1px] transition-colors disabled:opacity-70"
    >
      {loading ? 'ADDING...' : `ADD TO CART — $${product.price} (${size})`}
    </button>
  );
}
