const config = require("../../config");
module.exports = {
  command: ["antilink"],
  description: "Activer/désactiver l'anti-lien",
  groupOnly: true,
  execute: async ({ args, reply }) => {
    const param = args[0]?.toLowerCase();
    if (param === "on") {
      config.antiLink = true;
      await reply("✅ Anti-lien *activé!*");
    } else if (param === "off") {
      config.antiLink = false;
      await reply("❌ Anti-lien *désactivé!*");
    } else {
      await reply(`🔗 Anti-lien: *${config.antiLink ? "ON" : "OFF"}*\n\nUsage: .antilink on/off`);
    }
  },
};
