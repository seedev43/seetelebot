import moment from "moment-timezone";
moment.tz.setDefault("Asia/Jakarta").locale("id");

const processTime = (timestamp, now) => {
  return moment.duration(now - moment(timestamp * 1000)).asSeconds();
};

export default {
  name: "ping",
  cmd: ["ping"],
  tags: "main",
  desc: "ping your bot",
  run: async ({ ctx, m }) => {
    return m.reply(`Pong!\n🏎️ ${processTime(m.date, moment())} seconds`);
  },
  noPrefix: true,
};
