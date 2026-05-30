const { downloadMediaMessage } = require("@whiskeysockets/baileys");
const sharp = require("sharp");

module.exports = {
  command: ["imgblur", "blur"],
  description: "Flouter une image",
  execute: async ({ christ, from, msg, quoted, args, reply, react }) => {
    const q = quoted || msg;
    const mtype = q?.mtype || q?.type;
    if (mtype !== "imageMessage" && mtype !== "image") return await reply("❌ Envoie ou réponds à une image.");
    await react("🌫️");
    try {
      const buffer = await downloadMediaMessage(q.raw || q, "buffer", {});
      const level = parseInt(args[0]) || 10;
      const blurred = await sharp(buffer).blur(Math.min(Math.max(level, 1), 100)).toBuffer();
      await christ.sendMessage(from, {
        image: blurred,
        caption: `🌫️ Image floutée (niveau: ${level})`,
      }, { quoted: msg.raw });
    } catch (e) {
      await reply(`❌ Erreur: ${e.message}`);
    }
  },
};
