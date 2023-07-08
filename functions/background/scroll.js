"use strict";

const containers = document.querySelectorAll('.tech_images');
const chatCheck= document.querySelector("#chatbot");
window.addEventListener('wheel', debounce(revealElements, 100));
window.addEventListener('touchstart', handleTouchStart, false);
window.addEventListener('touchmove', handleTouchMove, false);
window.addEventListener('touchend', handleTouchEnd, false);

let lastScrollDirection = "";
let positionOfList = 0;
let elements = [];
let firstElement = document.querySelector("#perfil_name > h1");
let toFadeElements = document.querySelectorAll('.fade-in');
elements.push(firstElement);
toFadeElements.forEach(element => {
    elements.push(element);
});

// Función de debounce para retrasar la ejecución de una función
function debounce(callback, delay) {
    let timer;
    return function() {
        clearTimeout(timer);
        timer = setTimeout(callback, delay);
    };
}

// Detectar dirección del desplazamiento
window.addEventListener("wheel", function(event) {
    if (event.deltaY > 0) {
        lastScrollDirection = "down";
    } else {
        lastScrollDirection = "up";
    }
});

let touchStartY = 0;
let touchEndY = 0;

function handleTouchStart(event) {
    touchStartY = event.touches[0].clientY;
}

function handleTouchMove(event) {
    touchEndY = event.touches[0].clientY;
}

function handleTouchEnd() {
    if (touchStartY < touchEndY) {
        lastScrollDirection = "down";
    } else {
        lastScrollDirection = "up";
    }
    revealElements();
};

function revealElements() {
    let currentDisplay = chatCheck.style.display;

    if(currentDisplay == "" || currentDisplay == "none") {
        let fadeElements = elements;

        if (lastScrollDirection === "down") {
            //console.log("scrollDown");
        
            if (positionOfList < fadeElements.length - 1) {
                let lastElementInView = fadeElements[positionOfList];
                let elementInView = fadeElements[positionOfList + 1];
            
                //console.log(elementInView);
            
                lastElementInView.style.display = "none";
                elementInView.style.display = "grid";
            
                const elementTop = elementInView.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                if (elementTop < windowHeight) {
                    elementInView.classList.add('visible');
                } else {
                    elementInView.style.display = "none";
                }
            
                positionOfList++;
            }
        } else if (lastScrollDirection === "up") {
            //console.log("scrollUp");
        
            if (positionOfList > 0) {
                let elementInView = fadeElements[positionOfList];
                let lastElementInView = fadeElements[positionOfList - 1];
            
                elementInView.style.display = "none";
                lastElementInView.style.display = "grid";
                lastElementInView.classList.remove('visible');
            
                const elementTop = lastElementInView.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                if (elementTop < windowHeight) {
                    lastElementInView.classList.add('visible');
                    const paragraphs = lastElementInView.querySelectorAll('p');
                    for (let i = 0; i < paragraphs.length; i++) {
                        paragraphs[i].classList.add('zoom-in');
                    }
                }
                positionOfList--;
            }
        }
    };
};

window.addEventListener('DOMContentLoaded', function () {
    setTimeout(zoomParagraphs, 3000);
});

function zoomParagraphs() {
    const paragraphs = document.querySelectorAll('.fade-in.visible p');
    for (let i = 0; i < paragraphs.length; i++) {
        paragraphs[i].classList.add('zoom-in');
    };
};

// Move efect for the container
containers.forEach(container => {
    container.addEventListener('mouseenter', function() {
        container.classList.add('active');
    });

    container.addEventListener('mouseleave', function() {
        container.classList.remove('active');
    });

    container.addEventListener('mousemove', function(event) {
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        const mouseX = event.offsetX;
        const mouseY = event.offsetY;

        const rotateY = ((mouseX - containerWidth / 2) / containerWidth) * 60;
        const rotateX = ((mouseY - containerHeight / 2) / containerHeight) * 40;

        container.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    });
});