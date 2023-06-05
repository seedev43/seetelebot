import fs from "node:fs";
import { fileURLToPath } from "node:url";
export default {
  options: {
    public: false,
  },
};

let fileP = fileURLToPath(import.meta.url);
fs.watchFile(fileP, () => {
  fs.unwatchFile(fileP);
  console.log(`Update File "${fileP}"`);
  import(`${import.meta.url}?update=${Date.now()}`);
});
