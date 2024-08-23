import { Telegraf } from 'telegraf';

const TOKEN = "6105978175:AAHwUfLm4HlV0iTt2yKRKomzV0Hhwjf1sW4";
const bot = new Telegraf(TOKEN);

// const web_link = "http://localhost:5173/";

bot.start((ctx) =>
  ctx.reply("Welcome :)))))", {
    reply_markup: {
      keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
    },
  })
);

bot.launch();
