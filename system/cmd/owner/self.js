export default {
  name: "switch",
  cmd: ["switch"],
  tags: "owner",
  desc: "switch mode public or self",
  run: ({ m }) => {
    let status;
    let getStatus = global.set.func.readJSONFile("db.json");
    if (getStatus.data.settings.public) {
      status = false;
      // getStatus.data.settings.public = false;
      m.reply("Self mode active");
      console.log("Self mode active");
    } else {
      status = true;
      // getStatus.data.settings.public = true;
      m.reply("Public mode active");
      console.log("Public mode active");
    }
    global.set.func.editJSONFile("db.json", "data.settings.public", status);
  },
  isOwner: true,
};
