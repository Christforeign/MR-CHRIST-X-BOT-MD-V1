const config = require("../../config");

module.exports = {
  command: ["update"],
  description: "Vérifier la mise à jour du bot",
  execute: async ({ reply }) => {
    await reply(`📦 *${config.botName}*\n\n✅ Version actuelle: *${config.version}*\n\n🔗 GitHub: https://github.com/christforeign\n\n> Vérifiez le repo pour les nouvelles versions.`);
  },
};
