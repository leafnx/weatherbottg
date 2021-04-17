require('dotenv').config();
const { Telegraf, session } = require('telegraf');
const axios = require("axios").default;

const bot = new Telegraf(process.env.BOT_TOKEN)
const apiKey = process.env.API_KEY;
const apiHost = process.env.API_HOST;
const options = {
  method: 'GET',
  url: '0',
  params: {
    lat: 'userLat',
    lon: 'userLon',
    lang: 'en',
    units: 'metric',
  },
  headers: {
    'x-rapidapi-key': apiKey,
    'x-rapidapi-host': apiHost,
  },
};
let inKbrd = {
  reply_markup: {
    inline_keyboard: [
      [
        {text: 'Today forecast', callback_data: 'dayWeather'},
        {text: '5 days forecast', callback_data: '5dWeather'},
      ]
    ]
  }
};
let inKbrdRU = {
  reply_markup: {
    inline_keyboard: [
      [
        {text: 'Погода на сегодня', callback_data: 'dayWeather'},
        {text: 'Погода на 5 дней', callback_data: '5dWeather'},
      ]
    ]
  }
};
let inKbrdLang = {
  reply_markup: {
    inline_keyboard: [
      [
        {text: 'EN', callback_data: 'langEN'},
        {text: 'RU', callback_data: 'langRU'},
      ]
    ]
  }
};

bot.use(session());
bot.action('dayWeather', (ctx) => {
  options.url = 'https://' + apiHost + '/weather';
  options.params.lat = ctx.session.userLat;
  options.params.lon = ctx.session.userLon;

  let respFunc = (response) => {
    let weatherData = response.data;
    if(options.params.lang == 'en') {
      ctx.reply(
        `Weather:
        ${weatherData.weather[0].main} (${weatherData.weather[0].description})\n\r`+
        `Temperature:
        ${Math.round(weatherData.main.temp)}°C, feels like ${Math.round(weatherData.main.feels_like)}°C\n\r`+
        `Wind:
        ${weatherData.wind.speed} mps`
      );
    } else {
        ctx.reply(
          `Погода:
          ${weatherData.weather[0].main} (${weatherData.weather[0].description})\n\r`+
          `Температура:
          ${Math.round(weatherData.main.temp)}°C, по ощущению ${Math.round(weatherData.main.feels_like)}°C\n\r`+
          `Ветер:
          ${weatherData.wind.speed} м/с`
        );}
      console.log(weatherData);
  }
  axios.request(options).then(respFunc).catch(function (error) {
    console.error(error);
  });
});
bot.action('5dWeather', (ctx) => {
  options.url = 'https://' + apiHost + '/forecast';
  options.params.lat = ctx.session.userLat;
  options.params.lon = ctx.session.userLon;

  let respFunc = (response) => {
    let weatherData = response.data;
    weatherData.list.forEach((itemList) => {
      if (itemList.dt_txt.includes('15:00:00')) {
        console.log(itemList.dt_txt.slice(0, 10));
        itemList.weather.forEach((eachWeather) => {
          console.log(eachWeather.main);
              if(options.params.lang == 'en') {
                ctx.reply(
                  `Weather for ${itemList.dt_txt.slice(0, 10)}\n\r`+
                  `General: ${eachWeather.main}\n\r`+
                  `Temperature: ${Math.round(itemList.main.temp)}°C, `+
                  `feels like ${Math.round(itemList.main.feels_like)}°C\n\r`+
                  `Wind: ${itemList.wind.speed} mps`
                );
              } else {
                  ctx.reply(
                    `Погода на ${itemList.dt_txt.slice(0, 10)}\n\r`+
                    `Общее: ${eachWeather.main}\n\r`+
                    `Температура: ${Math.round(itemList.main.temp)}°C, `+
                    `по ощущению ${Math.round(itemList.main.feels_like)}°C\n\r`+
                    `Ветер: ${itemList.wind.speed} м/с`
                  );
                }
        })
      }
    })
  }
  axios.request(options).then(respFunc).catch(function (error) {
    console.error(error);
  });
});
bot.action('langEN', (ctx) => {
  options.params.lang = 'en';
});
bot.action('langRU', (ctx) => {
  options.params.lang = 'ru';
})

bot.start((ctx) => ctx.reply('Hello, please choose language', inKbrdLang));
bot.help((ctx) => ctx.reply('Send me your location'));

bot.command('test', (ctx) => {
  if (ctx.session === undefined) {
    ctx.session = {
      userLat: null,
      userLon: null,
      }
  };

  ctx.session.userLat = '54.5314';
  ctx.session.userLon = '36.3089';

  if(options.params.lang == 'en') {
    ctx.reply('Choose', inKbrd);
  } else {
      ctx.reply('Выбирайте', inKbrdRU);
  }

});
bot.on('location', (ctx) => {
  if (ctx.session === undefined) {
    ctx.session = {
      userLat: null,
      userLon: null,
      }
  };

  ctx.session.userLat = ctx.message.location.latitude;
  ctx.session.userLon = ctx.message.location.longitude;

  if(options.params.lang == 'en') {
    ctx.reply('Choose', inKbrd);
  } else {
      ctx.reply('Выбирайте', inKbrdRU);
  }

});

bot.launch()
