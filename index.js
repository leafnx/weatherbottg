const { Telegraf } = require('telegraf')
const axios = require("axios").default;

const apiKey = 'fb55adb6f1msh4004c667879b7a7p1ec77ejsnc23812672588';
const apiHost = 'community-open-weather-map.p.rapidapi.com';
const defaultUrl = 'https://community-open-weather-map.p.rapidapi.com'


const bot = new Telegraf('1717568476:AAHBD98TBElaJ7YQ4aTFZlK9OBRpzxBi-JU')
bot.start((ctx) => ctx.reply('Hello, send me your location to see weather data'))
bot.help((ctx) => ctx.reply('Send me your location'))

bot.command('test', (ctx) => {
  let userLat = 54.5314;
  let userLon = 36.3089;
// bot.on('location', (ctx) => {
//   let userLat = ctx.message.location.latitude;
//   let userLon = ctx.message.location.longitude;

  ctx.reply('Choose', {
    reply_markup: {
      inline_keyboard: [
        [
          {text: 'Today forecast', callback_data: 'dayWeather'},
          {text: '5 days forecast', callback_data: '5dWeather'}
        ]
      ]
    }
  })

  bot.action('dayWeather', (ctx) => {
    const options = {
      method: 'GET',
      url: defaultUrl + '/weather',
      params: {
        lat: userLat,
        lon: userLon,
        lang: 'en',
        units: 'metric',
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
        ${Math.round(weatherData.main.temp)}°C, feels like ${Math.round(weatherData.main.feels_like)}°C\n\r`+
        `Wind:
        ${weatherData.wind.speed} mps`
      );
        console.log(weatherData);
    }
    axios.request(options).then(respFunc).catch(function (error) {
    	console.error(error);
    });
  })

  bot.action('5dWeather', (ctx) => {
    const options = {
      method: 'GET',
      url: defaultUrl + '/forecast',
      params: {
        lat: userLat,
        lon: userLon,
        lang: 'en',
        units: 'metric',
      },
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': apiHost,
      }
    };

    let respFunc = function (response) {
      let weatherData = response.data;
      console.log(weatherData.list);
      weatherData.list.forEach((itemList) => {
        if (itemList.dt_txt.includes('15:00:00')) {
          console.log(itemList.dt_txt.slice(0, 10));
          itemList.weather.forEach((eachWeather) => {
            console.log(eachWeather.main);
                  ctx.reply(
                    `Weather for ${itemList.dt_txt.slice(0, 10)}\n\r`+
                    `General: ${eachWeather.main}\n\r`+
                    `Temperature: ${Math.round(itemList.main.temp)}°C, `+
                    `feels like ${Math.round(itemList.main.feels_like)}°C\n\r`+
                    `Wind: ${itemList.wind.speed}mps`
                  );
          })
        }
      })
    }
    axios.request(options).then(respFunc).catch(function (error) {
      console.error(error);
    });
  })
});




bot.launch()
