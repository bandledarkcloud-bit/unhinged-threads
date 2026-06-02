import { products } from './products';

const PRINTFUL_API_URL = 'https://api.printful.com';

const UNHINGED_THREADS_STORE_ID = '18250831';

// Safety flag - set to true only when ready to place real orders
export const ENABLE_REAL_ORDERS = true;

export function getPrintfulHeaders(storeId?: string) {
  const apiKey = process.env.PRINTFUL_API_KEY;

  if (!apiKey) {
    throw new Error('PRINTFUL_API_KEY is not set in environment variables');
  }

  const headers: Record<string, string> = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };

  if (storeId) {
    headers['X-PF-Store-Id'] = storeId;
  } else if (UNHINGED_THREADS_STORE_ID) {
    headers['X-PF-Store-Id'] = UNHINGED_THREADS_STORE_ID;
  }

  return headers;
}

export async function printfulFetch(endpoint: string, options: RequestInit = {}, storeId?: string) {
  const headers = getPrintfulHeaders(storeId);

  const res = await fetch(`${PRINTFUL_API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Printful API error: ${res.status} - ${errorText}`);
  }

  return res.json();
}

// Build a Printful order payload (uses LONG sync_variant_ids)
export function buildPrintfulOrderPayload(
  cartItems: any[],
  recipient?: any
) {
  const items = cartItems.map((item: any) => {
    const product = products.find((p) => p.slug === item.slug);
    const variantId = product?.printfulVariants?.[item.size];

    console.log("=== ORDER PAYLOAD DEBUG ===");
    console.log("Looking for slug:", item.slug, "size:", item.size);
    console.log("Product found:", !!product);
    console.log("variantId (long):", variantId);
    console.log("============================");

    if (!variantId) {
      console.warn(`[Printful] Missing LONG variant ID for ${item.slug} size ${item.size}`);
    }

    return {
      sync_variant_id: variantId,
      quantity: item.quantity,
      retail_price: item.price.toString(),
    };
  });

  const validItems = items.filter((i: any) => i.sync_variant_id);

  const defaultRecipient = {
    name: recipient?.name || "Test Customer",
    address1: recipient?.address1 || "123 Test St",
    city: recipient?.city || "Test City",
    state_code: recipient?.state_code || "MO",
    country_code: recipient?.country_code || "US",
    zip: recipient?.zip || "64012",
    email: recipient?.email || "",
  };

  return {
    recipient: defaultRecipient,
    items: validItems,
    confirm: false,
  };
}

// Create a real order in Printful
export async function createPrintfulOrder(payload: any) {
  if (!ENABLE_REAL_ORDERS) {
    console.log('%c[Printful] Real orders disabled. Payload would have been sent:', 'color:#ff0088', payload);
    return { success: false, message: 'Real orders are disabled (safety flag)' };
  }

  try {
    const result = await printfulFetch('/orders', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    console.log('%c[Printful] Order created successfully:', 'color:#39ff14', result);
    return { success: true, result };
  } catch (error) {
    console.error('[Printful] Order creation failed:', error);
    return { success: false, error };
  }
}