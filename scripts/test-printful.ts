import 'dotenv/config';
import { getPrintfulStore, getPrintfulStores } from '../lib/printful';

async function test() {
  console.log('Testing Printful connection...\n');

  try {
    console.log('1. Testing getPrintfulStores()...');
    const stores = await getPrintfulStores();
    console.log('Stores:', JSON.stringify(stores.result, null, 2));

    console.log('\n2. Testing getPrintfulStore()...');
    const store = await getPrintfulStore();
    console.log('Store info:', JSON.stringify(store.result, null, 2));

    console.log('\n✅ Printful connection successful!');
  } catch (error) {
    console.error('\n❌ Error:', error);
  }
}

test();