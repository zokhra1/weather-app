"use strict";
const apiKey = "9e17f258e701f74ef718d466c579818d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weather = document.querySelector(".weather");
const renderWeather = function(data) {
    const icon = data.weather[0].main === "Clouds" ? "clouds.png" : "rain.png";
    const html = ` <img src="images/${icon}" class="weather-icon" />
  <h1 class="temp">${Math.round(data.main.temp) + "\xb0C"}</h1>
  <h2 class="city">${data.name}</h2>
  <div class="details">
    <div class="col">
      <img src="images/humidity.png" />
      <div>
        <p class="humidity">${data.main.humidity + "%"}</p>
        <p>Humidity</p>
      </div>
    </div>

    <div class="col">
      <img src="images/wind.png" />
      <div>
        <p class="wind">${data.wind.speed + "km/h"}</p>
        <p>Wind Speed</p>
      </div>
    </div>
  </div>`;
    // Save data to local storage
    localStorage.setItem("weatherData", JSON.stringify(data));
    weather.innerHTML = html;
};
// Function to retrieve weather data from local storage
const getWeatherFromLocalStorage = ()=>{
    const storedData = localStorage.getItem("weatherData");
    if (storedData) {
        const data = JSON.parse(storedData);
        renderWeather(data);
    }
};
const renderError = (message)=>{
    weather.innerHTML = `<p class="error">${message}</p>`;
};
const getWeather = async function(city) {
    try {
        const res = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!res.ok) throw new Error("City not found. Please enter a valid city name.");
        const data = await res.json();
        renderWeather(data);
        console.log(data);
        console.log(data.sys.country);
    } catch (err) {
        console.error(err);
        renderError(`\u{1F4A3} ${err.message}`);
        throw err;
    }
};
// Load weather data from local storage when the page loads
document.addEventListener("DOMContentLoaded", getWeatherFromLocalStorage);
searchBox.addEventListener("keyup", function(event) {
    if (event.key === "Enter") getWeather(searchBox.value);
});
searchBtn.addEventListener("click", ()=>getWeather(searchBox.value));

//# sourceMappingURL=weather.dddccacb.js.map
