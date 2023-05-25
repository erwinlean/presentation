//"use strict";
//
//window.addEventListener('scroll', revealElements);
//
//function revealElements() {
//    const fadeElements = document.querySelectorAll('.fade-in');
//    for (let i = 0; i < fadeElements.length; i++) {
//        const element = fadeElements[i];
//        const elementTop = element.getBoundingClientRect().top;
//        const windowHeight = window.innerHeight;
//        if (elementTop < windowHeight) {
//            element.classList.add('visible');
//        }
//    }
//}
//
//window.addEventListener('DOMContentLoaded', function () {
//    setTimeout(zoomParagraphs, 3000);
//});
//
//function zoomParagraphs() {
//    const paragraphs = document.querySelectorAll('.fade-in.visible p');
//    for (let i = 0; i < paragraphs.length; i++) {
//        paragraphs[i].classList.add('zoom-in');
//    }
//}
//