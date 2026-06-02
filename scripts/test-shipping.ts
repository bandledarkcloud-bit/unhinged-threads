import 'dotenv/config';
import { config } from 'dotenv';

config({ path: '.env.local' });

const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY;
const STORE_ID = 18250831;

async function testShippingRates() {
  console.log('=== Testing Shipping Rates ===\n');
  console.log('Using Store ID:', STORE_ID);
  console.log('API Key present:', !!PRINTFUL_API_KEY);

  const payload = {
    recipient: {
      name: "Test User",
      address1: "123 Test St",
      city: "New York",
      state_code: "NY",
      country_code: "US",
      zip: "10001",
    },
    items: [
      {
        variant_id: 4011, // placeholder
        quantity: 1,
        retail_price: "29.99",
      },
    ],
    store_id: STORE_ID,
  };

  try {
    const res = await fetch("https://api.printful.com/shipping/rates", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PRINTFUL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log("❌ Shipping rates failed:");
      console.log(JSON.stringify(data, null, 2));
    } else {
      console.log("✅ Shipping rates success!");
      console.log(JSON.stringify(data, null, 2));
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

testShippingRates();