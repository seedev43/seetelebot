import { InlineKeyboard } from "grammy";

export const answerCallbackQuery = async (bot, m) => {
  if (m.update?.callback_query) {
    m.cb = m.update?.callback_query;
    m.cbdata = m.cb.data;
    m.msgid = m.cb.message.message_id;
    m.chatid = m.cb.message.chat.id;

    if (m.cbdata == "oke") {
      bot.api.editMessageText(m.chatid, m.msgid, "edit pesan button", {
        reply_markup: new InlineKeyboard()
          .text("Button 1", "btn1")
          .text("Button 2", "btn2").row()
          .text("Button 3", "btn3")
      });
    } else if(m.cbdata == "btn1") {
      bot.api.editMessageText(m.chatid, m.msgid, "Button 1 di klik", {
        reply_markup: new InlineKeyboard()
          .text("Button 2", "btn2")
          .text("Button 3", "btn3").row()
          .text("Kembali", "oke")
      })
    }
  }
  return m;
};
