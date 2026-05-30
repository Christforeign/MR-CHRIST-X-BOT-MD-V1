const axios = require("axios");

module.exports = {
  command: ["ai", "gpt", "chatgpt"],
  description: "Poser une question à l'IA",
  execute: async ({ text, reply, react }) => {
    if (!text) return await reply("❌ Usage: .ai <question>\nEx: .ai C'est quoi Haiti?");
    await react("🤖");
    try {
      const res = await axios.get(`https://api.siputzx.my.id/api/ai/gpt3?prompt=${encodeURIComponent(text)}`);
      const answer = res.data?.data || res.data?.result || res.data?.message || "Aucune réponse obtenue.";
      await reply(`🤖 *Christ X AI*\n\n❓ *Question:* ${text}\n\n💡 *Réponse:*\n${answer}`);
    } catch {
      try {
        const res2 = await axios.get(`https://api.ryzendesu.vip/api/ai/chatgpt?text=${encodeURIComponent(text)}`);
        const answer = res2.data?.answer || res2.data?.response || "Erreur de connexion à l'IA.";
        await reply(`🤖 *Christ X AI*\n\n❓ *Question:* ${text}\n\n💡 *Réponse:*\n${answer}`);
      } catch (e) {
        await reply(`❌ Erreur IA: ${e.message}`);
      }
    }
  },
};
