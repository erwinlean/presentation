"use strict";

const header_zone = document.getElementById("content");
let windows_href = window.location.href;
const perfil_name = document.getElementById("perfil_name");
const play_zone =document.getElementById("play_title");

const click_dom = () =>{
    if(window.location.href.includes("play")){
        perfil_name.style.visibility = "hidden";

        play_zone.style.visibility = "visible";
    }else{
        perfil_name.style.visibility = "visible";

        play_zone.style.visibility = "hidden";
    }
}

header_zone.onclick = click_dom;