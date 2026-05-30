const yts = require("yt-search");
const ytdl = require("ytdl-core");
const fs = require("fs");
const path = require("path");
const config = require("../../config");

module.exports = {
  command: ["song", "music"],
  description: "Télécharger une chanson",
  execute: async ({ christ, from, text, msg, reply, react }) => {
    if (!text) return await reply("❌ Usage: .song <titre>\nEx: .song Wyclef Jean");
    await react("🎶");
    try {
      const results = await yts(text);
      if (!results.videos.length) return await reply("❌ Aucun résultat trouvé.");
      const video = results.videos[0];
      await reply(`🎶 *Téléchargement...*\n\n📌 *${video.title}*\n⏱️ ${video.timestamp}`);
      const tmpFile = path.join(config.tempFolder || "./temp", `song_${Date.now()}.mp3`);
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
