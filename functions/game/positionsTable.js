"use strict";

const loadingContainer = document.querySelector('.loading');
const table = document.getElementById("game_points");
loadingContainer.style.display = 'flex';
table.style.display = "none";

// GET all game data
fetch('https://sore-erin-goldfish-tutu.cyclic.app/api/game/')
.then(response => response.json())
.then(data => {
    console.log(data);
    
    let timesPlayed = document.querySelector("#game_points > tbody > tr:nth-child(1) > th")
    timesPlayed.innerHTML = `Number Times played: <br><br> <strong>${data[0][2]}</strong>`

    // Sort points
    data.sort(function(a, b) {
        return b[1] - a[1];
    });

    table.style.display = 'table';
    loadingContainer.style.display = 'none';

    // Show only first 10 items
    const slicedData = data.slice(0, 10);

    slicedData.forEach(function (data) {
        let row = document.createElement("tr");
        
        for (let i = 0; i < data.length - 1; i++) {
            let cell = document.createElement("td");
            cell.textContent = data[i];
            row.appendChild(cell);
        }
        
        table.appendChild(row);
    });
})
.catch(error => {
    console.log(error);
});