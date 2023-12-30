"use strict";

const cities = [
  { city: "Zwickau", id: "2803560" },
  { city: "Wrocław", id: "3081368" },
  { city: "Kyiv", id: "703448", selected: true },
  { city: "Prague", id: "3067696" },
  { city: "Madrid", id: "3117735" },
];



const param = {
  url: "https://api.openweathermap.org/data/2.5/",
  appid: "547b5a302c5da9a5600f7e349251fe7c",
};
const insert = document.querySelector(".root");
const selectList = document.createElement("select");

function createSelect() {
  selectList.setAttribute("id", "city_name");
  for (let i = 0; i < cities.length; i++) {
    const option = document.createElement("option");
    option.value = cities[i].id;
    option.text = cities[i]["city"];
    if (cities[i].selected) {
      option.selected = true;
    }
    selectList.append(option);
  }
  insert.append(selectList);
}
createSelect();

function getWeather() {
  const cityId = document.querySelector("#city_name").value;
  fetch(`${param.url}weather?id=${cityId}&units=metric&APPID=${param.appid}`)
    .then((weather) => {
      return weather.json();
    })
    .then(showWeather);
}
getWeather();

function showWeather(data) {
  // здесь вы выводите на страницу
  let out = document.querySelector(".out");
  const newData = new Date();
  let arr = "";
  const str = newData.toDateString();
  for (let i = 0; i < data.name.length; i++) {
    arr += data.name[i];
  }
  out.innerHTML = `<div class='wrapper'>
  <h4 class="weather_data">${str}</h4>
  <h2 class="weather_city">${arr}
    <span class="weather_country">${data.sys.country}</span>
  </h2>
  <h1 class="weather_temperature">${Math.round(data.main.temp) + "&deg;"}</h1>
  <div class="weather_image">
      <img width="150px" alt="icon weather" src='https://openweathermap.org/img/wn/${
        data.weather[0]["icon"]
      }@2x.png'/> 
    <p class="weather_cloud">${data.weather[0]["description"]}</p>
  </div>
  <div class="weather_wind">
    <span>Deg: ${data.wind.deg}</span>
    <span></span>
    <span>Wind speed: ${data.wind.speed}</span>
    <span>Pressure: ${data.main.pressure}</span>
  </div>
  </div>
  `;
}

document.querySelector("#city_name").onchange = getWeather;
