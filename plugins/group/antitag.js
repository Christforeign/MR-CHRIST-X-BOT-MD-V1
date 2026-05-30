const config = require("../../config");
module.exports = {
  command: ["antitag"],
  description: "Activer/désactiver l'anti-tag",
  groupOnly: true,
  execute: async ({ args, reply }) => {
    const param = args[0]?.toLowerCase();
    if (param === "on") {
      config.antiTag = true;
      await reply("✅ Anti-tag *activé!*");
    } else if (param === "off") {
      config.antiTag = false;
      await reply("❌ Anti-tag *désactivé!*");
    } else {
      await reply(`🏷️ Anti-tag: *${config.antiTag ? "ON" : "OFF"}*\n\nUsage: .antitag on/off`);
    }
  },
};
