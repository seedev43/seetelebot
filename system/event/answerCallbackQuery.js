export const answerCallbackQuery = async (ctx, m) => {
  if (m.update?.callback_query) {
    let cb = m.update.callback_query;
    m.cbid = cb.id;
    m.cbdata = cb.data;
    m.msgid = cb.message.message_id;
  }
  return m;
};
