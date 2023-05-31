export const answerCallbackQuery = async (ctx, m) => {
  if (m.update.callback_query) {
    let cb = m.update.callback_query;
    m.cb = await serialize(ctx, cb);
    m.cbid = cb.id;
    m.cbdata = cb.data;
    m.msgid = cb.message.message_id;
  }
  console.log(m);
  return m;
};
