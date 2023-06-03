import "../setting.js";
import fs from "node:fs";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import express from "express";
dotenv.config();
const { botToken, domain } = process.env;

import { Bot, serialize } from "./lib/serialize.js";
import { Message, readCommands } from "./event/message.js";
import { answerCallbackQuery } from "./event/answerCallbackQuery.js";
import MongooseDB from "./lib/lib.mongodb.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
// const app = express();
// app.use(express.json());

const db = new MongooseDB();
const bot = new Bot(botToken);

console.log("BOT ACTIVE!");
process.on("uncaughtException", console.error);
process.on("unhandledRejection", console.error);
readCommands();

global.set.func.readJSONFile("config.json");

bot.on("callback_query", async (update) => {
  await answerCallbackQuery(bot, update);
});

bot.on("message", async (update) => {
  const m = await serialize(bot, update);
  await Message(bot, m, db);
});

bot.start({
  drop_pending_updates: true,
});

//untuk method webhook
// app.use(`/${botToken}`, webhookCallback(bot, "express"));
// app.listen(process.env.PORT, async () => {
//   console.log(`listening on port: ${process.env.PORT}`);
//   await bot.api.setWebhook(`https://${domain}/${botToken}`);
// });
