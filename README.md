# sydbal.github.io - Local Express Server

This repository contains a simple Express server to serve the static site (index.html, CSS, JS, images) on port 3000 for local development.

Quick start:

1. Install dependencies:

   npm install

2. Start the server (defaults to port 3000):

   npm start

3. Visit in your browser:

   http://localhost:3000/

Run a basic test that starts the server and checks index.html is served:

   npm test

Notes:
- The server serves static files from the repository root.
- You can override the port by using the PORT environment variable (e.g. on Windows cmd.exe: `set PORT=4000 && npm start`).

Docker
------

Build and run the containerized site (Docker must be installed):

1. Build the Docker image:

   docker build -t sydbal/site:latest .

2. Run it:

   docker run --rm -p 3000:3000 sydbal/site:latest

3. Visit:

   http://localhost:3000/

Using docker-compose
--------------------

You can also use the included `docker-compose.yml` to build and run the site with a single command:

   docker compose up --build

This also maps the local folder into the container for faster dev iteration and preserves a `node_modules` volume to avoid host dependency mismatches.

