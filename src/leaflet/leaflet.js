let map; //создаем переменную map
function geoMap() {
    const mapElement = document.getElementById('Geo');
    const preloader = document.getElementById('preloaderMap');

    //функция настройки карты
    function setupMap(lat, lng, accuracy) {
        if (map) {
            map.remove(); // В случае если карты уже была создана, удаляем ее
        }

        map = L.map('Geo').setView([lat, lng], 13);

        //Добавлем слой самой карты
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 20,
            attribution: 'MapLocation'
        }).addTo(map);

        // Создаем маркер и круг на карту
        let marker = L.marker([lat, lng]).addTo(map);
        let circle = L.circle([lat, lng], { radius: accuracy }).addTo(map);

        // Отслеживание изменений геопозиции и обновляем маркер круга на карте
        navigator.geolocation.watchPosition(
            pos => {
                const newLat = pos.coords.latitude;
                const newLng = pos.coords.longitude;
                const newAccuracy = pos.coords.accuracy;

                marker.setLatLng([newLat, newLng]); //Устанавливаем маркер
                circle.setLatLng([newLat, newLng]).setRadius(newAccuracy);//устанавливаем круг
                map.setView([newLat, newLng]);//устанавливаем центр карты
            },
            err => {
                console.error("Не удалось получить локацию", err);
            }
        );
        // Отображение карты и скрытие прелоадера
        preloader.style.display = 'none';
        mapElement.style.display = 'block';
    }
    //Получение текущего местоположения пользователя и настройка карты
    navigator.geolocation.getCurrentPosition(
        pos => {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;
            const accuracy = pos.coords.accuracy;
            //Так как у меня не получалось реализовать прелооадер после загрузки карты, мной было решено сделать заглушку в виде 3 секунд перед отображением карты
            setTimeout(() => {
                setupMap(lat, lng, accuracy);
            }, 3000);
        },
        err => {
            console.error("Не получилось получить текущее местоположение", err);
            alert("Не получилось получить текущее местоположение");
        }
    );
}

export { geoMap };
