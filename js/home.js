// const favorite = document.querySelector('.folder-card');
// const playMusic = document.querySelector('.big-big-play');
// const musicCards = document.querySelectorAll('.music-card');
// const back = document.querySelector('.back');

// //-------------------------//
// //---Display none & block--//
// //-------------------------//
// favorite.style.display = 'block';
// playMusic.style.display = 'none';

// // Click any music card → show player
// musicCards.forEach(card => {
//     card.addEventListener('click', () => {
//         favorite.style.display = 'none';
//         playMusic.style.display = 'block';
//     });
// });

// // Click back → show music list
// back.addEventListener('click', () => {
//     playMusic.style.display = 'none';
//     favorite.style.display = 'block';
// });


const favorite = document.querySelector('.folder-card');
const playMusic = document.querySelector('.big-big-play');
const musicCards = document.querySelectorAll('.music-card');
const back = document.querySelector('.back');

// Player elements
const albumImg = document.querySelector('.album-art img');
const songTitle = document.querySelector('.song-title');
const audio = document.getElementById('audioPlayer');
const playBtn = document.querySelector('.play-btn');

let isPlaying = false;

// --------------------
// Click music card
// --------------------
musicCards.forEach(card => {
  card.addEventListener('click', () => {
    const imgSrc = card.querySelector('img').src;
    const title = card.querySelector('p').innerText;
    const audioSrc = card.getAttribute('data-audio');

    // Set player data
    albumImg.src = imgSrc;
    songTitle.innerText = title;
    audio.src = audioSrc;

    // Show player
    favorite.style.display = 'none';
    playMusic.style.display = 'block';

    // Play audio
    audio.play();
    playBtn.innerText = '⏸';
    isPlaying = true;
  });
});

// --------------------
// Play / Pause button
// --------------------
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

// --------------------
// Back button
// --------------------
back.addEventListener('click', () => {
  audio.pause();
  audio.currentTime = 0;

  playMusic.style.display = 'none';
  favorite.style.display = 'block';

  playBtn.innerText = '▶';
  isPlaying = false;
});

