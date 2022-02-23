const userInput = document.getElementById("user-input");
const searchBtn = document.getElementById("search-btn");
const img = document.querySelector("img");
const weatherData = document.getElementById("data");
const cityName = document.getElementById("city-name");
const weatherCode = document.getElementById("weather-code");
const temp = document.getElementById("temp");

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getWeather(userInput.value);
  userInput.value = "";
});

async function getWeather(city) {
  const apiURL = `http://api.weatherstack.com/current?access_key=0a1aafb568b3664b199d677b56cd4745&query=${city}`;
  try {
    const response = await fetch(apiURL);
    const data = await response.json();

    cityName.innerText = `Current weather for ${data.location.name}, ${data.location.region}`;

    weatherCode.innerText = data.current.weather_descriptions[0];

    const tempInF = Math.round(convertToF(data.current.temperature));
    
    temp.textContent = `${tempInF}\u00B0`

    switch (data.current.weather_code) {
      case 113:
        img.src = "sunny.png";
        break;
      case 116:
        img.src = "partly_cloudy.png";
        break;
      case 119:
      case 122:
      case 143:
        img.src = "cloudy.png";
        break;
      case 296:
      case 299:
      case 302:
      case 305:
      case 308:
        img.src = "heavy_rain.png";
        break;
      case 227:
      case 230:
      case 179:
      case 368:
      case 362:
      case 332:
      case 335:
      case 326:
        img.src = "snowy.png";
        break;
      case 200:
        img.src = "thunderstorm.png";
        break;
    }
    console.log(data)

  } catch (error) {
    console.error(error);
    cityName.innerText = "Please enter a valid city!";
    weatherCode.innerText = "";
    temp.textContent = "";
    img.src = "";
    // img.src =
    //   "https://upload.wikimedia.org/wikipedia/commons/3/34/ErrorMessage.png";
  }
}

function convertToF(celsius) {
  return celsius * (9 / 5) + 32;
}
