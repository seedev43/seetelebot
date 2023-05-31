export default {
  name: "button",
  cmd: ["button"],
  tags: "main",
  desc: "buat button",
  run: async ({ ctx, m, cb }) => {
    let arr = {
      inline_keyboard: [
        [
          { text: "Satu", url: "https://google.com" },
          { text: "Dua", url: "https://github.com" },
        ],
        [{ text: "Callback button", callback_data: "/oke" }],
      ],
    };

    return m
      .reply("buat button", {
        reply_markup: arr,
      })
      .then((a) => {
        if (cb) {
          cb;
          // console.log(a);
        }
      })
      .catch((e) => console.log(e));
  },
};
