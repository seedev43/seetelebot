import "../setting.js";
import dotenv from "dotenv";
import express from "express";
dotenv.config();

// const app = express();
// app.use(express.json());

import { Bot, serialize } from "./lib/serialize.js";
import { Message, readCommands } from "./event/message.js";
import { answerCallbackQuery } from "./event/answerCallbackQuery.js";

const { botToken, domain } = process.env;

const bot = new Bot(botToken);

console.log("BOT ACTIVE!");
process.on("uncaughtException", console.error);
process.on("unhandledRejection", console.error);
readCommands();

bot.on("callback_query", async (update) => {
  await answerCallbackQuery(bot, update);
});

bot.on("message", async (update) => {
  const m = await serialize(bot, update);
  await Message(bot, m, update);
});

bot.start();

//untuk method webhook
// app.use(`/${botToken}`, webhookCallback(bot, "express"));
// app.listen(process.env.PORT, async () => {
//   console.log(`listening on port: ${process.env.PORT}`);
//   await bot.api.setWebhook(`https://${domain}/${botToken}`);
// });
