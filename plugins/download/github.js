const axios = require("axios");

module.exports = {
  command: ["github", "gh"],
  description: "Infos d'un repo GitHub",
  execute: async ({ text, reply, react }) => {
    if (!text) return await reply("❌ Usage: .github <user/repo>\nEx: .github christforeign/christxbot");
    await react("💻");
    try {
      const res = await axios.get(`https://api.github.com/repos/${text}`, {
        headers: { "User-Agent": "ChristXBot" }
      });
      const r = res.data;
      await reply(`💻 *GitHub Repo Info*\n\n` +
        `📌 *Nom:* ${r.full_name}\n` +
        `📝 *Description:* ${r.description || "Aucune"}\n` +
        `⭐ *Stars:* ${r.stargazers_count}\n` +
        `🍴 *Forks:* ${r.forks_count}\n` +
        `👀 *Watchers:* ${r.watchers_count}\n` +
        `🔤 *Langage:* ${r.language || "N/A"}\n` +
        `📅 *Créé:* ${new Date(r.created_at).toLocaleDateString("fr-FR")}\n` +
        `🔗 *URL:* ${r.html_url}`
      );
    } catch {
      await reply(`❌ Repo introuvable: *${text}*`);
    }
  },
};
