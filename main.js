import './src/style/style.css';
import { geoMap } from "./src/leaflet/leaflet.js";

const routes = {
    '#activity': '/Webbee/src/pages/activityPage.html',
    '#map': '/Webbee/src/pages/mapPage.html',
    '#time': '/Webbee/src/pages/timePage.html',
};

// Функция для загрузки контента на основе URL
function loadContent(url) {
    return fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById('app').innerHTML = data;
            if (url === routes['#map']) {
                geoMap();
            }
            if (url === routes['#time']) {
                startTimer();
            }
        })
        .catch(error => console.error('Ошибка загрузки страницы', error));
}

// Обработчик навигации
function handleNavigation(hash) {
    const path = hash || window.location.hash || '#activity';
    const url = routes[path];
    if (url) {
        loadContent(url);
    } else {
        loadContent(routes['#activity']);
    }
    updateActiveTab(path);
}

function updateActiveTab(hash) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.parentElement.classList.remove('bg-bg');
    });
    const activeLink = document.querySelector(`.nav-link[href="${hash}"]`);
    if (activeLink) {
        activeLink.parentElement.classList.add('bg-bg');
    }
}

document.querySelectorAll('.icon-nav').forEach(icon => {
    icon.addEventListener('click', event => {
        event.preventDefault();
        const hash = event.currentTarget.getAttribute('href');
        history.pushState({}, '', hash);
        handleNavigation(hash);
    });
});

// Обработчик событий для навигации
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const hash = event.currentTarget.getAttribute('href');
            history.pushState({}, '', hash); // Изменение URL без перезагрузки страницы
            handleNavigation(hash);
        });
    });

    // Обработка кнопок вперед/назад
    window.addEventListener('popstate', () => handleNavigation(window.location.hash));
    handleNavigation(window.location.hash); // Используем window.location.hash вместо pathname
});

// Функция для обновления таймера
function startTimer() {
    let timerEl = document.getElementById('Timer');
    let startTime = new Date().getTime();

    function updateTimer() {
        let currentTime = new Date().getTime();
        let elapsedTime = currentTime - startTime;

        let hours = String(Math.floor(elapsedTime / (1000 * 60 * 60))).padStart(2, '0');
        let minutes = String(Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
        let seconds = String(Math.floor((elapsedTime % (1000 * 60)) / 1000)).padStart(2, '0');

        if (timerEl) {
            timerEl.innerHTML = `${hours}:${minutes}:${seconds}`;
        }
    }

    setInterval(updateTimer, 1000);

    const reloadButton = document.getElementById('refreshTimer');
    if (reloadButton) {
        reloadButton.addEventListener('click', () => {
            startTime = new Date().getTime();
            updateTimer();
        });
    }
}
