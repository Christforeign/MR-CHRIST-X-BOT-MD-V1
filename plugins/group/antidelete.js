const config = require("../../config");
module.exports = {
  command: ["antidelete"],
  description: "Activer/désactiver l'anti-suppression",
  execute: async ({ args, reply }) => {
    const param = args[0]?.toLowerCase();
    if (param === "on") {
      config.antiDelete = true;
      await reply("✅ Anti-suppression *activé!*");
    } else if (param === "off") {
      config.antiDelete = false;
      await reply("❌ Anti-suppression *désactivé!*");
    } else {
      await reply(`🗑️ Anti-suppression: *${config.antiDelete ? "ON" : "OFF"}*\n\nUsage: .antidelete on/off`);
    }
  },
};
