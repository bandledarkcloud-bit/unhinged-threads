'use client';
export const dynamic = 'force-dynamic';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getCart, updateCartItemQuantity, removeFromCart, clearCart, CartItem } from '@/lib/cart';
import Header from '@/components/Header';
import { buildPrintfulOrderPayload, PrintfulRecipient, createPrintfulOrder, ENABLE_REAL_ORDERS } from '@/lib/printful';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showPaymentStep, setShowPaymentStep] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showErrors, setShowErrors] = useState(false);

  // Address form state
  const [recipient, setRecipient] = useState<PrintfulRecipient>({
    name: '',
    address1: '',
    city: '',
    state_code: '',
    country_code: 'US',
    zip: '',
    phone: '',
    email: '',
  });

  const fetchCart = async () => {
    setLoading(true);
    const items = await getCart();
    setCart(items);
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    await updateCartItemQuantity(itemId, newQuantity);
    window.dispatchEvent(new Event('cartUpdated'));
    await fetchCart();
  };

  const handleRemove = async (itemId: string) => {
    await removeFromCart(itemId);
    window.dispatchEvent(new Event('cartUpdated'));
    await fetchCart();
  };

  const handleClearCart = async () => {
    await clearCart();
    window.dispatchEvent(new Event('cartUpdated'));
    await fetchCart();
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal;

  const isAddressValid = 
    recipient.name && 
    recipient.address1 && 
    recipient.city && 
    recipient.zip && 
    recipient.email;   // email now required

  const proceedToPayment = () => {
    if (!isAddressValid) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    setShowPaymentStep(true);
  };

  const handleCompleteOrder = async () => {
    const payload = buildPrintfulOrderPayload(cart, recipient);
    
    if (ENABLE_REAL_ORDERS) {
      const result = await createPrintfulOrder(payload);
      console.log('%c[Printful] Real order result:', 'color:#39ff14', result);
    } else {
      console.log('%c[Printful] Order payload (REAL ORDERS DISABLED):', 'color:#ff0088; font-weight:bold', payload);
    }

    await clearCart();
    window.dispatchEvent(new Event('cartUpdated'));
    setShowCheckout(false);
    setShowPaymentStep(false);
    setOrderComplete(true);
  };

  const openCheckout = () => {
    setShowCheckout(true);
    setShowPaymentStep(false);
    setShowErrors(false);
  };

  const closeCheckout = () => {
    setShowCheckout(false);
    setShowPaymentStep(false);
    setShowErrors(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white font-mono flex items-center justify-center">
        <div className="text-xl">LOADING YOUR CHAOS...</div>
      </div>
    );
  }

  if (cart.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-black text-white font-mono">
        <Header />
        <div className="max-w-5xl mx-auto px-6 pt-12 pb-20 text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-[-3px] mb-6">YOUR CART</h1>
          <p className="text-xl text-white/60 mb-8">Nothing here yet. Time to get unhinged.</p>
          <Link 
            href="/shop" 
            className="inline-block px-8 py-3 bg-white text-black border-2 border-[#ff0088] font-black tracking-[1px] active:bg-[#ff0088] active:text-white transition-all"
          >
            BROWSE THE CHAOS
          </Link>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-black text-white font-mono">
        <Header />
        <div className="max-w-2xl mx-auto px-6 pt-20 pb-20 text-center">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-xl font-black tracking-[-1px] mb-4">You've made a terrible mistake.</h1>
          <p className="text-xl text-white/70 mb-8">We'll ship it anyways.</p>
          <Link 
            href="/shop" 
            className="inline-block px-8 py-3 bg-white text-black border-2 border-[#ff0088] font-black tracking-[1px] active:bg-[#ff0088] active:text-white transition-all"
          >
            KEEP BROWSING
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <Header />

      <div className="max-w-5xl mx-auto px-6 pt-12 pb-20">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black tracking-[-3px]">YOUR CART</h1>
          <button 
            onClick={handleClearCart}
            className="text-sm text-white/50 hover:text-[#ff0088] transition-colors tracking-widest"
          >
            CLEAR CART
          </button>
        </div>

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

        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <div className="text-sm tracking-[3px] text-white/60">SUBTOTAL</div>
            <div className="text-4xl font-black tracking-tight">${subtotal.toFixed(2)}</div>
            <div className="text-sm text-[#39ff14] mt-1">Free shipping</div>
          </div>

          <button 
            onClick={openCheckout}
            className="w-full sm:w-auto px-12 py-4 bg-[#ff0088] text-white font-black text-xl tracking-[1px] active:bg-white active:text-black transition-all"
          >
            CHECKOUT
          </button>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6">
          <div className="bg-zinc-950 border border-white/20 max-w-lg w-full p-8">
            <h2 className="text-2xl font-black tracking-[-1px] mb-6">
              {showPaymentStep ? 'CONFIRM PAYMENT' : 'CHECKOUT'}
            </h2>
            
            {!showPaymentStep ? (
              // Address Form
              <div className="space-y-4 mb-6">
                <div>
                  <div className="text-xs tracking-[2px] text-white/60 mb-1">FULL NAME *</div>
                  <input
                    type="text"
                    value={recipient.name}
                    onChange={(e) => setRecipient({ ...recipient, name: e.target.value })}
                    className={`w-full bg-black border px-4 py-2 text-white focus:border-[#ff0088] outline-none ${showErrors && !recipient.name ? 'border-[#ff0088]' : 'border-white/30'}`}
                    placeholder="Ferris Bueller"
                  />
                  {showErrors && !recipient.name && <div className="text-[#ff0088] text-xs mt-1">Name is required</div>}
                </div>

                <div>
                  <div className="text-xs tracking-[2px] text-white/60 mb-1">ADDRESS *</div>
                  <input
                    type="text"
                    value={recipient.address1}
                    onChange={(e) => setRecipient({ ...recipient, address1: e.target.value })}
                    className={`w-full bg-black border px-4 py-2 text-white focus:border-[#ff0088] outline-none ${showErrors && !recipient.address1 ? 'border-[#ff0088]' : 'border-white/30'}`}
                    placeholder="31 Spooner Street"
                  />
                  {showErrors && !recipient.address1 && <div className="text-[#ff0088] text-xs mt-1">Address is required</div>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs tracking-[2px] text-white/60 mb-1">CITY *</div>
                    <input
                      type="text"
                      value={recipient.city}
                      onChange={(e) => setRecipient({ ...recipient, city: e.target.value })}
                      className={`w-full bg-black border px-4 py-2 text-white focus:border-[#ff0088] outline-none ${showErrors && !recipient.city ? 'border-[#ff0088]' : 'border-white/30'}`}
                      placeholder="Hill Valley"
                    />
                    {showErrors && !recipient.city && <div className="text-[#ff0088] text-xs mt-1">City is required</div>}
                  </div>
                  <div>
                    <div className="text-xs tracking-[2px] text-white/60 mb-1">ZIP *</div>
                    <input
                      type="text"
                      value={recipient.zip}
                      onChange={(e) => setRecipient({ ...recipient, zip: e.target.value })}
                      className={`w-full bg-black border px-4 py-2 text-white focus:border-[#ff0088] outline-none ${showErrors && !recipient.zip ? 'border-[#ff0088]' : 'border-white/30'}`}
                      placeholder="90210"
                    />
                    {showErrors && !recipient.zip && <div className="text-[#ff0088] text-xs mt-1">ZIP is required</div>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs tracking-[2px] text-white/60 mb-1">STATE</div>
                    <input
                      type="text"
                      value={recipient.state_code || ''}
                      onChange={(e) => setRecipient({ ...recipient, state_code: e.target.value })}
                      className="w-full bg-black border border-white/30 px-4 py-2 text-white focus:border-[#ff0088] outline-none"
                      placeholder="CA"
                    />
                  </div>
                  <div>
                    <div className="text-xs tracking-[2px] text-white/60 mb-1">COUNTRY</div>
                    <input
                      type="text"
                      value={recipient.country_code}
                      onChange={(e) => setRecipient({ ...recipient, country_code: e.target.value })}
                      className="w-full bg-black border border-white/30 px-4 py-2 text-white focus:border-[#ff0088] outline-none"
                      placeholder="US"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs tracking-[2px] text-white/60 mb-1">PHONE (OPTIONAL)</div>
                    <input
                      type="tel"
                      value={recipient.phone || ''}
                      onChange={(e) => setRecipient({ ...recipient, phone: e.target.value })}
                      className="w-full bg-black border border-white/30 px-4 py-2 text-white focus:border-[#ff0088] outline-none"
                      placeholder="867-5309"
                    />
                  </div>
                  <div>
                    <div className="text-xs tracking-[2px] text-white/60 mb-1">EMAIL *</div>
                    <input
                      type="email"
                      value={recipient.email || ''}
                      onChange={(e) => setRecipient({ ...recipient, email: e.target.value })}
                      className={`w-full bg-black border px-4 py-2 text-white focus:border-[#ff0088] outline-none ${showErrors && !recipient.email ? 'border-[#ff0088]' : 'border-white/30'}`}
                      placeholder="ferris@dayoff.com"
                    />
                    {showErrors && !recipient.email && <div className="text-[#ff0088] text-xs mt-1">Email is required for shipping updates</div>}
                  </div>
                </div>
              </div>
            ) : (
              // Payment Confirmation Step with FREE SHIPPING + real PayPal
              <div className="mb-8">
                <div className="text-lg mb-4">Review your order before paying.</div>
                
                <div className="space-y-2 text-sm mb-6">
                  {cart.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{item.title} (Size {item.size}) × {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10 space-y-1 mb-8">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#39ff14]">
                    <span>Shipping</span>
                    <span>FREE</span>
                  </div>
                  <div className="flex justify-between font-black text-xl pt-2 border-t border-white/10">
                    <span>TOTAL</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <PayPalScriptProvider options={{ 
                  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
                  currency: "USD"
                }}>
                  <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [{
                          amount: {
                            value: total.toFixed(2),
                            currency_code: "USD"
                          }
                        }]
                      });
                    }}
                    onApprove={async (data, actions) => {
                      const details = await actions.order?.capture();
                      console.log('%c[PayPal] Payment successful:', 'color:#39ff14', details);
                      
                      const payload = buildPrintfulOrderPayload(cart, recipient);
                      
                      if (ENABLE_REAL_ORDERS) {
                        const result = await createPrintfulOrder(payload);
                        console.log('%c[Printful] Real order result:', 'color:#39ff14', result);
                      } else {
                        console.log('%c[Printful] Order payload (REAL ORDERS DISABLED):', 'color:#ff0088; font-weight:bold', payload);
                      }

                      await clearCart();
                      window.dispatchEvent(new Event('cartUpdated'));
                      setShowCheckout(false);
                      setShowPaymentStep(false);
                      setOrderComplete(true);
                    }}
                    onError={(err) => {
                      console.error('[PayPal] Error:', err);
                      alert("Payment failed. Please try again.");
                    }}
                  />
                </PayPalScriptProvider>

                <div className="text-xs text-white/50 mt-4">Real PayPal checkout. Printful order created only after payment succeeds.</div>
              </div>
            )}

            <div className="space-y-3">
              {!showPaymentStep ? (
                <button 
                  onClick={proceedToPayment}
                  className={`w-full py-4 font-black text-lg tracking-[1px] transition-all ${
                    isAddressValid 
                      ? 'bg-white text-black active:bg-[#39ff14]' 
                      : 'bg-white/30 text-white/50 cursor-not-allowed'
                  }`}
                >
                  CONTINUE TO PAYMENT
                </button>
              ) : null}
              <button 
                onClick={closeCheckout}
                className="w-full py-4 border border-white/40 text-white font-black text-lg tracking-[1px] hover:bg-white hover:text-black transition-all"
              >
                CANCEL
              </button>
            </div>

            <p className="text-xs text-white/40 text-center mt-6 tracking-widest">
              This is a demo. No payment processed.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
