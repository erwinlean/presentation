"use strict";

const audio = document.getElementById('music-player');
const playPauseButton = document.getElementById('play-pause-button');

playPauseButton.addEventListener('click', function() {
    if (audio.paused) {
        audio.play();
        playPauseButton.classList.add('playing');
    } else {
        audio.pause();
        playPauseButton.classList.remove('playing');
    }
});