const fs = require("fs");
const path = require("path");
const config = require("../../config");

module.exports = {
  command: ["clearsession"],
  description: "Vider la session du bot",
  ownerOnly: true,
  execute: async ({ reply }) => {
    try {
      const sessionPath = path.resolve(config.sessionFolder || "./session");
      fs.rmSync(sessionPath, { recursive: true, force: true });
      fs.mkdirSync(sessionPath, { recursive: true });
      await reply("✅ Session vidée! Redémarrez le bot.");
    } catch (e) {
      await reply(`❌ Erreur: ${e.message}`);
    }
  },
};
