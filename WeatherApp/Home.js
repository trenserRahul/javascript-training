window.onload = () => {
  const defaultCity = "Thiruvananthapuram";
  fetchCurrentWeather(defaultCity);
  fetchFiveDayWeather(defaultCity);
};

const key = "e738f6cc35361d59bb2303170f864324";
const weatherContainer = document.querySelector("#weather-details");
const weatherImageContainer = document.querySelector("#weather-image");
const upcomingWeatherContainer = document.querySelector("#upcoming-weather");
const currentWeatherContainer = document.querySelector("#current-weather");
const rightContainerElement = document.querySelector("#right-container");
const weatherIcons = {};

function getWeatherByCity(event) {
  event.preventDefault();
  const searchData = document.querySelector("#search-input").value;
  fetchCurrentWeather(searchData);
  fetchFiveDayWeather(searchData);
}

function fetchCurrentWeather(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`
  )
    .then((result) => {
      if (result.ok) {
        return result.json();
      }
      throw new Error("Something Went Wrong");
    })
    .then((jsonResponse) => getCurrentWeatherUpdate(jsonResponse))
    .catch(() => {
      displayError(currentWeatherContainer);
    });
}

async function fetchFiveDayWeather(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${key}`
  )
    .then((result) => {
      if (result.ok) {
        upcomingWeatherContainer.innerHTML = "";
        return result.json();
      }
      throw new Error("Wrong data");
    })
    .then((upcomingDayDetails) => getUpcomingDayUpdate(upcomingDayDetails))
    .catch(() => {
      displayError(upcomingWeatherContainer);
    });
}

function getCurrentWeatherUpdate(weatherData) {
  const {
    name: city,
    main: upcomingDayWeatherDetails,
    weather,
    dt: currentDateTime,
    sys: timeDetails,
    wind,
  } = weatherData;
  currentWeatherContainer.classList.remove("error-indicator");
  displayCity(city);
  displayWeatherIcon(weather);
  displayMain(upcomingDayWeatherDetails);
  displayCurrentDateTime(currentDateTime);
  displaySunTime(timeDetails);
  displaywind(wind);
}

function getUpcomingDayUpdate(upcomingWeatherData) {
  const { list: upcomingDayWeatherDetails } = upcomingWeatherData;
  upcomingWeatherContainer.classList.remove("error-indicator");
  filterUpcomingDayDetails(upcomingDayWeatherDetails);
}

function displayCity(city) {
  const cityNameContainer = document.querySelector("#city-name");
  const cityElement = document.createElement("p");
  cityElement.innerText = city;
  cityNameContainer.innerHTML = "";
  cityNameContainer.appendChild(cityElement);
}

function displayMain(main) {
  const highlightDetails = document.querySelector("#highlight-details");
  const humidityElement = document.createElement("p");
  const temperatureElement = document.createElement("p");
  const superScriptElement = document.createElement("sup");
  const celsiusElement = document.createElement("span");
  superScriptElement.innerText = "o";
  celsiusElement.innerText = "C";
  temperatureElement.setAttribute("id", "temperature");
  humidityElement.innerText = ` Humidity : ${main.humidity}%`;
  temperatureElement.innerText = `  ${main.temp} `;
  highlightDetails.innerHTML = "";
  highlightDetails.appendChild(temperatureElement);
  highlightDetails.appendChild(superScriptElement);
  highlightDetails.appendChild(celsiusElement);
  rightContainerElement.innerHTML = "";
  rightContainerElement.appendChild(humidityElement);
}

function displayCurrentDateTime(currentDateTime) {
  const currentTimeElement = document.createElement("p");
  const currentDayElement = document.createElement("p");
  currentTimeElement.innerText = getTimeFromTimeStamp(currentDateTime);
  currentDayElement.innerText = getDayFromTimeStamp(currentDateTime);
  rightContainerElement.appendChild(currentTimeElement);
  rightContainerElement.appendChild(currentDayElement);
}

function displayWeatherDescription(weather) {
  const weatherDescriptionElement = document.createElement("span");
  weatherDescriptionElement.innerText = toTitleCase(weather[0].description);
  weatherImageContainer.appendChild(weatherDescriptionElement);
}

async function getIconUrl(iconId) {
  const image = await fetch(
    `https://openweathermap.org/img/wn/${iconId}@2x.png`
  );
  const imageBlob = await image.blob();
  return URL.createObjectURL(imageBlob);
}

async function displayWeatherIcon(weather) {
  const iconId = weather[0].icon;
  const imageUrl = await getIconUrl(iconId);
  const imageElement = document.createElement("img");
  imageElement.src = imageUrl;
  weatherImageContainer.innerHTML = "";
  weatherImageContainer.appendChild(imageElement);
  displayWeatherDescription(weather);
}

function displaySunTime(timeDetails) {
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
  weatherContainer.innerHTML = "";
  weatherContainer.appendChild(sunRiseElement);
  weatherContainer.appendChild(sunSetElement);
}

function displaywind(wind) {
  const windSpeed = wind.speed;
  const windElement = document.createElement("p");
  windElement.innerText = ` Wind speed : ${windSpeed} m/s`;
  weatherContainer.appendChild(windElement);
}

function getTimeFromTimeStamp(timeStamp) {
  const timeDetail = new Date(timeStamp * 1000);
  const hour = timeDetail.getHours();
  const minut = timeDetail.getMinutes();
  const second = timeDetail.getSeconds();
  return `${hour}:${minut}:${second}`;
}

function getDateFromTimeStamp(timeStamp) {
  const timeDetail = new Date(timeStamp * 1000);
  const readableDate = timeDetail.toLocaleDateString();
  return readableDate;
}

function getDayFromTimeStamp(timeStamp) {
  const timeDetail = new Date(timeStamp * 1000);
  const day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const readableDay = day[timeDetail.getDay()];
  return readableDay;
}

function displayError(containerElement) {
  containerElement.classList.add("error-indicator");
  upcomingWeatherContainer.innerHTML = "";
  const errorDiv = document.createElement("div");
  errorDiv.setAttribute("id", "error-div");
  errorDiv.innerText = "City Not Found";
  upcomingWeatherContainer.appendChild(errorDiv);
}

function filterUpcomingDayDetails(upcomingWeatherList) {
  const todaysDate = upcomingWeatherList[0].dt_txt.slice(0, 10);
  upcomingWeatherList.forEach((upcomingWeatherListElement) => {
    if (
      upcomingWeatherListElement.dt_txt.includes("12:00:00") &&
      upcomingWeatherListElement.dt_txt.slice(0, 10) != todaysDate
    ) {
      displayUpcomingDayWeatherUpdates(upcomingWeatherListElement);
    }
  });
}

async function displayUpcomingDayWeatherUpdates(upcomingDayWeatherDetails) {
  const weatherImage = document.createElement("img");
  const divContainerElement = document.createElement("div");
  const timeElement = document.createElement("p");
  const humidity = document.createElement("p");
  const description = document.createElement("p");
  const dayElement = document.createElement("p");
  divContainerElement.className = "weather-detail-wrap";
  dayElement.setAttribute("class", "highlight");
  const temperatureDiv = upcomingDayTemperature(upcomingDayWeatherDetails);
  timeElement.innerText = "12:00 PM";
  humidity.innerText = `Humidity : ${upcomingDayWeatherDetails.main.humidity}%`;
  description.innerText = toTitleCase(
    upcomingDayWeatherDetails.weather[0].description
  );
  const timeStamp = upcomingDayWeatherDetails.dt;
  dayElement.innerText = getDayFromTimeStamp(timeStamp);
  upcomingDayWeatherIcon(upcomingDayWeatherDetails, weatherImage);
  const createdElements = [
    dayElement,
    timeElement,
    weatherImage,
    description,
    temperatureDiv,
    humidity,
  ];
  createdElements.forEach((newElements) => {
    appendElementToContainer(newElements, divContainerElement);
  });
}

function upcomingDayTemperature(upcomingDayWeatherDetails) {
  const temperatureDiv = document.createElement("div");
  temperatureDiv.setAttribute("id", "upcoming-temperature");
  const temperature = document.createElement("p");
  const superScriptElement = document.createElement("sup");
  const celsiusElement = document.createElement("span");
  superScriptElement.innerText = "o";
  celsiusElement.innerText = "C";
  temperature.innerText = upcomingDayWeatherDetails.main.temp;
  temperatureDiv.appendChild(temperature);
  temperatureDiv.appendChild(superScriptElement);
  temperatureDiv.appendChild(celsiusElement);
  return temperatureDiv;
}

async function upcomingDayWeatherIcon(upcomingDayWeatherDetails, weatherImage) {
  const iconId = upcomingDayWeatherDetails.weather[0].icon;
  if (weatherIcons[iconId]) {
    weatherImage.src = weatherIcons[iconId];
  } else {
    iconUrl = await getIconUrl(iconId);
    weatherImage.src = iconUrl;
    weatherIcons[iconId] = iconUrl;
  }
}

function appendElementToContainer(newElements, divContainerElement) {
  divContainerElement.appendChild(newElements);
  upcomingWeatherContainer.appendChild(divContainerElement);
}

function toTitleCase(stringInput) {
  const splitInput = stringInput.split(" ");
  for (let i = 0; i < splitInput.length; i++) {
    splitInput[i] =
      splitInput[i].charAt(0).toUpperCase() + splitInput[i].slice(1);
  }
  return splitInput.join(" ");
}
