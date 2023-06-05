import { InlineKeyboard } from "grammy"

export default {
  name: "button",
  cmd: ["button"],
  tags: "main",
  desc: "buat button",
  run: async ({ ctx, m }) => {
    const inlineKeyboard = new InlineKeyboard()
      .url("Github", "https://github.com/seedev4")
      .url("Facebook", "https://www.facebook.com/khunbotme").row()
      .text("Callback button", "oke")

    m.reply("INI MENU BUTTON", { reply_markup: inlineKeyboard })

    ctx.api.sendMessage(m.chatid, "Ini button", {
      reply_markup: inlineKeyboard,
    });
  },
};
