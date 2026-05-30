const axios = require("axios");

module.exports = {
  command: ["attp"],
  description: "Créer un sticker texte animé",
  execute: async ({ christ, from, text, msg, reply, react }) => {
    if (!text) return await reply("❌ Usage: .attp <texte>");
    await react("✨");
    try {
      const res = await axios.get(`https://api.siputzx.my.id/api/sticker/attp?text=${encodeURIComponent(text)}`, { responseType: "arraybuffer" });
      await christ.sendMessage(from, { sticker: Buffer.from(res.data) }, { quoted: msg.raw });
    } catch {
      try {
        const res2 = await axios.get(`https://api.dreamseller.biz.id/attp?text=${encodeURIComponent(text)}`, { responseType: "arraybuffer" });
        await christ.sendMessage(from, { sticker: Buffer.from(res2.data) }, { quoted: msg.raw });
      } catch (e) {
        await reply(`❌ Erreur attp: ${e.message}`);
      }
    }
  },
};
