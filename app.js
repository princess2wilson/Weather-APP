//This Weather application shows the current weather in your area right now.



//Selecting elements here
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notifElement = document.querySelector(".notification");

//App data
const weather = {};
weather.temperature = {
  unit: "celsius",
};

const KELVIN = 273;
const key = "1682eb18921f15b999c0569b0082f485";

//Check if users Geolocation is supported by browser
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notifElement.style.display = "block";
  notifElement.innerHTML = "<p>Browser does not support Geolocation</p>";
}

function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getWeather(latitude, longitude);
}

//show error is theres an issue
function showError(error) {
  notifElement.style.display = "block";
  notifElement.innerHTML = `<p>${error.message}</p>`;
}

//get weather details from api
function getWeather(latitude, longitude) {
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
  console.log(api);
  fetch(api)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function (data) {
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      weather.description = data.weather[0].description;
      weather.iconID = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
    })
    .then(function () {
      displayWeather();
    });
}

//Display Weather on screen
function displayWeather() {
  iconElement.innerHTML = `<img src = "icons/${weather.iconID}.png"/>`;
  tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
  descElement.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city},${weather.country}`;
}

//C to F
function celciusToFahrenheit(temperature) {
  return (temperature * 9) / 5 + 32;
}

tempElement.addEventListener("click", function () {
  if (weather.temperature.value == undefined) return;
  if (weather.temperature.unit == "celsius") {
    let fahrenheit = celciusToFahrenheit(weather.temperature.value);
    fahrenheit = Math.floor(fahrenheit);

    tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
    weather.temperature.unit = "fahrenheit";
  } else {
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    weather.temperature.unit = "celsius";
  }
});
