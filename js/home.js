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

    albumImg.src = img;
    songTitle.innerText = title;
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

