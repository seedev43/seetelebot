import func from "./system/lib/func.js";
import grammy from "grammy";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

global.reloadFile = (file) => reloadFile(file);

global.npm = {
  grammy: grammy
}

global.set = {
  owner: [466284462],
  opt: {
    public: false,
    prefix: "/",
  },
  func: func,
};

function reloadFile(file) {
  file = file.url || file;
  let fileP = fileURLToPath(file);
  fs.watchFile(fileP, () => {
    fs.unwatchFile(fileP);
    console.log(`Update File "${fileP}"`);
    import(`${file}?update=${Date.now()}`);
  });
}

reloadFile(import.meta.url);
