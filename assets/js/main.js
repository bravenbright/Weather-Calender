let pastCities = localStorage.getItem('cities');
document.getElementById('past-city-results').value = pastCities;

const weatherApiKey = '8a41c0acee3f2f590e39e2a607b9d3ad'
let weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?appid=${weatherApiKey}&cnt=7`;

const searchBar = document.getElementById('search-bar');
let pastCityResult = document.getElementById('past-city-result');
let weatherDataContainer = document.getElementById('weather-data-container');
let fiveDayContainer = document.getElementById('five-day-container');

function getApi() {
   let city = searchBar.value;
   let temperature = null;
   document.getElementById('date').value = new Date().toLocaleString();

   fetch(weatherApiUrl + `&q=${city}`)
   .then(response => response.json())
   .then(data => {
      // localStorage.setItem('cities', cities)
      document.getElementById("city-name").innerHTML = data.city.name;

      let imgElement = document.createElement("img");
      let iconId = data.list[0].weather[0].icon;
      let iconImgUrl = `http://openweathermap.org/img/wn/${iconId}@2x.png`
      imgElement.src = iconImgUrl;
      document.getElementById("icon").appendChild(imgElement);
      console.log(data)
   });

};

