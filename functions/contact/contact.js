"use strict";

const submit = document.getElementById("sendBtn");

const url = "https://erwin-porfolio.onrender.com/api/mailer";
//const url = 'http://localhost:8080/api/mailer';

function createCustomAlert(message, onAccept) {
    const alertContainer = document.createElement("div");
    alertContainer.classList.add("alert-container");

    const alertBox = document.createElement("div");
    alertBox.classList.add("alert-box");
    alertBox.textContent = message;

    const acceptButton = document.createElement("button");
    acceptButton.textContent = "Aceptar";
    acceptButton.addEventListener("click", function() {
        document.body.removeChild(alertContainer);
        onAccept();
    });

    alertBox.appendChild(acceptButton);
    alertContainer.appendChild(alertBox);
    document.body.appendChild(alertContainer);
};

function formPost(event) {

    event.preventDefault();

    const token = localStorage.getItem('accessToken');

    // values
    let form = document.getElementById("contactForm");
    let email = form.email.value;
    let nombre = form.nombre.value;
    let mensaje = form.mensaje.value;  

    let formData = { email, nombre, mensaje };

    //console.log(JSON.stringify(formData));

    // Realiza la solicitud POST a la URL de la API
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
    })
    .then(function(response) {
        if (response.ok) {
            createCustomAlert("¡Formulario enviado!", function() {
                form.reset();
            });
        } else {
            createCustomAlert("Error al enviar el formulario.", function() {
            });
        };
    })
    .catch(function(error) {
        createCustomAlert("Error en la solicitud: " + error.message)
    });
};

submit.addEventListener("click", formPost);