const axios = require("axios");

module.exports = {
  command: ["facebook", "fb"],
  description: "Télécharger une vidéo Facebook",
  execute: async ({ christ, from, text, msg, reply, react }) => {
    if (!text) return await reply("❌ Usage: .facebook <URL vidéo Facebook>");
    await react("📘");
    try {
      const res = await axios.get(`https://facebook-video-downloader3.p.rapidapi.com/rapidapi`, {
        params: { url: text },
        headers: {
          "X-RapidAPI-Key": process.env.RAPID_API_KEY || "demo",
          "X-RapidAPI-Host": "facebook-video-downloader3.p.rapidapi.com"
        }
      });
      const links = res.data;
      if (!links || (!links.hd && !links.sd)) return await reply("❌ Vidéo introuvable.");
      const videoUrl = links.hd || links.sd;
      await christ.sendMessage(from, {
        video: { url: videoUrl },
        caption: "📘 Vidéo Facebook",
      }, { quoted: msg.raw });
    } catch (e) {
      await reply(`❌ Erreur: ${e.message}\n\n_Configurez RAPID_API_KEY dans .env_`);
    }
  },
};
