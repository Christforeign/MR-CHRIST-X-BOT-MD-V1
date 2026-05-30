const config = require("../../config");
module.exports = {
  command: ["welcome"],
  description: "Activer/désactiver le message de bienvenue",
  groupOnly: true,
  execute: async ({ args, reply }) => {
    const param = args[0]?.toLowerCase();
    if (param === "on") {
      config.welcomeMessage = true;
      await reply("✅ Message de bienvenue *activé!*");
    } else if (param === "off") {
      config.welcomeMessage = false;
      await reply("❌ Message de bienvenue *désactivé!*");
    } else {
      await reply(`👋 Bienvenue: *${config.welcomeMessage ? "ON" : "OFF"}*\n\nUsage: .welcome on/off`);
    }
  },
};
