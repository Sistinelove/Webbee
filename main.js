import './src/style/style.css';
import {geoMap} from "./src/leaflet/leaflet.js";

const routes = {
    '/activity': '/Webbee/src/pages/activityPage.html',
    '/map': '/Webbee/src/pages/mapPage.html',
    '/time': '/Webbee/src/pages/timePage.html',
};

//Загрузка html файла по URL
function loadContent(url) {
    return fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById('app').innerHTML = data;
            if (url === routes['/map']) {
                geoMap();
            }
        })
        .catch(error => console.error('Произошла ошибка загрузки страницы', error));
}
// Обработчик навигации по вкладкам
function handleNavigation(pathname) {
    const path = pathname || window.location.pathname || '/activity';
    const url = routes[path];
    if (url) {
        loadContent(url);
    } else {
        loadContent(routes['/activity']);
    }
    updateActiveTab(path);
}
//Событие для инициализации навигации при загрузке определенной страницы
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const path = event.target.getAttribute('href'); //Получение пути из атрибура
            history.pushState({}, '', path); // Меняем URL Без перезагрузки страницы
            handleNavigation();
        });
    });
    // Обработка кнопок в браузере вперед/назад
    window.addEventListener('popstate', handleNavigation);
    handleNavigation();
});

if (!sessionStorage.getItem('userActivityStartTime')) {
    let startTime = new Date().getTime();
    console.log(startTime);
    sessionStorage.setItem('userActivityStartTime', startTime.toString());
}

function updateTimer() {
    let startTime = parseInt(sessionStorage.getItem('userActivityStartTime'));

    let currentTime = new Date().getTime();

    let elapsedTime = currentTime - startTime;

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

    let timerElement = document.getElementById("Timer");
    if (timerElement) {
        timerElement.innerHTML = `${hours}:${minutes}:${seconds}`;
    }
}

setInterval(updateTimer, 1000);

updateTimer();
