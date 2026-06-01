'use client';

import Header from '@/components/Header';
import Link from 'next/link';

export default function CartDisabled() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
        <div className="max-w-md">
          <h1 className="text-3xl font-black tracking-[2px] mb-4">CART TEMPORARILY DISABLED</h1>
          <p className="text-white/60 mb-8">
            We're making some updates. The cart will be back soon.
          </p>
          <Link 
            href="/shop" 
            className="inline-block px-8 py-3 border border-white/40 hover:bg-white hover:text-black transition-all font-black tracking-[1px]"
          >
            BROWSE THE SHOP
          </Link>
        </div>
      </div>
    </div>
  );
}
