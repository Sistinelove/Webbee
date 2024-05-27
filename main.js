import './src/style/style.css';
import { geoMap } from "./src/leaflet/leaflet.js";

const routes = {
    '/Webbee/': 'index.html',
    '/Webbee/map': 'map.html',
    '/Webbee/activity': 'activity.html',
    '/Webbee/time': 'time.html'
};

function loadContent(url) {
    return fetch(url)
        .then(response => response.text())
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

function updateActiveTab(path) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.parentElement.classList.remove('bg-bg');
    });
    document.querySelectorAll('.icon-nav').forEach(icon => {
        icon.classList.remove('bg-bg');
    });
    const activeLink = document.querySelector(`.nav-link[href="${path}"]`);
    if (activeLink) {
        activeLink.parentElement.classList.add('bg-bg');
    }
    const activeIcon = document.querySelector(`.icon-nav[data-path="${path}"]`);
    if (activeIcon) {
        activeIcon.classList.add('bg-bg');
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

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const path = event.currentTarget.getAttribute('href');
            if (path === window.location.pathname) {
                return;
            }
            window.history.pushState({}, '', path);
            handleNavigation(path);
        });
    });

    window.addEventListener('popstate', () => handleNavigation(window.location.pathname));
});

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
