module.exports = {
  command: ["groupinfo", "ginfo"],
  description: "Infos du groupe",
  groupOnly: true,
  execute: async ({ christ, from, msg, reply }) => {
    try {
      const meta = await christ.groupMetadata(from);
      const admins = meta.participants.filter(p => p.admin);
      const text = `📋 *INFO GROUPE*\n\n` +
        `📌 *Nom:* ${meta.subject}\n` +
        `🆔 *ID:* ${from}\n` +
        `👥 *Membres:* ${meta.participants.length}\n` +
        `👑 *Admins:* ${admins.length}\n` +
        `📅 *Créé le:* ${new Date(meta.creation * 1000).toLocaleDateString("fr-FR")}\n` +
        `🔗 *Lien:* https://chat.whatsapp.com/${meta.inviteCode}\n\n` +
        `📝 *Description:*\n${meta.desc || "Aucune description"}`;
      await reply(text);
    } catch (e) {
      await reply(`❌ Erreur: ${e.message}`);
    }
  },
};
