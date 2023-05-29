export default {
  name: "ping",
  cmd: ["ping"],
  tags: "main",
  desc: "ping your bot",
  run: async ({ ctx, m, prefix }) => {
    return m.reply("pong");
  },
  noPrefix: true,
};
