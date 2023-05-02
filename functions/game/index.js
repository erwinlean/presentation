"use strict";

let actualPoints = document.getElementById("actualPoints")
let angle = 0;
let mouseX;
let mouseY;
let shouldDrawCircle = false;
let circleX, circleY; 
let tipX;
let tipY;
let direction;
let detectFunctionActivity = false;
let meteorRandomSelect = 1;
// Obtener referencia al canvas y establecer su ancho y altura
const canvas = document.getElementById("myCanvasGame");
canvas.width = 800;
canvas.height = 600; 

// Obtener contexto 2D del canvas
const ctx = canvas.getContext("2d");
// Definir la posición inicial del cuadrado principal
let squareX = 250;
let squareY = 250;
// Definir una lista vacía para almacenar los cuadrados pequeños
let smallSquares = [];
//circulo
let circleList = [];
//colisions
let count = 0;

// Función para crear cuadrados pequeños aleatorios
// Función para crear cuadrados pequeños aleatorios
function createSmallSquare() {
  let x, y;
  let width = Math.random() * 30 + 15;
  let height = width;
  let speed = Math.random() * 2 + 1;
  let direction = Math.random() * 360;

  // Verificar el lado del canvas en el que aparecerá el cuadrado pequeño
  let side = Math.floor(Math.random() * 4); // 0: arriba, 1: derecha, 2: abajo, 3: izquierda
  switch (side) {
    case 0: // Aparecerá en la parte superior del canvas
      x = Math.random() * canvas.width;
      y = -height;
      break;
    case 1: // Aparecerá en el lado derecho del canvas
      x = canvas.width;
      y = Math.random() * canvas.height;
      break;
    case 2: // Aparecerá en la parte inferior del canvas
      x = Math.random() * canvas.width;
      y = canvas.height;
      break;
    case 3: // Aparecerá en el lado izquierdo del canvas
      x = -width;
      y = Math.random() * canvas.height;
      break;
  }

  let smallSquare = {
    x: x,
    y: y,
    width: width,
    height: height,
    speed: speed,
    direction: direction
  };
  smallSquares.push(smallSquare);
}

// space cat
let space_cat = new Image();
let meteor = new Image();
space_cat.src = "./style/assets/cat-driver.png"; // ver imagen por una hd
meteor.src = "./style/assets/meteor.png";
// Dibujar
function draw() {

  // Dibujar el triángulo principal
  // Calcular la posición de la punta del triángulo}
  tipX = squareX + 25 + 20 * Math.cos(angle);
  tipY = squareY + 25 + 20 * Math.sin(angle);
  ctx.translate(tipX, tipY);
  ctx.rotate(angle + Math.PI / 2);
  ctx.drawImage(space_cat, -20, -20, 25, 60); // manejar el tamaño de la imagen aca
  ctx.rotate(-angle - Math.PI / 2);
  ctx.translate(-tipX, -tipY);

  // Dibujar los cuadrados pequeños y actualizar su posición
  for (let i = 0; i < smallSquares.length; i++) {
    let smallSquare = smallSquares[i];
    // Dibujar la imagen en lugar del cuadrado amarillo
    ctx.drawImage(meteor, smallSquare.x, smallSquare.y, smallSquare.width, smallSquare.height);
    smallSquare.x += Math.cos(smallSquare.direction * Math.PI / 180) * smallSquare.speed;
    smallSquare.y += Math.sin(smallSquare.direction * Math.PI / 180) * smallSquare.speed;
    // Si un cuadrado pequeño sale del canvas, eliminarlo
    if (smallSquare.x + smallSquare.width < 0 || smallSquare.x > canvas.width ||
      smallSquare.y + smallSquare.height < 0 || smallSquare.y > canvas.height) {
      // Buscar el índice del cuadrado pequeño en la lista de cuadrados pequeños
      const index = smallSquares.indexOf(smallSquare);
      // Eliminar el cuadrado pequeño de la lista
      smallSquares.splice(index, 1);
  }
}

  // red circle > shot
  if (shouldDrawCircle) {
    // Dibuja el círculo rojo
    let pointinX = circleX += Math.cos(direction) * 10;
    let pointinY = circleY += Math.sin(direction) * 10;
    for(let i=0; i<circleList.length; i++){
      ctx.beginPath();
      ctx.fillStyle = 'red';
      ctx.arc(pointinX, pointinY, 3, 0, 2 * Math.PI);
      ctx.fill();
    }

    checkCollision();
  }
}

// Función para revisar colisión entre el círculo y los cuadrados pequeños
function checkCollision() {
  for (let i = 0; i < smallSquares.length; i++) {
    //revision de distancias
    let smallSquare = smallSquares[i];
    let dx = circleX - (smallSquare.x + smallSquare.width / 2);
    let dy = circleY - (smallSquare.y + smallSquare.height / 2);
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 3 + Math.sqrt(smallSquare.width * smallSquare.width + smallSquare.height * smallSquare.height) / 2) {
      // Eliminar el cuadrado pequeño(asteoride ) de la lista
      smallSquares.splice(i, 1);
      count = count + 1;
      console.log(count)
      actualPoints.innerHTML = `<th>Points : ${count}</th>`
    }
  }

  for (let i = 0; i < smallSquares.length; i++) {
    let smallSquare = smallSquares[i];
    let dx = tipX - (smallSquare.x + smallSquare.width / 2);
    let dy = tipY - (smallSquare.y + smallSquare.height / 2);
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 20 + smallSquare.width / 2) {
      // Colisión detectada elimina nave
      destroyTriangle();
      // Eliminar el cuadrado pequeño de la lista
      smallSquares.splice(i, 1);
      break;
    }
  }
}

// Función para destruir el triángulo principal
function destroyTriangle() {

  ctx.beginPath();
  ctx.arc(tipX, tipY, 30, 0, 2 * Math.PI);
  ctx.fillStyle = "black";
  ctx.fill();
  // Eliminar el triángulo principal
  squareX = -100;
  squareY = -100;
  detectFunctionActivity = true;
}

// Detectar cuando se presionan las teclas de flecha
// Detectar cuando se presionan las teclas de flecha o WASD
document.addEventListener("keydown", function(event) {
  if (event.code === "ArrowUp" || event.code === "KeyW") {
    squareY -= 3;
  } else if (event.code === "ArrowRight" || event.code === "KeyD") {
    squareX += 3;
  } else if (event.code === "ArrowDown" || event.code === "KeyS") {
    squareY += 3;
  } else if (event.code === "ArrowLeft" || event.code === "KeyA") {
    squareX -= 3;
  }

  //console.log("Posicion del mouse: " + mouseX +" "+ mouseY);
  //console.log("Posicion del triangulo: " + squareY + " " + squareX);
});

//mouse
canvas.addEventListener('mousemove', function(event) {
  // Obtener la posición del mouse en el canvas
  // Calcular la posición del mouse en el canvas
  let rect = canvas.getBoundingClientRect();
  mouseX = event.clientX - rect.left;
  mouseY = event.clientY - rect.top;

  // Calcular el ángulo de rotación del triángulo en base a la posición del mouse
  angle = Math.atan2(mouseY - (squareY + 25), mouseX - (squareX + 25));
});

// disparo
canvas.addEventListener("click", function(event){
  //console.log("Posicion del mouse: " + mouseX +" "+ mouseY)
  // Definir el estilo de relleno del círculo como rojo
  circleX = tipX;
  circleY = tipY;

  //Detectar si la nave fue destruida o no, segun true o false, para que pueda seguir disparando o no
  if(detectFunctionActivity==false){
    shouldDrawCircle = true;

    // Calcular la dirección del mouse con respecto al centro del círculo gris
    let dx = mouseX - tipX;
    let dy = mouseY - tipY;
    circleList.push({x: circleX, y: circleY});
    direction = Math.atan2(dy, dx);
    // Mover gradualmente el círculo en la dirección del mouse hasta que llegue al borde del canvas
    let intervalId = setInterval(function() {
      // Calcular las nuevas coordenadas del círculo
      circleX += Math.cos(direction) * 10;
      circleY += Math.sin(direction) * 10;
      // Si el círculo está en el borde del canvas, detener el intervalo
      if (circleX < 0 || circleX > canvas.width || circleY < 0 || circleY > canvas.height) {
        clearInterval(intervalId);
      }
    }, 10);
  }
});





// Agregar cuadrados pequeños aleatorios cada 2 segundos
setInterval(function() {
  createSmallSquare();
}, 80); //Crear mas o menos cuadrados

// Función para animar el canvas
function animate() {
  // Limpiar el canvas antes de cada animación
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar los cuadrados
  draw();

  // Solicitar la siguiente animación
  requestAnimationFrame(animate);
}

// Comenzar la animación del canvas
animate();