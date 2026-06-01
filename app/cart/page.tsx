'use client';

import Header from '@/components/Header';
import Link from 'next/link';

export default function CartDisabled() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
        <div className="max-w-md">
          <div className="mb-4 text-6xl">🚧</div>
          <h1 className="text-4xl font-black tracking-[3px] mb-3">UNDER CONSTRUCTION</h1>
          <p className="text-white/60 mb-6 text-lg">
            Cart & checkout are being rebuilt.
          </p>
          <p className="text-white/80 mb-4 text-base">
            You can purchase our shirts here:
          </p>
          <a 
            href="https://www.etsy.com/shop/UnhingedThreadsDepot?ref=dashboard-header" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 border border-white/40 hover:bg-white hover:text-black transition-all font-black tracking-[2px] text-lg mb-8"
          >
            ETSY SHOP
          </a>
          <div>
            <Link 
              href="/shop" 
              className="text-white/60 hover:text-white underline text-sm"
            >
              Browse designs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
