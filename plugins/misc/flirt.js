const flirts = [
  "Si tu étais une étoile, tu serais la plus brillante! ⭐", "Mon cœur bat plus vite quand je te lis! 💓",
  "Tu es aussi beau(belle) que le lever du soleil! 🌅", "Si tu étais un livre, je te lirais toute la nuit! 📖",
  "Tu as volé mon cœur sans même le savoir! 💝", "Chaque message de toi est un rayon de soleil! ☀️",
  "Tu dois être un ange, tu es trop parfait(e)! 👼", "Avec toi, chaque jour est une aventure! 🌺",
  "Tu es la mélodie préférée de mon cœur! 🎵", "Mon téléphone sourit quand tu m'écris! 📱",
];
module.exports = {
  command: ["flirt"],
  description: "Envoyer un flirt",
  execute: async ({ reply }) => {
    await reply(`💘 *Flirt:*\n\n_${flirts[Math.floor(Math.random() * flirts.length)]}_`);
  },
};
