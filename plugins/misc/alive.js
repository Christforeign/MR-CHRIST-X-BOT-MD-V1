const config = require("../../config");

module.exports = {
  command: ["alive"],
  description: "Vérifier si le bot est actif",
  execute: async ({ christ, from, msg, reply }) => {
    const uptime = process.uptime();
    const h = Math.floor(uptime / 3600);
    const min = Math.floor((uptime % 3600) / 60);
    const s = Math.floor(uptime % 60);
    const text = `╔══════════════════════════════════╗
║        *CHRIST X V1* ✅         ║
╚══════════════════════════════════╝

🟢 *Statut:* En ligne
⏱️ *Uptime:* ${h}h ${min}m ${s}s
🔧 *Préfixe:* ${config.prefix}
📦 *Version:* ${config.version}
👤 *Owner:* ${config.ownerName}
📞 *Contact:* ${config.ownerContact}
💬 *Telegram:* ${config.ownerTelegram}

> _Je suis *CHRIST X V1*, toujours actif!_ 🤖`;
    try {
      await christ.sendMessage(from, {
        image: { url: config.menuImage },
        caption: text,
      }, { quoted: msg.raw || msg });
    } catch {
      await reply(text);
    }
  },
};
