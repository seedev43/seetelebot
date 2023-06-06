import { InlineKeyboard } from "grammy";

export const answerCallbackQuery = async (ctx, m) => {
  if (m.update?.callback_query) {
    m.cb = m.update?.callback_query;
    m.cbdata = m.cb.data;
    m.msgid = m.cb.message.message_id;
    m.chatid = m.cb.message.chat.id;

    if (m.cbdata == "oke") {
      ctx.api.editMessageText(m.chatid, m.msgid, "edit pesan button", {
        reply_markup: new InlineKeyboard()
          .text("Button 1", "btn1")
          .text("Button 2", "btn2")
          .text("Button 3", "btn3")
      });
    }
  }
  return m;
};
