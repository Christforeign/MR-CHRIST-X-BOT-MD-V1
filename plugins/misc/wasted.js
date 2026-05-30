const axios = require("axios");

module.exports = {
  command: ["wasted"],
  description: "Effet wasted sur photo de profil",
  execute: async ({ christ, from, msg, sender, quoted, reply }) => {
    const target = quoted ? quoted.sender || sender : sender;
    try {
      const ppUrl = await christ.profilePictureUrl(target, "image").catch(() => null);
      if (!ppUrl) return await reply("❌ Photo de profil introuvable.");
      const wastedUrl = `https://some-random-api.com/canvas/wasted?avatar=${ppUrl}`;
      await christ.sendMessage(from, { image: { url: wastedUrl }, caption: "💀 *WASTED*" }, { quoted: msg.raw });
    } catch {
      await reply("❌ Erreur lors de la génération de l'effet wasted.");
    }
  },
};
