import { Bot as _Bot } from "grammy";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
const __dirname = dirname(fileURLToPath(import.meta.url));

export class Bot extends _Bot {
  constructor(...args) {
    super(...args);
  }

  async getFileLink(file_id) {
    let getFile = await this.api.getFile(file_id);
    getFile.link = `https://api.telegram.org/file/bot${this.token}/${getFile.file_path}`;
    return getFile;
  }
}

export const serialize = async (ctx, m) => {
  if (!m) return;
  if (m.update) {
    if (m.update.message) {
      m.updatemsg = m.update.message;
      m.msgid = m.updatemsg.message_id;
      m.fromid = m.updatemsg.from.id;
      m.chatid = m.updatemsg.chat.id;
      m.fname = m.updatemsg.from.first_name;
      m.lname =
        m.updatemsg.from.last_name !== undefined
          ? m.updatemsg.from.last_name
          : "";
      m.name = m.fname + " " + m.lname;
      m.isBot = m.updatemsg.from?.is_bot;
      m.isGroup = m.updatemsg.chat.type !== "private" ? true : false;

      if (m.updatemsg.reply_to_message) {
        let replymsg = (m.replymsg = m.updatemsg.reply_to_message);
        m.fileid = replymsg?.photo
          ? replymsg.photo[replymsg.photo.length - 1].file_id
          : replymsg[Object.keys(replymsg)[4]].file_id;
      }

      m.body = m.updatemsg.text;
      m.arg = m?.body?.trim()?.split(/ +/) || [];
      m.args = m?.body?.trim()?.split(/ +/)?.slice(1) || [];
      m.text = m?.args?.join(" ");
      m.date = m.updatemsg.date;
      m.sender = m.replymsg?.from.id || m.fromid
      m.isOwner = m.sender && [...set.owner].indexOf(m.sender) !== -1 ? true : false
      //m.isOwner = [...set.owner].includes(m.fromid)
      console.log(m)
    }
    // console.log(m);
  }

  m.reply = (text, options = {}) => {
    return ctx.api.sendMessage(m.chatid, text, {
      reply_to_message_id: m?.msgid,
      ...options,
    });
  };

  // console.log(m);

  return m;
};

let fileP = fileURLToPath(import.meta.url);
fs.watchFile(fileP, () => {
  fs.unwatchFile(fileP);
  console.log(`Update File "${fileP}"`);
  import(`${import.meta.url}?update=${Date.now()}`);
});
