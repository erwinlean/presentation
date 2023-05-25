"use strict";

const submit = document.getElementById("sendBtn");

function formPost(event) {

    event.preventDefault();

    // values
    let form = document.getElementById("contactForm");
    let formData = new FormData(form); 

    formData.forEach(function(value, key) {
        console.log(key, value);
    });

    // Realiza la solicitud POST a la URL de la API
    //fetch("url_api", {
    //    method: "POST",
    //    body: formData
    //})
    //.then(function(response) {
    //    if (response.ok) {
    //        alert("¡Formulario enviado!");
    //        form.reset();
    //    } else {
    //        alert("Error al enviar el formulario.");
    //    }
    //})
    //.catch(function(error) {
    //    alert("Error en la solicitud: " + error.message);
    //});
};

submit.onclick = formPost;