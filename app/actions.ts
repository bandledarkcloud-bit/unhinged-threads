'use server';

import { getPrintfulShippingRates, PrintfulRecipient } from '@/lib/printful';
import { products } from '@/lib/products';

export async function fetchShippingRates(
  recipient: PrintfulRecipient,
  cartItems: { slug: string; size: string; quantity: number }[]
) {
  // Build proper items with real variant IDs
  const printfulItems = cartItems
    .map((item) => {
      const product = products.find((p) => p.slug === item.slug);
      const variantId = product?.printfulVariants?.[item.size];

      if (!variantId) {
        console.warn(`[Shipping] Missing variant for ${item.slug} size ${item.size}`);
        return null;
      }

      return {
        variant_id: variantId,
        quantity: item.quantity,
      };
    })
    .filter(Boolean) as any[];

  if (printfulItems.length === 0) {
    return { success: false, error: 'No valid items' };
  }

  return await getPrintfulShippingRates(recipient, printfulItems);
}
