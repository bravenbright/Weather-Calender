let pastCities = localStorage.getItem("pastCities");
pastCities = (pastCities) ? JSON.parse(pastCities) : [];

const weatherApiKey = "8a41c0acee3f2f590e39e2a607b9d3ad"
let weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?appid=${weatherApiKey}&units=imperial`;

const searchBarInput = document.getElementById("search-bar-input");
const pastCitiesContainer = document.getElementById("past-cities-container");
const weatherDataContainer = document.getElementById("weather-data-container");
const fiveDayContainer = document.getElementById("five-day-container");

function getApi() {
   let city = searchBarInput.value;

   fetch(weatherApiUrl + `&q=${city}`)
   .then(response => response.json())
   .then(data => {
      clearDays();

      let cityNameElement = document.createElement("h1");
      let cityName = data.city.name;
      cityNameElement.innerText = cityName;
      if (!pastCities.includes(cityName)) {
         pastCities.unshift(cityName);
         if (pastCities.length == 10) {
            pastCities.pop();
         }
         localStorage.setItem("pastCities", JSON.stringify(pastCities));
      }
      reloadPastCities();

      weatherDataContainer.append(cityNameElement);
   
      let days = [
         data.list[0],
         ...data.list.slice(1).filter(day => day.dt_txt.includes("12:00:00"))
      ];

      populateDays(days);
      weatherDataContainer.style.borderStyle = 'solid';
   });
};

function reloadPastCities() {
   pastCitiesContainer.innerHTML = null;
   for (let i = 0; i < pastCities.length; i++) {
      let pastCityElement = document.createElement("div");
      pastCityElement.className = "past-city";
      pastCityElement.innerText = pastCities[i];
      pastCitiesContainer.appendChild(pastCityElement);
   }

   document.querySelectorAll('.past-city').forEach(item => {
      item.addEventListener('click', event => {
         searchBarInput.value = item.innerText;
         getApi();
      })
   })
}

function populateDays(days) {
   let dayElementList = [];
   for (let i = 0; i < days.length; i++) {
      let dayElement = document.createElement("div");
      i == 0 ? dayElement.id = "today": dayElement.className = "day";

      let dateElement = document.createElement("div");
      let date = new Date(days[i].dt * 1000);
      dateElement.className = "date";
      dateElement.innerText = date.toLocaleDateString("en-US", {
         weekday: i == 0 ? "long" : "short",
         year: "numeric",
         month: "long",
         day: "numeric",
       });
      dayElement.appendChild(dateElement);

      let imgElement = document.createElement("img");
      let iconId = days[i].weather[0].icon;
      imgElement.src = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
      dayElement.appendChild(imgElement);

      let tempElement = document.createElement("div");
      tempElement.className = "temp";
      tempElement.innerHtml = `Temp: ${days[i].main.temp} &#8457;`
      dayElement.appendChild(tempElement);

      let windElement = document.createElement("div");
      windElement.className = "wind";
      windElement.innerText = `Wind: ${days[i].wind.speed} MPH`
      dayElement.appendChild(windElement);

      let humidityElement = document.createElement("div");
      humidityElement.className = "humidity";
      humidityElement.innerText = `Humidity: ${days[i].main.humidity}%`
      dayElement.appendChild(humidityElement);

      dayElementList.push(dayElement);
   };

   weatherDataContainer.append(dayElementList[0]);

   let forecastHeader = document.getElementById("forecast-header");
   if (forecastHeader === null) {
      let newHeader = document.createElement("h1");
      newHeader.id = "forecast-header"
      newHeader.innerText = "5-day forecast";
      fiveDayContainer.parentNode.insertBefore(newHeader, fiveDayContainer);
   }

   fiveDayContainer.append(...dayElementList.slice(1));
}

function clearDays() {
   weatherDataContainer.innerHTML = null;
   fiveDayContainer.innerHTML = null;
}

function clearCities() {
   localStorage.removeItem("pastCities");
   pastCitiesContainer.innerHTML = null;
   pastCities = [];
}

let submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", getApi);

let clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", clearCities);

reloadPastCities();
