const inKbrdEN = {
  reply_markup: {
    inline_keyboard: [
      [
        {text: 'Today forecast', callback_data: 'dayWeather'},
        {text: '5 days forecast', callback_data: '5dWeather'},
      ]
    ]
  }
};

const inKbrdRU = {
  reply_markup: {
    inline_keyboard: [
      [
        {text: 'Погода на сегодня', callback_data: 'dayWeather'},
        {text: 'Погода на 5 дней', callback_data: '5dWeather'},
      ]
    ]
  }
};

const inKbrdLang = {
  reply_markup: {
    inline_keyboard: [
      [
        {text: 'EN', callback_data: 'langEN'},
        {text: 'RU', callback_data: 'langRU'},
      ]
    ]
  }
};

export { inKbrdEN, inKbrdRU, inKbrdLang }
