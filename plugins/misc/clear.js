module.exports = {
  command: ["clear"],
  description: "Vider le chat",
  ownerOnly: true,
  execute: async ({ christ, from, reply }) => {
    let text = "";
    for (let i = 0; i < 30; i++) text += ".\n";
    await christ.sendMessage(from, { text: text + "\n✅ *Chat vidé!*" });
  },
};
