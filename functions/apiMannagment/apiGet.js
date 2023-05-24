"use strict";

// GET all game data
fetch('https://sore-erin-goldfish-tutu.cyclic.app/api/game/')
.then(response => response.json())
.then(data => {
    console.log(data);
})
.catch(error => {
    console.log(error);
});

// GET all user names
fetch('https://sore-erin-goldfish-tutu.cyclic.app/api/game/users')
.then(response => response.json())
.then(data => {
    console.log(data);
})
.catch(error => {
    console.log(error);
});

// GET all game points
fetch('https://sore-erin-goldfish-tutu.cyclic.app/api/game/points')
.then(response => response.json())
.then(data => {
    console.log(data);
})
.catch(error => {
    console.log(error);
});

// GET total times the game has been played
fetch('https://sore-erin-goldfish-tutu.cyclic.app/api/game/timesplayed')
.then(response => response.json())
.then(data => {
    console.log(data);
})
.catch(error => {
console.log(error);
});