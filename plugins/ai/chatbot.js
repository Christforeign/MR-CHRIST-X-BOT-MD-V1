const config = require("../../config");

const chatbotGroups = new Set();

module.exports = {
  command: ["chatbot"],
  description: "Activer/désactiver le chatbot dans le groupe",
  groupOnly: true,
  execute: async ({ from, args, reply }) => {
    const param = args[0]?.toLowerCase();
    if (param === "on") {
      chatbotGroups.add(from);
      await reply("🤖 *Chatbot activé dans ce groupe!*\n\nJe répondrai à tous les messages.");
    } else if (param === "off") {
      chatbotGroups.delete(from);
      await reply("🔇 *Chatbot désactivé dans ce groupe.*");
    } else {
      await reply(`🤖 Chatbot: *${chatbotGroups.has(from) ? "ON" : "OFF"}*\n\nUsage: .chatbot on/off`);
    }
  },
  chatbotGroups,
};
