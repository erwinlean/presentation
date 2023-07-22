"use strict";

const submit = document.getElementById("sendBtn");
const url_api = "https://sore-erin-goldfish-tutu.cyclic.app/api/mailer";

function formPost(event) {

    event.preventDefault();

    // values
    let form = document.getElementById("contactForm");
    let email = form.email.value;
    let nombre = form.nombre.value;
    let mensaje = form.mensaje.value;  

    let formData = { email, nombre, mensaje };

    console.log(JSON.stringify(formData));

    // Realiza la solicitud POST a la URL de la API
    fetch(url_api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(function(response) {
        if (response.ok) {
            alert("¡Formulario enviado!");
            form.reset();
        } else {
            alert("Error al enviar el formulario.");
        }
    })
    .catch(function(error) {
        alert("Error en la solicitud: " + error.message);
    });
};

submit.addEventListener("click", formPost);