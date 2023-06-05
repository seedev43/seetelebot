export const answerCallbackQuery = async (ctx, m) => {
  if (m.update?.callback_query) {
    m.cb = m.update?.callback_query;
    m.cbdata = m.cb.data;
    m.msgid = m.cb.message.message_id;
    m.chatid = m.cb.message.chat.id;

    if (m.cbdata == "oke") {
      ctx.api.editMessageText(m.chatid, m.msgid, "edit pesan button", {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "Button 1", callback_data: "btn1" },
              { text: "Button 2", callback_data: "btn2" },
            ],
            [{ text: "Button 3", callback_data: "btn3" }],
          ],
        },
      });
    }
  }
  return m;
};
