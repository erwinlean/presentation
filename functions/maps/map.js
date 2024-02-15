// use strict kills the animation idk why of google api

let map;
let scale;
let loaderMarker;
let modal = document.getElementById("mapModal");
let modalImage = document.getElementById("mapImg");
let closeBtn = document.querySelector(".map-modal > span");

// Map styles
const darkMapStyles = [
    {
        elementType: "geometry",
        stylers: [
            { color: "#000000" }
        ]
    },
    {
        elementType: "labels.text.stroke",
        stylers: [
            { color: "000000" }
        ]
    },
    {
        elementType: "labels.text.fill",
        stylers: [
            { color: "#FFFFFF" }
        ]
    },
    {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [
            { color: "#CCCCCC" }
        ]
    },
    {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
            { color: "#d59563" }
        ]
    },
    {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
            { color: "#263c3f" }
        ]
    },
    {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [
            { color: "#6b9a76" }
        ]
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [
            { color: "#555555" }
        ]
    },
    {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [
            { color: "#555555" }
        ]
    },
    {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [
            { color: "#555555" }
        ]
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
            { color: "#555555" }
        ]
    },
    {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
            { color: "#555555" }
        ]
    },
    {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [
            { color: "#555555" }
        ]
    },
    {
        featureType: "transit",
        elementType: "geometry",
        stylers: [
            { color: "#555555" }
        ]
    },
    {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [
            { color: "#555555" }
        ]
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [
            { color: "#17263c" }
        ]
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
            { color: "#515c6d" }
        ]
    },
    {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [
            { color: "#17263c" }
        ]
    }
];
//https://www.google.com/maps/place/52100+Arezzo/@43.425505,11.8668486,12z/data=!3m1!4b1!4m6!3m5!1s0x132bed72f3fda815:0xf846f1b18734dc08!8m2!3d43.4632839!4d11.8796336!16zL20vMHBiamc?entry=ttu
/* Map */
function iniciarMap() {
    var coord = { lat: 43.425505, lng: 11.8668486 };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: coord,
        styles: darkMapStyles,
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: false,
        fullscreenControl: false
    });

    loaderMarker = new google.maps.Marker({
        position: coord,
        map: map,
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: 'white',
            fillOpacity: 0.3,
            strokeWeight: 0, 
        },
    });

    const isTouchDevice = 'ontouchstart' in document.documentElement;

    if (!isTouchDevice) {
        google.maps.event.addListener(loaderMarker, 'mouseover', function () {
            animateLoader();
        });

        google.maps.event.addListener(loaderMarker, 'mouseout', function () {
            stopLoaderAnimation();
        });
    };

    if (isTouchDevice) {
        google.maps.event.addListener(loaderMarker, 'touchstart', function () {
            console.log("Touchstart event");
            animateLoader();
        });

        google.maps.event.addListener(loaderMarker, 'touchend', function () {
            console.log("Touchend event");
            stopLoaderAnimation();
        });
    };
};

// Loader circle on map animation
function animateLoader() {
    scale = 10;
    const maxScale = 20;
    const animationDuration = 2500;

    loaderInterval = setInterval(function () {
        scale += 1;
        loaderMarker.setIcon({
            path: google.maps.SymbolPath.CIRCLE,
            scale: scale,
            fillColor: 'white',
            fillOpacity: 0.7,
            strokeWeight: 0,
        });

        if (scale === maxScale) {
            loaderMarker.setIcon({
                path: google.maps.SymbolPath.CIRCLE,
                scale: scale,
                fillColor: 'white',
                fillOpacity: 0.8,
                strokeWeight: 0,
            });
        };
        if (scale >= maxScale) {
            clearInterval(loaderInterval);
        };

        circleClick();

    }, animationDuration / (maxScale + 10));
};

// Stop marker animation
function stopLoaderAnimation() {
    clearInterval(loaderInterval);
    scale = loaderMarker.getIcon().scale;
    const originalScale = 10;
    const animationDuration = 850;

    const scaleStep = (originalScale - scale) / (animationDuration / 100);
    const restoreInterval = setInterval(function () {
        scale += scaleStep;
        loaderMarker.setIcon({
            path: google.maps.SymbolPath.CIRCLE,
            scale: scale,
            fillColor: 'white',
            fillOpacity: 0.7,
            strokeWeight: 0,
        });

        if (scale <= originalScale) {
            scale=10;
            clearInterval(restoreInterval);
        };
    }, 100);
};

/* Click circle map 4 modal */
function circleClick() {
    if (scale >= 20) {
        const isTouchDevice = 'ontouchstart' in document.documentElement;

        if (!isTouchDevice) {
            google.maps.event.addListener(loaderMarker, 'click', function () {
                modal.style.display = "block";
                modal.style.zIndex = "350";
            });
            closeBtn.onclick = function() {
                modal.style.display = "none";
            };

            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                };
            };
        };

        if (isTouchDevice) {
            google.maps.event.addListener(loaderMarker, 'touchstart', function () {
                console.log("Touch event");
            });
        };
    };
};

// Init
iniciarMap();