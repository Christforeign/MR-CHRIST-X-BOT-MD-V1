const axios = require("axios");
const fs = require("fs");
const path = require("path");
const config = require("../../config");

module.exports = {
  command: ["tiktok", "tt"],
  description: "Télécharger une vidéo TikTok",
  execute: async ({ christ, from, text, msg, reply, react }) => {
    if (!text) return await reply("❌ Usage: .tiktok <URL TikTok>\nEx: .tiktok https://vm.tiktok.com/...");
    await react("⬇️");
    try {
      const res = await axios.get(`https://api.tiklydown.eu.org/api/download?url=${encodeURIComponent(text)}`);
      const data = res.data;
      if (!data.video?.noWatermark) return await reply("❌ Impossible de télécharger cette vidéo.");
      await reply(`⬇️ *Téléchargement TikTok...*\n\n📌 *${data.title || "TikTok Video"}*`);
      await christ.sendMessage(from, {
        video: { url: data.video.noWatermark },
        caption: `🎵 ${data.title || "TikTok"}\n👤 ${data.author?.name || ""}`,
        fileName: "tiktok_video.mp4",
      }, { quoted: msg.raw });
    } catch (e) {
      await reply(`❌ Erreur: ${e.message}`);
    }
  },
};
