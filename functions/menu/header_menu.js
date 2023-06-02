"use strict";

const menuToggle = document.getElementById('menu-toggle');
const menu = document.querySelector('.menu');
let menuExpanded = false;

menuToggle.addEventListener('click', function() {
    menu.classList.toggle('expanded');
    
    // Actualize 
    menuExpanded = !menuExpanded;
});