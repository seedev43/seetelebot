export default {
  name: "switch",
  cmd: ["switch"],
  tags: "owner",
  desc: "switch mode public or self",
  run: ({ m, config }) => {
    if (config.options.public) {
      config.options.public = false;
      m.reply("Self mode active");
      console.log("Self mode active");
    } else {
      config.options.public = true;
      m.reply("Public mode active");
      console.log("Public mode active");
    }
  },
  isOwner: true,
};
