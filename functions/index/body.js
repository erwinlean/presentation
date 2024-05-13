"use strict";

const traslateBtn = document.querySelector("#languageToggle > li > button");
const traslateSpanEnglish = document.querySelector("#languageToggle > li > button > span:nth-child(1)");
const traslateSpanSpanish = document.querySelector("#languageToggle > li > button > span:nth-child(2)");

const paragraphOneSpanish = "Programador en crecimiento con experiencia en diferentes tecnologías. Me especializo en el desarrollo de aplicaciones utilizando JavaScript (Node.js, Express, Svelte), también tengo conocimientos básicos Rust and Php. Además, manejo Linux, Docker y otras herramientas esenciales de programación.";
const paragraphTwoSpanish = "Actualmente, me encuentro trabajando como Software Engineer Jr. en Criteria Online. Mi rol se centra en la creación de conectores bidireccionales mediante API entre sistemas como ERP, PIM, DAM y eCommerce. Mi objetivo es asegurar una comunicación fluida y eficiente entre estas plataformas para facilitar la gestión de datos y mejorar la experiencia del usuario.";
const paragraphThreeSpanish = "Estoy comprometido con seguir aprendiendo y adquiriendo nuevas habilidades en el mundo de la programación para crecer profesionalmente y aportar soluciones innovadoras en cada proyecto en el que participo.";
const paragraphOneEnglish = "Growing programmer with experience in various technologies. I specialize in developing applications using JavaScript (Node.js, Express, Svelte), and I also have basic knowledge of Rust and Php. Additionally, I handle Linux, Docker, and other essential programming tools.";
const paragraphTwoEnglish = "Currently, I am working as a Software Engineer Jr. at Criteria Online. My role focuses on creating bidirectional connectors through APIs between systems such as ERP, PIM, DAM, and eCommerce. My goal is to ensure smooth and efficient communication between these platforms to facilitate data management and enhance the user experience.";
const paragraphThreeEnglish = "I am committed to continuous learning and acquiring new skills in the programming world to grow professionally and provide innovative solutions in every project I participate in.";

const firstP = document.querySelector("#content > div:nth-child(2) > div.fade-in.typing > div > p:nth-child(3)");
const secondP = document.querySelector("#content > div:nth-child(2) > div.fade-in.typing > div > p:nth-child(4)");
const thirdP = document.querySelector("#content > div:nth-child(2) > div.fade-in.typing > div > p:nth-child(5)");

const toSeeParagraph = document.querySelector("#content > div:nth-child(2) > div.fade-in.typing > div > h3");
let isExecuted = false;
let isCallbackExecuting = false;

let currentLanguage = "english";

function insertParagraphs(paragraph1, paragraph2, paragraph3) {
    firstP.innerHTML = paragraph1;
    secondP.innerHTML = paragraph2;
    thirdP.innerHTML = paragraph3;
};

function toggleLanguage() {
    if(isCallbackExecuting){
        if (currentLanguage === "spanish") {
            currentLanguage = "english";
            insertParagraphs(paragraphOneEnglish, paragraphTwoEnglish, paragraphThreeEnglish);
        } else {
            currentLanguage = "spanish";
            insertParagraphs(paragraphOneSpanish, paragraphTwoSpanish, paragraphThreeSpanish);
        };
    };
};

traslateBtn.addEventListener("click", toggleLanguage);

function insertString(paragaph, html, callback) {
    let index = 0;
    function addLetter() {
        if (index < paragaph.length) {
            html.innerHTML += paragaph[index];
            index++;
            setTimeout(addLetter, 10);
        } else {
            if (callback) {
                callback();
            };
        };
    };

    isCallbackExecuting = true;
    addLetter();
};

function checkVisibilityAndExecute() {
    if (isElementInViewport(toSeeParagraph) && !isExecuted) {
        if (currentLanguage === "english") {
            insertString(paragraphOneEnglish, firstP, function () {
                insertString(paragraphTwoEnglish, secondP, function () {
                    insertString(paragraphThreeEnglish, thirdP);
                });
            });
        } else {
            insertString(paragraphOneSpanish, firstP, function () {
                insertString(paragraphTwoSpanish, secondP, function () {
                    insertString(paragraphThreeSpanish, thirdP);
                });
            });
        };

        isExecuted = true;
        window.removeEventListener("scroll", checkVisibilityAndExecute);
    };
};

window.addEventListener("scroll", checkVisibilityAndExecute);
window.addEventListener("load", checkVisibilityAndExecute);
window.addEventListener("resize", checkVisibilityAndExecute);

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};