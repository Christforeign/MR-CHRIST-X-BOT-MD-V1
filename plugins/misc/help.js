const config = require("../../config");

module.exports = {
  command: ["help", "menu"],
  description: "Affiche le menu des commandes",
  execute: async ({ christ, from, msg, reply }) => {
    const now = new Date();
    const h = now.getHours();
    const greet = h < 12 ? "🌅 Bonjour" : h < 18 ? "☀️ Bon après-midi" : "🌙 Bonsoir";

    const menu = `╔══════════════════════════════════╗
║        *CHRIST X V1* 🤖          ║
╚══════════════════════════════════╝
${greet}! — Préfixe: *${config.prefix}*

━━━━━━━━━━━━━━━━━━
*👑 OWNER*
━━━━━━━━━━━━━━━━━━
1. ${config.prefix}owner
2. ${config.prefix}sudo
3. ${config.prefix}staff
4. ${config.prefix}settings
5. ${config.prefix}pmblocker

━━━━━━━━━━━━━━━━━━
*👥 GROUPE*
━━━━━━━━━━━━━━━━━━
1. ${config.prefix}groupinfo
2. ${config.prefix}hidetag
3. ${config.prefix}tag
4. ${config.prefix}tagall
5. ${config.prefix}tagnotadmin
6. ${config.prefix}kick
7. ${config.prefix}ban
8. ${config.prefix}unban
9. ${config.prefix}promote
10. ${config.prefix}demote
11. ${config.prefix}resetlink
12. ${config.prefix}welcome
13. ${config.prefix}anticall
14. ${config.prefix}antilink
15. ${config.prefix}antidelete
16. ${config.prefix}antibadword
17. ${config.prefix}antitag
18. ${config.prefix}setgroupstatut

━━━━━━━━━━━━━━━━━━
*⬇️ TÉLÉCHARGEMENT*
━━━━━━━━━━━━━━━━━━
1. ${config.prefix}play
2. ${config.prefix}song
3. ${config.prefix}video
4. ${config.prefix}spotify
5. ${config.prefix}lyrics
6. ${config.prefix}facebook
7. ${config.prefix}instagram
8. ${config.prefix}tiktok
9. ${config.prefix}url
10. ${config.prefix}ss
11. ${config.prefix}github

━━━━━━━━━━━━━━━━━━
*🤖 INTELLIGENCE ARTIFICIELLE*
━━━━━━━━━━━━━━━━━━
1. ${config.prefix}ai
2. ${config.prefix}imagine
3. ${config.prefix}chatbot

━━━━━━━━━━━━━━━━━━
*🖼️ STICKER & IMAGE*
━━━━━━━━━━━━━━━━━━
1. ${config.prefix}sticker
2. ${config.prefix}stickercrop
3. ${config.prefix}stickertelegram
4. ${config.prefix}simage
5. ${config.prefix}attp
6. ${config.prefix}emojimix
7. ${config.prefix}textmaker
8. ${config.prefix}remove
9. ${config.prefix}remini
10. ${config.prefix}imgblur

━━━━━━━━━━━━━━━━━━
*🎮 JEUX*
━━━━━━━━━━━━━━━━━━
1. ${config.prefix}tictactoe

━━━━━━━━━━━━━━━━━━
*🛠️ UTILITAIRES*
━━━━━━━━━━━━━━━━━━
1. ${config.prefix}alive
2. ${config.prefix}ping
3. ${config.prefix}clear
4. ${config.prefix}clearsession
5. ${config.prefix}cleartmp
6. ${config.prefix}autoread
7. ${config.prefix}autostatus
8. ${config.prefix}autotyping
9. ${config.prefix}compliment
10. ${config.prefix}flirt
11. ${config.prefix}insult
12. ${config.prefix}mention
13. ${config.prefix}topmembers
14. ${config.prefix}wasted
15. ${config.prefix}weather
16. ${config.prefix}update
17. ${config.prefix}viewonce
18. ${config.prefix}warn
19. ${config.prefix}warnings
20. ${config.prefix}goodnight

━━━━━━━━━━━━━━━━━━
*🐛 BUG*
━━━━━━━━━━━━━━━━━━
1. ${config.prefix}bugandroid
2. ${config.prefix}bugwhatsapp
3. ${config.prefix}bugios
4. ${config.prefix}freezandroid
5. ${config.prefix}restartandroid

━━━━━━━━━━━━━━━━━━
*👤 OWNER DU BOT*
━━━━━━━━━━━━━━━━━━
👑 ${config.ownerName}
📞 ${config.ownerContact}
💬 ${config.ownerTelegram}
🔗 ${config.whatsappChannel1}

━━━━━━━━━━━━━━━━━━
*🛠️ DÉVELOPPEUR*
━━━━━━━━━━━━━━━━━━
💻 *Natsu Tech*
📲 @Natsu_or_Dentsu
📞 +242053605516
> _Codé par Natsu Tech pour Christ_

━━━━━━━━━━━━━━━━━━
> *CHRIST X V1 v${config.version}*`;

    try {
      await christ.sendMessage(from, {
        image: { url: config.menuImage },
        caption: menu,
      }, { quoted: msg.raw || msg });
    } catch {
      await reply(menu);
    }
  },
};
