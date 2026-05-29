'use client';

import { addToCart } from '@/lib/cart';

interface AddToCartButtonProps {
  slug: string;
  className?: string;
  children: React.ReactNode;
}

export default function AddToCartButton({ slug, className, children }: AddToCartButtonProps) {
  const handleClick = () => {
    addToCart(slug);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  return (
    <button 
      onClick={handleClick}
      className={className}
    >
      {children}
    </button>
  );
}