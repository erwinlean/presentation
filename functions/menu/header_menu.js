"use strict";

const menuToggle = document.getElementById('menu-toggle');
const menu = document.querySelector('.menu');
let menuExpanded = false;
let currentDisplay;
let formBody;

if (window.location.href.includes("contact")) {
    formBody = document.querySelector("body > div.formContainer");
    currentDisplay = window.getComputedStyle(formBody).display;
};

menuToggle.addEventListener('click', function() {
    menu.classList.toggle('expanded');

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
            formBody.style.display = `${currentDisplay}`;
        } else if (indexBody) {
            indexBody.style.zIndex = 300;
        } else if (gameBody) {
            gameBody.style.zIndex = 300;
        };
    } else {
        if (formBody) {
            formBody.style.display = `none`;
        } else if (indexBody) {
            indexBody.style.zIndex = -1;
        } else if (gameBody) {
            gameBody.style.zIndex = -1;
        };
    };

    menuExpanded = !menuExpanded;
});

function updatePosition() {
    const networksDiv = document.querySelector('.networks');
    const windowHeight = document.documentElement.scrollHeight;

    if(!window.location.href.includes("contact.html")){
        const newTopPosition = windowHeight -networksDiv.clientHeight;
        networksDiv.style.top = `${newTopPosition}px`;
    };
};

window.addEventListener('load', updatePosition);
window.addEventListener('resize', updatePosition);