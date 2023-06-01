import "./setting.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { exec, spawn } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log("Starting Bot Telegram...");

function start() {
  let args = [
    path.join(__dirname, "system", "bot.js"),
    ...process.argv.slice(2),
  ];
  let p = spawn(process.argv[0], args, {
    stdio: ["inherit", "inherit", "inherit", "ipc"],
  })
    .on("message", (data) => {
      if (data == "reset") {
        console.log("Restarting...");
        p.kill();
        start();
      }
    })
    .on("exit", () => {
      start();
    });
}

setInterval(async () => {
  exec("rm -rf temp/*");
}, 60000);

start();
