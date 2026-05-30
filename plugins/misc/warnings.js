const warnings = {};

module.exports = {
  command: ["warnings"],
  description: "Voir les avertissements d'un membre",
  execute: async ({ args, from, sender, reply }) => {
    const target = args[0] ? (args[0].replace("@", "") + "@s.whatsapp.net") : sender;
    const key = `${from}_${target}`;
    const count = warnings[key] || 0;
    await reply(`⚠️ *Avertissements de @${target.split("@")[0]}:* ${count}/3`);
  },
};

module.exports.warnings = warnings;
