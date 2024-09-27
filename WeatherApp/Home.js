window.onload = () => {
  fetchWeatherDetails("Thiruvananthapuram");
  fetchhourlyDetails("Thiruvananthapuram");
};

const key = "e738f6cc35361d59bb2303170f864324";
const cityNameContainer = document.querySelector("#city-name");
const highlightDetails = document.querySelector("#highlight-details");
const weatherDetailsContainer = document.querySelector("#weather-details");
const weatherImageContainer = document.querySelector("#weather-image");
const dailyWeatherContainer = document.querySelector("#daily-weather");
const currentWeatherContainer = document.querySelector("#current-weather");
const sectionElement = document.querySelector("#weather-container");

function getData(event) {
  event.preventDefault();
  const searchData = document.querySelector("#search-input").value;
  fetchWeatherDetails(searchData);
  fetchhourlyDetails(searchData);
}

function fetchWeatherDetails(city) {
  const weatherDetails = fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error("Wrong data");
    })
    .then((jsonResponse) => getWeatherUpdates(jsonResponse))
    .catch((error) => {
      displayError(currentWeatherContainer);
    });
}

function getWeatherUpdates(weatherData) {
  const {
    name: city,
    main: dailyWetherDetails,
    weather: weatherDetails,
    dt: currentDateTime,
    sys: timeDetails,
    wind: windDetails,
  } = weatherData;
  currentWeatherContainer.classList.remove("error-indicator");
  displayCity(city);
  displayImage(weatherDetails);
  displayMain(dailyWetherDetails);
  displayTime(timeDetails);
  displayWindDetails(windDetails);
}

function getHourlyUpdate(hourlyWeatherData) {
  const { city, list: dailyWetherDetails } = hourlyWeatherData;
  dailyWeatherContainer.classList.remove("error-indicator");
filterDailyUpdates(dailyWetherDetails); 
//  displayDailyUpdates(dailyWetherDetails);
  
}

function displayCity(city) {
  const cityElement = document.createElement("p");
  cityElement.innerText = city;
  cityNameContainer.innerHTML = "";
  cityNameContainer.appendChild(cityElement);
}

function displayMain(main) {
  const middleContainerElement = document.querySelector("#middle-container");
  const rightContainerElement = document.querySelector("#right-container");
  const humidityElement = document.createElement("p");
  const temparatureElement = document.createElement("p");
  const superScriptElement = document.createElement("sup");
  superScriptElement.innerText = "oC";
  temparatureElement.setAttribute("id", "temperature");
  humidityElement.innerText = ` Humidity : ${main.humidity}%`;
  temparatureElement.innerText = `  ${main.temp} `;
  highlightDetails.innerHTML = "";
  highlightDetails.appendChild(temparatureElement);
  highlightDetails.appendChild(superScriptElement);
  rightContainerElement.innerHTML = "";
  rightContainerElement.appendChild(humidityElement);
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
  weatherDetailsContainer.innerHTML = "";
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

function getDayFromTimeStamp(timeStamp) {
  const timeDetail = new Date(timeStamp * 1000);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const readableDay = days[timeDetail.getDay()];
  return readableDay;
}

function displayWindDetails(windDetails) {
  const windSpeed = windDetails.speed;
  const windElement = document.createElement("p");
  windElement.innerText = ` Wind speed : ${windSpeed} m/s`;
  weatherDetailsContainer.appendChild(windElement);
}

async function fetchhourlyDetails(city) {
  const hourlyDetails = fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${key}`
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error("Wrong data");
    })
    .then((hourlyDetailsJson) => getHourlyUpdate(hourlyDetailsJson))
    .catch((error) => {
      console.log("daily weather");
      displayError(dailyWeatherContainer);
    });

  // try {
  //   const hourlyDetails = await fetch(
  //     `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${key}`
  //   );
  //   const hourlyDetailsJson = await  {if (res.ok) {
  //     return res.json();
  //   }
  //   throw new Error("Wrong data");
  //   getHourlyUpdate(hourlyDetailsJson);
  // } catch (error) {
  //   // dailyWeatherContainer.innerHTML="";
  //   displayError(dailyWeatherContainer);
  // }
}

// async function displayDailyUpdates(dailyWetherDetails) {
//   console.log(dailyWetherDetails);
//   // functionTest(dailyWetherDetails);
//   dailyWeatherContainer.innerHTML = "";
//   for (let i = 0; i < 39; i += 8) {
//     const divContainerElement = document.createElement("div");
//     divContainerElement.className = "weather-detail-wrap";
//     const timeElement = document.createElement("p");
//     const humidity = document.createElement("p");
//     const description = document.createElement("p");
//     const temparature = document.createElement("p");
//     const weatherImage = document.createElement("img");
//     const dateElement = document.createElement("p");
//     const temperatureDiv = document.createElement("div");
//     const superScriptElement = document.createElement("sup");
//     superScriptElement.innerText = "oC";
//     temperatureDiv.setAttribute("id", "daily-temperature");
//     const iconId = dailyWetherDetails[i].weather[0].icon;
//     iconUrl = await getIconUrl(iconId);
//     weatherImage.src = iconUrl;
//     timeElement.innerText = "12:00 PM";
//     humidity.innerText = `Humidity : ${dailyWetherDetails[i].main.humidity} %`;
//     description.innerText = dailyWetherDetails[i].weather[0].description;
//     temparature.innerText = dailyWetherDetails[i].main.temp;
//     const timeStamp = dailyWetherDetails[i].dt;
//     dateElement.innerText = getDayFromTimeStamp(timeStamp);
//     temperatureDiv.appendChild(temparature);
//     temperatureDiv.appendChild(superScriptElement);
//     divContainerElement.appendChild(dateElement);
//     divContainerElement.appendChild(timeElement);
//     divContainerElement.appendChild(weatherImage);
//     divContainerElement.appendChild(description);
//     divContainerElement.appendChild(temperatureDiv);
//     divContainerElement.appendChild(humidity);
//     dailyWeatherContainer.appendChild(divContainerElement);
//   }
// }

// function displayError(containerElement) {
//   console.log(containerElement);
//   containerElement.classList.add("error-indicator");
//   dailyWeatherContainer.innerHTML = "";
//   const errorDiv = document.createElement("div");
//   errorDiv.setAttribute("id", "error-div");
//   errorDiv.innerText = "City Not Found";
//   dailyWeatherContainer.appendChild(errorDiv);
// }


function filterDailyUpdates(arg){
  arg.forEach(element => {
  console.log("############################################");
  console.log(element.dt_txt);
    if(element.dt_txt.includes("12:00:00")){
      if(element.dt_txt.includes("12:00:00")) {
        displayDailyUpdates(element);
        console.log(element);
      }
    }

});

}

async function displayDailyUpdates(dailyWetherDetails) {
  console.log(dailyWetherDetails);
  dailyWeatherContainer.innerHTML = "";

    const divContainerElement = document.createElement("div");
    divContainerElement.className = "weather-detail-wrap";
    const timeElement = document.createElement("p");
    const humidity = document.createElement("p");
    const description = document.createElement("p");
    const temparature = document.createElement("p");
    const weatherImage = document.createElement("img");
    const dateElement = document.createElement("p");
    const temperatureDiv = document.createElement("div");
    const superScriptElement = document.createElement("sup");
    superScriptElement.innerText = "oC";
    temperatureDiv.setAttribute("id", "daily-temperature");
    const iconId = dailyWetherDetails.weather[0].icon;
    iconUrl = await getIconUrl(iconId);
    weatherImage.src = iconUrl;
    timeElement.innerText = "12:00 PM";
    humidity.innerText = `Humidity : ${dailyWetherDetails.main.humidity} %`;
    description.innerText = dailyWetherDetails.weather[0].description;
    temparature.innerText = dailyWetherDetails.main.temp;
    const timeStamp = dailyWetherDetails.dt;
    dateElement.innerText = getDayFromTimeStamp(timeStamp);
    temperatureDiv.appendChild(temparature);
    temperatureDiv.appendChild(superScriptElement);
    divContainerElement.appendChild(dateElement);
    divContainerElement.appendChild(timeElement);
    divContainerElement.appendChild(weatherImage);
    divContainerElement.appendChild(description);
    divContainerElement.appendChild(temperatureDiv);
    divContainerElement.appendChild(humidity);
    dailyWeatherContainer.appendChild(divContainerElement);

}
