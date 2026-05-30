const yts = require("yt-search");
const ytdl = require("ytdl-core");
const fs = require("fs");
const path = require("path");
const config = require("../../config");

module.exports = {
  command: ["video", "yt"],
  description: "Télécharger une vidéo YouTube",
  execute: async ({ christ, from, text, msg, reply, react }) => {
    if (!text) return await reply("❌ Usage: .video <titre ou URL>\nEx: .video Kompa Haiti");
    await react("🎬");
    try {
      let videoInfo;
      if (text.includes("youtube.com") || text.includes("youtu.be")) {
        const info = await ytdl.getInfo(text);
        videoInfo = { url: text, title: info.videoDetails.title, timestamp: info.videoDetails.lengthSeconds + "s" };
      } else {
        const results = await yts(text);
        if (!results.videos.length) return await reply("❌ Aucun résultat trouvé.");
        videoInfo = results.videos[0];
      }
      if (parseInt(videoInfo.seconds || 0) > 600) return await reply("❌ Vidéo trop longue (max 10 min).");
      await reply(`🎬 *Téléchargement...*\n\n📌 *${videoInfo.title}*\n⏱️ ${videoInfo.timestamp}`);
      const tmpFile = path.join(config.tempFolder || "./temp", `video_${Date.now()}.mp4`);
      await new Promise((resolve, reject) => {
        ytdl(videoInfo.url, { filter: "videoandaudio", quality: "highestvideo" })
          .pipe(fs.createWriteStream(tmpFile))
          .on("finish", resolve)
          .on("error", reject);
      });
      const stat = fs.statSync(tmpFile);
      if (stat.size > 65 * 1024 * 1024) {
        fs.unlinkSync(tmpFile);
        return await reply("❌ Fichier trop volumineux pour WhatsApp (max 64 MB).");
      }
      await christ.sendMessage(from, {
        video: fs.readFileSync(tmpFile),
        caption: `🎬 ${videoInfo.title}`,
        fileName: `${videoInfo.title}.mp4`,
      }, { quoted: msg.raw });
      fs.unlinkSync(tmpFile);
    } catch (e) {
      await reply(`❌ Erreur: ${e.message}`);
    }
  },
};
