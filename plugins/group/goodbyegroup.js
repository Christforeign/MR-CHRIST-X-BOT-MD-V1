const config = require("../../config");
module.exports = {
  command: ["goodbyegroup"],
  description: "Activer/désactiver le message d'au revoir",
  groupOnly: true,
  execute: async ({ args, reply }) => {
    const param = args[0]?.toLowerCase();
    if (param === "on") {
      config.goodbyeMessage = true;
      await reply("✅ Message d'au revoir *activé!*");
    } else if (param === "off") {
      config.goodbyeMessage = false;
      await reply("❌ Message d'au revoir *désactivé!*");
    } else {
      await reply(`👋 Au revoir: *${config.goodbyeMessage ? "ON" : "OFF"}*\n\nUsage: .goodbyegroup on/off`);
    }
  },
};
