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
        document.querySelector("#expand_button > ul.menu.menu_items > li:nth-child(1) > a").innerHTML = "About me";
        document.querySelector("#expand_button > ul.menu.menu_items > li:nth-child(2) > a").innerHTML = "Resume";
        document.querySelector("#expand_button > ul.menu.menu_items > li:nth-child(3) > a").innerHTML = "Contact";
        document.querySelector("#expand_button > ul.menu.menu_items > li:nth-child(4) > a").innerHTML = "Play";
    
        let chat_header= document.querySelector("#chatbot > div.chatbot-header");
        let chat_p     = document.querySelector("body > p");
        let chat_input = document.querySelector("#inputMessage");
        let chat_btn   = document.querySelector("#chatbotContent > div > button");

        if(chat_header){
            chat_header.innerHTML = '<span class="icon">▼</span> Hello';
            chat_p.textContent = "Hello";
            chat_input.placeholder = "Write your message";
            chat_btn.innerHTML = "Send";
        };

        // Obtein the current url and traslate
        currentURL = window.location.href;

        // Traslate rest of the DOM
        if(currentURL.includes("index.html")){
            //console.log("index")

        }else if(currentURL.includes("contact.html")){
            document.querySelector("#contactForm > h3").innerHTML = "Contact";
            document.querySelector("#contactForm > label:nth-child(4)").innerHTML = "Name";
            document.querySelector("#contactForm > label:nth-child(6)").innerHTML = "Message";
            document.querySelector("#sendBtn").value = "Send";

        }else if(currentURL.includes("game.html")){
            document.querySelector("#restartGame").innerHTML = "Restart";
            document.querySelector("#game_start").innerHTML = "Start";
            document.querySelector("body > div.music-buttons > p").innerHTML = "Music";
        };

    }else{
        if(htmlElement.lang){
            htmlElement.lang = 'es';
        }
        currentTogle = true;

        languageButton.classList.add('active');
        languageTexts[0].style.display = 'none';
        languageTexts[1].style.display = 'inline';
        togleCircle.style.left = 'calc(100% - 12px)';

        // Lenguaje Change
        document.querySelector("#expand_button > ul.menu.menu_items > li:nth-child(1) > a").innerHTML = "Sobre mi";
        document.querySelector("#expand_button > ul.menu.menu_items > li:nth-child(2) > a").innerHTML = "Curriculum";
        document.querySelector("#expand_button > ul.menu.menu_items > li:nth-child(3) > a").innerHTML = "Contacto";
        document.querySelector("#expand_button > ul.menu.menu_items > li:nth-child(4) > a").innerHTML = "Jugar";

        let chat_header= document.querySelector("#chatbot > div.chatbot-header");
        let chat_p     = document.querySelector("body > p");
        let chat_input = document.querySelector("#inputMessage");
        let chat_btn   = document.querySelector("#chatbotContent > div > button");

        if(chat_header){
            chat_header.innerHTML = '<span class="icon">▼</span> Hola';
            chat_p.textContent = "Hola";
            chat_input.placeholder = "Escribi tu mensaje";
            chat_btn.innerHTML = "Enviar";
        };

        // Obtein the current url and traslate
        currentURL = window.location.href;
        //console.log(currentURL);

        if(currentURL.includes("index.html")){
            //console.log("index")

        }else if(currentURL.includes("contact.html")){
            document.querySelector("#contactForm > h3").innerHTML = "Contacto";
            document.querySelector("#contactForm > label:nth-child(4)").innerHTML = "Nombre";
            document.querySelector("#contactForm > label:nth-child(6)").innerHTML = "Mensaje";
            document.querySelector("#sendBtn").value = "Enviar";
        
        }else if(currentURL.includes("game.html")){
            document.querySelector("#restartGame").innerHTML = "Reiniciar";
            document.querySelector("#game_start").innerHTML = "Comenzar";
            document.querySelector("body > div.music-buttons > p").innerHTML = "Musica";
        };        
    };
};

languageButton.onclick = lenguajeChange;