module.exports = {
  command: ["groupmanage", "opengroup", "closegroup"],
  description: "Gérer les paramètres du groupe",
  groupOnly: true,
  execute: async ({ christ, from, msg, reply }) => {
    const cmd = msg.body.split(" ")[0].slice(1).toLowerCase();
    try {
      if (cmd === "opengroup") {
        await christ.groupSettingUpdate(from, "not_announcement");
        await reply("🔓 *Groupe ouvert!* Tous les membres peuvent écrire.");
      } else if (cmd === "closegroup") {
        await christ.groupSettingUpdate(from, "announcement");
        await reply("🔒 *Groupe fermé!* Seuls les admins peuvent écrire.");
      } else {
        await reply("Usage: .opengroup ou .closegroup");
      }
    } catch (e) {
      await reply(`❌ Erreur: ${e.message}`);
    }
  },
};
