"use strict";

function loadPage(page) {
  fetch(`./pages/${page}.html`)
    .then(response => response.text())
    .then(html => {
      const app = document.getElementById('app');
      app.innerHTML = html;
      // Load Files
      const scriptTags = app.getElementsByTagName('script');
      for (let i = 0; i < scriptTags.length; i++) {
        const scriptTag = document.createElement('script');
        scriptTag.src = scriptTags[i].src;
        document.body.appendChild(scriptTag);
      }
      const linkTags = app.getElementsByTagName('link');
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
      loadPage('index');
      break;
    case '/contact':
      loadPage('contact');
      break;
    case '/game':
      loadPage('game');
      break;
    default:
      loadPage('index');
      break;
  }
}

window.addEventListener('DOMContentLoaded', handleRoute);
window.addEventListener('popstate', handleRoute);