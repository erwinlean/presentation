"use strict";

const socket = io('http://localhost:3000');
const chatbot = document.getElementById('chatbot');
const chatbotContent = document.getElementById('chatbotContent');
const inputMessage = document.getElementById('inputMessage');
const hello_cat = document.querySelector("body > p");
const cat = document.querySelector("body > img");

function sendMessage() {
    const message = inputMessage.value;
    socket.emit('sendMessage', message);
    inputMessage.value = '';
};

socket.on('message', (message) => {
    const chatbotMessage = document.createElement('div');
    chatbotMessage.classList.add('chatbot-message');
    chatbotMessage.textContent = message;
    chatbotContent.insertBefore(chatbotMessage, inputMessage);
});

function toggleChatbot() {
    chatbotContent.style.display = chatbotContent.style.display === "none" ? "block" : "none";


    if (chatbot.style.display === "none") {
        chatbot.style.display = "block";
        hello_cat.style.display = "none";
    } else {
        chatbot.style.display = "none";
        hello_cat.style.display = "block";
    }
};

hello_cat.onclick =toggleChatbot;
cat.onclick =toggleChatbot;