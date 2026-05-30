const fs = require("fs");
const path = require("path");
const config = require("../../config");

module.exports = {
  command: ["cleartmp"],
  description: "Vider les fichiers temporaires",
  ownerOnly: true,
  execute: async ({ reply }) => {
    try {
      const tmpPath = path.resolve(config.tempFolder || "./temp");
      const files = fs.readdirSync(tmpPath);
      for (const file of files) {
        fs.unlinkSync(path.join(tmpPath, file));
      }
      await reply(`✅ *${files.length} fichier(s) temporaire(s) supprimé(s)!*`);
    } catch (e) {
      await reply(`❌ Erreur: ${e.message}`);
    }
  },
};
