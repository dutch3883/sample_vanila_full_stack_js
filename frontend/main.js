// Import axios from npm package
import axios from 'axios';

// API base URL - use relative path when served from same origin, or full URL for dev
const API_URL = window.location.origin;

// Fetch and display videos on page load
async function loadVideos() {
  try {
    // Using axios instead of fetch
    const response = await axios.get(`${API_URL}/videos`);
    displayVideos(response.data);
  } catch (error) {
    showError('Failed to load videos');
  }
}

// Display videos in the list
function displayVideos(videos) {
  const videosList = document.getElementById('videosList');

  if (videos.length === 0) {
    videosList.innerHTML = '<div class="empty-state">No videos submitted yet</div>';
    return;
  }

  videosList.innerHTML = videos
    .map(video => `
      <div class="video-item">
        <div class="video-url">${video.url}</div>
        <div class="video-time">${new Date(video.timestamp).toLocaleString()}</div>
      </div>
    `)
    .join('');
}

// Analyze video (POST request)
async function analyzeVideo() {
  const urlInput = document.getElementById('videoUrl');
  const url = urlInput.value.trim();
  const analyzeBtn = document.getElementById('analyzeBtn');

  if (!url) {
    showError('Please enter a YouTube URL');
    return;
  }

  analyzeBtn.disabled = true;
  analyzeBtn.textContent = 'Analyzing...';

  try {
    // Using axios for POST request
    await axios.post(`${API_URL}/videos`, { url });
    showSuccess('Video submitted successfully!');
    urlInput.value = '';
    loadVideos();
  } catch (error) {
    showError('Failed to submit video');
  } finally {
    analyzeBtn.disabled = false;
    analyzeBtn.textContent = 'Analyze Video';
  }
}

// Show error message
function showError(message) {
  const errorDiv = document.getElementById('error');
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';
  setTimeout(() => {
    errorDiv.style.display = 'none';
  }, 3000);
}

// Show success message
function showSuccess(message) {
  const successDiv = document.getElementById('success');
  successDiv.textContent = message;
  successDiv.style.display = 'block';
  setTimeout(() => {
    successDiv.style.display = 'none';
  }, 3000);
}

// Allow Enter key to submit
document.getElementById('videoUrl').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    analyzeVideo();
  }
});

// Load videos when page loads
loadVideos();

// Make analyzeVideo available globally for onclick handler
window.analyzeVideo = analyzeVideo;
