"use strict";
    
// Obtener el elemento del lienzo
const btnRestartStars = document.getElementById("restartStars")
const canvas = document.getElementById("starsCanvas");
const context = canvas.getContext("2d");

// Establecer el tamaño del lienzo
canvas.width = window.innerWidth  ;
canvas.height = window.innerHeight;
//console.log(window.innerWidth, window.innerHeight);

// Crear los círculos
const circles = [];
const numCircles = 100;
const scales = [1.15, 3, 2, 4, 3, 2.25, 1.50, 1.75, 0.5, 0.30, 0.25, 2.75, 3.2, 1.3, 2.35, 2.05, 0.2, 0.6, 0.9, 1.9, 2.7, 4, 3.05, 0.79, 2.58, 0.37, 1.82, 1.42, 2.22, 0.46];
const colours = [ "#FFFFFF", "#0A1776", "#071158", "#090D58", "#000158", "#FFA500", "#132BDF", "#FFFF00", "#808080", "#071158", "#090D58", "#000158", "#1C2B58", "#132BDF", "#808080", "#071158", "#090D58", "#000158", "#1C2B58", "#39A6B2", "#FFFFFF", "#FFFFFF"];
let circle;

// Función para dibujar los círculos en el lienzo
function drawStars() {

  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < circles.length; i++) {
    const circle = circles[i];

    // Dibujar el círculo con sombra
    context.beginPath();
    context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
    context.fillStyle = circle.color;
    context.shadowColor = circle.color; 
    context.shadowBlur = 10;  
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
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

    const deviceWidthFactor = canvas.width / window.innerWidth;
    const deviceHeightFactor = canvas.height / window.innerHeight;
    const speedFactor = Math.max(deviceWidthFactor, deviceHeightFactor);

    if(canvas.width < 450 && canvas.height < 1150) {
      circle = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1 * normalizedRandomScale,
        dx: (Math.random() * 0.8 - 0.2) * speedFactor,
        dy: (Math.random() * 0.8 - 0.2) * speedFactor,
        color: randomColor,
      };
    }else{
      circle = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1 * normalizedRandomScale,
        dx: (Math.random() * 0.4 - 0.2) * speedFactor,
        dy: (Math.random() * 0.4 - 0.2) * speedFactor,
        color: randomColor,
      };
    }

    circles.push(circle);
  };
};


// Create new Stars if is wanted
function restartStars(){
  // Create new stars
  let newStars = Math.floor(Math.random() * 21) + 15;
  //console.log(newStars);

  if(circles.length <= 200){
    stars(newStars);
    //console.log(circles.length);
  };
};

// Init
drawStars();
stars(numCircles);
// alert("Width: " + canvas.width + " ||| Heigth: " + canvas.height);

// If btn is needed
btnRestartStars.onclick = restartStars;