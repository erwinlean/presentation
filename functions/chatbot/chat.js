"use strict";

const socket = io('http://localhost:8080/livechat');
const chatbot = document.getElementById('chatbot');
const chatbotContent = document.getElementById('chatbotContent');
const inputMessage = document.getElementById('inputMessage');
const hello_cat = document.querySelector("body > p");
const cat = document.querySelector("body > img");
const span_min = document.querySelector("#chatbot > div.chatbot-header > span");
const button_chat = document.querySelector("#chatbotContent > button");

function toggleChatbot() {
    chatbotContent.style.display = chatbotContent.style.display === "none" ? "block" : "none";

    if (chatbot.style.display === "none") {
        chatbot.style.display = "block";
        span_min.style.display = "block"
        hello_cat.style.display = "none";
    } else {
        span_min.style.display = "none"
        chatbot.style.display = "none";
        hello_cat.style.display = "block";
    }
};

hello_cat.onclick = toggleChatbot;
cat.onclick = toggleChatbot;
span_min.onclick = toggleChatbot;

button_chat.addEventListener("click", ()=>{
    console.log("sending")

    socket.on('connect', () => {
        console.log('Conexión establecida con el servidor');
    });

    socket.emit('sendMessage', 'Hola desde el frontend');
});