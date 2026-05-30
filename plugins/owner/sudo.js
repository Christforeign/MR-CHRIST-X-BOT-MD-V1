const config = require("../../config");

module.exports = {
  command: ["sudo", "addsudo", "delsudo"],
  description: "Gérer les sudos",
  ownerOnly: true,
  execute: async ({ args, msg, reply }) => {
    const cmd = msg.body.split(" ")[0].slice(config.prefix.length).toLowerCase();
    const target = msg.mentionedJids[0] || (args[0] ? args[0].replace("@", "") + "@s.whatsapp.net" : null);

    if (cmd === "sudo") {
      if (!config.sudoNumbers.length) return await reply("📋 *Aucun sudo enregistré.*");
      const list = config.sudoNumbers.map((n, i) => `${i + 1}. @${n}`).join("\n");
      return await reply(`👥 *Liste des Sudos:*\n\n${list}`);
    }
    if (!target) return await reply("❌ Mentionne un utilisateur.");
    const num = target.split("@")[0];
    if (cmd === "addsudo") {
      if (config.sudoNumbers.includes(num)) return await reply("❌ Déjà sudo.");
      config.sudoNumbers.push(num);
      await reply(`✅ @${num} ajouté comme sudo!`);
    } else if (cmd === "delsudo") {
      const idx = config.sudoNumbers.indexOf(num);
      if (idx === -1) return await reply("❌ Pas sudo.");
      config.sudoNumbers.splice(idx, 1);
      await reply(`✅ @${num} retiré des sudos!`);
    }
  },
};
