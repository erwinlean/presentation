"use strict";

const baseUrl = 'https://sore-erin-goldfish-tutu.cyclic.app';
//const baseUrl = 'http://localhost:8080';
const endpoint = '/api/game/';
const methodDel = "deleteUser/";
const usernameToDelete = "";
const methodPost = "add";
const urlDel = baseUrl + endpoint + methodDel + usernameToDelete;
const urlPost = baseUrl + endpoint + methodPost;

let submit = document.querySelector("body > form > button");
let user, newGame;

// Send new points and user to the backend api
class game {
    constructor(usersName, gamePoints, timesPlayed) {
        this.usersName = usersName;
        this.gamePoints = gamePoints;
        this.timesPlayed = timesPlayed;
    };
};

// New game Post
function newGamePos() {
    user = document.querySelector("#inputGame");

    if (user) {
        newGame = new game(user.value, count, 1);
    };

    const token = localStorage.getItem('accessToken');

    if(typeof user.value === 'string' && user.value.length >= 2 && user.value.length < 15){
        fetch(urlPost, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newGame)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);

            // Remove and actualize the new users points
            count = 0;
            loadDataApi();
        })
        .catch(error => {
            console.log(error);
        });
    }else{
        alert("Unable to save that name");
    };
};