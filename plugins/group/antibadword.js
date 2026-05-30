const config = require("../../config");
module.exports = {
  command: ["antibadword", "addbadword", "delbadword"],
  description: "Gérer l'anti-gros mots",
  groupOnly: true,
  execute: async ({ args, msg, config: cfg, reply }) => {
    const cmd = msg.body.split(" ")[0].slice(1).toLowerCase();
    if (cmd === "antibadword") {
      const param = args[0]?.toLowerCase();
      if (param === "on") { config.antiBadWord = true; return await reply("✅ Anti gros mots *activé!*"); }
      if (param === "off") { config.antiBadWord = false; return await reply("❌ Anti gros mots *désactivé!*"); }
      return await reply(`🤬 Anti gros mots: *${config.antiBadWord ? "ON" : "OFF"}*\nMots bannis: ${config.badWords.join(", ")}\n\nUsage: .antibadword on/off`);
    } else if (cmd === "addbadword") {
      if (!args[0]) return await reply("❌ Usage: .addbadword <mot>");
      config.badWords.push(args[0].toLowerCase());
      await reply(`✅ *${args[0]}* ajouté aux mots bannis.`);
    } else if (cmd === "delbadword") {
      if (!args[0]) return await reply("❌ Usage: .delbadword <mot>");
      const idx = config.badWords.indexOf(args[0].toLowerCase());
      if (idx === -1) return await reply("❌ Mot non trouvé.");
      config.badWords.splice(idx, 1);
      await reply(`✅ *${args[0]}* retiré des mots bannis.`);
    }
  },
};
