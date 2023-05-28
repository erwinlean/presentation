"use strict";

const loadingContainer = document.querySelector('.loading');
const table = document.getElementById("game_points");
loadingContainer.style.display = 'flex';
table.style.display = "none";
let apiData, timesPlayed;

// GET all game data
function loadDataApi() {
    const timesPlayed = document.querySelector("#game_points > tbody > tr:nth-child(1) > th");

    fetch('https://sore-erin-goldfish-tutu.cyclic.app/api/game/')
    .then(response => response.json())
    .then(data => {
        // Sort points
        data.sort(function(a, b) {
            return b[1] - a[1];
        });

        // Update the times played value if it exists
        if (timesPlayed) {
            timesPlayed.innerHTML = `Number Times played: <br><br> <strong>${data[0][2]}</strong>`;
        };

        // Clear the existing table rows
        while (table.rows.length > 2) {
            table.deleteRow(2);
        };

        // Show only first 10 items
        const slicedData = data.slice(0, 10);

        slicedData.forEach(function(data) {
            let row = document.createElement("tr");

            for (let i = 0; i < data.length - 1; i++) {
                let cell = document.createElement("td");
                cell.textContent = data[i];
                row.appendChild(cell);
            };

            table.appendChild(row);
        });

        table.style.display = 'table';
        loadingContainer.style.display = 'none';
    })
    .catch(error => {
        console.log(error);
    });
};  

document.addEventListener('DOMContentLoaded', loadDataApi);