require('dotenv').config();
const https = require('https');

const token = process.env.PRINTFUL_API_KEY;
const storeId = '17944434';

if (!token) {
  console.error('PRINTFUL_API_KEY not found in .env.local');
  process.exit(1);
}

console.log('Testing Printful with Account-level token...\n');

const options = {
  hostname: 'api.printful.com',
  path: '/store',
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'X-PF-Store-Id': storeId,
    'Content-Type': 'application/json'
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    if (res.statusCode === 200) {
      console.log('✅ Success! Store connection working.');
      console.log(JSON.parse(data));
    } else {
      console.log('Response:', data);
    }
  });
});

req.on('error', (e) => console.error('Error:', e));
req.end();