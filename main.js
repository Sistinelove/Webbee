import './src/style/style.css';
import { geoMap } from "./src/leaflet/leaflet.js";

const routes = {
    '/activity': 'activity.html',
    '/map': 'map.html',
    '/time': 'time.html',
};

function loadContent(url) {
    return fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById('app').innerHTML = data;
            if (url === routes['/map']) {
                geoMap();
            }
            if (url === routes['/time']) {
                startTimer();
            }
        })
        .catch(error => console.error('Ошибка загрузки страницы', error));
}

function handleNavigation(hash) {
    const path = hash ? hash.replace('#', '') : '/activity';
    const url = routes[path];
    if (url) {
        loadContent(url);
    } else {
        loadContent(routes['/activity']);
    }
    updateActiveTab(hash);
}

function updateActiveTab(hash) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('bg-black');
    });
    document.querySelectorAll('.icon-nav').forEach(icon => {
        icon.classList.remove('bg-black');
    });
    const activeLink = document.querySelector(`.nav-link[href="${hash}"]`);
    if (activeLink) {
        activeLink.classList.add('bg-black');
    }
    const activeIcon = document.querySelector(`.icon-nav[data-path="${hash}"]`);
    if (activeIcon) {
        activeIcon.classList.add('bg-black');
    }
}
document.querySelectorAll('.icon-nav').forEach(icon => {
    icon.addEventListener('click', event => {
        event.preventDefault();
        const hash = event.currentTarget.getAttribute('data-path');
        window.location.hash = hash;
        handleNavigation(hash);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const hash = event.currentTarget.getAttribute('href');
            if(hash === window.location.hash){
                return;
            }
            window.location.hash = hash;
            handleNavigation(hash);
        });
    });

    window.addEventListener('popstate', () => handleNavigation(window.location.hash));
    handleNavigation(window.location.hash);
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
