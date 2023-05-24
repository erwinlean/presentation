"use strict";

const holeCanvas = document.getElementById('holeCanvas');
const ctx = holeCanvas.getContext('2d');


holeCanvas.width =  window.innerWidth;
holeCanvas.height = window.innerHeight;

// Definir las propiedades del círculo
const radius = 20;
const color = 'black';
const borderWidth = 0.3;
const borderColor = 'grey';

// Variables para almacenar la posición actual del círculo
let holeX = 0;
let holeY = 0;

function checkCollision(circle) {
    const dx = holeX - circle.x;
    const dy = holeY - circle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < radius + circle.radius;
}

// Función para eliminar un círculo del arreglo circles si hay colisión con el agujero
function removeCircle() {
    for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];
        if (checkCollision(circle)) {
            circles.splice(i, 1);
            i--;
        };
    };
};


// Función para dibujar el círculo en el canvas
function drawHole() {
    ctx.clearRect(0, 0, holeCanvas.width, holeCanvas.height); // Limpiar el canvas

    // Dibujar el borde del círculo
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderWidth;
    ctx.shadowBlur = 30;
    ctx.shadowColor = 'gray';
    ctx.beginPath();
    ctx.arc(holeX, holeY, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();

    // Dibujar el círculo
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(holeX, holeY, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
};

//Función para actualizar la posición del círculo en función del mouse
function updateHolePosition(event) {
    // Obtener la posición del mouse relativa al holeCanvas
    const rect = holeCanvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Aplicar un pequeño retraso al movimiento del círculo
    const delay = 30;
    const targetX = mouseX;
    const targetY = mouseY;

    // Calcular la nueva posición del círculo con el retraso
    const dx = (targetX - holeX) / delay;
    const dy = (targetY - holeY) / delay;
    holeX += dx;
    holeY += dy;

    //console.log(holeX, holeY);

    // Volver a dibujar el círculo
    drawHole();
    // Check and delete
    removeCircle();
};

// Agregar el evento de actualización de posición al movimiento del mouse
document.addEventListener('mousemove', updateHolePosition);

// Dibujar el círculo inicialmente en el centro del canvas
holeX = holeCanvas.width / 2;
holeY = holeCanvas.height / 2;
drawHole();