const msgs = [
  "🌙 Bonne nuit! Que tes rêves soient aussi beaux que toi! ✨",
  "🌟 Dors bien! Demain est un nouveau jour plein de possibilités! 🌅",
  "💫 Bonne nuit! Que les étoiles veillent sur toi! ⭐",
  "🌙 Repose-toi bien! Tu le mérites! 😴",
  "✨ Bonne nuit! Que la paix t'accompagne jusqu'au matin! 🌸",
];
module.exports = {
  command: ["goodnight", "bonnenuit"],
  description: "Message bonne nuit",
  execute: async ({ reply }) => {
    await reply(msgs[Math.floor(Math.random() * msgs.length)]);
  },
};
