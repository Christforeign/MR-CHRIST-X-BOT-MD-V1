module.exports = {
  command: ["topmembers"],
  description: "Top membres du groupe",
  groupOnly: true,
  execute: async ({ christ, from, msg, reply }) => {
    try {
      const metadata = await christ.groupMetadata(from);
      const members = metadata.participants;
      const admins = members.filter(m => m.admin);
      let text = `🏆 *Top Membres - ${metadata.subject}*\n\n`;
      text += `👥 Total membres: *${members.length}*\n`;
      text += `👑 Admins: *${admins.length}*\n\n`;
      text += `*Admins:*\n`;
      admins.forEach((m, i) => { text += `${i + 1}. @${m.id.split("@")[0]} ${m.admin === "superadmin" ? "👑" : "⭐"}\n`; });
      await christ.sendMessage(from, {
        text,
        mentions: admins.map(m => m.id),
      }, { quoted: msg.raw });
    } catch (e) {
      await reply(`❌ Erreur: ${e.message}`);
    }
  },
};
