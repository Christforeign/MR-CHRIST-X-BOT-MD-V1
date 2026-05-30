module.exports = {
  command: ["viewonce", "vo"],
  description: "Voir un message view once",
  execute: async ({ christ, from, msg, quoted, reply }) => {
    if (!quoted) return await reply("❌ Réponds à un message view once.");
    const q = quoted;
    if (!q.message) return await reply("❌ Message introuvable.");
    const type = Object.keys(q.message)[0];
    if (type !== "viewOnceMessage" && type !== "viewOnceMessageV2") return await reply("❌ Ce n'est pas un message view once.");
    const inner = q.message[type]?.message;
    if (!inner) return await reply("❌ Contenu introuvable.");
    const innerType = Object.keys(inner)[0];
    await christ.sendMessage(from, { forward: { key: q.key, message: inner }, }, { quoted: msg.raw });
  },
};
