'use client';
export const dynamic = 'force-dynamic';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getCart, updateCartItemQuantity, removeFromCart, CartItem } from '@/lib/cart';
import { getShippingRates, createPrintfulOrderAction } from '@/app/actions/printful';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { products } from '@/lib/products';
import Header from '@/components/Header';

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);
  const [shippingRates, setShippingRates] = useState<any[]>([]);
  const [selectedShipping, setSelectedShipping] = useState<any>(null);
  const [address, setAddress] = useState({ name: "", address1: "", city: "", state: "", zip: "", email: "" });

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
    await updateCartItemQuantity(id, newQuantity);
    await fetchCart();
  };


  const fetchShippingRates = async () => {
    if (!address.name || !address.address1 || !address.city || !address.state || !address.zip) {
      alert("Please fill in all address fields");
      return;
    }

        const items = cart.map(item => {
      const product = products.find(p => p.slug === item.slug);
      const sizeKey = item.size || "L";
      let variantId = product?.catalogVariantIds?.[sizeKey];

      if (!variantId && product?.catalogVariantIds) {
        const keys = Object.keys(product.catalogVariantIds);
        variantId = product.catalogVariantIds[keys[0]];
      }

      if (!variantId) {
        console.warn("No variant ID found for", item.slug, item.size);
        return null;
      }

      return {
        variant_id: Number(variantId),
        quantity: item.quantity,
        retail_price: item.price.toString()
      };
    });

    const recipient = {
      name: address.name,
      address1: address.address1,
      city: address.city,
      state_code: address.state,
      country_code: "US",
      zip: address.zip,
      email: address.email
    };

    const result = await getShippingRates(recipient, items as any);
    if (result.success) {
      setShippingRates(result.rates || []);
    } else {
      alert("Could not get shipping rates: " + JSON.stringify(result.error || "Unknown error"));
    }
  };


  const handleRemove = async (id: string) => {
    await removeFromCart(id);
    await fetchCart();
  };

  const handleCheckout = () => {
    setShowCheckout(true);
    setShippingRates([]);
    setSelectedShipping(null);
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
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-zinc-950 border border-white/20 max-w-lg w-full p-8 my-8 max-h-[90vh] overflow-y-auto rounded-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black tracking-[-1px]">CHECKOUT</h2>
              <button onClick={() => setShowCheckout(false)} className="text-white/60 hover:text-white">✕</button>
            </div>

            <div className="space-y-4 mb-6">
              <input type="text" placeholder="Full Name" className="w-full bg-black border border-white/30 px-4 py-3 text-white" 
                value={address.name} onChange={e => setAddress({...address, name: e.target.value})} />
              <input type="text" placeholder="Address" className="w-full bg-black border border-white/30 px-4 py-3 text-white"
                value={address.address1} onChange={e => setAddress({...address, address1: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="City" className="bg-black border border-white/30 px-4 py-3 text-white"
                  value={address.city} onChange={e => setAddress({...address, city: e.target.value})} />
                <input type="text" placeholder="State" className="bg-black border border-white/30 px-4 py-3 text-white"
                  value={address.state} onChange={e => setAddress({...address, state: e.target.value})} />
              </div>
              <input type="text" placeholder="ZIP Code" className="w-full bg-black border border-white/30 px-4 py-3 text-white"
                value={address.zip} onChange={e => setAddress({...address, zip: e.target.value})} />
            </div>

            <button onClick={fetchShippingRates} className="w-full py-3 bg-white text-black font-black mb-6">
              GET SHIPPING RATES
            </button>

            {shippingRates.length > 0 && (
              <div className="mb-6">
                <div className="text-sm tracking-widest text-white/60 mb-3">SHIPPING OPTIONS</div>
                {shippingRates.map((rate, i) => (
                  <div key={i} onClick={() => setSelectedShipping(rate)}
                    className={`p-4 border mb-2 cursor-pointer ${selectedShipping?.id === rate.id ? "border-[#ff0088]" : "border-white/20"}`}>
                    {rate.name} — ${rate.rate}
                  </div>
                ))}
              </div>
            )}

            {selectedShipping && (
              <PayPalScriptProvider options={{ 
                clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
                currency: "USD"
              }}>
                <div className="mt-4 w-full max-w-[340px] mx-auto">
                  <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [{
                          amount: {
                            value: (subtotal + parseFloat(selectedShipping.rate)).toFixed(2),
                            currency_code: "USD"
                          },
                          description: "Unhinged Threads Order"
                        }]
                      });
                    }}
                    onApprove={async (data, actions) => {
                      if (!actions.order) return;
                      const details = await actions.order.capture();
                      
                      const confirmed = window.confirm(
                        `Payment successful! Create real Printful order now?\n\n` +
                        `This will charge your Printful account. Only proceed if you're ready.`
                      );

                      if (!confirmed) {
                        alert("Order creation cancelled. Payment was still processed.");
                        return;
                      }

                      const payload = {
                        recipient: {
                          name: address.name,
                          address1: address.address1,
                          city: address.city,
                          state_code: address.state,
                          country_code: "US",
                          zip: address.zip,
                          email: address.email
                        },
                        items: cart.map(item => ({
                          slug: item.slug,
                          size: item.size,
                          quantity: item.quantity,
                          price: item.price
                        }))
                      };

                      const result = await createPrintfulOrderAction(payload);
                      
                      if (result.success) {
                        alert("Order created successfully in Printful! Check dashboard.");
                        setShowCheckout(false);
                      } else {
                        alert("Failed to create Printful order: " + (result.error));
                      }
                    }}
                  />
                </div>
              </PayPalScriptProvider>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
