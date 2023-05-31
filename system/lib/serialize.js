import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
const __dirname = dirname(fileURLToPath(import.meta.url));

const serialize = async (ctx, m) => {
  if (!m) return;
  if (m.message) {
    m.msgid = m.message.message_id;
    m.fromid = m.message.from.id;
    m.chatid = m.message.chat.id;
    m.fname = m.message.from.first_name;
    m.lname =
      m.message.from.last_name !== undefined ? m.message.from.last_name : "";
    m.name = m.fname + " " + m.lname;
    m.isBot = m.message.from?.is_bot;
    m.isGroup = m.message.chat.type !== "private" ? true : false;
    
    if (m.message.reply_to_message) {
      let replymsg = m.message.reply_to_message;
      m.fileid = replymsg?.photo
        ? replymsg.photo[replymsg.photo.length - 1].file_id
        : replymsg[Object.keys(replymsg)[4]].file_id;
    }
    
    m.body = m.message.text;
    m.arg = m?.body?.trim()?.split(/ +/) || [];
    m.args = m?.body?.trim()?.split(/ +/)?.slice(1) || [];
    m.text = m?.args?.join(" ");
    m.date = m.message.date;
    m.isOwner = [...global.set.owner].includes(Number(m.fromid));
  
  } 
  if (m.update.callback_query) {
    let cb = (m.cb = m.update.callback_query);
    m.cbid = cb.id;
    m.cbdata = cb.data;
    m.msgid = cb.message.message_id;
  } 
    m.reply = (text, options = {}) => {
      return ctx.api.sendMessage(m.chatid, text, {
        reply_to_message_id: m.msgid,
        ...options,
      });
    };
  
  console.log(m)
  return m;
};

export { serialize };

let fileP = fileURLToPath(import.meta.url);
fs.watchFile(fileP, () => {
  fs.unwatchFile(fileP);
  console.log(`Update File "${fileP}"`);
  import(`${import.meta.url}?update=${Date.now()}`);
});
