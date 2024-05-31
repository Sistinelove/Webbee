import './src/style/style.css';
import {geoMap} from './src/leaflet/leaflet.js';

let startTime;
let timerInterval;

const routes = {
    '/Webbee/': '/Webbee/index.html',
    '/Webbee/map': '/Webbee/map.html',
    '/Webbee/activity': '/Webbee/activity.html',
    '/Webbee/time': '/Webbee/time.html'
};

function loadContent(url) {
    return fetch(url)
        .then(response => response.text()) // Преобразуем ответ в текст
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const mainContent = doc.querySelector('main').innerHTML;
            document.querySelector('main').innerHTML = mainContent;

            if (url.endsWith('map.html')) {
                geoMap();
            }
            if (url.endsWith('time.html')) {
                startTimer();
                setupRefreshButton()
            }
        })
        .catch(error => console.error('Error loading page', error));
}

function handleNavigation(path) {
    const url = routes[path];
    if (url) {
        loadContent(url);
    } else {
        loadContent(routes['/Webbee/']);
    }
    updateActiveTab(path);
}

// Обновление bg активной вкладки навигации
function updateActiveTab(path) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('bg-bg');
    });
    const activeItem = document.querySelector(`.nav-link[href="${path}"]`).parentElement;
    if (activeItem) {
        activeItem.classList.add('bg-bg');
    }
}

document.querySelectorAll('.icon-nav').forEach(icon => {
    icon.addEventListener('click', event => {
        event.preventDefault();
        const path = event.currentTarget.getAttribute('data-path');
        window.history.pushState({}, '', path);
        handleNavigation(path);
    });
});

// Обработчик события для загрузки DOM контента
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const path = event.currentTarget.getAttribute('href');
            if (path === window.location.pathname) {
                return;
            }
            window.history.pushState({}, '', path); // Обновление URl без перезагрузки
            handleNavigation(path);
        });
    });

    window.addEventListener('popstate', () => handleNavigation(window.location.pathname));
    handleNavigation(window.location.pathname);

});

function startTimer(reset = false) {
    if (reset) {
        startTime = new Date().getTime();
        localStorage.getItem('startTime');
    } else {
        startTime = localStorage.getItem('startTime') || new Date().getTime();
        localStorage.setItem('startTime', startTime);
    }

    function updateTimer() {
        const timerEl = document.getElementById('Timer');
        if (!timerEl) return;

        let currentTime = new Date().getTime();
        let elapsedTime = currentTime - startTime;

        let hours = String(Math.floor(elapsedTime / (1000 * 60 * 60))).padStart(2, '0');
        let minutes = String(Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
        let seconds = String(Math.floor((elapsedTime % (1000 * 60)) / 1000)).padStart(2, '0');

        timerEl.innerHTML = `${hours}:${minutes}:${seconds}`;
    }

    clearInterval(timerInterval);
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
}

function setupRefreshButton() {
    const reloadButton = document.getElementById('refreshTimer');
    if (reloadButton) {
        reloadButton.addEventListener('click', () => {
            localStorage.removeItem('startTime');
            startTimer(true);
        });
    }
}
window.addEventListener('load', () => {
    startTimer();
});