const { banned } = require("./ban");
module.exports = {
  command: ["unban"],
  description: "Débannir un membre",
  groupOnly: true,
  execute: async ({ from, args, msg, reply }) => {
    const target = msg.mentionedJids[0] || (args[0] ? args[0].replace("@", "") + "@s.whatsapp.net" : null);
    if (!target) return await reply("❌ Mentionne le membre à débannir.");
    const key = `${from}_${target}`;
    if (!banned[key]) return await reply("❌ Ce membre n'est pas banni.");
    delete banned[key];
    await reply(`✅ @${target.split("@")[0]} a été débanni.`);
  },
};
