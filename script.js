/* 🎵 WaveBeats Song Data (15 Songs) */
let songData = [
  { name: "Udaarian", file: "https://res.cloudinary.com/drdeqcbyn/video/upload/v1771090923/Udaarian_bqxiz3.mp3", cover: "assets/covers/udaarian.jpg" },
  { name: "Nilami", file: "https://res.cloudinary.com/drdeqcbyn/video/upload/v1771090916/Nilami_sm17vm.mp3", cover: "assets/covers/nilami.jpg" },
  { name: "Matwaliye", file: "https://res.cloudinary.com/drdeqcbyn/video/upload/v1771090916/Matwaliye_gwezbo.mp3", cover: "assets/covers/matwaliye.jpg" },
  { name: "Vanjhali Vaja", file: "https://res.cloudinary.com/drdeqcbyn/video/upload/v1771090909/Vanjhali_Vaja_gga1uz.mp3", cover: "assets/covers/vanjhali-vaja.jpg" },
  { name: "Softly", file: "https://res.cloudinary.com/drdeqcbyn/video/upload/v1771090909/Softly_mwxb7c.mp3", cover: "assets/covers/softly.jpg" },
  { name: "Teeje Week", file: "https://res.cloudinary.com/drdeqcbyn/video/upload/v1771090908/Teeje_Week_mpyqh4.mp3", cover: "assets/covers/teeje-week.jpg" },
  { name: "Asi Gabru Punjabi", file: "https://res.cloudinary.com/drdeqcbyn/video/upload/v1771090903/Asi_Gabru_Punjabi_rawqai.mp3", cover: "assets/covers/asi-gabru-punjabi.jpg" },
  { name: "Sajjan Raazi", file: "https://res.cloudinary.com/drdeqcbyn/video/upload/v1771090902/Sajjan_Raazi_jaz91a.mp3", cover: "assets/covers/sajjan-raazi.jpg" },
  { name: "Mitraan Di Chhatri", file: "https://res.cloudinary.com/drdeqcbyn/video/upload/v1771090899/Mitraan_Di_Chhatri_nq7bwn.mp3", cover: "assets/covers/mitraan-di-chhatri.jpg" },
  { name: "Challa", file: "https://res.cloudinary.com/drdeqcbyn/video/upload/v1771090894/Challa_lypxce.mp3", cover: "assets/covers/challa.jpg" },
  { name: "Jee Ni Lagda", file: "https://res.cloudinary.com/drdeqcbyn/video/upload/v1771090889/Jee_Ni_Lagda_dgonde.mp3", cover: "assets/covers/jee-ni-lagda.jpg" },
  { name: "Kamaal Ho Gea", file: "https://res.cloudinary.com/drdeqcbyn/video/upload/v1771090888/Kamaal_Ho_Gea_lzqo8e.mp3", cover: "assets/covers/kamaal-ho-gea.jpg" },
  { name: "Haseen", file: "https://res.cloudinary.com/drdeqcbyn/video/upload/v1771090888/Haseen_sharv7.mp3", cover: "assets/covers/haseen.jpg" },
  { name: "Koshish Tan Kariye", file: "https://res.cloudinary.com/drdeqcbyn/video/upload/v1771090886/Koshish_Tan_Kariye_sittdo.mp3", cover: "assets/covers/koshish-tan-kariye.jpg" },
  { name: "Boyfriend", file: "https://res.cloudinary.com/drdeqcbyn/video/upload/v1771090870/Boyfriend_rrvmbo.mp3", cover: "assets/covers/boyfriend.jpg" }
];

/* Player */
let audio = new Audio();
let currentIndex = 0;
let shuffleMode = false;
let repeatMode = false;

/* Storage */
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let recent = JSON.parse(localStorage.getItem("recent")) || [];

let playlists = JSON.parse(localStorage.getItem("playlists")) || {
  "My Playlist": []
};

let currentPlaylist = "My Playlist";

/* UI */
const songList = document.getElementById("songList");
const favList = document.getElementById("favList");
const recentList = document.getElementById("recentList");

const playlistSelect = document.getElementById("playlistSelect");
const playlistSongs = document.getElementById("playlistSongs");

const currentSong = document.getElementById("currentSong");
const playerCover = document.getElementById("playerCover");
const playBtn = document.getElementById("playBtn");

const shuffleBtn = document.getElementById("shuffleBtn");
const repeatBtn = document.getElementById("repeatBtn");

const progressBar = document.getElementById("progressBar");
const currentTimeEl = document.getElementById("currentTime");
const durationTimeEl = document.getElementById("durationTime");

const volumeSlider = document.getElementById("volumeSlider");
const volumeValue = document.getElementById("volumeValue");

const searchInput = document.getElementById("searchInput");

/* Render Songs */
function renderSongs(filter="") {
  songList.innerHTML = "";

  songData
    .filter(song => song.name.toLowerCase().includes(filter.toLowerCase()))
    .forEach((song, index) => {

      let div = document.createElement("div");
      div.classList.add("song");

      div.innerHTML = `
        <img src="${song.cover}">
        <span>${song.name}</span>

        <button onclick="toggleFav('${song.name}')">❤️</button>
        <button onclick="addToPlaylist('${song.name}')">➕</button>
      `;

      div.onclick = () => playSong(index);
      songList.appendChild(div);
    });
}
renderSongs();

/* Play Song */
function playSong(index) {
  currentIndex = index;
  audio.src = songData[index].file;

  currentSong.innerText = songData[index].name;
  playerCover.src = songData[index].cover;

  audio.play();
  playBtn.innerText = "⏸";

  addRecent(songData[index].name);
}

/* Play Pause */
function playPause() {
  if (audio.paused) {
    audio.play();
    playBtn.innerText = "⏸";
  } else {
    audio.pause();
    playBtn.innerText = "▶";
  }
}

/* Next / Prev */
function nextSong() {
  currentIndex = shuffleMode
    ? Math.floor(Math.random() * songData.length)
    : (currentIndex + 1) % songData.length;

  playSong(currentIndex);
}

function prevSong() {
  currentIndex = (currentIndex - 1 + songData.length) % songData.length;
  playSong(currentIndex);
}

/* Shuffle */
shuffleBtn.onclick = () => {
  shuffleMode = !shuffleMode;
  shuffleBtn.classList.toggle("active");
};

/* Repeat */
repeatBtn.onclick = () => {
  repeatMode = !repeatMode;
  repeatBtn.classList.toggle("active");
  audio.loop = repeatMode;
};

/* Auto Next */
audio.addEventListener("ended", () => {
  if (!repeatMode) nextSong();
});

/* Progress */
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;

  progressBar.value = (audio.currentTime / audio.duration) * 100;
  currentTimeEl.innerText = formatTime(audio.currentTime);
  durationTimeEl.innerText = formatTime(audio.duration);
});

progressBar.addEventListener("input", () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});

/* Volume FIXED */
volumeSlider.value = 0.5;
audio.volume = 0.5;
volumeValue.innerText = "50%";

volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;

  /* ✅ Correct Percentage Update */
  volumeValue.innerText =
    Math.round(audio.volume * 100) + "%";
});

/* Favorites */
function toggleFav(songName) {
  if (favorites.includes(songName)) {
    favorites = favorites.filter(s => s !== songName);
  } else {
    favorites.push(songName);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderFav();
}

function renderFav() {
  favList.innerHTML = "";
  favorites.forEach(song => {
    let li = document.createElement("li");
    li.innerText = song;
    favList.appendChild(li);
  });
}
renderFav();

/* Recently Played */
function addRecent(songName) {
  recent.unshift(songName);
  recent = [...new Set(recent)].slice(0, 5);

  localStorage.setItem("recent", JSON.stringify(recent));
  renderRecent();
}

function renderRecent() {
  recentList.innerHTML = "";
  recent.forEach(song => {
    let li = document.createElement("li");
    li.innerText = song;
    recentList.appendChild(li);
  });
}
renderRecent();

/* Playlist System */
function updatePlaylistDropdown() {
  playlistSelect.innerHTML = "";

  Object.keys(playlists).forEach(pl => {
    let option = document.createElement("option");
    option.value = pl;
    option.innerText = pl;
    playlistSelect.appendChild(option);
  });

  playlistSelect.value = currentPlaylist;
  renderPlaylistSongs();
}

playlistSelect.onchange = () => {
  currentPlaylist = playlistSelect.value;
  renderPlaylistSongs();
};

function renderPlaylistSongs() {
  playlistSongs.innerHTML = "";
  playlists[currentPlaylist].forEach(song => {
    let li = document.createElement("li");
    li.innerText = song;
    playlistSongs.appendChild(li);
  });
}

function addToPlaylist(songName) {
  if (!playlists[currentPlaylist].includes(songName)) {
    playlists[currentPlaylist].push(songName);
    savePlaylists();
  }
}

function createPlaylist() {
  let name = document.getElementById("newPlaylistName").value.trim();
  if (name === "" || playlists[name]) return;

  playlists[name] = [];
  currentPlaylist = name;
  savePlaylists();
}

function renamePlaylist() {
  let newName = document.getElementById("renamePlaylistName").value.trim();
  if (newName === "" || playlists[newName]) return;

  playlists[newName] = playlists[currentPlaylist];
  delete playlists[currentPlaylist];

  currentPlaylist = newName;
  savePlaylists();
}

function deletePlaylist() {
  if (currentPlaylist === "My Playlist") return;

  delete playlists[currentPlaylist];
  currentPlaylist = "My Playlist";
  savePlaylists();
}

function savePlaylists() {
  localStorage.setItem("playlists", JSON.stringify(playlists));
  updatePlaylistDropdown();
}

updatePlaylistDropdown();

/* Search */
searchInput.addEventListener("keyup", () => {
  renderSongs(searchInput.value);
});

/* Format Time */
function formatTime(time) {
  let min = Math.floor(time / 60);
  let sec = Math.floor(time % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}
