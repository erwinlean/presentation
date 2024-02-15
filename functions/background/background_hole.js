"use strict";

const holeCanvas = document.getElementById('holeCanvas');
const canvasContext = holeCanvas.getContext('2d');
const domCount = document.getElementById("starsCount");

holeCanvas.width =  document.documentElement.scrollWidth;
holeCanvas.height = document.documentElement.scrollHeight;

// Circle properties
const radius = 20;
const color = 'black';
const borderWidth = 0.3;
const borderColor = 'grey';

// Position Storage & count of stars eaten for the hole
let holeX = 0;
let holeY = 0;
let starsDeleted = 0;

function checkCollision(circle) {
    const dx = holeX - circle.x;
    const dy = holeY - circle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < radius + circle.radius;
};

// Remove circles if collision happens
function removeCircle() {
    for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];
        if (checkCollision(circle)) {
            circles.splice(i, 1);
            i--;

            // Showing the count of starts eaten by the black hole
            starsDeleted ++;
            domCount.innerText = `${starsDeleted}`;
        };
    };
};

//function drawHole() {
//    //let blacHole = new Image();
//    //ctx.drawImage(blacHole); 
//
//    canvasContext.clearRect(0, 0, holeCanvas.width, holeCanvas.height);
//
//    // draw circle border
//    canvasContext.strokeStyle = borderColor;
//    canvasContext.lineWidth = borderWidth;
//    canvasContext.shadowBlur = 30;
//    canvasContext.shadowColor = 'gray';
//    canvasContext.beginPath();
//    canvasContext.arc(holeX, holeY, radius, 0, Math.PI * 2);
//    canvasContext.closePath();
//    canvasContext.stroke();
//
//    // Draw perse
//    canvasContext.fillStyle = color;
//    canvasContext.beginPath();
//    canvasContext.arc(holeX, holeY, radius, 0, Math.PI * 2);
//    canvasContext.closePath();
//    canvasContext.fill();
//};
//
function drawHole() {
    let blackHoleImage = new Image();
    blackHoleImage.src = "../assets/black_hole.png";

    // Definir el ancho y alto deseados de la imagen
    let imageWidth = 75; // Ajusta el ancho deseado
    let imageHeight = 45; // Ajusta el alto deseado

    // Esperar a que la imagen se cargue antes de dibujarla
    blackHoleImage.onload = function() {
        let vibrationAmplitude = 5; // Ajusta la amplitud de la vibración
        let vibrationFrequency = 500; // Ajusta la frecuencia de la vibración (en milisegundos)

        // Función que realiza la vibración
        function vibrate() {
            canvasContext.clearRect(0, 0, holeCanvas.width, holeCanvas.height);

            // Calcula el desplazamiento en X e Y basado en una función seno para obtener un efecto de vibración
            let offsetX = vibrationAmplitude * Math.sin(Date.now() / vibrationFrequency);
            let offsetY = vibrationAmplitude * Math.cos(Date.now() / vibrationFrequency);

            // Dibujar la imagen del agujero negro con el desplazamiento
            canvasContext.drawImage(blackHoleImage, holeX - imageWidth / 2 + offsetX, holeY - imageHeight / 2 + offsetY, imageWidth, imageHeight);

            // Agregar sombreado blanco
            canvasContext.shadowBlur = 10;
            canvasContext.shadowColor = 'white';
        }

        // Inicia la vibración utilizando setInterval
        setInterval(vibrate, vibrationFrequency);
    };
}

// Update position of the mouse
function updateHolePositionMouse(event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY + window.scrollY;;

    updateHolePosition(mouseX, mouseY);
};

// Same but touch
function updateHolePositionTouch(event) {
    //event.preventDefault();

    const touchX = event.targetTouches[0].clientX;
    const touchY = event.targetTouches[0].clientY + window.scrollY;;

    updateHolePosition(touchX, touchY);
};

function updateHolePosition(x, y) {
    const delay = 10;
    const targetX = x;
    const targetY = y;

    const dx = (targetX - holeX) / delay;
    const dy = (targetY - holeY) / delay;
    holeX += dx;
    holeY += dy;

    // Position testing
    //console.log(targetX, targetY);

    drawHole();
    removeCircle();
};;

document.addEventListener('mousemove', updateHolePositionMouse);
document.addEventListener('touchstart', updateHolePositionTouch);
document.addEventListener('touchmove', updateHolePositionTouch);

// Init
holeX = holeCanvas.width / 2;
holeY = holeCanvas.height / 2;
drawHole();