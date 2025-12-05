const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Allow requests from frontend
app.use(express.json()); // Parse JSON request bodies

// Serve static files from frontend dist folder
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// In-memory storage for videos
let videos = [
  {
    id: 1,
    url: 'https://youtube.com/watch?v=example1',
    timestamp: new Date().toISOString()
  },
  {
    id: 2,
    url: 'https://youtube.com/watch?v=example2',
    timestamp: new Date().toISOString()
  }
];

// GET /videos - Return list of all videos
app.get('/videos', (req, res) => {
  res.json(videos);
});

// POST /videos - Add new video
app.post('/videos', (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  const newVideo = {
    id: videos.length + 1,
    url: url,
    timestamp: new Date().toISOString()
  };

  videos.push(newVideo);
  res.status(201).json(newVideo);
});

// Serve index.html for all other routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
