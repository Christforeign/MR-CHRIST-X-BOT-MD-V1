const config = require("../../config");

module.exports = {
  command: ["autoread"],
  description: "Activer/désactiver la lecture automatique",
  ownerOnly: true,
  execute: async ({ args, reply }) => {
    const param = args[0];
    if (param === "on") {
      config.autoRead = true;
      await reply("✅ Lecture automatique *activée*");
    } else if (param === "off") {
      config.autoRead = false;
      await reply("❌ Lecture automatique *désactivée*");
    } else {
      await reply(`🔄 Lecture automatique: *${config.autoRead ? "ON" : "OFF"}*\n\nUsage: .autoread on/off`);
    }
  },
};
