const express = require('express');
const path = require('path');

const app = express();

const DEFAULT_PORT = process.env.PORT || 3000;

// Serve all static assets (index.html, css, js, images)
app.use(express.static(path.join(__dirname)));

// Ensure any path returns index.html (useful for single-page apps / dev server)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

function start(port = DEFAULT_PORT) {
  return new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
      resolve(server);
    });

    server.on('error', (err) => reject(err));
  });
}

if (require.main === module) {
  start().catch((err) => {
    console.error('Failed to start server', err);
    process.exit(1);
  });
}

module.exports = { app, start };
