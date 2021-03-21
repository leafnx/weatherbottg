const { Telegraf } = require('telegraf')
const axios = require("axios").default;

const options = {
  method: 'GET',
  url: 'https://community-open-weather-map.p.rapidapi.com/weather',
  params: {
  //  q: 'London,uk',
    lat: '0',
    lon: '0',
    callback: '',
//    id: '2172797',
    lang: 'null',
    units: 'metric',
    mode: 'xml, html'
  },
  headers: {
    'x-rapidapi-key': 'fb55adb6f1msh4004c667879b7a7p1ec77ejsnc23812672588',
    'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
  }
};

const bot = new Telegraf('1717568476:AAHBD98TBElaJ7YQ4aTFZlK9OBRpzxBi-JU')
bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('location', (ctx) => {
  ctx.reply(`Сасиии`)
};
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()





// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });
