export type CartItem = {
  id: string;
  title: string;
  price: number;
  size: string;
  image: string;
  quantity: number;
};

const CART_KEY = 'unhinged_cart';

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(CART_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveCart(cart: CartItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent('cartUpdated'));
}

export function addToCart(item: Omit<CartItem, 'quantity'>) {
  const cart = getCart();
  const existing = cart.findIndex(
    (i) => i.id === item.id && i.size === item.size
  );

  if (existing !== -1) {
    cart[existing].quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  saveCart(cart);
  return cart;
}

export function updateQuantity(id: string, size: string, quantity: number) {
  const cart = getCart();
  const item = cart.find((i) => i.id === id && i.size === size);
  if (item) {
    item.quantity = quantity;
    if (item.quantity <= 0) {
      return removeFromCart(id, size);
    }
  }
  saveCart(cart);
  return cart;
}

export function removeFromCart(id: string, size: string) {
  let cart = getCart();
  cart = cart.filter((i) => !(i.id === id && i.size === size));
  saveCart(cart);
  return cart;
}

export function clearCart() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CART_KEY);
}
