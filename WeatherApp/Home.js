window.onload = () => {
  fetchWeatherDetails("Thiruvananthapuram");
  fetchhourlyDetails("Thiruvananthapuram");
};

const key = "e738f6cc35361d59bb2303170f864324";
const cityNameContainer = document.querySelector("#city-name");
const highlightDetails = document.querySelector("#highlight-details");
console.log(highlightDetails);
const weatherDetailsContainer = document.querySelector("#weather-details");
const weatherImageContainer = document.querySelector("#weather-image");
const dailyWeatherContainer = document.querySelector("#daily-weather");

function getData(event) {
  event.preventDefault();
  const searchData = document.querySelector("#search-input").value;
  fetchWeatherDetails(searchData);
  fetchhourlyDetails(searchData);
}

async function fetchWeatherDetails(city) {
  const weatherDetails = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`
  );
  const jsonObjectWeather = await weatherDetails.json();
  console.log(jsonObjectWeather);
  getWeatherUpdates(jsonObjectWeather);
}

function getWeatherUpdates(weatherData) {
  const {
    name: city,
    main: dailyWetherDetails,
    weather: weatherDetails,
    sys: timeDetails,
    wind: windDetails,
  } = weatherData;
  displayCity(city);
  displayImage(weatherDetails);
  displayMain(dailyWetherDetails);
  displayTime(timeDetails);
  displayWindDetails(windDetails);
}

function getHourlyUpdate(hourlyWeatherData) {
  const { city, list: dailyWetherDetails } = hourlyWeatherData;
  console.log(dailyWetherDetails[1].main);
  console.log(dailyWetherDetails);
  displaydailyUpdates(dailyWetherDetails);
}

function displayCity(city) {
  const cityElement = document.createElement("p");
  cityElement.innerText = city;
  cityNameContainer.innerHTML = "";
  cityNameContainer.appendChild(cityElement);
}

function displayMain(main) {
  const humidityElement = document.createElement("p");
  const temparatureElement = document.createElement("p");
  humidityElement.innerText = ` Humidity : ${main.humidity}%`;
  temparatureElement.innerText = `  ${main.temp}`;
  weatherDetailsContainer.innerHTML = "";
  highlightDetails.appendChild(temparatureElement);
  highlightDetails.appendChild(humidityElement);
}

function displayWeather(weather) {
  const weatherDiscriptionElement = document.createElement("span");
  weatherDiscriptionElement.innerText = weather[0].description;
  weatherImageContainer.appendChild(weatherDiscriptionElement);
}

async function getIconUrl(iconId) {
  const image = await fetch(
    `https://openweathermap.org/img/wn/${iconId}@2x.png`
  );
  const imageBlob = await image.blob();
  return URL.createObjectURL(imageBlob);
}

async function displayImage(weather) {
  const iconId = weather[0].icon;
  const imageUrl = await getIconUrl(iconId);
  const imageElement = document.createElement("img");
  imageElement.src = imageUrl;
  weatherImageContainer.innerHTML = "";
  weatherImageContainer.appendChild(imageElement);
  displayWeather(weather);
}

function displayTime(timeDetails) {
  const timeStampSunRise = timeDetails.sunrise;
  const timeStampSunSet = timeDetails.sunset;
  const sunRise = getTimeFromTimeStamp(timeStampSunRise);
  const sunSet = getTimeFromTimeStamp(timeStampSunSet);
  const sunRiseElement = document.createElement("p");
  const sunSetElement = document.createElement("p");
  sunRiseElement.innerText = "";
  sunSetElement.innerText = "";
  sunRiseElement.innerText = `Sun rise : ${sunRise} AM `;
  sunSetElement.innerText = `Sun set : ${sunSet} PM `;
  weatherDetailsContainer.appendChild(sunRiseElement);
  weatherDetailsContainer.appendChild(sunSetElement);
}

function getTimeFromTimeStamp(timeStamp) {
  const timeDetail = new Date(timeStamp * 1000);
  const hour = timeDetail.getHours();
  const minut = timeDetail.getMinutes();
  const second = timeDetail.getSeconds();
  return `${hour}.${minut}.${second}`;
}

function getDateFromTimeStamp(timeStamp) {
  const timeDetail = new Date(timeStamp * 1000);
  const readableDate = timeDetail.toLocaleDateString();
  return readableDate;
}

function displayWindDetails(windDetails) {
  const windSpeed = windDetails.speed;
  const windElement = document.createElement("p");
  windElement.innerText = ` Wind speed : ${windSpeed} m/s`;
  weatherDetailsContainer.appendChild(windElement);
}

async function fetchhourlyDetails(city) {
  const hourlyDetails = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${key}`
  );
  const hourlyDetailsJson = await hourlyDetails.json();
  console.log(hourlyDetailsJson);
  getHourlyUpdate(hourlyDetailsJson);
}

async function displaydailyUpdates(dailyWetherDetails) {
  dailyWeatherContainer.innerHTML = "";
  for (let i = 0; i < 39; i += 8) {
    const divContainerElement = document.createElement("div");
    divContainerElement.className = "weather-detail-wrap";
    const humidity = document.createElement("p");
    const description = document.createElement("p");
    const temparature = document.createElement("p");
    const weatherImage = document.createElement("img");
    const dateElement = document.createElement("p");
    const iconId = dailyWetherDetails[i].weather[0].icon;
    iconUrl = await getIconUrl(iconId);
    weatherImage.src = iconUrl;
    humidity.innerText = dailyWetherDetails[i].main.humidity;
    description.innerText = dailyWetherDetails[i].weather[0].description;
    temparature.innerText = dailyWetherDetails[i].main.temp;
    const timeStamp = dailyWetherDetails[i].dt;
    dateElement.innerText = getDateFromTimeStamp(timeStamp);
    divContainerElement.appendChild(dateElement);
    divContainerElement.appendChild(weatherImage);
    divContainerElement.appendChild(description);
    divContainerElement.appendChild(humidity);
    divContainerElement.appendChild(temparature);

    dailyWeatherContainer.appendChild(divContainerElement);
  }
}
