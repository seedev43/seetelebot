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
    m.type = Object.keys(m.message);
    m.isGroup = m.message.chat.type !== "private" ? true : false;
    m.body = m.message.text;
    m.arg = m?.body?.trim()?.split(/ +/) || [];
    m.args = m?.body?.trim()?.split(/ +/)?.slice(1) || [];
    m.text = m?.args?.join(" ");
    m.date = m.message.date;
    m.isOwner = [...global.set.owner].includes(Number(m.fromid));

    m.reply = (text, options = {}) => {
      return ctx.api.sendMessage(m.chatid, text, {
        reply_to_message_id: m.msgid,
        ...options,
      });
    };
  }
  console.log(m);
  return m;
};

export { serialize };
