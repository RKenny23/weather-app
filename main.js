const userInput = document.getElementById("user-input");
const searchBtn = document.getElementById("search-btn");
const img = document.querySelector('img');

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getWeather(userInput);
});

async function getWeather(input) {
  try {
    const response = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=p8dsvStRqgTtnAVT9fMfSvTsVTQJh8OF&s=${input.value}`,
    { mode: "cors" }
    );
    const gifData = await response.json();
    img.src = gifData.data.images.original.url;

  } catch (error) {
    console.log("error");
    img.src =
      "https://upload.wikimedia.org/wikipedia/commons/3/34/ErrorMessage.png";
  }
}