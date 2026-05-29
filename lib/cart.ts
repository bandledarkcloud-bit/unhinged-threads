import { products } from "./products";
import { supabase } from './supabase'

export type CartItem = {
  id: string
  slug: string
  title: string
  price: number
  quantity: number
  size?: string
  image?: string
}

// Get or create a cart ID (stored in localStorage)
function getOrCreateCartId(): string {
  if (typeof window === 'undefined') return ''

  let cartId = localStorage.getItem('cart_id')

  if (!cartId) {
    cartId = crypto.randomUUID()
    localStorage.setItem('cart_id', cartId)
  }

  return cartId
}

// Get all items in the current cart
export async function getCart(): Promise<CartItem[]> {
  const cartId = getOrCreateCartId()
  if (!supabase || !cartId) return []

  const { data, error } = await supabase
    .from('cart_items')
    .select('*')
    .eq('cart_id', cartId)

  if (error) {
    console.error('Error fetching cart:', {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    })
    return []
  }

  return (data || []).map((item) => {
    const product = products.find(p => p.slug === item.product_slug);
    return {
      id: item.id,
      slug: item.product_slug,
      title: product?.title || item.product_slug,
      price: product?.price || 29.99,
      quantity: item.quantity,
      size: item.size || undefined,
      image: product ? `/products/${item.product_slug}/roxy.png` : undefined,
    };
  });
}

// Add item to cart
export async function addToCart(productSlug: string, quantity = 1, size?: string) {
  const cartId = getOrCreateCartId()
  if (!supabase || !cartId) return

  const { error } = await supabase
    .from('cart_items')
    .insert({
      cart_id: cartId,
      product_slug: productSlug,
      quantity,
      size: size || null,
    })

  if (error) {
    console.error('Error adding to cart:', {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
  }
}

// Update quantity of a cart item
export async function updateCartItemQuantity(itemId: string, quantity: number) {
  if (!supabase) return
  const { error } = await supabase
    .from('cart_items')
    .update({ quantity })
    .eq('id', itemId)

  if (error) {
    console.error('Error updating quantity:', {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
  }
}

// Remove item from cart
export async function removeFromCart(itemId: string) {
  if (!supabase) return
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('id', itemId)

  if (error) {
    console.error('Error removing from cart:', {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
  }
}

// Clear entire cart
export async function clearCart() {
  const cartId = getOrCreateCartId()
  if (!supabase || !cartId) return

  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('cart_id', cartId)

  if (error) {
    console.error('Error clearing cart:', {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
  }
}