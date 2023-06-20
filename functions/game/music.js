"use strict";

const audio = document.getElementById('music-player');
const playPauseButton = document.getElementById('play-pause-button');

playPauseButton.addEventListener('click', function() {
    if (audio.paused) {
        audio.play();
        playPauseButton.style.backgroundImage = 'url("../assets/play.png")';
        playPauseButton.classList.add('playing');
    } else {
        audio.pause();
        playPauseButton.style.backgroundImage = 'url("../assets/stop.png")';
        playPauseButton.classList.remove('playing');
    }
});