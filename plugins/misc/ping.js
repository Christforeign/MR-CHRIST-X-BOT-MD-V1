module.exports = {
  command: ["ping"],
  description: "Ping du bot",
  execute: async ({ christ, from, msg, reply }) => {
    const start = Date.now();
    await christ.sendMessage(from, { text: "⏳ Calcul..." }, { quoted: msg.raw });
    const end = Date.now();
    await reply(`🏓 *Pong!*\n⚡ Ping: *${end - start}ms*`);
  },
};
