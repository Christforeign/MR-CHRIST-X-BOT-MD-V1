const config = require("../../config");

module.exports = {
  command: ["pmblocker"],
  description: "Activer/désactiver le blocage des PM",
  ownerOnly: true,
  execute: async ({ args, reply }) => {
    const param = args[0]?.toLowerCase();
    if (param === "on") {
      config.pmBlock = true;
      await reply(`✅ *PM Blocker activé!*\n\nMessage: _${config.pmBlockMessage}_`);
    } else if (param === "off") {
      config.pmBlock = false;
      await reply("❌ *PM Blocker désactivé!*");
    } else if (param === "msg" && args[1]) {
      config.pmBlockMessage = args.slice(1).join(" ");
      await reply(`✅ *Message PM Blocker mis à jour:*\n_${config.pmBlockMessage}_`);
    } else {
      await reply(`🛡️ *PM Blocker:* ${config.pmBlock ? "ON" : "OFF"}\n\nUsage:\n.pmblocker on\n.pmblocker off\n.pmblocker msg <message>`);
    }
  },
};
