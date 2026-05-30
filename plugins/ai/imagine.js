const axios = require("axios");

module.exports = {
  command: ["imagine", "genimage", "dalle"],
  description: "Générer une image avec l'IA",
  execute: async ({ christ, from, text, msg, reply, react }) => {
    if (!text) return await reply("❌ Usage: .imagine <description>\nEx: .imagine Un coucher de soleil en Haïti");
    await react("🎨");
    await reply("🎨 *Génération de l'image en cours...*");
    try {
      const res = await axios.get(`https://api.ryzendesu.vip/api/image/prodia?prompt=${encodeURIComponent(text)}`, { timeout: 30000 });
      const imgUrl = res.data?.url || res.data?.image;
      if (!imgUrl) return await reply("❌ Impossible de générer l'image.");
      await christ.sendMessage(from, {
        image: { url: imgUrl },
        caption: `🎨 *Image générée par IA*\n\n_Prompt: ${text}_`,
      }, { quoted: msg.raw });
    } catch {
      try {
        const res2 = await axios.get(`https://hercai.onrender.com/v3/hercai?question=${encodeURIComponent("Generate image of: " + text)}`);
        const imgUrl = res2.data?.url;
        if (imgUrl) {
          await christ.sendMessage(from, { image: { url: imgUrl }, caption: `🎨 *${text}*` }, { quoted: msg.raw });
        } else {
          await reply("❌ Service de génération d'images indisponible pour le moment.");
        }
      } catch (e) {
        await reply(`❌ Erreur: ${e.message}`);
      }
    }
  },
};
