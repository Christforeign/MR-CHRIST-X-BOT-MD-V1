const config = require("../config");

async function handleAntiEvents(christ, mek) {
  try {
    const from = mek.key?.remoteJid;
    if (!from?.endsWith("@g.us")) return;

    const body = mek.message?.conversation || mek.message?.extendedTextMessage?.text || "";
    const sender = mek.key?.participant || mek.key?.remoteJid || "";
    const isOwner = config.ownerNumber.includes(sender.replace(/\D/g, ""));
    const isSudo = config.sudoNumbers.includes(sender.replace(/\D/g, "")) || isOwner;

    if (config.antiLink && !isOwner && !isSudo) {
      const urlRegex = /(https?:\/\/[^\s]+)|(wa\.me\/[^\s]+)|(chat\.whatsapp\.com\/[^\s]+)/gi;
      if (urlRegex.test(body)) {
        try {
          await christ.sendMessage(from, {
            text: `⚠️ @${sender.split("@")[0]} les liens ne sont pas autorisés!`,
            mentions: [sender],
          });
          await christ.groupParticipantsUpdate(from, [sender], "remove");
        } catch {}
      }
    }

    if (config.antiBadWord && !isOwner && !isSudo) {
      const lower = body.toLowerCase();
      if (config.badWords.some(w => lower.includes(w.toLowerCase()))) {
        try {
          await christ.sendMessage(from, { delete: mek.key });
          await christ.sendMessage(from, {
            text: `⚠️ @${sender.split("@")[0]} gros mot supprimé!`,
            mentions: [sender],
          });
        } catch {}
      }
    }

    if (config.antiTag && !isOwner && !isSudo) {
      const mentions = mek.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
      if (mentions.length > 5) {
        try {
          await christ.sendMessage(from, { delete: mek.key });
          await christ.sendMessage(from, {
            text: `⚠️ @${sender.split("@")[0]} tag massif non autorisé!`,
            mentions: [sender],
          });
        } catch {}
      }
    }
  } catch {}
}

module.exports = { handleAntiEvents };
