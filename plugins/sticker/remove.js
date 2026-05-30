const { downloadMediaMessage } = require("@whiskeysockets/baileys");
const axios = require("axios");
const FormData = require("form-data");

module.exports = {
  command: ["remove", "rmbg"],
  description: "Enlever le fond d'une image",
  execute: async ({ christ, from, msg, quoted, reply, react }) => {
    const q = quoted || msg;
    const mtype = q?.mtype || q?.type;
    if (mtype !== "imageMessage" && mtype !== "image") return await reply("❌ Envoie ou réponds à une image.");
    await react("🪄");
    await reply("🪄 *Suppression du fond en cours...*");
    try {
      const buffer = await downloadMediaMessage(q.raw || q, "buffer", {});
      const form = new FormData();
      form.append("image_file", buffer, { filename: "image.png", contentType: "image/png" });
      form.append("size", "auto");
      const res = await axios.post("https://api.remove.bg/v1.0/removebg", form, {
        headers: { ...form.getHeaders(), "X-Api-Key": process.env.REMOVEBG_API_KEY || "demo" },
        responseType: "arraybuffer",
      });
      await christ.sendMessage(from, { image: Buffer.from(res.data), caption: "🪄 Fond supprimé!" }, { quoted: msg.raw });
    } catch (e) {
      await reply(`❌ Erreur: ${e.message}\n\n_Configurez REMOVEBG_API_KEY dans .env_`);
    }
  },
};
