window.onload = () => {
    fetchCityData("Thiruvananthapuram");
}

const key = "e738f6cc35361d59bb2303170f864324";
const cityNameContainer = document.querySelector("#city-name")
const weatherDetailsContainer = document.querySelector("#weather-details");
const weatherImageContainer = document.querySelector("#weather-image");

function getData(event) {
    event.preventDefault();
    const searchData = document.querySelector("#search-input").value;
    fetchCityData(searchData);
}

async function fetchCityData(city) {
    let latitude;
    let longitude;
    const cityDetails = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=2&appid=${key}`);
    const jasonObjectCity = await cityDetails.json();
    jasonObjectCity.forEach(element => {
        latitude = element.lat;
        longitude = element.lon;
    });
    fetchWeatherDetails(latitude, longitude);
}


async function fetchWeatherDetails(latitude, longitude) {
    const weatherDetails = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&unit=Metric&appid=${key}`)
    const jsonObjectWeather = await weatherDetails.json();
    getWeatherUpdates(jsonObjectWeather);
}

function getWeatherUpdates(weatherData) {
    const {
        name: city,
        main: mainDetails,
        weather: weatherDetails,
        sys: timeDetails,
        wind: windDetails
    } = weatherData;
    displayCity(city);
    displayImage(weatherDetails);
    displayMain(mainDetails);
    displayTime(timeDetails);
    displayWindDetails(windDetails);
}

function displayCity(city) {
    const cityElement = document.createElement('p');
    cityElement.innerText = city;
    cityNameContainer.innerHTML = "";
    cityNameContainer.appendChild(cityElement);
}

function displayMain(main) {
    const humidityElement = document.createElement('p');
    const temparatureElement = document.createElement('p');
    humidityElement.innerText = ` Humidity : ${main.humidity}%`;
    temparatureElement.innerText = ` Temparature : ${main.temp} K`;
    weatherDetailsContainer.innerHTML = "";
    weatherDetailsContainer.appendChild(humidityElement);
    weatherDetailsContainer.appendChild(temparatureElement);
}

function displayWeather(weather) {
    const weatherDiscriptionElement = document.createElement('span');
    weatherDiscriptionElement.innerText = weather[0].description;
    weatherImageContainer.appendChild(weatherDiscriptionElement);
}

async function displayImage(weather) {
    const iconId = weather[0].icon;
    const image = await fetch(`https://openweathermap.org/img/wn/${iconId}@2x.png`);
    const imageBlob = await image.blob();
    const imageUrl = URL.createObjectURL(imageBlob);
    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    weatherImageContainer.innerHTML = "";
    weatherImageContainer.appendChild(imageElement);
    displayWeather(weather);
}

function displayTime(timeDetails) {
    const timeStampSunRise = timeDetails.sunrise;
    const timeStampSunSet = timeDetails.sunset;
   const sunRise = getDataFromTimeStamp(timeStampSunRise);
   const sunSet = getDataFromTimeStamp(timeStampSunSet);
    const sunRiseElement = document.createElement('p');
    const sunSetElement = document.createElement('p');
    sunRiseElement.innerText = ""
    sunSetElement.innerText = ""
    sunRiseElement.innerText = `Sun rise : ${sunRise} AM `;
    sunSetElement.innerText = `Sun set : ${sunSet} PM `;
    weatherDetailsContainer.appendChild(sunRiseElement);
    weatherDetailsContainer.appendChild(sunSetElement);
}

function getDataFromTimeStamp(timeStamp) {
    const timeDetail = new Date(timeStamp * 1000);
    const hour = timeDetail.getHours();
    const minut = timeDetail.getMinutes();
    const second = timeDetail.getSeconds();
    return `${hour}.${minut}.${second}`;
}

