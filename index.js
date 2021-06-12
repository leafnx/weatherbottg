import { Telegraf, session } from 'telegraf';
import dotenv from 'dotenv';
import axios from 'axios';
import { options } from './modules/options.js';
import { inKbrdEN, inKbrdRU, inKbrdLang } from './modules/keyboards.js';
import { sessionStart } from './modules/helpers.js';
import { Actions } from './modules/botActions.js';
import { Language } from './modules/language.js';
dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const resp = new Actions;
const language = new Language;
const apiHost = process.env.API_HOST;

bot.use(session());
bot.action('dayWeather', async (ctx) => {
  if(Date.now() - ctx.session.lastReqTimeDayweather > 5000) {
    ctx.session.lastReqTimeDayweather = Date.now();
    const wData = await resp.dayWeather(ctx.session);
    ctx.reply(await language.dayWeatherLang(ctx.session, wData));
  } else {
      ctx.reply(`Pay 300$ or wait ${(5000-(Date.now() - ctx.session.lastReqTimeDayweather)) / 1000} sec`);
    }
});
bot.action('5dWeather', async (ctx) => {
  if(Date.now() - ctx.session.lastReqTime5dweather > 5000) {
    ctx.session.lastReqTime5dweather = Date.now();
      const fivedwData =  await resp.fiveDW(ctx.session);
      fivedwData.forEach((weather) => {
        ctx.reply(language.fiveDWLang(ctx.session, weather));
      });
  } else {
    ctx.reply(`Pay 300$ or wait ${(5000-(Date.now() - ctx.session.lastReqTime5dweather)) / 1000} sec`);
  }
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
