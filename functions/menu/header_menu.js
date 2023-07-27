"use strict";

const menuToggle = document.getElementById('menu-toggle');
const menu = document.querySelector('.menu');
let menuExpanded = false;

menuToggle.addEventListener('click', function() {
    menu.classList.toggle('expanded');

    const formBody = document.querySelector("body > div.formContainer");
    const indexBody = document.querySelector("#content > div:nth-child(2)");
    const gameBody = document.querySelector("#game_canvas");
    const musicBtn = document.querySelector(".music-buttons");
    const startGameBtn = document.querySelector(".start-container");

    if (menuExpanded) {
        if (gameBody) {
            startGameBtn.style.zIndex = musicBtn.style.zIndex = 320;
        }
    } else {
        if (gameBody) {
            startGameBtn.style.zIndex = musicBtn.style.zIndex = -1;
        };
    };

    if (menuExpanded) {
        if (formBody) {
            formBody.style.zIndex = 300;
        } else if (indexBody) {
            indexBody.style.zIndex = 300;
        } else if (gameBody) {
            gameBody.style.zIndex = 300;
        };
    } else {
        if (formBody) {
            formBody.style.zIndex = -1;
        } else if (indexBody) {
            indexBody.style.zIndex = -1;
        } else if (gameBody) {
            gameBody.style.zIndex = -1;
        };
    };

    // Actualize
    menuExpanded = !menuExpanded;
});