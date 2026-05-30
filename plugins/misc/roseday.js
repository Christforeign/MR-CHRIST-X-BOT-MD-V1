module.exports = {
  command: ["roseday"],
  description: "Message rose du jour",
  execute: async ({ reply }) => {
    await reply(`🌹 *Rose du Jour*\n\n_Je t'envoie cette rose pour te rappeler combien tu es spécial(e)._\n\n🌹🌹🌹🌹🌹\nBonne journée! 💐`);
  },
};
