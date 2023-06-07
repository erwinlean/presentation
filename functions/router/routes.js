function loadPage(page) {
  fetch(`./pages/${page}.html`)
    .then(response => response.text())
    .then(html => {
      const app = document.getElementById('app');
      app.innerHTML = html;
    })
    .catch(error => console.error(error));
}

function handleRoute() {
  const path = window.location.pathname;

  switch (path) {
    case './':
      loadPage('index');
      break;
    case './contact':
      loadPage('contact');
      break;
    case './game':
      loadPage('game');
      break;
    default:
      loadPage('index');
      break;
  }
}

window.addEventListener('DOMContentLoaded', handleRoute);
window.addEventListener('popstate', handleRoute);