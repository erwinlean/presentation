"use strict";

async function getAndSaveToken() {
    const url = 'https://presentation-backend-erwinlean.4.us-1.fl0.io/api/token';
    //const url = 'http://localhost:8080/api/token';

    try {
        let token = localStorage.getItem('accessToken');

        if (token) {
            const expirationDate = localStorage.getItem('tokenExpiration');
            if (expirationDate && Date.now() < parseInt(expirationDate)) {
                return;
            };
        };

        const response = await fetch(url, {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error('No se pudo obtener el token');
        };

        const data = await response.json();
        token = data.token;

        if (token) {
            localStorage.setItem('accessToken', token);

            // Calc token time
            const expirationTime = 2 * 60 * 60 * 1000;
            const expirationDate = Date.now() + expirationTime;
            localStorage.setItem('tokenExpiration', expirationDate);
        } else {
            throw new Error('La respuesta del servidor no contiene un token válido');
        };
    } catch (error) {
        console.error('Error al obtener o guardar el token:', error.message);
    };
};


getAndSaveToken();

// Renoval token
setInterval(getAndSaveToken, 2 * 60 * 60 * 1000);