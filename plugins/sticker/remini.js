const { downloadMediaMessage } = require("@whiskeysockets/baileys");
const axios = require("axios");

module.exports = {
  command: ["remini", "enhance"],
  description: "Améliorer la qualité d'une image",
  execute: async ({ christ, from, msg, quoted, reply, react }) => {
    const q = quoted || msg;
    const mtype = q?.mtype || q?.type;
    if (mtype !== "imageMessage" && mtype !== "image") return await reply("❌ Envoie ou réponds à une image.");
    await react("✨");
    await reply("✨ *Amélioration en cours...*");
    try {
      const buffer = await downloadMediaMessage(q.raw || q, "buffer", {});
      const b64 = buffer.toString("base64");
      const res = await axios.post("https://api.siputzx.my.id/api/e/remini", { image: b64 }, { timeout: 30000 });
      const enhanced = res.data?.data || res.data?.result;
      if (!enhanced) return await reply("❌ Impossible d'améliorer cette image.");
      const imgBuffer = Buffer.from(enhanced, "base64");
      await christ.sendMessage(from, { image: imgBuffer, caption: "✨ Image améliorée!" }, { quoted: msg.raw });
    } catch (e) {
      await reply(`❌ Erreur: ${e.message}`);
    }
  },
};
