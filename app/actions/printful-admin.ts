'use server';

const apiKey = process.env.PRINTFUL_API_KEY;
const STORE_ID = 18250831;

if (!apiKey) {
  throw new Error('PRINTFUL_API_KEY is missing from .env.local');
}

export async function getPrintfulProducts() {
  const res = await fetch('https://api.printful.com/store/products', {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'X-PF-Store-Id': STORE_ID.toString(),
    },
    cache: 'no-store',
  });

  const data = await res.json();

  if (data.code !== 200) {
    console.error("Printful Products Error:", data);
    throw new Error(data.error?.message || 'Failed to fetch products');
  }

  return data.result || [];
}

export async function getPrintfulProduct(productId: number) {
  const res = await fetch(`https://api.printful.com/store/products/${productId}`, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'X-PF-Store-Id': STORE_ID.toString(),
    },
    cache: 'no-store',
  });

  const data = await res.json();

  if (data.code !== 200) {
    console.error(`Printful Product ${productId} Error:`, data);
    throw new Error(data.error?.message || 'Failed to fetch product');
  }

  return data.result;
}