import "../../setting.js";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import chalk from "chalk";
import Collection from "../lib/collection.js";
import { fileURLToPath } from "node:url";
const require = createRequire(import.meta.url);

global.tags = [];
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const commands = new Collection();
const aliases = new Collection();

const Message = async (ctx, m, db) => {
  try {
    // const filePath = path.join(__dirname, "../../", "db.json");
    // let getDB = JSON.parse(fs.readFileSync(filePath));
    let getDB = require("../../config.json");
    if (!getDB.settings.public && !m.isOwner) return;
    if (!m) return;
    if (m.isBot) return;

    const prefix = (m.prefix =
      /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@\/#%^&.©^😁🥴😶]/gi.test(m.body)
        ? m.body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@\/#%^&.©^😁🥴😶]/gi)[0]
        : "");
    const cmd = (m.cmd =
      m.body &&
      m.body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase());
    const command = (m.command =
      commands.get(cmd) ||
      commands.find((v) => v.aliases && v.aliases.includes(cmd)) ||
      aliases.get(cmd));

    if (m && !m.isBot) {
      console.log(
        chalk.black(chalk.bgWhite("- FROM")),
        chalk.black(chalk.bgGreen(m.name)),
        chalk.black(chalk.yellow(m.fromid)) +
          "\n" +
          chalk.black(chalk.bgWhite("- IN")),
        chalk.black(
          chalk.bgGreen(m.isGroup ? "Group Chat" : "Private Chat", m.chatid)
        ) +
          "\n" +
          chalk.black(chalk.bgWhite("- MESSAGE")),
        chalk.black(chalk.bgGreen(m.body || m.type))
      );
    }

    if (command && !m.isBot) {
      if (command.default.main) {
        return global.mess("main", m);
      }

      if (command.default.isOwner && !m.isOwner) {
        return m.reply("Command hanya untuk owner bot");
      }
    }

    if (!prefix && command?.default?.noPrefix) {
      command.default
        .run({
          ctx,
          m,
          db,
        })
        ?.then((a) => a)
        ?.catch((error) => console.log(error));
    }

    // for command with prefix
    if (!!prefix && m.body.startsWith(prefix)) {
      command.default
        .run({
          ctx,
          m,
          db,
        })
        ?.then((a) => a)
        ?.catch((error) => console.log(error));
    }
  } catch (error) {
    console.log(error);
  }
};

const readCommands = async (pathname = "cmd", filename = "") => {
  const dir = path.join(__dirname, "..", pathname);
  const dirs = fs.readdirSync(dir);
  dirs
    .filter((a) => a !== "function")
    .map(async (res) => {
      let files = fs
        .readdirSync(`${dir}/${res}`)
        .filter((file) => file.endsWith(".js"));
      for (const file of files) {
        const command = await import(`../${pathname}/${res}/${file}`);
        reloadFile(set.func.__filename(`${dir}/${res}/${file}`, false));
        commands.set(command.default.name, command);
        if (command.default.cmd)
          command.default.cmd.forEach((alias) => aliases.set(alias, command));
        if (!global.tags.includes(command.default.tags))
          global.tags.push(command.default.tags);
      }
    });
  commands.sort();
};

export { Message, readCommands };

reloadFile(import.meta.url);
