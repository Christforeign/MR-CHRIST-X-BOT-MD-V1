const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  Browsers,
} = require("@whiskeysockets/baileys");

const isJidBroadcast = (jid) => (jid ? jid.endsWith("@broadcast") : false);

const pino = require("pino");
const { Boom } = require("@hapi/boom");
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const readline = require("readline");
const config = require("./config");
const { loadPlugins } = require("./lib/loader");
const { smsg } = require("./lib/utils");
const { BANNER_START, BANNER_CONNECTED, BANNER_PAIRING } = require("./lib/ascii");

// ─── Dossiers requis ───────────────────────────────────────────────────────────
const sessionFolder = path.resolve(config.sessionFolder || "./session");
const tempFolder = path.resolve(config.tempFolder || "./temp");
if (!fs.existsSync(sessionFolder)) fs.mkdirSync(sessionFolder, { recursive: true });
if (!fs.existsSync(tempFolder)) fs.mkdirSync(tempFolder, { recursive: true });

// ─── Utilitaire console ────────────────────────────────────────────────────────
const question = (text) => {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question(text, (ans) => { rl.close(); resolve(ans.trim()); }));
};

let plugins = new Map();

// ─── Démarrage ─────────────────────────────────────────────────────────────────
async function startBot() {
  // Affichage du banner au démarrage
  console.clear();
  console.log(BANNER_START);

  plugins = await loadPlugins();

  const { state, saveCreds } = await useMultiFileAuthState(sessionFolder);
  const { version } = await fetchLatestBaileysVersion();

  const christ = makeWASocket({
    version,
    logger: pino({ level: "silent" }),
    printQRInTerminal: false,
    auth: state,
    browser: Browsers.ubuntu("Chrome"),
    markOnlineOnConnect: true,
    generateHighQualityLinkPreview: true,
    getMessage: async () => ({ conversation: "" }),
  });

  // ─── Connexion par code de couplage ──────────────────────────────────────────
  if (!christ.authState.creds.registered) {
    console.log(BANNER_PAIRING);

    let phoneNumber = "";
    while (!phoneNumber || phoneNumber.length < 7) {
      phoneNumber = await question(
        chalk.bold.white("📱 Entrez votre numéro WhatsApp") +
        chalk.gray(" (sans + ni espaces)\n") +
        chalk.bold.yellow("   ex: 50937081286\n") +
        chalk.bold.white("   ❯ ")
      );
      phoneNumber = phoneNumber.replace(/[^0-9]/g, "");
      if (!phoneNumber || phoneNumber.length < 7) {
        console.log(chalk.red("\n  ❌ Numéro invalide, réessayez.\n"));
      }
    }

    console.log(chalk.yellow(`\n  ⏳ Génération du code pour: ${chalk.white.bold(phoneNumber)} ...\n`));
    await new Promise((r) => setTimeout(r, 3000));

    try {
      const code = await christ.requestPairingCode(phoneNumber);
      const formatted = code?.match(/.{1,4}/g)?.join("-") || code;

      // Code affiché: label en ROUGE, code en BLANC
      console.log(chalk.bgRed.white.bold("  ┌─────────────────────────────────────────────┐  "));
      console.log(chalk.bgRed.white.bold("  │         ⚡  CHRIST X V1 - PAIRING  ⚡      │  "));
      console.log(chalk.bgRed.white.bold("  └─────────────────────────────────────────────┘  ") + "\n");
      console.log(chalk.bgWhite.black.bold(`              ${formatted}              `) + "\n");
      console.log(chalk.yellow("  👉 Ouvre WhatsApp > Paramètres"));
      console.log(chalk.yellow("     > Appareils connectés > Connecter un appareil"));
      console.log(chalk.yellow("     > Connecter avec numéro de téléphone"));
      console.log(chalk.white.bold(`     > Entrez: ${formatted}\n`));
    } catch (e) {
      console.log(chalk.red("  ❌ Erreur génération code: " + e.message));
    }
  }

  // ─── Événements ──────────────────────────────────────────────────────────────
  christ.ev.on("creds.update", saveCreds);

  christ.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
      const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
      console.log(chalk.red(`\n  ❌ Connexion fermée — code: ${reason}`));
      if (
        reason === DisconnectReason.loggedOut ||
        reason === DisconnectReason.badSession
      ) {
        console.log(chalk.red("  🗑️  Session supprimée. Relancez le bot."));
        fs.rmSync(sessionFolder, { recursive: true, force: true });
        process.exit(1);
      } else {
        console.log(chalk.yellow("  🔄 Reconnexion dans 5 secondes..."));
        setTimeout(startBot, 5000);
      }
    } else if (connection === "open") {
      const botNum  = christ.user?.id?.split(":")[0] || "";
      const botJid  = botNum + "@s.whatsapp.net";
      const botName = christ.user?.name || config.botName;

      console.log(BANNER_CONNECTED);
      console.log(chalk.green(`  👤 Nom     : ${chalk.white.bold(botName)}`));
      console.log(chalk.green(`  📱 Numéro  : ${chalk.white.bold(botNum)}`));
      console.log(chalk.green(`  ⚙️  Préfixe : ${chalk.white.bold(config.prefix)}`));
      console.log(chalk.green(`  📦 Version : ${chalk.white.bold(config.version)}`));
      console.log(chalk.green(`  🔧 Cmds    : ${chalk.white.bold(plugins.size)}\n`));

      // ── Message de bienvenue envoyé au numéro du bot lui-même ────────────────
      const welcome = `╔═══════════════════════════════════╗
║       *CHRIST X V1* 🤖 ✅       ║
╚═══════════════════════════════════╝

🎉 *Connexion réussie!*

👤 *Nom:* ${botName}
📱 *Numéro:* ${botNum}
⚙️ *Préfixe:* ${config.prefix}
📦 *Version:* ${config.version}
🔧 *Commandes:* ${plugins.size}

👑 *Owner:* ${config.ownerName}
📞 *WhatsApp:* ${config.ownerContact}
💻 *GitHub:* ${config.ownerGithub}
💬 *Telegram:* ${config.ownerTelegram}

📢 *Canaux WhatsApp:*
🔗 ${config.whatsappChannel1}
🔗 ${config.whatsappChannel2}

> _Tapez ${config.prefix}help pour les commandes_
> _*CHRIST X V1* est en ligne!_ 🚀`;

      try {
        await christ.sendMessage(botJid, {
          image: { url: config.menuImage },
          caption: welcome,
        });
      } catch {
        try {
          await christ.sendMessage(botJid, { text: welcome });
        } catch {}
      }
    }
  });

  // ─── Messages reçus ──────────────────────────────────────────────────────────
  christ.ev.on("messages.upsert", async (m) => {
    try {
      if (!m.messages) return;
      const mek = m.messages[0];
      if (!mek.message) return;
      if (mek.key?.remoteJid === "status@broadcast") {
        if (config.autoStatus) await christ.readMessages([mek.key]);
        return;
      }
      if (isJidBroadcast(mek.key?.remoteJid || "")) return;

      const msg = smsg(christ, mek);
      if (!msg) return;
      if (config.autoRead) await christ.readMessages([mek.key]);

      require("./handler")(christ, msg, m, plugins);
    } catch (e) {
      console.error(chalk.red("  ❌ Erreur messages:"), e.message);
    }
  });

  // ─── Membres groupe ───────────────────────────────────────────────────────────
  christ.ev.on("group-participants.update", async ({ id, participants, action }) => {
    try {
      if (!config.welcomeMessage && !config.goodbyeMessage) return;
      const metadata = await christ.groupMetadata(id);
      for (const jid of participants) {
        const ppUrl = await christ.profilePictureUrl(jid, "image").catch(() => config.menuImage);
        if (action === "add" && config.welcomeMessage) {
          await christ.sendMessage(id, {
            image: { url: ppUrl },
            caption: `┌─────────────────────\n│ 👋 *BIENVENUE!*\n│\n│ 🤖 *CHRIST X V1*\n│\n│ *Groupe:* ${metadata.subject}\n│ *Membre:* @${jid.split("@")[0]}\n│\n│ Bienvenue! 🎉\n└─────────────────────`,
            mentions: [jid],
          });
        } else if (action === "remove" && config.goodbyeMessage) {
          await christ.sendMessage(id, {
            image: { url: ppUrl },
            caption: `┌─────────────────────\n│ 👋 *AU REVOIR!*\n│\n│ 🤖 *CHRIST X V1*\n│\n│ *Groupe:* ${metadata.subject}\n│ *Membre:* @${jid.split("@")[0]}\n│\n│ Bonne continuation!\n└─────────────────────`,
            mentions: [jid],
          });
        }
      }
    } catch (e) {
      console.error(chalk.red("  ❌ Erreur groupe:"), e.message);
    }
  });

  // ─── Anti-appel ───────────────────────────────────────────────────────────────
  christ.ev.on("call", async (callData) => {
    if (!config.antiCall) return;
    for (const call of callData) {
      if (call.status === "offer") {
        await christ.rejectCall(call.id, call.from).catch(() => {});
        await christ.sendMessage(call.from, {
          text: `❌ *CHRIST X V1*\nLes appels ne sont pas acceptés.\nContactez: ${config.ownerContact}`,
        }).catch(() => {});
      }
    }
  });

  return christ;
}

// ─── Gestion globale des erreurs ─────────────────────────────────────────────
process.on("uncaughtException",  (e) => console.error(chalk.red("  ❌ Exception:"), e.message));
process.on("unhandledRejection", (e) => console.error(chalk.red("  ❌ Rejet:"),     e?.message || e));

startBot().catch((e) => {
  console.error(chalk.red("  ❌ Erreur fatale:"), e.message);
  process.exit(1);
});
