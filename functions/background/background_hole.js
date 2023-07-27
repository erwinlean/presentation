"use strict";

const holeCanvas = document.getElementById('holeCanvas');
const canvasContext = holeCanvas.getContext('2d');
const domCount = document.getElementById("starsCount");

holeCanvas.width = window.innerWidth   ;
holeCanvas.height = window.innerHeight ;

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

function drawHole() {
    canvasContext.clearRect(0, 0, holeCanvas.width, holeCanvas.height);

    // draw circle border
    canvasContext.strokeStyle = borderColor;
    canvasContext.lineWidth = borderWidth;
    canvasContext.shadowBlur = 30;
    canvasContext.shadowColor = 'gray';
    canvasContext.beginPath();
    canvasContext.arc(holeX, holeY, radius, 0, Math.PI * 2);
    canvasContext.closePath();
    canvasContext.stroke();

    // Draw perse
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(holeX, holeY, radius, 0, Math.PI * 2);
    canvasContext.closePath();
    canvasContext.fill();
};

// Update position of the mouse
function updateHolePositionMouse(event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    updateHolePosition(mouseX, mouseY);
};

// Same but touch
function updateHolePositionTouch(event) {
    //event.preventDefault();

    const touchX = event.targetTouches[0].clientX;
    const touchY = event.targetTouches[0].clientY;

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