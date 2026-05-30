module.exports = {
  command: ["tagall", "mentionall"],
  description: "Taguer tous les membres",
  groupOnly: true,
  execute: async ({ christ, from, text, msg, reply }) => {
    try {
      const meta = await christ.groupMetadata(from);
      const mentions = meta.participants.map(p => p.id);
      const tagText = `📢 *${text || "Attention tout le monde!"}*\n\n` + mentions.map(j => `@${j.split("@")[0]}`).join(" ");
      await christ.sendMessage(from, { text: tagText, mentions }, { quoted: msg.raw });
    } catch (e) {
      await reply(`❌ Erreur: ${e.message}`);
    }
  },
};
