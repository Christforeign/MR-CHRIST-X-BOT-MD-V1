module.exports = {
  command: ["promote", "admin"],
  description: "Promouvoir un membre en admin",
  groupOnly: true,
  execute: async ({ christ, from, args, msg, quoted, reply }) => {
    const target = quoted?.sender || msg.mentionedJids[0] || (args[0] ? args[0].replace("@", "") + "@s.whatsapp.net" : null);
    if (!target) return await reply("❌ Mentionne le membre à promouvoir.");
    try {
      await christ.groupParticipantsUpdate(from, [target], "promote");
      await reply(`⭐ @${target.split("@")[0]} est maintenant admin!`);
    } catch (e) {
      await reply(`❌ Erreur: ${e.message}`);
    }
  },
};
