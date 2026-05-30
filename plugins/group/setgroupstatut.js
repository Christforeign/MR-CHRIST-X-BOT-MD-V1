module.exports = {
  command: ["setgroupstatut", "setdesc"],
  description: "Modifier la description du groupe",
  groupOnly: true,
  execute: async ({ christ, from, text, reply }) => {
    if (!text) return await reply("❌ Usage: .setgroupstatut <description>");
    try {
      await christ.groupUpdateDescription(from, text);
      await reply(`✅ *Description du groupe mise à jour!*\n\n_${text}_`);
    } catch (e) {
      await reply(`❌ Erreur: ${e.message}`);
    }
  },
};
