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