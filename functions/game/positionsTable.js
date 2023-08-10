"use strict";

const loadingContainer = document.querySelector('.loading');
const table = document.getElementById("game_points");
const currentLen = document.querySelector('.languageButton');
const names = document.querySelector("#game_points > tbody > tr:nth-child(2) > td:nth-child(1)");
const scores = document.querySelector("#game_points > tbody > tr:nth-child(2) > td:nth-child(2)");
loadingContainer.style.display = 'flex';
table.style.display = "none";
let timesPlayed, apiData;
let clicked = false;
const url_game = "https://erwin-porfolio.onrender.com/api/game/";

// GET all game data
async function loadDataApi() {
    timesPlayed = document.querySelector("#game_points > tbody > tr:nth-child(1) > th");

    // token
    const token = localStorage.getItem('accessToken');
    const headers = {
        'Authorization': `Bearer ${token}`
    };

    fetch(url_game, { headers })
    .then(response => response.json())
    .then(data => {

        // Sort points
        data.sort(function(a, b) {
            return b[1] - a[1];
        });
        
        apiData = data;

        // Update the times played value if it exists
        if (timesPlayed) {
            timesPlayed.innerHTML = `Number Times played: <br><br> <strong>${data[0][2]}</strong>`;
        }

        // Clear the existing table rows
        while (table.rows.length > 2) {
            table.deleteRow(2);
        };

        // Show only first 10 items
        const slicedData = data.slice(0, 10);
        slicedData.forEach(function(data) {
            let row = document.createElement("tr");
        
            let nameCell = document.createElement("td");
            nameCell.textContent = data[0].usersName;
            row.appendChild(nameCell);
        
            let scoreCell = document.createElement("td");
            scoreCell.textContent = data[1].gamePoints;
            row.appendChild(scoreCell);
        
            table.appendChild(row);
        });
        

        table.style.display = 'table';
        loadingContainer.style.display = 'none';
    })
    .catch(error => {
        console.log(error);
    });
};  

function lenChange() {
    //console.log(apiData);

    if (clicked === true) {
        timesPlayed.innerHTML = `Number Times played: <br><br> <strong>${apiData[0][2]}</strong>`;
        names.innerHTML = "Names"
        scores.innerHTML = "Scores"

        if(document.querySelector("body > form > p")){
            document.querySelector("body > form > p").innerHTML = `Your points were: ${count}`;
            document.querySelector("#inputGame").placeholder = "Enter your name"
            document.querySelector("#submitGame").innerHTML = "Save";
        };

        clicked = false;
    } else {
        timesPlayed.innerHTML = `Número de veces jugado: <br><br> <strong>${apiData[0][2]}</strong>`;
        names.innerHTML = "Nombres"
        scores.innerHTML = "Puntos"

        if(document.querySelector("body > form > p")){
            document.querySelector("body > form > p").innerHTML = `Tu puntaje fue: ${count}`;
            document.querySelector("#inputGame").placeholder = "Introduzca su nombre"
            document.querySelector("#submitGame").innerHTML = "Guardar";
        };

        clicked = true;
    };
};

currentLen.addEventListener('click', lenChange);
document.addEventListener('DOMContentLoaded', loadDataApi);