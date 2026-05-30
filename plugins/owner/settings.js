const config = require("../../config");

module.exports = {
  command: ["settings"],
  description: "Voir et modifier les paramètres du bot",
  ownerOnly: true,
  execute: async ({ args, reply }) => {
    if (!args[0]) {
      return await reply(`⚙️ *Paramètres ${config.botName}*\n\n` +
        `Préfixe: *${config.prefix}*\n` +
        `PM Blocker: *${config.pmBlock ? "ON" : "OFF"}*\n` +
        `Auto Read: *${config.autoRead ? "ON" : "OFF"}*\n` +
        `Auto Status: *${config.autoStatus ? "ON" : "OFF"}*\n` +
        `Auto Typing: *${config.autoTyping ? "ON" : "OFF"}*\n` +
        `Anti Link: *${config.antiLink ? "ON" : "OFF"}*\n` +
        `Anti Delete: *${config.antiDelete ? "ON" : "OFF"}*\n` +
        `Anti Bad Word: *${config.antiBadWord ? "ON" : "OFF"}*\n` +
        `Anti Call: *${config.antiCall ? "ON" : "OFF"}*\n` +
        `Welcome: *${config.welcomeMessage ? "ON" : "OFF"}*\n` +
        `Goodbye: *${config.goodbyeMessage ? "ON" : "OFF"}*\n\n` +
        `Usage: .settings <param> <on/off>`
      );
    }
    const [param, val] = args;
    const boolMap = {
      pmblock: "pmBlock", autoread: "autoRead", autostatus: "autoStatus",
      autotyping: "autoTyping", antilink: "antiLink", antidelete: "antiDelete",
      antibadword: "antiBadWord", anticall: "antiCall",
      welcome: "welcomeMessage", goodbye: "goodbyeMessage",
    };
    const key = boolMap[param?.toLowerCase()];
    if (!key) return await reply("❌ Paramètre inconnu.");
    if (!val || !["on", "off"].includes(val.toLowerCase())) return await reply("❌ Valeur: on ou off");
    config[key] = val.toLowerCase() === "on";
    await reply(`✅ *${param}* mis à *${config[key] ? "ON" : "OFF"}*`);
  },
};
