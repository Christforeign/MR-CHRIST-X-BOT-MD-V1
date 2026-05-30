const axios = require("axios");

module.exports = {
  command: ["emojimix", "emix"],
  description: "Mixer deux emojis ensemble",
  execute: async ({ christ, from, args, text, msg, reply, react }) => {
    if (!args[0] || !args[1]) return await reply("❌ Usage: .emojimix 😂 😍\nEx: .emojimix 🔥 💧");
    await react("🎭");
    const emoji1 = args[0].trim();
    const emoji2 = args[1].trim();
    try {
      const codepoint1 = emoji1.codePointAt(0).toString(16);
      const codepoint2 = emoji2.codePointAt(0).toString(16);
      const url = `https://www.gstatic.com/android/keyboard/emojikitchen/20201001/u${codepoint1}/u${codepoint1}_u${codepoint2}.png`;
      await christ.sendMessage(from, { image: { url }, caption: `${emoji1} + ${emoji2} = 🎨` }, { quoted: msg.raw });
    } catch (e) {
      await reply(`❌ Erreur: Ces emojis ne peuvent pas être mixés.`);
    }
  },
};
