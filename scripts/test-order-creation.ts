import 'dotenv/config';
import { config } from 'dotenv';
import { buildPrintfulOrderPayload, createPrintfulOrder } from '../lib/printful';

config({ path: '.env.local' });

async function testOrderCreation() {
  console.log('=== Test Order Creation (DRAFT MODE) ===\n');

  const testCart = [
    {
      slug: 'fireworks-director',
      size: 'L',
      quantity: 1,
      price: 29.99,
    },
  ];

  const recipient = {
    name: 'Test Customer',
    address1: '123 Test Street',
    city: 'New York',
    state_code: 'NY',
    country_code: 'US',
    zip: '10001',
    email: 'test@example.com',
  };

  console.log('→ Building payload...');
  const payload = buildPrintfulOrderPayload(testCart, recipient);

  // Extra safety: ensure confirm is false
  payload.confirm = false;

  console.log('\n=== Final Payload (confirm: false) ===');
  console.log(JSON.stringify(payload, null, 2));

  console.log('\n→ Calling createPrintfulOrder (this will create a DRAFT order)...');

  try {
    const result = await createPrintfulOrder(payload);
    console.log('\n=== Result ===');
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('\n=== Error ===');
    console.error(error);
  }
}

testOrderCreation().catch(console.error);