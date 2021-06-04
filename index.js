import { Telegraf, session } from 'telegraf';
import dotenv from 'dotenv';
import axios from 'axios';
import { options } from './modules/options.js';
import { inKbrdEN, inKbrdRU, inKbrdLang } from './modules/keyboards.js';
import { sessionStart } from './modules/helpers.js';
import { Actions } from './modules/botActions.js';
dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const resp = new Actions;
const apiHost = process.env.API_HOST;

bot.use(session());
bot.action('dayWeather', async (ctx) => {
  if(Date.now() - ctx.session.lastReqTimeDayweather > 5000) {
    ctx.session.lastReqTimeDayweather = Date.now();
    ctx.reply(await resp.dayWeather(ctx.session));
  } else {
      ctx.reply(`Pay 300$ or wait ${(5000-(Date.now() - ctx.session.lastReqTimeDayweather)) / 1000} sec`);
    }
});
// bot.action('5dWeather', async (ctx) => {
//   if(Date.now() - ctx.session.lastReqTime5dweather > 5000) {
//     ctx.session.lastReqTime5dweather = Date.now();
//     console.log(await resp.fiveDaysWeather(ctx.session));
//     ctx.reply(await resp.fiveDaysWeather(ctx.session));
//   } else {
//     ctx.reply(`Pay 300$ or wait ${(5000-(Date.now() - ctx.session.lastReqTime5dweather)) / 1000} sec`);
//   }
// });
bot.action('5dWeather', async (ctx) => {
  const abc = await resp.fiveDaysWeather(ctx.session);
  abc.forEach((pogoda) => {
    console.log(pogoda);
    if(ctx.session.lang == 'en') {
      ctx.reply(`Weather for ${pogoda.dt_txt.slice(0, 10)}\n\r`+
       `General: ${pogoda.weather[0].main}\n\r`+
       `Temperature: ${Math.round(pogoda.main.temp)}°C, `+
       `feels like ${Math.round(pogoda.main.feels_like)}°C\n\r`+
       `Wind: ${pogoda.wind.speed} mps`);
    } else {
       ctx.reply(`Погода на ${pogoda.dt_txt.slice(0, 10)}\n\r`+
         `Общее: ${pogoda.weather[0].main}\n\r`+
         `Температура: ${Math.round(pogoda.main.temp)}°C, `+
         `по ощущению ${Math.round(pogoda.main.feels_like)}°C\n\r`+
         `Ветер: ${pogoda.wind.speed} м/с`);
     }
  })
});
bot.action('langEN', (ctx) => {
  sessionStart(ctx);
  ctx.session.lang = 'en';
});
bot.action('langRU', (ctx) => {
  sessionStart(ctx);
  ctx.session.lang = 'ru';
})

bot.start((ctx) => ctx.reply('Hello, please choose language', inKbrdLang));
bot.help((ctx) => ctx.reply('Hello please send me your location'));

bot.command('test', (ctx) => {
  sessionStart(ctx);

  ctx.session.userLat = '54.5314';
  ctx.session.userLon = '36.3089';

  if(ctx.session.lang == 'en') {
    ctx.reply('Choose', inKbrdEN);
    } else {
      ctx.reply('Выбирайте', inKbrdRU);
      }
});
bot.on('location', (ctx) => {
  sessionStart(ctx);

  ctx.session.userLat = ctx.message.location.latitude;
  ctx.session.userLon = ctx.message.location.longitude;

  if(ctx.session.lang == 'en') {
    ctx.reply('Choose', inKbrdEN);
  } else {
      ctx.reply('Выбирайте', inKbrdRU);
  }

});

bot.launch()
