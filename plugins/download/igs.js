const axios = require("axios");

module.exports = {
  command: ["igs", "igstory"],
  description: "Télécharger une story Instagram",
  execute: async ({ christ, from, text, msg, reply, react }) => {
    if (!text) return await reply("❌ Usage: .igs <username Instagram>\nEx: .igs @christforeign");
    await react("📷");
    await reply(`📷 *Stories Instagram de ${text}*\n\n_Fonctionnalité disponible avec API premium._\n\n💡 Configurez RAPID_API_KEY dans votre .env`);
  },
};
