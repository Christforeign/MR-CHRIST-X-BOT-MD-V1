const chalk = require("chalk");

const ASCII_LOGO = `
 ██████╗██╗  ██╗██████╗ ██╗███████╗████████╗    ██╗  ██╗    ██╗   ██╗ ██╗
██╔════╝██║  ██║██╔══██╗██║██╔════╝╚══██╔══╝    ╚██╗██╔╝    ██║   ██║███║
██║     ███████║██████╔╝██║███████╗   ██║         ╚███╔╝     ██║   ██║╚██║
██║     ██╔══██║██╔══██╗██║╚════██║   ██║         ██╔██╗     ╚██╗ ██╔╝ ██║
╚██████╗██║  ██║██║  ██║██║███████║   ██║        ██╔╝ ██╗     ╚████╔╝  ██║
 ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚══════╝  ╚═╝        ╚═╝  ╚═╝      ╚═══╝   ╚═╝
`;

const DEV_LINE = chalk.gray("  💻 Codé par Natsu Tech pour Christ  •  Dev: @Natsu_or_Dentsu  •  +242053605516\n");

const BANNER_START = chalk.cyan(ASCII_LOGO) +
  chalk.cyan("  ╔══════════════════════════════════════════════════════════════════╗\n") +
  chalk.cyan("  ║       WhatsApp Multi-Device Bot  •  by 亗Ｍｒｃｈｒｉｓｔｘ亗       ║\n") +
  chalk.cyan("  ╚══════════════════════════════════════════════════════════════════╝\n") +
  DEV_LINE;

const BANNER_CONNECTED = chalk.green(ASCII_LOGO) +
  chalk.green("  ╔══════════════════════════════════════════════════════════════════╗\n") +
  chalk.green("  ║                  ✅  BOT CONNECTÉ AVEC SUCCÈS  ✅               ║\n") +
  chalk.green("  ╚══════════════════════════════════════════════════════════════════╝\n") +
  DEV_LINE;

const BANNER_PAIRING = chalk.red(ASCII_LOGO) +
  chalk.red("  ╔══════════════════════════════════════════════════════════════════╗\n") +
  chalk.red("  ║                 ⚡  MODE CONNEXION PAR CODE  ⚡                  ║\n") +
  chalk.red("  ╚══════════════════════════════════════════════════════════════════╝\n") +
  DEV_LINE;

module.exports = { ASCII_LOGO, BANNER_START, BANNER_CONNECTED, BANNER_PAIRING };
