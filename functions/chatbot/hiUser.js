"use strict";

const hiElement = document.querySelector("body > p");
const hello_not = document.getElementById("hello_not");

function hello() {
    
    setTimeout(() => {
        const sound = hello_not.play();
        setTimeout(() => {
            hiElement.style.opacity = "1";
        }, 10);
    }, 2000);
};

//hello();