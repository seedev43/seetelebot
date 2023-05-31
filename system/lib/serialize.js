import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
const __dirname = dirname(fileURLToPath(import.meta.url));

const serialize = async (ctx, m) => {
  if (!m) return;
  if (m.update) {
    if (m.update.message) {
      let updateMsg = (m.updatemsg = m.update.message);
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
        let replymsg = m.updatemsg.reply_to_message;
        m.fileid = replymsg?.photo
          ? replymsg.photo[replymsg.photo.length - 1].file_id
          : replymsg[Object.keys(replymsg)[4]].file_id;
      }

      m.body = m.updatemsg.text;
      m.arg = m?.body?.trim()?.split(/ +/) || [];
      m.args = m?.body?.trim()?.split(/ +/)?.slice(1) || [];
      m.text = m?.args?.join(" ");
      m.date = m.updatemsg.date;
      m.isOwner = [...global.set.owner].includes(Number(m.fromid));
    }
    // console.log(m);
  }

  m.reply = (text, options = {}) => {
    return ctx.api.sendMessage(m.chatid, text, {
      reply_to_message_id: m.msgid,
      ...options,
    });
  };

  // console.log(m);

  return m;
};

export { serialize };

let fileP = fileURLToPath(import.meta.url);
fs.watchFile(fileP, () => {
  fs.unwatchFile(fileP);
  console.log(`Update File "${fileP}"`);
  import(`${import.meta.url}?update=${Date.now()}`);
});
