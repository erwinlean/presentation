"use strict";
    
// Obtener el elemento del lienzo
const btnRestartStars = document.getElementById("restartStars")
const canvas = document.getElementById("starsCanvas");
const context = canvas.getContext("2d");

// Establecer el tamaño del lienzo
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Crear los círculos
const circles = [];
const numCircles = 100;
const scales = [1.15,3,2,4,3,2.25, 1.50 ,1.75 ,0.5 ,0.30 ,0.25 ,2.75,3.2,1.3,2.35,2.05,0.2,0.6,0.9,1.9,2.7,4,3.05,];
const colours = ["white","#72076E", "#2B0245" ,"#250096", "#5600f4", "#E923F4"];
let circle;

// Función para dibujar los círculos en el lienzo
function drawStars() {

  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < circles.length; i++) {
    const circle = circles[i];

    // Dibujar el círculo
    // Dibujar el círculo con sombra
    context.beginPath();
    context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
    context.fillStyle = circle.color;
    context.shadowColor = circle.color; // Color de la sombra
    context.shadowBlur = 10; // Desenfoque de la sombra
    context.shadowOffsetX = 0; // Desplazamiento en el eje x de la sombra
    context.shadowOffsetY = 0; // Desplazamiento en el eje y de la sombra
    context.fill();
    context.closePath();
    // Actualizar la posición del círculo
    circle.x += circle.dx;
    circle.y += circle.dy;
    // Comprobar los límites del lienzo

    if (circle.x + circle.radius > canvas.width || circle.x - circle.radius < 0) {
      circle.dx = -circle.dx;
    }
    if (circle.y + circle.radius > canvas.height || circle.y - circle.radius < 0) {
      circle.dy = -circle.dy;
    }
  }
  requestAnimationFrame(drawStars);
}

// Funcion crear estrellas
function stars(numOfStars) {
  for (let i = 0; i < numOfStars; i++) {
    const randomScale = scales[Math.floor(Math.random() * scales.length)];
    const randomColor = colours[Math.floor(Math.random() * colours.length)];
    const normalizedRandomScale = randomScale - (randomScale * 0.5);

    circle = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1 * normalizedRandomScale, // Escala el radio
      dx: Math.random() * 0.4 - 0.2, // Velocidad en el eje x entre -0.1 y 0.1
      dy: Math.random() * 0.4 - 0.2, // Velocidad en el eje y entre -0.1 y 0.1
      color: randomColor, // Color aleatorio
    };
    circles.push(circle);
  };
};

// Create new Stars if is wanted
function restartStars(){
  // Create new stars
  let newStars = 25;

  if(circles.length <= 200){
    stars(newStars);
    //console.log(circles.length);
  }
};

// Iniciar la animación
drawStars();
stars(numCircles);

// If btn is needed
btnRestartStars.onclick = restartStars;