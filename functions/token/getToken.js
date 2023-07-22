"use strict";

async function getAndSaveToken() {
    const url = "https://sore-erin-goldfish-tutu.cyclic.app/";
    const get_token = "api/index";

    try {
        const response = await fetch('' + get_token, {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error('No se pudo obtener el token');
        };

        const data = await response.json();
        const token = data.token;

        if (token) {
            const tokenFromLocalStorage = localStorage.getItem('accessToken');
            if (!tokenFromLocalStorage) {
                localStorage.setItem('accessToken', token);
            };
        };

    }catch (error) {
        console.error('Error al obtener el token:', error.message);
    };
};

getAndSaveToken();  