const { downloadMediaMessage } = require("@whiskeysockets/baileys");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");
const path = require("path");
const fs = require("fs");
const config = require("../../config");

module.exports = {
  command: ["sticker", "s"],
  description: "Créer un sticker depuis une image ou vidéo",
  execute: async ({ christ, from, msg, quoted, reply, react }) => {
    const q = quoted || msg;
    const mtype = q?.mtype || q?.type;
    const isImage = mtype === "imageMessage" || mtype === "image";
    const isVideo = mtype === "videoMessage" || mtype === "video";
    if (!isImage && !isVideo) return await reply("❌ Envoie ou réponds à une image/vidéo avec .sticker");
    await react("🖼️");
    try {
      const buffer = await downloadMediaMessage(q.raw || q, "buffer", {});
      const sticker = new Sticker(buffer, {
        pack: config.botName,
        author: config.ownerName,
        type: StickerTypes.FULL,
        quality: 50,
      });
      const stickerBuffer = await sticker.toBuffer();
      await christ.sendMessage(from, { sticker: stickerBuffer }, { quoted: msg.raw });
    } catch (e) {
      await reply(`❌ Erreur sticker: ${e.message}`);
    }
  },
};
