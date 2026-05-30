const { downloadMediaMessage } = require("@whiskeysockets/baileys");

module.exports = {
  command: ["simage", "toimage"],
  description: "Convertir un sticker en image",
  execute: async ({ christ, from, msg, quoted, reply, react }) => {
    const q = quoted || msg;
    const mtype = q?.mtype || q?.type;
    if (mtype !== "stickerMessage" && mtype !== "sticker") return await reply("❌ Réponds à un sticker.");
    await react("🖼️");
    try {
      const buffer = await downloadMediaMessage(q.raw || q, "buffer", {});
      await christ.sendMessage(from, { image: buffer, caption: "🖼️ Sticker → Image" }, { quoted: msg.raw });
    } catch (e) {
      await reply(`❌ Erreur: ${e.message}`);
    }
  },
};
