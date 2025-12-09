const http = require('http');
const { start } = require('./server');

async function runTest() {
  const port = process.env.PORT || 3000;
  const server = await start(port);

  const options = {
    hostname: 'localhost',
    port,
    path: '/',
    method: 'GET',
    timeout: 3000,
  };

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => (data += chunk));
    res.on('end', () => {
      console.log('statusCode:', res.statusCode);
      if (res.statusCode !== 200) {
        console.error('FAIL: status code', res.statusCode);
        server.close(() => process.exit(1));
        return;
      }
      // Look for a piece of the page to assert it's the expected site
      if (data.includes('<title>Dominic Balassone') || data.includes('Dominic.Balass.one')) {
        console.log('PASS: index.html served');
        server.close(() => process.exit(0));
      } else {
        console.error('FAIL: Response did not include expected content');
        server.close(() => process.exit(1));
      }
    });
  });

  req.on('error', (err) => {
    console.error('FAIL: Request error', err);
    server.close(() => process.exit(1));
  });

  req.on('timeout', () => {
    console.error('FAIL: Request timed out');
    req.abort();
    server.close(() => process.exit(1));
  });

  req.end();
}

runTest().catch((err) => {
  console.error('FAIL: Test failed:', err);
  process.exit(2);
});
