const config = require("./config");
const chalk = require("chalk");

module.exports = async function handler(christ, msg, m, plugins) {
  try {
    const { body, sender, from, isGroup, isOwner, isSudo, isStaff } = msg;

    if (!body) return;
    if (!body.startsWith(config.prefix)) return;

    const args = body.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    const text = args.join(" ");

    if (!command) return;

    if (config.pmBlock && !isGroup && !isOwner && !isSudo) {
      await christ.sendMessage(from, { text: config.pmBlockMessage });
      return;
    }

    const plugin = plugins.get(command);
    if (!plugin) return;

    const ctx = {
      christ,
      msg,
      from,
      sender,
      args,
      text,
      isGroup,
      isOwner,
      isSudo,
      isStaff,
      quoted: msg.quoted || null,
      config,
      reply: async (content) => {
        if (typeof content === "string") {
          return await christ.sendMessage(from, { text: content }, { quoted: msg });
        }
        return await christ.sendMessage(from, content, { quoted: msg });
      },
      react: async (emoji) => {
        return await christ.sendMessage(from, {
          react: { text: emoji, key: msg.key },
        });
      },
    };

    if (plugin.ownerOnly && !isOwner) {
      return await ctx.reply("❌ Cette commande est réservée à l'owner.");
    }
    if (plugin.sudoOnly && !isOwner && !isSudo) {
      return await ctx.reply("❌ Cette commande est réservée aux sudos.");
    }
    if (plugin.staffOnly && !isOwner && !isSudo && !isStaff) {
      return await ctx.reply("❌ Cette commande est réservée au staff.");
    }
    if (plugin.groupOnly && !isGroup) {
      return await ctx.reply("❌ Cette commande ne fonctionne qu'en groupe.");
    }
    if (plugin.privateOnly && isGroup) {
      return await ctx.reply("❌ Cette commande ne fonctionne qu'en privé.");
    }

    await plugin.execute(ctx);
  } catch (e) {
    console.error(chalk.red("Erreur handler:"), e.message);
    try {
      await christ.sendMessage(msg.from || msg.chat, {
        text: `❌ Erreur: ${e.message}`,
      }, { quoted: msg });
    } catch {}
  }
};
