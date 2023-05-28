window.addEventListener('wheel', debounce(revealElements, 100));

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
        // Scroll hacia abajo
        lastScrollDirection = "down";
    } else {
        // Scroll hacia arriba
        lastScrollDirection = "up";
    }
});

function revealElements() {
    let fadeElements = elements;

    if (lastScrollDirection === "down") {
        //console.log("scrollDown");

        if (positionOfList < fadeElements.length - 1) {
            let lastElementInView = fadeElements[positionOfList];
            let elementInView = fadeElements[positionOfList + 1];

            //console.log(elementInView);

            lastElementInView.style.display = "none";
            elementInView.style.display = "flex";

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
            lastElementInView.style.display = "flex";
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
}

window.addEventListener('DOMContentLoaded', function () {
    setTimeout(zoomParagraphs, 3000);
});

function zoomParagraphs() {
    const paragraphs = document.querySelectorAll('.fade-in.visible p');
    for (let i = 0; i < paragraphs.length; i++) {
        paragraphs[i].classList.add('zoom-in');
    }
}
