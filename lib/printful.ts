import { products } from './products';

const PRINTFUL_API_URL = 'https://api.printful.com';

const UNHINGED_THREADS_STORE_ID = '17944434';

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

export async function getPrintfulStores() {
  return printfulFetch('/stores');
}

export async function getPrintfulStore() {
  return printfulFetch('/store');
}

export type PrintfulRecipient = {
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state_code?: string;
  country_code: string;
  zip: string;
  phone?: string;
  email?: string;
};

// Build a Printful order payload
export function buildPrintfulOrderPayload(
  cartItems: any[],
  recipient?: PrintfulRecipient
) {
  const items = cartItems.map((item) => {
    const product = products.find((p) => p.slug === item.slug);
    const variantId = product?.printfulVariants?.[item.size];

    if (!variantId) {
      console.warn(`[Printful] Missing variant ID for ${item.slug} size ${item.size}`);
    }

    return {
      variant_id: variantId,
      quantity: item.quantity,
      retail_price: item.price.toString(),
    };
  });

  const defaultRecipient: PrintfulRecipient = {
    name: "CUSTOMER NAME",
    address1: "123 Demo Street",
    city: "Demo City",
    country_code: "US",
    zip: "12345",
  };

  return {
    recipient: recipient || defaultRecipient,
    items,
    confirm: false,
  };
}

// Create a real order in Printful (only runs if ENABLE_REAL_ORDERS is true)
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

// Get shipping rates from Printful (graceful error handling)
export async function getPrintfulShippingRates(
  recipient: PrintfulRecipient,
  items: any[]
) {
  const apiKey = process.env.PRINTFUL_API_KEY;
  
  if (!apiKey) {
    console.warn('[Printful] PRINTFUL_API_KEY not found - skipping shipping rates');
    return { success: false, error: 'No API key' };
  }

  try {
    const result = await printfulFetch('/shipping-rates', {
      method: 'POST',
      body: JSON.stringify({
        recipient,
        items,
      }),
    });
    return { success: true, rates: result.result };
  } catch (error) {
    console.error('[Printful] Shipping rates failed:', error);
    return { success: false, error };
  }
}
