export default {
  name: "tes",
  cmd: ["oke"],
  tags: "main",
  desc: "oke aja",
  run: async ({ ctx, m, cb }) => {
    if (cb) {
      console.log(cb);
    }
  },
};
