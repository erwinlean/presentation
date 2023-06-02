document.addEventListener('DOMContentLoaded', function() {
  // Función para cargar el contenido HTML de forma dinámica
  function loadHTMLContent(pageName) {
    fetch(`pages/${pageName}.html`)
      .then(response => response.text())
      .then(html => {
        document.getElementById('app').innerHTML = html;
        setupPage(pageName); // Configurar estilos y scripts específicos de la página
      })
      .catch(error => {
        console.error('Error al cargar el contenido HTML:', error);
      });
  }

  // Función para cargar los estilos CSS específicos de la página
  function loadPageStyles(pageName) {
    // Carga los archivos CSS necesarios para la página
    const styles = [
      `./style/${pageName}.css`,
      './style/togle.css',
      './style/canvas.css',
      './style/index.css'
      // Agrega aquí los archivos CSS comunes para todas las páginas
    ];

    // Itera sobre los archivos CSS y crea elementos <link> para cargarlos
    styles.forEach(style => {
      const linkElement = document.createElement('link');
      linkElement.rel = 'stylesheet';
      linkElement.href = style;
      document.head.appendChild(linkElement);
    });
  }

  // Función para cargar los scripts JS específicos de la página
  function loadPageScripts(pageName) {
    // Carga los archivos JS necesarios para la página
    const scripts = [
      `./functions/${pageName}/index.js`,
      './functions/menu/lenguajeTogle.js',
      './functions/menu/header_menu.js'
      // Agrega aquí los archivos JS comunes para todas las páginas
    ];

    // Itera sobre los archivos JS y crea elementos <script> para cargarlos
    scripts.forEach(script => {
      const scriptElement = document.createElement('script');
      scriptElement.src = script;
      document.body.appendChild(scriptElement);
    });
  }

  // Obtener el nombre de la página actual desde la URL o de alguna otra forma
  const currentPage = 'index'; // Ejemplo: obtén el nombre de la página actual desde la URL

  // Cargar el contenido HTML de la página actual
  loadHTMLContent(currentPage);

  // Cargar los estilos y scripts específicos de la página actual
  loadPageStyles(currentPage);
  loadPageScripts(currentPage);
});
