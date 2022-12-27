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
    
    // If the "stars" area in total equals or is bigger than 10% of the total DOM area, create a black hole, to "DELETE" some of the stars
    let total_area_stars = sum_total(area_of_the_stars);
    let dom_specific_percentage = percent_of_x(dom_area, 0.05);

    // Create the black hole
    if(total_area_stars < dom_specific_percentage){
        let black_hole = document.createElement("div");
        black_hole.setAttribute("class", "black_hole");
        black_hole.setAttribute("id", "hole");
        doc.appendChild(black_hole);
        black_hole.style.left = `${y}px`;
        black_hole.style.top = `${x}px`;
    }

    stars = document.querySelectorAll("div");   
};

// Constant movement for stars/black hole
function moves() {
    setInterval(() => {
        stars.forEach(star =>{
            let actual_left = parseInt(star.style.left);
            let actual_top = parseInt(star.style.top);
            let new_top = actual_top + Math.floor(Math.random() * Math.PI   *1);
            let new_left = actual_left + Math.floor(Math.random() * Math.PI *1);
            if(new_top % 3 == 0){
                star.style.top = new_top +   "px";
                star.style.left = new_left + "px";
            }else{
                star.style.top = new_top - Math.PI*0.5 +"px";
                star.style.left = new_left - Math.PI*0.5 +"px";
            };
        });
    }, 300);
}

// Black hole consum funtions
function black_hole_consume() {
    let hole = document.getElementById("hole");
    let y_position = parseInt(hole.style.left); //width
    let x_position =  parseInt(hole.style.top); //height


    // a completar, si el eje x o y consinsiden con la posicion del egujero negro, el div de la estrella debe ser removido
    stars.forEach(star =>{
        if(star.className == "stars"){
            let star_y_position = parseInt(star.style.left);
            let star_x_position = parseInt(star.style.top);
            if(star_y_position === y_position && star_x_position === x_position){
                console.log(star_y_position,star_x_position)
                console.log(y_position,x_position)
                //console.log(star)
                star.style.visibility = "red";
                console.log(star)
            }
        }
    })
}

// Exe the functions
const check = () =>{
    stars.forEach(star =>{//no esta funcionando correctamente
        console.log(star.className)
        if(star.className == "stars"){
            switch (count) {
                case count < 300:
                    console.log(count);
                    doc.onclick = create_star;
                    break;
                case count >= 300:
                    doc.onclick = console.log("count > 300");
                    break;
            }
        };
    });
};

doc.onclick = check;
setTimeout(() => {
    create_star();
    moves();
}, 1500);
