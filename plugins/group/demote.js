module.exports = {
  command: ["demote", "unadmin"],
  description: "Rétrograder un admin",
  groupOnly: true,
  execute: async ({ christ, from, args, msg, quoted, reply }) => {
    const target = quoted?.sender || msg.mentionedJids[0] || (args[0] ? args[0].replace("@", "") + "@s.whatsapp.net" : null);
    if (!target) return await reply("❌ Mentionne l'admin à rétrograder.");
    try {
      await christ.groupParticipantsUpdate(from, [target], "demote");
      await reply(`✅ @${target.split("@")[0]} n'est plus admin.`);
    } catch (e) {
      await reply(`❌ Erreur: ${e.message}`);
    }
  },
};
