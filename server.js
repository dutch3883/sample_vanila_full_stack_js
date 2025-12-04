const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 3000;

// In-memory storage for videos
let videos = [
  { id: 1, url: 'https://youtube.com/watch?v=example1', timestamp: new Date().toISOString() },
  { id: 2, url: 'https://youtube.com/watch?v=example2', timestamp: new Date().toISOString() }
];

const server = http.createServer((req, res) => {
  // GET /videos - Return list of videos
  if (req.method === 'GET' && req.url === '/videos') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(videos));
    return;
  }

  // POST /videos - Add new video
  if (req.method === 'POST' && req.url === '/videos') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const { url } = JSON.parse(body);
        const newVideo = {
          id: videos.length + 1,
          url: url,
          timestamp: new Date().toISOString()
        };
        videos.push(newVideo);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newVideo));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
    return;
  }

  // GET / - Serve HTML page
  if (req.method === 'GET' && req.url === '/') {
    const filePath = path.join(__dirname, 'index.html');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error loading page');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
    return;
  }

  // 404 for all other routes
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
