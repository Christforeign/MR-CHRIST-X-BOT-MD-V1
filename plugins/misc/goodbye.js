const config = require("../../config");

module.exports = {
  command: ["goodbye", "aurevoir"],
  description: "Message d'au revoir",
  execute: async ({ reply }) => {
    await reply(`👋 *Au revoir!*\n\n_Merci d'avoir utilisé ${config.botName}._\n\nN'oublie pas de rejoindre nos canaux:\n🔗 ${config.whatsappChannel1}\n🔗 ${config.whatsappChannel2}`);
  },
};
