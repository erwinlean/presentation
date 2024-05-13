"use strict";

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const images = document.querySelectorAll(".img-projects");
const body = document.body;

images.forEach(function(img) {
    img.addEventListener("click", function() {
        // Mostrar el modal al hacer clic en la imagen
        modal.style.display = "flex";
        modal.style.position = "fixed"
        body.classList.add("modal-open");
        // Asignar la ruta de la imagen al src del modal-img
        modalImg.src = this.src;
    });
});

const closeBtn = document.querySelector(".close");

closeBtn.addEventListener("click", function() {
    modal.style.display = "none";
    body.classList.remove("modal-open");
});
window.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
        body.classList.remove("modal-open");
    }
});
window.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        modal.style.display = "none";
        body.classList.remove("modal-open");
    }
});