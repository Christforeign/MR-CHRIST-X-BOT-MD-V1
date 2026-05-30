module.exports = {
  command: ["resetlink", "revoke"],
  description: "Réinitialiser le lien d'invitation",
  groupOnly: true,
  execute: async ({ christ, from, msg, reply }) => {
    try {
      const newCode = await christ.groupRevokeInvite(from);
      await reply(`✅ *Lien réinitialisé!*\n\n🔗 Nouveau lien: https://chat.whatsapp.com/${newCode}`);
    } catch (e) {
      await reply(`❌ Erreur: ${e.message}`);
    }
  },
};
