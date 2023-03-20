"use strict";

const header_zone = document.getElementById("content");
let windows_href = window.location.href;
const info_test = document.getElementById("test");
const info_test2 =document.getElementById("test2");

const click_dom = () =>{// Change working
    if(window.location.href.includes("footer")){
        console.log("on play zone");
        info_test.style.visibility = "hidden";

        info_test2.style.visibility = "visible";
    }
}

header_zone.onclick = click_dom;
//header_zone.onchange = click_dom;