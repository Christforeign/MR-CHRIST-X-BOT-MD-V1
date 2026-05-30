const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

async function loadPlugins() {
  const plugins = new Map();
  const pluginsDir = path.resolve(__dirname, "../plugins");

  const ASCII_SMALL = chalk.cyan(`
   ██████╗██╗  ██╗██████╗ ██╗███████╗████████╗    ██╗  ██╗███╗   ███╗██████╗     ██╗   ██╗ ██╗
  ██╔════╝██║  ██║██╔══██╗██║██╔════╝╚══██╔══╝    ╚██╗██╔╝████╗ ████║██╔══██╗    ██║   ██║███║
  ██║     ███████║██████╔╝██║███████╗   ██║         ╚███╔╝ ██╔████╔██║██║  ██║    ██║   ██║╚██║
  ██║     ██╔══██║██╔══██╗██║╚════██║   ██║         ██╔██╗ ██║╚██╔╝██║██║  ██║    ╚██╗ ██╔╝ ██║
  ╚██████╗██║  ██║██║  ██║██║███████║   ██║        ██╔╝ ██╗██║ ╚═╝ ██║██████╔╝     ╚████╔╝  ██║
   ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚══════╝  ╚═╝        ╚═╝  ╚═╝╚═╝     ╚═╝╚═════╝       ╚═══╝   ╚═╝
`);

  console.log(ASCII_SMALL);
  console.log(chalk.cyan("  ══════════════════════════════════════════════"));
  console.log(chalk.cyan("    Chargement des plugins CHRIST X V1..."));
  console.log(chalk.cyan("  ══════════════════════════════════════════════\n"));

  function readDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        readDir(fullPath);
      } else if (file.endsWith(".js")) {
        try {
          const plugin = require(fullPath);
          if (plugin && plugin.command) {
            const cmds = Array.isArray(plugin.command) ? plugin.command : [plugin.command];
            for (const cmd of cmds) {
              plugins.set(cmd.toLowerCase(), plugin);
            }
          }
        } catch (e) {
          console.error(chalk.red(`  ❌ Plugin ${file}: ${e.message}`));
        }
      }
    }
  }

  readDir(pluginsDir);
  console.log(chalk.green(`  ✅ ${plugins.size} commande(s) chargée(s) avec succès!\n`));
  return plugins;
}

module.exports = { loadPlugins };
