const localStorageKeyWeather = 'weatherApi';
const weatherAPIKey = '27bb4bc7c58ad4562286aded0cb8e50b';

let forecasts;

function getWeatherData(city) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherAPIKey}`)
        .then(response => response.json())
        .then(data => {
            const weather = {
                city: data.name,
                desc: data.weather[0].description,
                temp: Math.round(data.main.temp),
                image: data.weather[0].icon,
                wind: data.wind.speed,
                pressure: data.main.pressure,
                humidity: data.main.humidity
            };

            const existingCityIndex = forecasts.findIndex(item => item.city === weather.city);

            if (existingCityIndex !== -1) {
                forecasts[existingCityIndex] = weather;
                updateForecast(forecasts[existingCityIndex]);
            } else if (forecasts.length < 10) {
                forecasts.push(weather);
                localStorage.setItem(localStorageKeyWeather, JSON.stringify(forecasts));
                displayForecast(weather);
            } else {
                alert('Osiągnięto maksymalną liczbę miast (10).');
            }
        })
        .catch(err => console.log(err));
}

function updateForecast(weather) {
    const weatherContainer = document.querySelector(`#weather_container [data-city="${weather.city}"]`);
    const tempElement = weatherContainer.querySelector('.temp');
    const windElement = weatherContainer.querySelector('.wind');
    const pressureElement = weatherContainer.querySelector('.pressure');
    const humidityElement = weatherContainer.querySelector('.humidity');

    tempElement.innerHTML = weather.temp + '°C';
    windElement.innerHTML = 'Wind  ' + weather.wind + ' m/s';
    pressureElement.innerHTML = 'Pressure  ' + weather.pressure + ' hPa';
    humidityElement.innerHTML = 'Humidity  ' + weather.humidity + ' %';

    forecasts.forEach(city => {
        if (city.city === weather.city) {
            city.lastUpdate = weather.lastUpdate;
        }
    });

    localStorage.setItem(localStorageKeyWeather, JSON.stringify(forecasts));
}

function displayForecast(weather) {
    const weatherContainer = document.createElement('div');
    const cityElement = document.createElement('h1');
    const imgElement = document.createElement('div');
    const descElement = document.createElement('p');
    const tempElement = document.createElement('p');
    const windElement = document.createElement('p');
    const pressureElement = document.createElement('p');
    const humidityElement = document.createElement('p');

    weatherContainer.classList.add('weather-container');
    cityElement.classList.add('city');
    imgElement.classList.add('weather-img');
    descElement.classList.add('desc');
    tempElement.classList.add('temp');
    windElement.classList.add('wind');
    pressureElement.classList.add('pressure');
    humidityElement.classList.add('humidity');

    weatherContainer.setAttribute('data-city', weather.city);

    imgElement.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.image}@2x.png"/>`;
    cityElement.innerHTML = weather.city;
    descElement.innerHTML = weather.desc;
    tempElement.innerHTML = weather.temp + '°C';
    windElement.innerHTML = 'Wind  ' + weather.wind + ' m/s';
    pressureElement.innerHTML = 'Pressure  ' + weather.pressure + ' hPa';
    humidityElement.innerHTML = 'Humidity  ' + weather.humidity + ' %';

    const deleteIcon = document.createElement('span');
    deleteIcon.innerHTML = '&#10006;';
    deleteIcon.classList.add('delete-icon');
    deleteIcon.addEventListener('click', function () {
        deleteWeather(weatherContainer, weather);
    });

    cityElement.appendChild(deleteIcon);

    weatherContainer.appendChild(cityElement);
    weatherContainer.appendChild(tempElement);
    weatherContainer.appendChild(imgElement);
    weatherContainer.appendChild(descElement);
    weatherContainer.appendChild(windElement);
    weatherContainer.appendChild(pressureElement);
    weatherContainer.appendChild(humidityElement);

    document.getElementById('weather_container').appendChild(weatherContainer);
}

function deleteWeather(htmlTag, weather) {
    htmlTag.remove();
    forecasts = forecasts.filter(item => item.city !== weather.city);
    localStorage.setItem(localStorageKeyWeather, JSON.stringify(forecasts));
}

function handleWeatherFormSubmit() {
    const cityInput = document.getElementById('city_input');
    const city = cityInput.value.trim();

    if (city !== '') {
        getWeatherData(city);
        cityInput.value = '';
    }
}

function getDataFromLocalStorage() {
    forecasts = [];
    const storedData = localStorage.getItem(localStorageKeyWeather);

    if (storedData) {
        forecasts = JSON.parse(storedData);
        forecasts.forEach(weather => {
            displayForecast(weather);
        });
    }
}

function updateWeatherDataOnStartup() {
    forecasts.forEach(city => {
        getWeatherData(city.city);
    });
}

getDataFromLocalStorage();
updateWeatherDataOnStartup();