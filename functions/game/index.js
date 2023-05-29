"use strict";

let restartButton = document.getElementById("restartGame");
let actualPoints = document.getElementById("actualPoints");
let angle = 0;
let shouldDrawCircle,detectFunctionActivity = false;
//let detectFunctionActivity = false;
let circleX, circleY, tipX ,tipY ,direction, mouseX, mouseY, animationId, numberOfMeteors, form;

// Obtener referencia al canvas y establecer su ancho y altura en % y resize
const canvas = document.getElementById("myCanvasGame");
canvas.width = window.innerWidth  ;
canvas.height = window.innerHeight;

function resizeCanvas() {
  canvas.width = window.innerWidth * 0.7;
  canvas.height = window.innerHeight * 0.6;
};

// Agregar un evento para escuchar el evento de cambio de tamaño de la ventana
window.addEventListener('resize', resizeCanvas);

// Llamar a la función resizeCanvas() una vez para establecer el tamaño inicial
resizeCanvas();

// Depends on the size of the window, will create less or more meteors
function numOfMeteors(){
  if(window.innerWidth <= 768 && window.innerHeight <= 768){
    numberOfMeteors = 350;
  }else{
    numberOfMeteors = 120;
  };
};

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

restartButton.addEventListener("click", function() {
  // Detener la animación actual
  cancelAnimationFrame(animationId);

  // Delete form/submit from DOM after restart the game
  let form = document.querySelector("body > form");
  if(form){
    form.remove();
  };

  // Reiniciar las variables y listas necesarias
  smallSquares = [];
  circleList = [];
  count = 0;
  squareX = 250;
  squareY = 250;
  detectFunctionActivity = false;
  shouldDrawCircle = false;

  // Reiniciar meteoritos
  // init number of meteors depends on window size
  numOfMeteors();

  // Iniciar la animación nuevamentes (cd)
  startCountdown();
});

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
  };

  let smallSquare = {
    x: x,
    y: y,
    width: width,
    height: height,
    speed: speed,
    direction: direction
  };
  smallSquares.push(smallSquare);
};

// space cat
let space_cat = new Image();
let meteor = new Image();
space_cat.src = "./assets/space_cat_DALLE.png"; // ver imagen por una hd
meteor.src = "./assets/meteor.png";


// Dibujar
function draw() {
  // Dibujar el triángulo principal
  // Calcular la posición de la punta del triángulo
  tipX = squareX + 25 + 20 * Math.cos(angle);
  tipY = squareY + 25 + 20 * Math.sin(angle);
  ctx.translate(tipX, tipY);
  ctx.rotate(angle + Math.PI / 2);
  ctx.drawImage(space_cat, -95, -40, 120 , 135); // manejar el tamaño de la imagen aca > y de donde dispara
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
    };
  };

  if (shouldDrawCircle) {
    // Dibuja la línea roja
    let lineLength = 50; // longitud de la línea
    let lineWidth = 5; // grosor de la línea
    let pointinX = circleX + Math.cos(direction) * lineLength;
    let pointinY = circleY + Math.sin(direction) * lineLength;
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = lineWidth;
    ctx.moveTo(circleX, circleY);
    ctx.lineTo(pointinX, pointinY);
    ctx.stroke();
  };
};

// Función para revisar colisión entre el círculo y los cuadrados pequeños
function checkCollision() {
  // Update points
  if(currentTogle===false){
    actualPoints.innerHTML = `<th>Points: ${count}</th>`;
  }else{
    actualPoints.innerHTML = `<th>Puntos: ${count}</th>`;
  }

  for (let i = 0; i < smallSquares.length; i++) {
    let smallSquare = smallSquares[i];
    let dx = circleX - (smallSquare.x + smallSquare.width / 2);
    let dy = circleY - (smallSquare.y + smallSquare.height / 2);
    let distance = Math.sqrt(dx * dx + dy * dy);

    let collisionRadius = Math.sqrt(
      smallSquare.width * smallSquare.width +
      smallSquare.height * smallSquare.height
    ) / 2;

    if (distance < 3 + collisionRadius) {
      // Eliminar el cuadrado pequeño (asteroide) de la lista
      smallSquares.splice(i, 1);
      count = count + 1;
    };
  };

  for (let i = 0; i < smallSquares.length; i++) {
    let smallSquare = smallSquares[i];
    let dx = tipX - (smallSquare.x + smallSquare.width / 2);
    let dy = tipY - (smallSquare.y + smallSquare.height / 2);
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 20 + smallSquare.width / 2 || distance < 20 + smallSquare.height / 2) {
      // Colisión detectada, eliminar nave
      destroyTriangle();
      // Eliminar el cuadrado pequeño de la lista
      smallSquares.splice(i, 1);

      // Crear formulario para ingresar el nombre
      form = document.createElement('form');
      const input = document.createElement('input');
      input.type = 'text';
      input.id = "inputGame";
      input.placeholder = 'Enter your name';
      const submitButton = document.createElement('button');
      submitButton.id = "submitGame";
      submitButton.type = 'submit';
      submitButton.innerText = 'Save';
      const userPoints = document.createElement('p');
      userPoints.innerText = `Your points were: ${count}`;
      if(currentTogle===false){
        actualPoints.innerHTML = `<th>Points: ${count}</th>`;
      }else{
        actualPoints.innerHTML = `<th>Puntos: ${count}</th>`;
      };
      userPoints.style.border = '1px solid white';
      userPoints.style.background = 'transparent';
      userPoints.style.color = 'grey';
      userPoints.style.padding = '5px';
      userPoints.style.marginBottom = '5px';
      userPoints.style.borderRadius = "5px";

      form.appendChild(userPoints);
      form.appendChild(input);
      form.appendChild(submitButton);

      // Colocar el formulario en el centro de la pantalla
      form.style.position = 'absolute';
      form.style.top = '50%';
      form.style.left = '50%';
      form.style.transform = 'translate(-50%, -50%)';

      // Agregar el formulario al cuerpo del documento
      document.body.appendChild(form);

      // Manejar el evento de envío del formulario
      form.addEventListener('submit', (event) => {
        event.preventDefault();

        newGamePos();
        form.remove();
      });

      break;
    };
  };
};

// Función para destruir el triángulo principal
function destroyTriangle() {

  // Clear meteors step by step
  while(circleList.length > 0 && smallSquares.length > 0){
    circleList.pop();
    smallSquares.pop();
  };

  // Current points of the game
  if(currentTogle===false){
    actualPoints.innerHTML = `<th>Points: ${count}</th>`;
  }else{
    actualPoints.innerHTML = `<th>Puntos: ${count}</th>`;
  }
  

  // Destruccion del gato espacial > ex triangulo
  ctx.beginPath();
  ctx.arc(tipX, tipY, 30, 0, 2 * Math.PI);
  ctx.fillStyle = "black";
  ctx.fill();
  // Eliminar el triángulo principal
  squareX = -100;
  squareY = -100;
  detectFunctionActivity = true;
};

// Detectar cuando se presionan las teclas de flecha o WASD
let keysPressed = {}; // variable para guardar las teclas presionadas

document.addEventListener("keydown", function(event) {
  keysPressed[event.code] = true; // agregar la tecla presionada a la variable
});

document.addEventListener("keyup", function(event) {
  delete keysPressed[event.code]; // eliminar la tecla presionada de la variable
});

setInterval(function() {
  const speed = 0.75; // velocidad
  let dx = 0;
  let dy = 0;

  // verificar las teclas presionadas y calcular el movimiento en consecuencia
  if (keysPressed["ArrowUp"] || keysPressed["KeyW"]) {
    dy -= speed;
  };
  if (keysPressed["ArrowRight"] || keysPressed["KeyD"]) {
    dx += speed;
  };
  if (keysPressed["ArrowDown"] || keysPressed["KeyS"]) {
    dy += speed;
  };
  if (keysPressed["ArrowLeft"] || keysPressed["KeyA"]) {
    dx -= speed;
  };

  // si se están presionando dos teclas de dirección, ajustar el movimiento en consecuencia
  if ((keysPressed["ArrowUp"] || keysPressed["KeyW"]) && (keysPressed["ArrowRight"] || keysPressed["KeyD"])) {
    dx *= Math.sqrt(0.5);
    dy *= Math.sqrt(0.5);
  };
  if ((keysPressed["ArrowUp"] || keysPressed["KeyW"]) && (keysPressed["ArrowLeft"] || keysPressed["KeyA"])) {
    dx *= Math.sqrt(0.5);
    dy *= Math.sqrt(0.5);
  };
  if ((keysPressed["ArrowDown"] || keysPressed["KeyS"]) && (keysPressed["ArrowRight"] || keysPressed["KeyD"])) {
    dx *= Math.sqrt(0.5);
    dy *= Math.sqrt(0.5);
  };
  if ((keysPressed["ArrowDown"] || keysPressed["KeyS"]) && (keysPressed["ArrowLeft"] || keysPressed["KeyA"])) {
    dx *= Math.sqrt(0.5);
    dy *= Math.sqrt(0.5);
  };

  // mover el cuadrado según el movimiento calculado
  squareX += dx;
  squareY += dy;
}, 10); // ejecutar la verificación de teclas cada 10 milisegundos

// Mouse
canvas.addEventListener('mousemove', function(event) {
  // Obtener la posición del mouse en el canvas
  // Calcular la posición del mouse en el canvas
  let rect = canvas.getBoundingClientRect();
  mouseX = event.clientX - rect.left;
  mouseY = event.clientY - rect.top;

  // Calcular el ángulo de rotación del triángulo en base a la posición del mouse
  angle = Math.atan2(mouseY - (squareY + 1000), mouseX - (squareX + 240)); // > a donde apunta mira del mouse se mueve la imagen 
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
      };
    }, 10);
  };
});

// Movil device move and shot
// Variables para almacenar las coordenadas del toque anterior
let lastTouchX = null;
let lastTouchY = null;

// Función para manejar el evento touchstart
canvas.addEventListener("touchstart", function(event) {
  event.preventDefault(); // Evitar el comportamiento predeterminado del evento táctil
  let touch = event.touches[0];
  lastTouchX = touch.clientX;
  lastTouchY = touch.clientY;
});

// Función para manejar el evento touchmove
canvas.addEventListener("touchmove", function(event) {
  event.preventDefault(); // Evitar el comportamiento predeterminado del evento táctil
  if (lastTouchX === null || lastTouchY === null) {
    return;
  }
  let touch = event.touches[0];
  let touchX = touch.clientX;
  let touchY = touch.clientY;

  // Calcular la diferencia en las coordenadas del toque anterior y el toque actual
  let dx = touchX - lastTouchX;
  let dy = touchY - lastTouchY;

  // Mover el triángulo principal según la diferencia calculada
  squareX += dx;
  squareY += dy;

  // Actualizar las coordenadas del toque anterior con las del toque actual
  lastTouchX = touchX;
  lastTouchY = touchY;
});

// Función para manejar el evento touchend
canvas.addEventListener("touchend", function(event) {
  event.preventDefault(); // Evitar el comportamiento predeterminado del evento táctil
  lastTouchX = null;
  lastTouchY = null;
});

// Variable para almacenar el último tiempo de toque
let lastTouchTime = 0;

// Función para manejar el evento touchend
canvas.addEventListener("touchend", function(event) {
  event.preventDefault(); // Evitar el comportamiento predeterminado del evento táctil

  // Obtener el tiempo actual
  let currentTime = new Date().getTime();

  // Verificar si ha pasado menos de 300 milisegundos desde el último toque
  if (currentTime - lastTouchTime < 300) {
    lastTouchTime = 0;
  } else {
    // No se realizó un doble toque, actualizar el tiempo de último toque
    lastTouchTime = currentTime;

    // Definir el estilo de relleno del círculo como rojo
    circleX = tipX;
    circleY = tipY;

    //Detectar si la nave fue destruida o no, según true o false, para que pueda seguir disparando o no
    if (detectFunctionActivity == false) {
      shouldDrawCircle = true;

      // Calcular la dirección del toque con respecto al centro del círculo gris
      let touch = event.changedTouches[0];
      let touchX = touch.clientX;
      let touchY = touch.clientY;
      let dx = touchX - tipX;
      let dy = touchY - tipY;
      circleList.push({ x: circleX, y: circleY });
      direction = Math.atan2(dy, dx);
      // Mover gradualmente el círculo en la dirección del toque hasta que llegue al borde del canvas
      let intervalId = setInterval(function() {
        // Calcular las nuevas coordenadas del círculo
        circleX += Math.cos(direction) * 10;
        circleY += Math.sin(direction) * 10;
        // Si el círculo está en el borde del canvas, detener el intervalo
        if (
          circleX < 0 ||
          circleX > canvas.width ||
          circleY < 0 ||
          circleY > canvas.height
        ) {
          clearInterval(intervalId);
        }
      }, 10);
    };
  };
});



/////////////////////////////// Init



// Función para animar el canvas
function animate() {
  // Limpiar el canvas antes de cada animación
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar los cuadrados
  draw();

  // Solicitar la siguiente animación
  animationId = requestAnimationFrame(animate);
};

// Función para dibujar la cuenta regresiva
function drawCountdown(countdown) {
  // Limpiar el canvas antes de dibujar el número
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Establecer las propiedades de estilo para el número
  ctx.font = "bold 100px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Dibujar el número en el centro del canvas
  ctx.fillText(countdown, canvas.width / 2, canvas.height / 2);
};

// Función para iniciar la cuenta regresiva
function startCountdown() {
  let countdown = 3;

  // Dibujar el número inicial antes de esperar un segundo
  drawCountdown(countdown);

  // Esperar un segundo y dibujar el siguiente número
  setTimeout(() => {
    countdown--;
    drawCountdown(countdown);

    // Esperar otro segundo y dibujar el último número
    setTimeout(() => {
      countdown--;
      drawCountdown(countdown);

      // Esperar un segundo más y comenzar la animación
      setTimeout(() => {
        animationId = requestAnimationFrame(animate);
      }, 1000);
    }, 1000);
  }, 1000);
};

// init number of meteors depends on window size
numOfMeteors();

// Agregar cuadrados pequeños aleatorios cada 2 segundos
setInterval(function() {
  // Check triangle exists for create meteors or not
  if(detectFunctionActivity==false){
    createSmallSquare();
  };

  // Check colision con meteorito, para eliminar o no  el "triangulo"
  checkCollision();

}, numberOfMeteors); // Crear mas o menos cuadrados dependiendo el width y height

// Comenzar la animación del canvas
setTimeout(() => {
  startCountdown();
}, 500);

// Test width for implementing device diferences behaviour
//console.log(canvas.width, canvas.height);
canvas.addEventListener('touchmove', function(event) {
  // Obtener la posición del touch en el canvas
  let rect = canvas.getBoundingClientRect();
  let touch = event.touches[0];
  mouseX = touch.clientX - rect.left;
  mouseY = touch.clientY - rect.top;

  // Actualizar la posición del touch en el elemento HTML
  console.log(`Touch Position: ${mouseX}, ${mouseY}`);

  // Calcular el ángulo de rotación del triángulo en base a la posición del touch
  angle = Math.atan2(mouseY - (squareY + 1000), mouseX - (squareX + 240));
});