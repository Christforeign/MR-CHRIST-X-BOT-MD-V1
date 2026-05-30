const compliments = [
  "Tu es incroyable! ✨", "Tu es une personne merveilleuse! 🌟", "Ton sourire illumine la pièce! 😊",
  "Tu es brillant(e)! 🧠", "Le monde est meilleur grâce à toi! 🌍", "Tu es une source d'inspiration! 💫",
  "Ta gentillesse est contagieuse! 💖", "Tu mérites tout le bonheur du monde! 🌈", "Tu es exceptionnel(le)! 🏆",
  "Tu as un cœur en or! 💛",
];
module.exports = {
  command: ["compliment"],
  description: "Envoyer un compliment",
  execute: async ({ reply }) => {
    await reply(`💐 *Compliment du jour:*\n\n_${compliments[Math.floor(Math.random() * compliments.length)]}_`);
  },
};
