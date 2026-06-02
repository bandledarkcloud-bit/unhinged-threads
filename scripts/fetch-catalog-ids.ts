import * as fs from 'fs';
import * as https from 'https';

const envFile = fs.readFileSync('.env.local', 'utf8');
const match = envFile.match(/PRINTFUL_API_KEY=(.*)/);
const API_KEY = match ? match[1].trim() : null;

if (!API_KEY) {
  console.error('❌ Could not read the API key from .env.local');
  process.exit(1);
}

const STORE_ID = 18250831; 

// Helper function to make clean async HTTPS requests
const fetchPrintful = (path: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.printful.com',
      path: `${path}?store_id=${STORE_ID}`,
      headers: { 'Authorization': `Bearer ${API_KEY}` },
    };

    https.get(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
};

async function main() {
  console.log(`🔄 Fetching product list for Store #${STORE_ID}...`);
  try {
    const listRes = await fetchPrintful('/store/products');
    const products = listRes.result;

    if (!products || !Array.isArray(products)) {
      console.error('❌ Could not find product results:', listRes);
      return;
    }

    console.log('\n🔍 Deep-diving into product variants...');
    console.log('\n=== 📋 YOUR PRINTFUL CATALOG VARIANT IDs ===\n');

    for (const p of products) {
      // Fetch the individual product details to unlock the variants array
      const detailRes = await fetchPrintful(`/store/products/${p.id}`);
      const details = detailRes.result;

      if (details && details.sync_variants) {
        console.log(`Product: ${details.sync_product?.name || p.name}`);
        
        details.sync_variants.forEach((v: any) => {
          console.log(`  Size ${v.size || 'N/A'}: catalog=${v.variant_id}, sync=${v.id}`);
        });
        console.log('');
      }
    }
    console.log('✅ All done!');
  } catch (error) {
    console.error('❌ An error occurred during processing:', error);
  }
}

main();