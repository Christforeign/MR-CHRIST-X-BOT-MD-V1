module.exports = {
  command: ["hidetag", "h"],
  description: "Taguer tous les membres de façon cachée",
  groupOnly: true,
  execute: async ({ christ, from, args, text, msg, reply }) => {
    if (!text) return await reply("❌ Usage: .hidetag <message>");
    try {
      const meta = await christ.groupMetadata(from);
      const mentions = meta.participants.map(p => p.id);
      await christ.sendMessage(from, { text, mentions }, { quoted: msg.raw });
    } catch (e) {
      await reply(`❌ Erreur: ${e.message}`);
    }
  },
};
