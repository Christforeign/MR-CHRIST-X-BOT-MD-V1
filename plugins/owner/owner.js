const config = require("../../config");

module.exports = {
  command: ["owner"],
  description: "Infos de l'owner",
  execute: async ({ christ, from, msg, reply }) => {
    const text = `╔══════════════════════════╗
║     *OWNER INFO* 👑       ║
╚══════════════════════════╝

👤 *Nom:* ${config.ownerName}
📞 *WhatsApp:* ${config.ownerContact}
📱 *Telegram:* ${config.ownerTelegram}
💻 *GitHub:* ${config.ownerGithub}

📢 *Chaines WhatsApp:*
🔗 ${config.whatsappChannel1}
🔗 ${config.whatsappChannel2}

> _Pour toute aide ou support, contactez l'owner._`;
    try {
      await christ.sendMessage(from, {
        image: { url: config.menuImage },
        caption: text,
      }, { quoted: msg.raw });
    } catch {
      await reply(text);
    }
  },
};
