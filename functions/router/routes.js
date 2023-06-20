"use strict";

// Conjunto para almacenar las URLs de los scripts agregados
const scriptSet = new Set();

function loadPage(page) {
  const path = (page === 'index') ? 'index.html' : `pages/${page}.html`;

  fetch(`../${path}`)
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const newBody = doc.body.innerHTML;

      const app = document.getElementById('app');
      app.innerHTML = newBody;

      // Eliminar los scripts existentes en el app div
      const existingScripts = app.getElementsByTagName('script');
      while (existingScripts.length > 0) {
        existingScripts[0].parentNode.removeChild(existingScripts[0]);
      }

      const scriptTags = doc.getElementsByTagName('script');
      for (let i = 0; i < scriptTags.length; i++) {
        const scriptTag = document.createElement('script');
        scriptTag.src = scriptTags[i].src;
        app.appendChild(scriptTag);
        scriptSet.add(scriptTag.src); // Agregar la URL del script al conjunto
      }

      const linkTags = doc.getElementsByTagName('link');
      for (let i = 0; i < linkTags.length; i++) {
        const linkTag = document.createElement('link');
        linkTag.href = linkTags[i].href;
        linkTag.rel = 'stylesheet';
        document.head.appendChild(linkTag);
      }
    })
    .catch(error => console.error(error));
}

function handleRoute() {
  const path = window.location.pathname;

  switch (path) {
    case '/':
    case '/index':
        loadPage("main");
        break;
    case '/main':
    case '/contact':
    case '/game':
      loadPage(path.slice(1));
      break;
    default:
      loadPage('main');
      break;
  }
}

function navigateTo(path) {
  history.pushState(null, null, path);
  handleRoute();
}

function handleClick(event) {
  event.preventDefault();
  const path = event.target.getAttribute('href');
  navigateTo(path);
}

const links = document.querySelectorAll('a');
links.forEach(link => {
  link.addEventListener('click', handleClick);
});

window.addEventListener('DOMContentLoaded', handleRoute);
window.addEventListener('popstate', handleRoute);