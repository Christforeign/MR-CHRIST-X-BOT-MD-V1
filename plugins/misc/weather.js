const axios = require("axios");

module.exports = {
  command: ["weather", "meteo"],
  description: "Météo d'une ville",
  execute: async ({ args, text, reply }) => {
    if (!text) return await reply("❌ Usage: .weather <ville>\nEx: .weather Port-au-Prince");
    try {
      const res = await axios.get(`https://wttr.in/${encodeURIComponent(text)}?format=3`);
      await reply(`🌤️ *Météo - ${text}*\n\n${res.data}`);
    } catch {
      await reply(`❌ Impossible d'obtenir la météo pour *${text}*`);
    }
  },
};
