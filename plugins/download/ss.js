const axios = require("axios");

module.exports = {
  command: ["ss", "screenshot"],
  description: "Capture d'écran d'un site web",
  execute: async ({ christ, from, text, msg, reply, react }) => {
    if (!text) return await reply("❌ Usage: .ss <URL>\nEx: .ss https://google.com");
    await react("📸");
    try {
      const ssUrl = `https://image.thum.io/get/width/1280/crop/900/allowJPG/wait/20/noanimate/${encodeURIComponent(text)}`;
      await christ.sendMessage(from, {
        image: { url: ssUrl },
        caption: `📸 *Screenshot de:* ${text}`,
      }, { quoted: msg.raw });
    } catch (e) {
      await reply(`❌ Erreur: ${e.message}`);
    }
  },
};
