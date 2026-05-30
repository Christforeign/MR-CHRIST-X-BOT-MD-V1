const { warnings } = require("./warnings");

module.exports = {
  command: ["warn"],
  description: "Avertir un membre",
  groupOnly: true,
  execute: async ({ christ, from, args, msg, quoted, reply }) => {
    const target = quoted ? quoted.sender : (args[0] ? args[0].replace("@", "") + "@s.whatsapp.net" : null);
    if (!target) return await reply("❌ Usage: .warn @membre ou réponds à un message");
    const key = `${from}_${target}`;
    warnings[key] = (warnings[key] || 0) + 1;
    const count = warnings[key];
    const text = `⚠️ *AVERTISSEMENT*\n\n@${target.split("@")[0]} a reçu un avertissement!\n*${count}/3*\n\n${count >= 3 ? "🔴 Limite atteinte! Action requise." : ""}`;
    await christ.sendMessage(from, { text, mentions: [target] }, { quoted: msg.raw });
  },
};
