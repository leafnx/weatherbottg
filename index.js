const { Telegraf } = require('telegraf')
const axios = require("axios").default;

const apiKey = 'fb55adb6f1msh4004c667879b7a7p1ec77ejsnc23812672588';
const apiHost = 'community-open-weather-map.p.rapidapi.com';

const bot = new Telegraf('1717568476:AAHBD98TBElaJ7YQ4aTFZlK9OBRpzxBi-JU')
bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('location', (ctx) => {
  const options = {
    method: 'GET',
    url: 'https://community-open-weather-map.p.rapidapi.com/weather',
    params: {
      lat: ctx.message.location.latitude,
      lon: ctx.message.location.longitude,
      lang: 'null',
      units: 'metric',
      mode: 'xml, html'
    },
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': apiHost,
    }
  };

  let respFunc = function (response) {
    let weatherData = response.data;
  	ctx.reply(
      `Weather:
      ${weatherData.weather[0].main} (${weatherData.weather[0].description})\n\r`+
      `Temperature:
      ${weatherData.main.temp}°C, feels like ${weatherData.main.feels_like}°C\n\r`+
      `Wind:
      ${weatherData.wind.speed} mps`);
    console.log(response.data);
  }

  axios.request(options).then(respFunc).catch(function (error) {
  	console.error(error);
  });

    console.log(options);
})
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()





// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });
