"use strict";

const socket = io('https://presentation-backend-erwinlean.4.us-1.fl0.io/');
//const socket = io('http://localhost:8080');
const chatbot = document.getElementById('chatbot');
const chatbotContent = document.getElementById('chatbotContent');
const inputMessage = document.getElementById('inputMessage');
const hello_cat = document.querySelector("body > p");
const cat = document.querySelector("body > img")
const span_min = document.querySelector("#chatbot > div.chatbot-header > span");
const button_chat = document.querySelector("#chatbotContent > div > button");
let msgCount = 0;

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

function toggleChatbot(event) {
    event.preventDefault();

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
    const message = inputMessage.value;

    if (message !== "") {
        if(msgCount < 5){
            
            //console.log("Sending:", message);
            //console.log("message count: " + msgCount);
            msgCount ++;
            localStorage.setItem('msgCount', msgCount);
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

            // Loading inc msg from backend
            const loadingChat = document.createElement('img');
            loadingChat.id = "loading_chat";
            loadingChat.src = "./assets/loadingPoint.gif";
            loadingChat.style.display = "flex";
            chatbotContent.appendChild(loadingChat);
        }else{

            let allMsgSent = document.querySelectorAll(".sent");
            let allMsgReceived = document.querySelectorAll(".received");
            
            //console.log(allMsgSent, allMsgReceived);
        
            // Guardar los mensajes enviados y recibidos en un arreglo
            let messages;

            allMsgSent.forEach((msg) => {
                messages = messages + msg.textContent;
            });
            allMsgReceived.forEach((msg) => {
                messages = messages + msg.textContent;
            });
        
            // Realizar el POST al backend
            const url = "https://presentation-backend-erwinlean.4.us-1.fl0.io/api/chat";
            //const url = "http://localhost:8080/api/chat";
            const data = { message: messages };

            const token = localStorage.getItem('accessToken');

            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })
            .then(res => {
                if (res.ok) {
                    //console.log("Mensajes enviados al backend.");
                } else {
                    //console.log("Error al enviar los mensajes al backend.");
                };
            })
            .catch(err => {
                //console.log("Error en la solicitud POST:", err);
                //console.log(err);
            });

            createCustomAlert(`Limit reach, contact for more information.`, function() {
            });
        };;
    };
};

socket.on('chat message', (message) => {
    //console.log('Mensaje recibido:', message);

    let removeLoading = document.getElementById("loading_chat");
    removeLoading.remove();

    const chatData = JSON.parse(localStorage.getItem('chatData')) || [];
    chatData.push({ message, response: message });
    localStorage.setItem('chatData', JSON.stringify(chatData));
    //console.log(chatData);

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

// Msges
button_chat.addEventListener("click", sendMessage);
button_chat.addEventListener("touchstart", sendMessage);
inputMessage.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    };
});

// Show chat if exist from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const chatData = JSON.parse(localStorage.getItem('chatData'));
    if (chatData) {
        chatData.forEach((data) => {
            const { message, response } = data;

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

            const receiverContainer = document.createElement('div');
            receiverContainer.classList.add('received_container');
            chatbotContent.appendChild(receiverContainer);

            const receivedMsg = document.createElement('div');
            receivedMsg.classList.add('received');
            receivedMsg.textContent = response;
            receiverContainer.appendChild(receivedMsg);

            const catIconElement = document.createElement('img');
            catIconElement.classList.add("catbot");
            catIconElement.src = '../assets/chat_catbot.png';
            catIconElement.alt = 'catbot Icon';
            receiverContainer.appendChild(catIconElement);
        });
    }
});


msgCount = parseInt(localStorage.getItem('msgCount')) || 0;
// Init
hello_cat.onclick = toggleChatbot;
hello_cat.ontouchstart = toggleChatbot;
cat.onclick = toggleChatbot;
cat.ontouchstart = toggleChatbot;
span_min.onclick = toggleChatbot;
span_min.ontouchstart = toggleChatbot;