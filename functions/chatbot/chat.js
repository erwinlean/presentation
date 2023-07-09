"use strict";

const socket = io('http://localhost:8080/');
const chatbot = document.getElementById('chatbot');
const chatbotContent = document.getElementById('chatbotContent');
const inputMessage = document.getElementById('inputMessage');
const hello_cat = document.querySelector("body > p");
const cat = document.querySelector("body > img");
const span_min = document.querySelector("#chatbot > div.chatbot-header > span");
const button_chat = document.querySelector("#chatbotContent > div > button");
let msgCount = 0;

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
    };
};

// Socket - chatbot
socket.on('connect', () => {
    //console.log('Conexión establecida con el servidor');
});

function sendMessage() {
    const message = inputMessage.value.trim();

    if (message !== "") {
        if(msgCount < 10){
            
            //console.log("Sending:", message);
            //console.log("message count: " + msgCount);
            msgCount ++;
            socket.emit('chat message', message);

            inputMessage.value = "";

            const sentContainer = document.createElement('div');
            sentContainer.classList.add('received_container');
            chatbotContent.appendChild(sentContainer);

            const userIconElement = document.createElement('img');
            userIconElement.classList.add("chatPerson");
            userIconElement.src = '../assets/chat_person.png';
            userIconElement.alt = 'chat person Icon';
            sentContainer.appendChild(userIconElement);

            const sendMsg = document.createElement('div');
            sendMsg.classList.add('sent');
            sendMsg.textContent = message;
            sentContainer.appendChild(sendMsg);
        }else{
            
            console.log("limite de 10 mensaje a la ia (no implementada aun");
        };;
    };
};

socket.on('chat message', (message) => {
    //console.log('Mensaje recibido:', message);

    const receiverContainer = document.createElement('div');
    receiverContainer.classList.add('received_container');
    chatbotContent.appendChild(receiverContainer);

    const receivedMsg = document.createElement('div');
    receivedMsg.classList.add('received');
    receivedMsg.textContent = message;
    receiverContainer.appendChild(receivedMsg);

    const userIconElement = document.createElement('img');
    userIconElement.classList.add("catbot");
    userIconElement.src = '../assets/chat_catbot.png';
    userIconElement.alt = 'catbot Icon';
    receiverContainer.appendChild(userIconElement)
});

// init chat and connections
// chat
hello_cat.onclick = toggleChatbot;
hello_cat.ontouchstart = toggleChatbot;
cat.onclick = toggleChatbot;
cat.ontouchstart = toggleChatbot;
span_min.onclick = toggleChatbot;
span_min.ontouchstart = toggleChatbot;

// Msges
button_chat.addEventListener("click", sendMessage);
button_chat.addEventListener("touchstart", sendMessage);
inputMessage.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    };
});