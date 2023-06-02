"use strict";

const htmlElement = document.getElementById('htmlElement');
const languageButton = document.querySelector('.languageButton');
const languageTexts = document.querySelectorAll('.languageText');
const togleCircle = document.querySelector('.circle');
let currentURL = window.location.href;
let currentTogle = false; // true if current togle is es, else false > this update in the index.js (game js file)

function lenguajeChange() {
    if (languageButton.classList.contains('active')) {
        // Change html Element
        htmlElement.lang = 'en';
        currentTogle = false;

        // Button change
        languageButton.classList.remove('active');
        languageTexts[0].style.display = 'inline';
        languageTexts[1].style.display = 'none';
        togleCircle.style.left = '12px';

        // Nav Lenguaje Change
        document.querySelector("#expand_button > ul.menu.menu_items.expanded > li:nth-child(1) > a").innerHTML = "About me";
        document.querySelector("#expand_button > ul.menu.menu_items.expanded > li:nth-child(2) > a").innerHTML = "Resume";
        document.querySelector("#expand_button > ul.menu.menu_items.expanded > li:nth-child(3) > a").innerHTML = "Contact";
        document.querySelector("#expand_button > ul.menu.menu_items.expanded > li:nth-child(4) > a").innerHTML = "Play";
    
        // Obtein the current url and traslate
        currentURL = window.location.href;

        // Traslate rest of the DOM
        if(currentURL.includes("index.html")){
            //console.log("index")

        }else if(currentURL.includes("contact.html")){
            document.querySelector("#contactForm > h3").innerHTML = "Contact";
            document.querySelector("#contactForm > label:nth-child(2)").innerHTML = "Email";
            document.querySelector("#contactForm > label:nth-child(5)").innerHTML = "Message";
            document.querySelector("#sendBtn").value = "Send";

        }else if(currentURL.includes("game.html")){
            document.querySelector("#restartGame").innerHTML = "Restart";

        };

    }else{
        htmlElement.lang = 'es';
        currentTogle = true;

        languageButton.classList.add('active');
        languageTexts[0].style.display = 'none';
        languageTexts[1].style.display = 'inline';
        togleCircle.style.left = 'calc(100% - 12px)';

        // Lenguaje Change
        document.querySelector("#expand_button > ul.menu.menu_items.expanded > li:nth-child(1) > a").innerHTML = "Sobre mi";
        document.querySelector("#expand_button > ul.menu.menu_items.expanded > li:nth-child(2) > a").innerHTML = "Curriculum";
        document.querySelector("#expand_button > ul.menu.menu_items.expanded > li:nth-child(3) > a").innerHTML = "Contacto";
        document.querySelector("#expand_button > ul.menu.menu_items.expanded > li:nth-child(4) > a").innerHTML = "Jugar";

        // Obtein the current url and traslate
        currentURL = window.location.href;
        //console.log(currentURL);

        if(currentURL.includes("index.html")){
            //console.log("index")

        }else if(currentURL.includes("contact.html")){
            document.querySelector("#contactForm > h3").innerHTML = "Contacto";
            document.querySelector("#contactForm > label:nth-child(2)").innerHTML = "Email";
            document.querySelector("#contactForm > label:nth-child(5)").innerHTML = "Mensaje";
            document.querySelector("#sendBtn").value = "Enviar";
        
        }else if(currentURL.includes("game.html")){
            document.querySelector("#restartGame").innerHTML = "Reiniciar";
        };        
    };
};

languageButton.onclick = lenguajeChange;