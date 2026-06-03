'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getProduct } from '@/lib/products';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import AddToCartButton from './AddToCartButton';

interface DropPageProps {
  params: Promise<{ slug: string }>;
}

export default function DropPage({ params }: DropPageProps) {
  const [slug, setSlug] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState('M');

  if (!slug) {
    // @ts-ignore
    params.then(p => setSlug(p.slug));
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
  }

  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  const sizes = ['S', 'M', 'L', 'XL', '2XL'];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-zinc-950 border border-white/10 overflow-hidden hidden md:block">
              <img 
                src={`/products/${product.slug}/shirt.png`} 
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square bg-zinc-950 border border-white/10 overflow-hidden">
              <img 
                src={`/products/${product.slug}/roxy.png`} 
                alt={`${product.title} on model`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center">
            <div className="mb-2 text-[#ff0088] text-sm tracking-[2px] font-medium">
              {product.flavor}
            </div>
            
            <h1 className="text-5xl font-bold tracking-[-1.5px] mb-4">
              {product.title}
            </h1>

            <div className="text-3xl font-light mb-8">
              ${product.price}
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <div className="text-sm text-white/60 mb-3 tracking-[1px]">SIZE</div>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? 'border-[#ff0088] bg-[#ff0088] text-black'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart - under size on both mobile and desktop */}
            <div className="mb-8">
              <AddToCartButton product={product} size={selectedSize} />
            </div>

            <div className="space-y-3 mb-10 text-white/80">
              {product.bullets.map((bullet, index) => (
                <div key={index} className="flex gap-3">
                  <span className="text-[#ff0088] mt-1">{bullet.icon}</span>
                  <span>{bullet.text}</span>
                </div>
              ))}
            </div>

            {/* Secondary CTA under description */}
            <div className="mb-6">
              <Link 
                href="/shop" 
                className="block w-full text-center bg-black border border-[#ff0088] hover:bg-[#9b00ff] hover:border-[#9b00ff] py-3 text-sm tracking-[1px] transition-colors"
              >
                SHOP ALL CHAOS
              </Link>
            </div>

            <p className="mt-4 text-xs text-white/40 text-center">
              Ships in 3–7 business days • Premium Bella + Canvas 3001
            </p>
          </div>
        </div>
      </div>

      {/* Minimal Footer */}
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/40">
        © Unhinged Threads
      </div>
    </div>
  );
}
