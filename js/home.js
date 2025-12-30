const favorite = document.querySelector('.folder-card');
const playMusic = document.querySelector('.big-big-play');
const musicCards = document.querySelectorAll('.music-card');
const backBtn = document.querySelector('.back');

const albumImg = document.querySelector('.album-art img');
const songTitle = document.querySelector('.song-title');
const playBtn = document.querySelector('.play-btn');
const audio = document.getElementById('audioPlayer');
const progressBar = document.querySelector('.progress-bar');
const currentTimeEl = document.querySelector('.current-time');
const totalTimeEl = document.querySelector('.total-time');
const artist = document.querySelector('.artist');
const span = document.querySelectorAll('span');


let isPlaying = false;

/* ======================
   FORMAT TIME
====================== */
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/* ======================
   UPDATE PROGRESS
====================== */
function updateProgress() {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progress || 0;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  totalTimeEl.textContent = formatTime(audio.duration);
}

/* ======================
   SET AUDIO SOURCE
====================== */
function setAudioSource(src) {
  audio.src = src;
  audio.addEventListener('loadedmetadata', () => {
    totalTimeEl.textContent = formatTime(audio.duration);
  });
  audio.addEventListener('timeupdate', updateProgress);
}

/* ======================
   CLICK MUSIC CARD
====================== */
musicCards.forEach(card => {
  card.addEventListener('click', () => {
    const img = card.querySelector('img').src;
    const title = card.querySelector('p').innerText;
    const sound = card.dataset.audio;
    const songer = card.querySelector('span').textContent;

    albumImg.src = img;
    songTitle.innerText = title;
    artist.textContent = songer;
    setAudioSource(sound);

    favorite.style.display = 'none';
    playMusic.style.display = 'block';

    audio.play();
    playBtn.innerText = '⏸';
    isPlaying = true;
  });
});

/* ======================
   PROGRESS BAR SEEK
====================== */
progressBar.addEventListener('input', () => {
  const seekTime = (progressBar.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});

/* ======================
   PLAY / PAUSE
====================== */
playBtn.addEventListener('click', () => {
  if (isPlaying) {
    audio.pause();
    playBtn.innerText = '▶';
  } else {
    audio.play();
    playBtn.innerText = '⏸';
  }
  isPlaying = !isPlaying;
});

/* ======================
   BACK BUTTON
====================== */
backBtn.addEventListener('click', () => {
  audio.pause();
  audio.currentTime = 0;

  playMusic.style.display = 'none';
  favorite.style.display = 'block';

  playBtn.innerText = '▶';
  isPlaying = false;
});

/* ======================
    LOOP RADIO
====================== */

const cards = document.querySelectorAll(".music-card");
const audios = document.getElementById("audioPlayer");
const loopBtn = document.getElementById("radioLoop");
const shuffleBtn = document.getElementById("savideo");

let currentCard = null;
let isLooping = false;
let isShuffle = false;

/* 🎵 Play audio when card is clicked */
cards.forEach(card => {
  card.addEventListener("click", () => {
    const song = card.dataset.audio;

    // Toggle play / pause if same card
    if (currentCard === card && !audios.paused) {
      audios.pause();
      return;
    }

    currentCard = card;
    audios.src = song;
    audios.play();
  });
});

/* 🔁 Loop button */
loopBtn.addEventListener("click", () => {
  isLooping = !isLooping;
  audios.loop = isLooping;

  loopBtn.style.color = isLooping ? "blue" : "gray";
  loopBtn.classList.toggle("active", isLooping);
});

/* 🔀 Shuffle button */
shuffleBtn.addEventListener("click", () => {
  isShuffle = !isShuffle;
  shuffleBtn.style.color = isShuffle ? "blue" : "gray";
});

/* 🎧 Play random song */
function playRandomSong() {
  let randomCard;

  do {
    randomCard = cards[Math.floor(Math.random() * cards.length)];
  } while (randomCard === currentCard && cards.length > 1);

  currentCard = randomCard;
  audios.src = randomCard.dataset.audio;
  audios.play();
}

/* ⏭ Auto change song when finished */
audios.addEventListener("ended", () => {
  if (isLooping) {
    audios.currentTime = 0;
    audios.play();
  } else if (isShuffle) {
    playRandomSong();
  }
});

/* ======================
  CHANGE SONG
====================== */

const cardone = document.querySelectorAll(".music-card");
const audioOne = document.getElementById("audioPlayer");

const nextBtn = document.getElementById("sa"); // ⏭
const prevBtn = document.getElementById("va"); // ⏮

let currentIndex = 0;

// ▶ Play song by index
function playSong(index) {
  const song = cards[index].dataset.audio;
  audioOne.src = song;
  audioOne.play();

  // Active UI (optional)
  cardone.forEach(card => card.classList.remove("active"));
  cardone[index].classList.add("active");
}

// 🎵 Click card
cardone.forEach((card, index) => {
  card.addEventListener("click", () => {
    currentIndex = index;
    playSong(currentIndex);
  });
});

// ⏭ Next
nextBtn.addEventListener("click", () => {
  currentIndex++;

  if (currentIndex >= cardone.length) {
    currentIndex = 0;
  }

  playSong(currentIndex);
});

// ⏮ Previous
prevBtn.addEventListener("click", () => {
  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = cards.length - 1;
  }

  playSong(currentIndex);
});

/* ======================
  change music
====================== */

