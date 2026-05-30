const axios = require("axios");
const yts = require("yt-search");
const ytdl = require("ytdl-core");
const fs = require("fs");
const path = require("path");
const config = require("../../config");

module.exports = {
  command: ["spotify"],
  description: "Télécharger depuis Spotify (via YouTube)",
  execute: async ({ christ, from, text, msg, reply, react }) => {
    if (!text) return await reply("❌ Usage: .spotify <titre de la chanson>\nEx: .spotify Compas Direct");
    await react("🟢");
    try {
      const results = await yts(text + " audio");
      if (!results.videos.length) return await reply("❌ Aucun résultat trouvé.");
      const video = results.videos[0];
      await reply(`🟢 *Spotify → Audio*\n\n📌 *${video.title}*\n⏱️ ${video.timestamp}`);
      const tmpFile = path.join(config.tempFolder || "./temp", `spotify_${Date.now()}.mp3`);
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
