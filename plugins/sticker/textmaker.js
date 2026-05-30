const axios = require("axios");

module.exports = {
  command: ["textmaker", "tmaker"],
  description: "Créer un texte stylé (PNG)",
  execute: async ({ christ, from, args, text, msg, reply, react }) => {
    if (!text) return await reply("❌ Usage: .textmaker <texte>\nEx: .textmaker CHRIST MD V1");
    await react("✏️");
    try {
      const res = await axios.get(`https://api.siputzx.my.id/api/m/textsticker?text=${encodeURIComponent(text)}`, { responseType: "arraybuffer" });
      await christ.sendMessage(from, { image: Buffer.from(res.data), caption: `✏️ *${text}*` }, { quoted: msg.raw });
    } catch (e) {
      await reply(`❌ Erreur: ${e.message}`);
    }
  },
};
