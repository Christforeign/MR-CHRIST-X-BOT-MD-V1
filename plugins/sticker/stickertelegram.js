const { downloadMediaMessage } = require("@whiskeysockets/baileys");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");
const config = require("../../config");

module.exports = {
  command: ["stickertelegram", "stickertelgm", "stelgm"],
  description: "Sticker style Telegram (transparent)",
  execute: async ({ christ, from, msg, quoted, reply, react }) => {
    const q = quoted || msg;
    const mtype = q?.mtype || q?.type;
    if (mtype !== "imageMessage" && mtype !== "image") return await reply("❌ Envoie ou réponds à une image.");
    await react("📦");
    try {
      const buffer = await downloadMediaMessage(q.raw || q, "buffer", {});
      const sticker = new Sticker(buffer, {
        pack: "Telegram Style",
        author: config.ownerName,
        type: StickerTypes.CROPPED,
        quality: 50,
      });
      await christ.sendMessage(from, { sticker: await sticker.toBuffer() }, { quoted: msg.raw });
    } catch (e) {
      await reply(`❌ Erreur: ${e.message}`);
    }
  },
};
