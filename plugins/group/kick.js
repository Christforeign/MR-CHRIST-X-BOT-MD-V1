module.exports = {
  command: ["kick", "remove"],
  description: "Expulser un membre du groupe",
  groupOnly: true,
  execute: async ({ christ, from, args, msg, quoted, reply }) => {
    const target = quoted?.sender || msg.mentionedJids[0] || (args[0] ? args[0].replace("@", "") + "@s.whatsapp.net" : null);
    if (!target) return await reply("❌ Mentionne le membre à expulser.");
    try {
      await christ.groupParticipantsUpdate(from, [target], "remove");
      await reply(`✅ @${target.split("@")[0]} a été expulsé du groupe.`);
    } catch (e) {
      await reply(`❌ Erreur: ${e.message}`);
    }
  },
};
