export class Language {
  dayWeatherLang(session, weatherData) {
    if(session.lang == 'en') {
      return `Weather:
      ${weatherData.weather[0].main} (${weatherData.weather[0].description})\n\r`+
      `Temperature:
      ${Math.round(weatherData.main.temp)}°C, feels like ${Math.round(weatherData.main.feels_like)}°C\n\r`+
      `Wind:
      ${weatherData.wind.speed} mps`;
    } else if(session.lang == 'ru') {
        return `Погода:
        ${weatherData.weather[0].main} (${weatherData.weather[0].description})\n\r`+
        `Температура:
        ${Math.round(weatherData.main.temp)}°C, по ощущению ${Math.round(weatherData.main.feels_like)}°C\n\r`+
        `Ветер:
        ${weatherData.wind.speed} м/с`;
      }
  };
  fiveDWLang(session, weatherData) {
     if(session.lang == 'en') {
       return `Weather for ${weatherData.dt_txt.slice(0, 10)}\n\r`+
        `General: ${weatherData.weather[0].main}\n\r`+
        `Temperature: ${Math.round(weatherData.main.temp)}°C, `+
        `feels like ${Math.round(weatherData.main.feels_like)}°C\n\r`+
        `Wind: ${weatherData.wind.speed} mps`;
     } else if(session.lang == 'ru') {
        return `Погода на ${weatherData.dt_txt.slice(0, 10)}\n\r`+
          `Общее: ${weatherData.weather[0].main}\n\r`+
          `Температура: ${Math.round(weatherData.main.temp)}°C, `+
          `по ощущению ${Math.round(weatherData.main.feels_like)}°C\n\r`+
          `Ветер: ${weatherData.wind.speed} м/с`;
        }
  };
};
