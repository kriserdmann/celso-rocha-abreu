import * as https from 'https';

console.log('--- ISOLATED NETWORK TEST ---');

const url = 'https://api.mercadopago.com/checkout/preferences';
const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        // Sending a dummy token just to check the connection response
        'Authorization': 'Bearer TEST_TOKEN'
    }
};

const req = https.request(url, options, (res) => {
    console.log('STATUS:', res.statusCode);
    console.log('HEADERS:', JSON.stringify(res.headers, null, 2));

    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log('BODY:', data);

        if (data.includes('PA_UNAUTHORIZED_RESULT_FROM_POLICIES')) {
            console.error('CRITICAL: The DNS/Network is actively redirecting MP traffic to Supabase!');
        } else {
            console.log('Network seems normal (normal MP error expected due to dummy token).');
        }
    });
});

req.on('error', (e) => {
    console.error('REQUEST ERROR:', e);
});

req.write(JSON.stringify({ test: true }));
req.end();
