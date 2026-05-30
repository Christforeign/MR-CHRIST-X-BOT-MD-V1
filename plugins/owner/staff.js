const config = require("../../config");

module.exports = {
  command: ["staff", "addstaff", "delstaff"],
  description: "Gérer le staff",
  ownerOnly: true,
  execute: async ({ args, msg, reply }) => {
    const cmd = msg.body.split(" ")[0].slice(config.prefix.length).toLowerCase();
    const target = msg.mentionedJids[0] || (args[0] ? args[0].replace("@", "") + "@s.whatsapp.net" : null);

    if (cmd === "staff") {
      if (!config.staffNumbers.length) return await reply("📋 *Aucun staff enregistré.*");
      const list = config.staffNumbers.map((n, i) => `${i + 1}. @${n}`).join("\n");
      return await reply(`👥 *Liste du Staff:*\n\n${list}`);
    }
    if (!target) return await reply("❌ Mentionne un utilisateur.");
    const num = target.split("@")[0];
    if (cmd === "addstaff") {
      if (config.staffNumbers.includes(num)) return await reply("❌ Déjà staff.");
      config.staffNumbers.push(num);
      await reply(`✅ @${num} ajouté au staff!`);
    } else if (cmd === "delstaff") {
      const idx = config.staffNumbers.indexOf(num);
      if (idx === -1) return await reply("❌ Pas staff.");
      config.staffNumbers.splice(idx, 1);
      await reply(`✅ @${num} retiré du staff!`);
    }
  },
};
