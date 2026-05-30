const axios = require("axios");

module.exports = {
  command: ["lyrics", "paroles"],
  description: "Obtenir les paroles d'une chanson",
  execute: async ({ text, reply, react }) => {
    if (!text) return await reply("❌ Usage: .lyrics <titre - artiste>\nEx: .lyrics Caille - Harmonik");
    await react("🎼");
    try {
      const res = await axios.get(`https://some-random-api.com/lyrics?title=${encodeURIComponent(text)}`);
      const data = res.data;
      if (!data.lyrics) return await reply("❌ Paroles introuvables.");
      const lyricsText = `🎼 *${data.title}*\n👤 *${data.author}*\n\n${data.lyrics.substring(0, 4000)}${data.lyrics.length > 4000 ? "\n\n_...suite trop longue_" : ""}`;
      await reply(lyricsText);
    } catch {
      await reply(`❌ Paroles introuvables pour: *${text}*`);
    }
  },
};
