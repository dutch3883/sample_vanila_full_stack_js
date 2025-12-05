# YouTube Video Analyzer

A simple full-stack Node.js web application for teaching package management, frontend-backend separation, and RESTful APIs.

---

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Technologies Used](#technologies-used)
- [Learning Objectives](#learning-objectives)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Do you have Node.js installed?

Check by running these commands in your terminal:

```bash
node --version
npm --version
```

If you see version numbers (like `v18.17.0` and `9.6.7`), you're ready to go!

If not, follow the installation instructions below.

---

## Installing Node.js

### Windows

1. Visit [https://nodejs.org](https://nodejs.org)
2. Download the **LTS (Long Term Support)** version
3. Run the downloaded `.msi` installer
4. Follow the installation wizard (use default settings)
5. Restart your terminal/command prompt
6. Verify installation:
   ```bash
   node --version
   npm --version
   ```

### macOS

**Option 1: Official Installer**
1. Visit [https://nodejs.org](https://nodejs.org)
2. Download the **LTS** version
3. Open the `.pkg` file and follow the installer

**Option 2: Homebrew (Recommended)**
```bash
brew install node
```

**Verify installation:**
```bash
node --version
npm --version
```

### Linux (Ubuntu/Debian)

**Option 1: APT Package Manager**
```bash
sudo apt update
sudo apt install nodejs npm
node --version
npm --version
```

**Option 2: NVM (Recommended - allows multiple Node versions)**
```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Close and reopen your terminal, then:
nvm install --lts
nvm use --lts

# Verify
node --version
npm --version
```

---

## Project Structure

```
simple_project/
├── backend/                 # Backend server (Express)
│   ├── package.json        # Backend dependencies and scripts
│   └── server.js           # Express server with API endpoints
│
├── frontend/               # Frontend application (Vite + Vanilla JS)
│   ├── package.json       # Frontend dependencies and scripts
│   ├── index.html         # Main HTML file
│   ├── style.css          # Styling
│   └── main.js            # JavaScript logic (uses axios)
│
├── .gitignore
└── README.md
```

---

## Installation

### Step 1: Navigate to the project folder

```bash
cd simple_project
```

### Step 2: Install backend dependencies

```bash
cd backend
npm install
```

This installs:
- `express` - Web framework
- `cors` - Enable cross-origin requests
- `nodemon` - Auto-reload during development

### Step 3: Install frontend dependencies

```bash
cd ../frontend
npm install
```

This installs:
- `vite` - Build tool and dev server
- `axios` - HTTP client library

---

## Running the Application

You can run the application in two modes:

### 🔧 Development Mode (Recommended for learning)

Run frontend and backend on separate servers with hot-reload.

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
✅ Backend runs on `http://localhost:3000`
✅ Auto-reloads when you change `server.js`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
✅ Frontend runs on `http://localhost:5173`
✅ Auto-reloads when you change HTML/CSS/JS
✅ Opens browser automatically

**Access the app:** Open `http://localhost:5173` in your browser

---

### 🚀 Production Mode (Single server deployment)

Build the frontend and serve it from the backend server.

**Step 1: Build the frontend**
```bash
cd frontend
npm run build
```
This creates an optimized `dist/` folder with bundled files.

**Step 2: Start the backend**
```bash
cd ../backend
npm start
```

**Or do both in one command:**
```bash
cd backend
npm run build:start
```

**Access the app:** Open `http://localhost:3000` in your browser

---

## API Documentation

### GET `/videos`

Returns a list of all submitted videos.

**Response:**
```json
[
  {
    "id": 1,
    "url": "https://youtube.com/watch?v=example1",
    "timestamp": "2024-01-01T00:00:00.000Z"
  },
  {
    "id": 2,
    "url": "https://youtube.com/watch?v=example2",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
]
```

**Example:**
```bash
curl http://localhost:3000/videos
```

---

### POST `/videos`

Submits a new video URL.

**Request Body:**
```json
{
  "url": "https://youtube.com/watch?v=newvideo"
}
```

**Response:**
```json
{
  "id": 3,
  "url": "https://youtube.com/watch?v=newvideo",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/videos \
  -H "Content-Type: application/json" \
  -d '{"url":"https://youtube.com/watch?v=test"}'
```

---

## Technologies Used

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime environment |
| **Express** | Web framework for building APIs |
| **CORS** | Enable cross-origin resource sharing |
| **Nodemon** | Auto-restart server on file changes (dev) |

### Frontend
| Technology | Purpose |
|------------|---------|
| **HTML5** | Page structure |
| **CSS3** | Styling and layout |
| **Vanilla JavaScript** | Application logic (ES6+) |
| **Vite** | Build tool and dev server |
| **Axios** | HTTP client for API calls |

---

## Learning Objectives

This project teaches:

### 1. **Package Management (npm)**
- Understanding `package.json`
- Installing dependencies with `npm install`
- Managing dev vs production dependencies
- Using npm scripts (`npm run dev`, `npm start`)

### 2. **Frontend-Backend Separation**
- Running separate dev servers
- Making HTTP requests between servers
- CORS configuration
- API-first development

### 3. **Express.js Basics**
- Creating a web server
- Defining routes (GET, POST)
- Using middleware
- Serving static files

### 4. **Modern JavaScript**
- ES6 modules (`import`/`export`)
- Async/await for HTTP requests
- Using npm packages in frontend code
- Arrow functions and template literals

### 5. **Build Tools (Vite)**
- Module bundling
- Development server with hot reload
- Production builds
- Asset optimization

### 6. **Production Deployment**
- Building frontend for production
- Serving static files from Express
- Single-server deployment strategy

---

## Troubleshooting

### ❌ Port already in use

**Error:** `EADDRINUSE: address already in use :::3000`

**Solution:**

**macOS/Linux:**
```bash
# Find what's using port 3000
lsof -i :3000

# Kill the process (replace PID with the actual process ID)
kill -9 <PID>
```

**Windows:**
```bash
# Find what's using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with the actual process ID)
taskkill /PID <PID> /F
```

---

### ❌ Module not found

**Error:** `Cannot find module 'express'`

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

### ❌ CORS errors in browser console

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
- Make sure the backend is running on `http://localhost:3000`
- Make sure you're accessing the frontend from `http://localhost:5173` (in dev mode)
- Check that CORS is enabled in `backend/server.js`

---

### ❌ Build fails

**Error:** `Failed to build`

**Solution:**
```bash
cd frontend

# Clear cache and reinstall
rm -rf dist node_modules .vite
npm install

# Try building again
npm run build
```

---

### ❌ Frontend can't connect to backend

**Problem:** Videos don't load, network errors in console

**Solution:**
1. Verify backend is running: `http://localhost:3000/videos` should return JSON
2. Check browser console for errors
3. In dev mode, frontend should be on `http://localhost:5173`
4. In production mode, access everything through `http://localhost:3000`

---

## Additional Commands

### View installed packages
```bash
npm list --depth=0
```

### Update dependencies
```bash
npm update
```

### Check for outdated packages
```bash
npm outdated
```

### Run specific scripts
```bash
# Backend
cd backend
npm run dev     # Development with auto-reload
npm start       # Production mode
npm run build   # Build frontend from backend folder

# Frontend
cd frontend
npm run dev     # Development server
npm run build   # Create production build
npm run preview # Preview production build
```

---

## Questions or Issues?

This is teaching material. Common questions:

**Q: Why separate frontend and backend?**
A: In real projects, frontend and backend are often separate repositories. This teaches proper separation of concerns.

**Q: Why use Vite instead of just opening HTML?**
A: Vite enables using npm packages in frontend code, module bundling, and modern JavaScript features.

**Q: Why both development and production modes?**
A: Development mode provides fast feedback with hot-reload. Production mode shows how to deploy a real application.

**Q: Can I use this as a template?**
A: Yes! This is a minimal template for building full-stack Node.js applications.

---

**Happy coding! 🚀**
