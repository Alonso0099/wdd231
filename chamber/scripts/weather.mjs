// Display current weather and a three day forecast
export async function displayWeather() {
  const currentTemp = document.querySelector("#current-temp");
  const weatherDesc = document.querySelector("#weather-desc");
  const forecastContainer = document.querySelector("#forecast");

  const apiKey = "b95cdf6921bbc574801a398a1376465f";
  const lat = "40.3641";
  const lon = "-111.7385";
  const units = "imperial";

  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

  try {
    const currentResponse = await fetch(currentUrl);
    const forecastResponse = await fetch(forecastUrl);

    if (!currentResponse.ok || !forecastResponse.ok) {
      throw new Error("Weather data could not be loaded.");
    }

    const currentData = await currentResponse.json();
    const forecastData = await forecastResponse.json();

    showCurrentWeather(currentData, currentTemp, weatherDesc);
    showForecast(forecastData, forecastContainer);
  } catch (error) {
    currentTemp.textContent = "Unavailable";
    weatherDesc.textContent = "Unavailable";
    forecastContainer.innerHTML = "<p>Forecast is currently unavailable.</p>";
    console.error(error);
  }
}

function showCurrentWeather(data, currentTemp, weatherDesc) {
  currentTemp.innerHTML = `${Math.round(data.main.temp)}&deg;F`;
  weatherDesc.textContent = data.weather[0].description;
}

function showForecast(data, forecastContainer) {
  forecastContainer.innerHTML = "";

  const dailyForecasts = data.list.filter((item) => item.dt_txt.includes("12:00:00"));

  dailyForecasts.slice(0, 3).forEach((day) => {
    const date = new Date(day.dt_txt);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

    const forecastItem = document.createElement("p");
    forecastItem.innerHTML = `<strong>${dayName}:</strong> ${Math.round(day.main.temp)}&deg;F`;

    forecastContainer.appendChild(forecastItem);
  });
}