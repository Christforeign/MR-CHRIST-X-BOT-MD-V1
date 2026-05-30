const insults = [
  "Tu es aussi utile qu'un parapluie sous la pluie avec des trous! ☂️", "Même Google ne peut pas t'aider! 🔍",
  "Tu es la preuve que les erreurs peuvent marcher! 🚶", "Si bête était un super-pouvoir, tu serais invincible! 💪",
  "Tu parles tellement que même le silence est content quand tu te tais! 🤫",
  "Ton cerveau a besoin d'une mise à jour! 💻", "Tu es l'expert en faire des erreurs! 🏅",
  "Même ton ombre essaie de te fuir! 👤", "Tu es tellement lent que tu dépasses les tortues en reculant! 🐢",
  "Si la bêtise était une vertu, tu serais un saint! 😇",
];
module.exports = {
  command: ["insult"],
  description: "Envoyer une insulte humoristique",
  execute: async ({ reply }) => {
    await reply(`😤 *Insulte (humour):*\n\n_${insults[Math.floor(Math.random() * insults.length)]}_`);
  },
};
