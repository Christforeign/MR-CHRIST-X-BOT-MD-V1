const { parseJid } = require("../../lib/utils");

module.exports = {
  command: ["mention"],
  description: "Mentionner un membre",
  groupOnly: true,
  execute: async ({ christ, from, args, msg, reply }) => {
    if (!args[0]) return await reply("❌ Usage: .mention @membre");
    const target = args[0].replace("@", "") + "@s.whatsapp.net";
    await christ.sendMessage(from, {
      text: `👤 Mention: @${target.split("@")[0]}`,
      mentions: [target],
    }, { quoted: msg.raw });
  },
};
