import { InlineKeyboard } from "grammy"

export default {
  name: "button",
  cmd: ["button"],
  tags: "main",
  desc: "buat button",
  run: async ({ ctx, m }) => {
    const inlineKeyboard = new InlineKeyboard()
      .url("Github", "https://github.com/seedev43")
      .url("Facebook", "https://www.facebook.com/khunbotme").row()
      .text("Callback button", "oke")

    return await ctx.api.sendMessage(m.chatid, "INI MENU BUTTON", {
      reply_markup: inlineKeyboard,
    });
  },
};
