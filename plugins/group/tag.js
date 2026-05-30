module.exports = {
  command: ["tag"],
  description: "Taguer un ou plusieurs membres",
  groupOnly: true,
  execute: async ({ christ, from, args, msg, reply }) => {
    if (!msg.mentionedJids.length) return await reply("❌ Usage: .tag @membre1 @membre2");
    const mentions = msg.mentionedJids;
    const text = mentions.map(j => `@${j.split("@")[0]}`).join(" ");
    await christ.sendMessage(from, { text, mentions }, { quoted: msg.raw });
  },
};
