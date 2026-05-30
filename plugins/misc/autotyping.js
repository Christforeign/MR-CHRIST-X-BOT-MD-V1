const config = require("../../config");

module.exports = {
  command: ["autotyping"],
  description: "Activer/désactiver la frappe automatique",
  ownerOnly: true,
  execute: async ({ args, reply }) => {
    const param = args[0];
    if (param === "on") {
      config.autoTyping = true;
      await reply("✅ Frappe automatique *activée*");
    } else if (param === "off") {
      config.autoTyping = false;
      await reply("❌ Frappe automatique *désactivée*");
    } else {
      await reply(`🔄 Frappe automatique: *${config.autoTyping ? "ON" : "OFF"}*\n\nUsage: .autotyping on/off`);
    }
  },
};
