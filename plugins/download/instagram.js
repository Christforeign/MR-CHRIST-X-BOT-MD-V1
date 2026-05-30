const axios = require("axios");

module.exports = {
  command: ["instagram", "ig"],
  description: "Télécharger un post Instagram",
  execute: async ({ christ, from, text, msg, reply, react }) => {
    if (!text) return await reply("❌ Usage: .instagram <URL post Instagram>");
    await react("📸");
    try {
      const res = await axios.get(`https://instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com/get-info-rapidapi?url=${encodeURIComponent(text)}`, {
        headers: {
          "X-RapidAPI-Key": process.env.RAPID_API_KEY || "demo",
          "X-RapidAPI-Host": "instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com"
        }
      });
      const data = res.data;
      if (data.Type === "Video") {
        await christ.sendMessage(from, {
          video: { url: data.media },
          caption: `📸 Instagram\n${data.title || ""}`,
        }, { quoted: msg.raw });
      } else if (data.Type === "Image") {
        await christ.sendMessage(from, {
          image: { url: data.media },
          caption: `📸 Instagram\n${data.title || ""}`,
        }, { quoted: msg.raw });
      } else {
        await reply("❌ Format non supporté.");
      }
    } catch (e) {
      await reply(`❌ Erreur: ${e.message}\n\n_Configurez RAPID_API_KEY dans .env_`);
    }
  },
};
