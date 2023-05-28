window.addEventListener('DOMContentLoaded', function() {
    let expandButton = document.getElementById('expand_button');
    let menuItems = document.querySelector('.text_zone .menu_items');
    let srcMenu = document.querySelector("#expand_button > a > img");
    let menuExpanded = false;

    // Función para mostrar u ocultar el menú
    function toggleMenu() {
        menuItems.classList.toggle('expanded');
        menuExpanded = !menuExpanded;
        if (menuExpanded) {
            srcMenu.src = "https://flyclipart.com/thumb2/red-cross-png-images-transparent-free-download-227373.png";
        } else {
            srcMenu.src = "https://cdn-icons-png.flaticon.com/512/1828/1828724.png";
        }
    }

    // Evento de clic en el botón de expansión
    expandButton.addEventListener('click', function() {
        toggleMenu();
    });

    // Evento de toque en dispositivos móviles para el botón de expansión
    expandButton.addEventListener('touchstart', function() {
        toggleMenu();
    });

    // Evento de redimensionamiento de la ventana para ocultar el menú expandido
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 700) {
            expandButton.style.display = "none";
            menuItems.classList.remove('expanded');
            menuExpanded = false;
            srcMenu.src = "https://cdn-icons-png.flaticon.com/512/1828/1828724.png";
        } else {
            expandButton.style.display = "flex";
        }
    });
});
