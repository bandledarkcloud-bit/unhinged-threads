'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getCart } from '@/lib/cart';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const fetchCartCount = async () => {
    try {
      const items = await getCart();
      const count = items.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    } catch {
      setCartCount(0);
    }
  };


  useEffect(() => {
    fetchCartCount();

    const handleCartUpdate = () => {
      fetchCartCount();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  return (
    <nav className="border-b border-white/10 bg-black sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-black tracking-[-1px] text-[#ff0088]">
          UNHINGED THREADS
        </Link>

        {/* Desktop Social Icons */}
        <div className="hidden md:flex items-center bg-black border border-white/20 px-5 py-2 gap-7">
          <a href="https://x.com/threadglitch" target="_blank" className="hover:text-[#39ff14] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25l-7.451 8.502L4.5 2.25H1.5l7.5 8.5L1.5 21.75h3l7.5-8.5 7.5 8.5h3l-7.5-8.5 7.5-8.5h-3z"/></svg>
          </a>
          <a href="https://instagram.com/threadglitch" target="_blank" className="hover:text-[#39ff14] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.849.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          <a href="https://facebook.com/threadglitch" target="_blank" className="hover:text-[#39ff14] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
          </a>
          <a href="https://tiktok.com/@threadglitch" target="_blank" className="hover:text-[#39ff14] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/></svg>
          </a>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-lg">
          <Link href="/" className="hover:text-[#ff0088] transition-colors">HOME</Link>
          <Link href="/shop" className="hover:text-[#ff0088] transition-colors">SHOP</Link>
          <Link href="/cart" className="hover:text-[#ff0088] transition-colors flex items-center gap-1">
            CART
            {cartCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 text-xs font-black bg-[#ff0088] text-black rounded">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white"
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-black px-6 py-6 flex flex-col gap-4 text-lg">
          <Link href="/" className="hover:text-[#ff0088]" onClick={() => setMobileMenuOpen(false)}>HOME</Link>
          <Link href="/shop" className="hover:text-[#ff0088]" onClick={() => setMobileMenuOpen(false)}>SHOP</Link>
          <Link href="/cart" className="hover:text-[#ff0088]" onClick={() => setMobileMenuOpen(false)}>
            CART
            {cartCount > 0 && (
              <span className="ml-2 px-1.5 py-0.5 text-xs font-black bg-[#ff0088] text-black rounded">
                {cartCount}
              </span>
            )}
          </Link>
          
          <div className="flex gap-6 pt-4 border-t border-white/10">
            <a href="https://x.com/threadglitch" target="_blank" className="hover:text-[#39ff14]">𝕏</a>
            <a href="https://instagram.com/threadglitch" target="_blank" className="hover:text-[#39ff14]">IG</a>
            <a href="https://facebook.com/threadglitch" target="_blank" className="hover:text-[#39ff14]">FB</a>
            <a href="https://tiktok.com/@threadglitch" target="_blank" className="hover:text-[#39ff14]">TT</a>
          </div>
        </div>
      )}
    </nav>
  );
}
