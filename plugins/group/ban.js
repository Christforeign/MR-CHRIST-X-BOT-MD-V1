const banned = {};
module.exports = {
  command: ["ban"],
  description: "Bannir un membre (expulse et mémorise)",
  groupOnly: true,
  execute: async ({ christ, from, args, msg, quoted, reply }) => {
    const target = quoted?.sender || msg.mentionedJids[0] || (args[0] ? args[0].replace("@", "") + "@s.whatsapp.net" : null);
    if (!target) return await reply("❌ Mentionne le membre à bannir.");
    const key = `${from}_${target}`;
    banned[key] = true;
    try {
      await christ.groupParticipantsUpdate(from, [target], "remove");
      await reply(`🚫 @${target.split("@")[0]} a été banni du groupe.`);
    } catch (e) {
      await reply(`❌ Erreur: ${e.message}`);
    }
  },
  banned,
};
