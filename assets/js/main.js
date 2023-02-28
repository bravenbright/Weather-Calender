let pastCities = localStorage.getItem('cities');
document.getElementById('cities').value = pastCities;

const weatherApiKey = '8a41c0acee3f2f590e39e2a607b9d3ad'
const weatherApiUrl = `api.openweathermap.org/data/2.5/forecast/daily?appid=${weatherApiKey}&cnt=7`;
// &q={city name}


const searchBar = document.getElementById('search-bar');
let pastCityResult = document.getElementById('past-city-result');
let weatherDataContainer = document.getElementById('weather-data-container');
let fiveDayContainer = document.getElementById('five-day-container');