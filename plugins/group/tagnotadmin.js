module.exports = {
  command: ["tagnotadmin"],
  description: "Taguer les membres non-admin",
  groupOnly: true,
  execute: async ({ christ, from, text, msg, reply }) => {
    try {
      const meta = await christ.groupMetadata(from);
      const nonAdmins = meta.participants.filter(p => !p.admin);
      if (!nonAdmins.length) return await reply("❌ Pas de membres non-admin.");
      const mentions = nonAdmins.map(p => p.id);
      const tagText = `📢 *${text || "Message pour les non-admins:"}*\n\n` + mentions.map(j => `@${j.split("@")[0]}`).join(" ");
      await christ.sendMessage(from, { text: tagText, mentions }, { quoted: msg.raw });
    } catch (e) {
      await reply(`❌ Erreur: ${e.message}`);
    }
  },
};
