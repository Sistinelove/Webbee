let map; //создаем переменную map
function geoMap() {
    const mapElement = document.getElementById('Geo');
    const preloader = document.getElementById('preloaderMap');

    //функция настройки карты
    function setupMap() {
        if (map) {
            map.remove(); // В случае если карты уже была создана, удаляем ее
        }

        map = L.map('Geo').setView([56.839657, 60.616422], 10);

        //Добавлем слой самой карты
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 20,
            attribution: 'MapLocation'
        }).addTo(map);

        // Создаем маркер и круг на карту
        L.marker([56.84067, 60.650413]).addTo(map).bindPopup('ИРИТ-РТФ').openPopup();
        L.circle([56.890342, 60.635052]).addTo(map).bindPopup('Школа №107').openPopup();

        // Отслеживание изменений геопозиции и обновляем маркер круга на карте
        // Отображение карты и скрытие прелоадера
        preloader.style.display = 'none';
        mapElement.style.display = 'block';
    }

    // Так как у меня не получалось реализовать прелоадер после загрузки карты, мной было решено сделать заглушку в виде 3 секунд перед отображением карты
    setTimeout(() => {
        setupMap();
    }, 3000);
}

export {geoMap};
