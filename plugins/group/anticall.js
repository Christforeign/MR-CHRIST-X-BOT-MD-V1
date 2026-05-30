const config = require("../../config");
module.exports = {
  command: ["anticall"],
  description: "Activer/désactiver l'anti-appel",
  execute: async ({ args, reply }) => {
    const param = args[0]?.toLowerCase();
    if (param === "on") {
      config.antiCall = true;
      await reply("✅ Anti-appel *activé!*");
    } else if (param === "off") {
      config.antiCall = false;
      await reply("❌ Anti-appel *désactivé!*");
    } else {
      await reply(`📵 Anti-appel: *${config.antiCall ? "ON" : "OFF"}*\n\nUsage: .anticall on/off`);
    }
  },
};
