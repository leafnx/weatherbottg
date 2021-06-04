import { options } from './options.js';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export class Actions {
  options = options;
  axios = axios;

  dayWeather(session) {
    options.url = 'https://' + process.env.API_HOST + '/weather';
    this.options.params.lat = session.userLat;
    this.options.params.lon = session.userLon;
    this.options.params.lang = session.lang;

    return axios.request(options).then((response) => {
      let weatherData = response.data;
      if(options.params.lang == 'en') {
        return `Weather:
        ${weatherData.weather[0].main} (${weatherData.weather[0].description})\n\r`+
        `Temperature:
        ${Math.round(weatherData.main.temp)}°C, feels like ${Math.round(weatherData.main.feels_like)}°C\n\r`+
        `Wind:
        ${weatherData.wind.speed} mps`;
      } else {
          return `Погода:
          ${weatherData.weather[0].main} (${weatherData.weather[0].description})\n\r`+
          `Температура:
          ${Math.round(weatherData.main.temp)}°C, по ощущению ${Math.round(weatherData.main.feels_like)}°C\n\r`+
          `Ветер:
          ${weatherData.wind.speed} м/с`;
        }
    }).catch(function (error) {
        console.error(error);
    })
  };
  fiveDaysWeather(session) {
    options.url = 'https://' + process.env.API_HOST + '/forecast';
    this.options.params.lat = session.userLat;
    this.options.params.lon = session.userLon;
    this.options.params.lang = session.lang;

    return axios.request(options).then((response) => {
      let weatherData = response.data;
      const filteredResp = [];
      weatherData.list.forEach((itemList) => {
        if (itemList.dt_txt.includes('15:00:00')) {
          filteredResp.push(itemList);
        }
      });
     return filteredResp;
    }).catch(function (error) {
      console.error(error);
    });
  }
};
