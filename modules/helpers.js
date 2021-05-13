function sessionStart(ctx) {
  if (ctx.session === undefined) {
    ctx.session = {
      lang: 'en',
      lastReqTimeDayweather: null,
      lastReqTime5dweather: null,
    }
  };
};

export { sessionStart }
