const config = require("../../config");

module.exports = {
  command: ["autostatus"],
  description: "Activer/désactiver le status automatique",
  ownerOnly: true,
  execute: async ({ args, reply }) => {
    const param = args[0];
    if (param === "on") {
      config.autoStatus = true;
      await reply("✅ Status automatique *activé*");
    } else if (param === "off") {
      config.autoStatus = false;
      await reply("❌ Status automatique *désactivé*");
    } else {
      await reply(`🔄 Status automatique: *${config.autoStatus ? "ON" : "OFF"}*\n\nUsage: .autostatus on/off`);
    }
  },
};
