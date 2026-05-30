const axios = require("axios");

module.exports = {
  command: ["url"],
  description: "Raccourcir ou infos d'une URL",
  execute: async ({ text, reply }) => {
    if (!text) return await reply("❌ Usage: .url <lien>\nEx: .url https://youtube.com");
    try {
      const res = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(text)}`);
      await reply(`🔗 *URL Raccourcie:*\n\n📌 Original: ${text}\n✂️ Court: ${res.data}`);
    } catch (e) {
      await reply(`❌ Erreur: ${e.message}`);
    }
  },
};
