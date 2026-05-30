const yts = require("yt-search");
const ytdl = require("ytdl-core");
const fs = require("fs");
const path = require("path");
const config = require("../../config");

module.exports = {
  command: ["play"],
  description: "Télécharger l'audio d'une chanson YouTube",
  execute: async ({ christ, from, text, msg, reply, react }) => {
    if (!text) return await reply("❌ Usage: .play <titre de la chanson>\nEx: .play Kompa 2024");
    await react("🎵");
    try {
      const results = await yts(text);
      if (!results.videos.length) return await reply("❌ Aucun résultat trouvé.");
      const video = results.videos[0];
      await reply(`🎵 *Téléchargement en cours...*\n\n📌 *Titre:* ${video.title}\n⏱️ *Durée:* ${video.timestamp}\n👀 *Vues:* ${video.views}`);
      const tmpFile = path.join(config.tempFolder || "./temp", `audio_${Date.now()}.mp3`);
      await new Promise((resolve, reject) => {
        ytdl(video.url, { filter: "audioonly", quality: "highestaudio" })
          .pipe(fs.createWriteStream(tmpFile))
          .on("finish", resolve)
          .on("error", reject);
      });
      await christ.sendMessage(from, {
        audio: fs.readFileSync(tmpFile),
        mimetype: "audio/mpeg",
        fileName: `${video.title}.mp3`,
        ptt: false,
      }, { quoted: msg.raw });
      fs.unlinkSync(tmpFile);
    } catch (e) {
      await reply(`❌ Erreur: ${e.message}`);
    }
  },
};
