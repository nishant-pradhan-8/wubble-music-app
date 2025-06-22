# 🎧 Wubble QuickTune Mini — AI Music Preview Generator

Wubble QuickTune Mini is a single-page full-stack web app that lets users generate royalty-free music previews based on their selected mood and genre. It's a simplified take on Wubble’s user flow:  
**“Choose mood + genre → generate → listen + download.”**

---

## 🌐 Live Demo
🔗 [Frontend Live on Vercel](https://wubble-music-application.vercel.app/)  

---

## 🚀 Features

### 🎛 Core Functionality
- Mood & Genre selectors (Happy, Sad, Energetic, Chill | Pop, Lo-fi, Cinematic, EDM)
- "Generate Preview" button
- Random music preview (based on mood/genre)
- Audio player with Play/Pause
- Download `.mp3` file
- Like/Favorite button (saved in localStorage)
- Recent tracks (also from localStorage)

### ✨ Bonus Features
- Dark mode toggle
- LocalStorage persistence for favorites and recent
- Smooth transitions and responsive UI

---

## 🧠 Tech Stack

### Frontend:
- [React.js](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Redux Toolkit](https://redux-toolkit.js.org) for state management

### Backend:
- [Node.js](https://nodejs.org)
- [Express.js](https://expressjs.com)
- Serves royalty-free music tracks and mood/genre-based filtering
- Static file hosting for `.mp3` previews

---

## 🗂 Folder Structure
wubble-project/
├── client/ # React app
└── server/ # Express API

--

## 🛠 How to Run Locally

### Frontend (React)
```bash
cd client
npm install
npm run dev
```

### Backend (Express)
```bash
cd server
npm install
npm run dev
```

