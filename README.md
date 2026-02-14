# 🎵 WaveBeats — Spotify Clone Music Player

WaveBeats is a modern Spotify-inspired music player web application built using **HTML, CSS, and JavaScript**.

It provides a clean UI, playlist management, favorites, shuffle/repeat playback, and real-time music streaming using **Cloud Storage (Cloudinary)**.

---

## 🚀 Live Demo

👉 https://wavebeats.netlify.app  
*(Replace with your deployed Netlify link)*

---

## 🌐 Cloud Song Storage System (Professional Setup)

Unlike basic music player projects, WaveBeats does **not upload MP3 files directly to GitHub**.

Instead, all songs are stored securely on the cloud using **Cloudinary**, and streamed directly inside the app.

### ✅ Why Cloud Storage?

- GitHub has a **100MB file limit**
- MP3 files make repositories heavy
- Cloud hosting improves performance
- Netlify deployment works smoothly
- Industry-level apps always stream media from CDN/cloud

---

## 🎵 How Songs Are Linked in Code

All songs are defined inside `script.js` like this:

```js
let songData = [
  {
    name: "Udaarian",
    file: "https://res.cloudinary.com/.../Udaarian.mp3",
    cover: "assets/covers/udaarian.jpg"
  }
];
