export default {
  name: "button",
  cmd: ["button"],
  tags: "main",
  desc: "buat button",
  run: async ({ ctx, m }) => {
    let arr = {
      inline_keyboard: [
        [
          { text: "Satu", url: "https://google.com" },
          { text: "Dua", url: "https://github.com" },
        ],
        [{ text: "Callback button", callback_data: "/oke" }],
      ],
    };
    
    let ini = m.reply("buat button", {
      reply_markup: arr,
    });
    
    if(m?.cb) {
      console.log("ini konsol dari respon button")
    }
  },
};
