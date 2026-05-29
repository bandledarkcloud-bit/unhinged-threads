'use client';
export const dynamic = 'force-dynamic';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getCart, updateQuantity, removeFromCart, CartItem } from '@/lib/cart';
import Header from '@/components/Header';

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    setLoading(true);
    const items = await getCart();
    setCart(items);
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleUpdateQuantity = async (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    await updateQuantity(id, newQuantity);
    await fetchCart();
  };

  const handleRemove = async (id: string) => {
    await removeFromCart(id);
    await fetchCart();
  };

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white font-mono">
        <Header />
        <div className="flex items-center justify-center min-h-[70vh]">
          <div className="text-white/60">Loading cart...</div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white font-mono">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
          <div className="text-6xl mb-6">🛒</div>
          <h1 className="text-4xl font-black tracking-[-2px] mb-4">YOUR CART IS EMPTY</h1>
          <p className="text-white/70 mb-8 max-w-sm">
            Looks like you haven&apos;t added anything yet.<br />Go fix that.
          </p>
          <Link 
            href="/shop" 
            className="px-8 py-3 bg-white text-black border-2 border-[#ff0088] font-black tracking-[1px] active:bg-[#ff0088] active:text-white transition-all"
          >
            BROWSE THE CHAOS
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <Header />

      <div className="max-w-5xl mx-auto px-6 pt-12 pb-20">
        <h1 className="text-4xl md:text-5xl font-black tracking-[-3px] mb-10">YOUR CART</h1>

        <div className="space-y-6">
          {cart.map((item, index) => (
            <div key={`${item.id}-${index}`} className="flex flex-col sm:flex-row gap-6 border border-white/10 bg-zinc-950 p-6">
              <div className="w-full sm:w-28 h-28 bg-black border border-white/10 flex-shrink-0 overflow-hidden">
                <img 
                  src={item.image || '/products/placeholder.png'} 
                  alt={item.title} 
                  className="w-full h-full object-cover" 
                />
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="font-black text-xl tracking-[-1px]">{item.title}</div>
                  {item.size && <div className="text-sm text-white/60 mt-0.5">Size: {item.size}</div>}
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      className="w-9 h-9 border border-white/40 hover:bg-white hover:text-black transition-all text-lg leading-none"
                    >
                      −
                    </button>
                    <div className="font-mono w-8 text-center text-lg">{item.quantity}</div>
                    <button 
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      className="w-9 h-9 border border-white/40 hover:bg-white hover:text-black transition-all text-lg leading-none"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="font-black text-xl tracking-tight">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <button 
                      onClick={() => handleRemove(item.id)}
                      className="text-sm text-white/50 hover:text-[#ff0088] transition-colors tracking-widest"
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col items-end">
          <div className="text-sm tracking-[2px] text-white/60">SUBTOTAL</div>
          <div className="text-5xl font-black tracking-[-2px] mt-1">${subtotal.toFixed(2)}</div>
          <div className="text-xs text-white/50 mt-1">Shipping calculated at checkout</div>

          <button 
            onClick={handleCheckout}
            className="mt-8 w-full md:w-auto px-16 py-4 bg-[#ff0088] text-white font-black text-lg tracking-[1px] active:bg-white active:text-black transition-all"
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>

      {showCheckout && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 px-6">
          <div className="bg-zinc-950 border border-white/20 p-10 max-w-md text-center">
            <div className="text-[#39ff14] text-6xl mb-6">😈</div>
            <h2 className="text-3xl font-black tracking-[-1px] mb-4">CHECKOUT IS FOR NORMIES</h2>
            <p className="text-white/70 mb-8">
              Just kidding. In a real store this would take you to Stripe or whatever.<br /><br />
              For now, enjoy your imaginary purchase.
            </p>
            <button 
              onClick={() => setShowCheckout(false)}
              className="px-10 py-3 bg-white text-black font-black tracking-widest active:bg-[#ff0088] active:text-white transition-all"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
