export default {
  name: "switch",
  cmd: ["switch"],
  tags: "owner",
  desc: "switch mode public or self",
  run: ({ m }) => {
    let status;
    let getStatus = global.set.func.readJSONFile("config.json");
    if (getStatus.settings.public) {
      status = false;
      //set.opt.public = false
      // getStatus.data.settings.public = false;
      m.reply("Self mode active");
      console.log("Self mode active");
    } else {
      //set.opt.public = true
      status = true;
      // getStatus.data.settings.public = true;
      m.reply("Public mode active");
      console.log("Public mode active");
    }
    global.set.func.editJSONFile("config.json", "settings.public", status);
  },
  isOwner: true,
};
