"use strict";

const doc = document.querySelector("body");
const dom_info = doc.getBoundingClientRect();
let dom_area;
const scales = [1.15,3,2,4,3,2.25, 1.50 ,1.75 ,0.5 ,0.30 ,0.25 ,2.75,3.2,1.3,2.35,2.05,0.2,0.6,0.9,1.9,2.7,4,3.05,];
const colours = ["white","#72076E", "#2B0245" ,"#250096", "#5600f4", "#E923F4"];
const area_of_the_stars = [];
let count = 0;
let stars;

//General Funtions
const sum_total = (array_to_reduce) =>{
    return array_to_reduce.reduce((acc, act_value) => acc + act_value);
};
const area_calc = (width) => {
    let el_radius = width / 2;
    let el_area = Math.PI * Math.pow(el_radius , 2);
    return el_area
};
const percent_of_x = (number_to_look , percent_to) => {
    let multiplied_number = number_to_look * percent_to;
    let divided_multiplied_number = multiplied_number / 100;
    let rounded_percent = Math.round(divided_multiplied_number);
    return rounded_percent;
};

// Stars/black hole se deberia modelar con programacion orientada a objectos y llamar al objecto
function create_star(){
    let repeat = scales.length*Math.PI;

    for (let i = 0; i < repeat; i++) {
        count += 1;

        // Random
        let height = doc.clientHeight - 50;
        let width = doc.clientWidth - 50;
        var x = Math.floor(Math.random() * height);
        var y = Math.floor(Math.random() * width);
        let colour = Math.floor(Math.random() * colours.length);
        let scale = Math.floor(Math.random() * scales.length);

        // Check number of stars in the DOM actually
        let starDivs = document.querySelectorAll('div[id="star"]');
        let numStarDivs = starDivs.length;

        // If the stars are less than 50 it create the star
        if (numStarDivs < 100){
            // Create star
            let star_create = document.createElement("div");   
            star_create.setAttribute("class", "stars");
            star_create.setAttribute("id", "star");
            doc.appendChild(star_create);

            // Styles of the star
            star_create.style.left = `${y}px`;
            star_create.style.top = `${x}px`;
            star_create.style.height = `${scales[scale]}px`;
            star_create.style.width = `${scales[scale]}px`;
            star_create.style.background = colours[colour];

            // Depends the scale of the star the scale of the shadow blur and spread
            if(scales[scale] < 1){
                var blur_radius = 3;
                var spread_radius = 0.7;
            }else if(scales[scale] <= 2){
                var blur_radius = 2;
                var spread_radius = 1;
            }else{
                var blur_radius = 5;
                var spread_radius = 2;
            }
            star_create.style.boxShadow = `0px 0px ${blur_radius}px ${spread_radius}px ${colours[colour]}`;

            // Calculate the area of the stars(DIVs) and the area of the universe(DOM)
            let area = area_calc(scales[scale]);
            area_of_the_stars.push(area);

            dom_area = dom_info.width * dom_info.height;
        }
    };
    
    // If the "stars" area in total equals or is bigger than 10% of the total DOM area, create a black hole, to "DELETE" some of the stars
    //let total_area_stars = sum_total(area_of_the_stars);
    //let dom_specific_percentage = percent_of_x(dom_area, 0.01);

    // Create the black hole
    if(document.querySelectorAll("div").length <= 100){
        let black_hole = document.createElement("div");
        black_hole.setAttribute("class", "black_hole");
        black_hole.setAttribute("id", "hole");
        doc.appendChild(black_hole);
        black_hole.style.left = `${y}px`;
        black_hole.style.top = `${x}px`;
    };

    
};

// Constant movement for stars/black hole
function moves() {
    stars = document.querySelectorAll('#star, #hole');  
    function animate() {
        stars.forEach(star => {
            let actual_left = parseInt(star.style.left);
            let actual_top = parseInt(star.style.top);
            let new_top = actual_top + Math.floor(Math.random() * Math.PI * 1);
            let new_left = actual_left + Math.floor(Math.random() * Math.PI * 1);
            if (new_top % 3 == 0) {
                star.style.top = new_top + "px";
                star.style.left = new_left + "px";
            } else {
                star.style.top = new_top - Math.PI * 0.50 + "px";
                star.style.left = new_left - Math.PI * 0.50 + "px";
            };
        });
        requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
};

// Black hole consum funtions
function black_hole_consume() {
    let hole = document.getElementById("hole");    
    let blackHoleRect = hole.getBoundingClientRect();
    let starDivs = document.querySelectorAll('div[id="star"]');

    starDivs.forEach(star =>{
        let divStar = star.getBoundingClientRect();
        if (blackHoleRect.x === divStar.x && blackHoleRect.y === divStar.y) {
            console.log(star.id + " removed");
            console.log(starDivs.length)
            star.remove();
        };
    });
};
function animate_blackHola (){
    black_hole_consume();
    requestAnimationFrame(animate_blackHola)
}



setTimeout(() => {
    create_star();
    moves();
    animate_blackHola();
}, 800);

doc.onclick = create_star;