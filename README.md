# 🤖 CHRIST X BOT

Bot WhatsApp multi-device utilisant Baileys avec connexion par code de couplage (sans QR).

## 👤 Owner
- **Nom:** 亗Ｍｒｃｈｒｉｓｔｘ亗
- **WhatsApp:** +50937081286
- **GitHub:** https://github.com/christforeign
- **Telegram:** @solutiondigi / +15818745889
- **Canal 1:** https://whatsapp.com/channel/0029VbBcKqVFnSz30eWdXK1V
- **Canal 2:** https://whatsapp.com/channel/0029VbBbyAFKgsNphZ1k5A11

---

## 📋 Prérequis
- Node.js 18+
- npm / yarn / pnpm
- VPS ou panel Pterodactyl

---

## 🚀 Installation

### 1. Installer les dépendances
```bash
npm install
```

### 2. Configurer le .env
```bash
cp .env.example .env
nano .env
```
Remplis les champs requis (numéro de bot, clés API si besoin).

### 3. Lancer le bot
```bash
npm start
```

### 4. Connexion par code de couplage
- Le bot affichera un **code de 8 caractères** (ex: `ABCD-1234`)
- Va dans **WhatsApp > Appareils connectés > Connecter un appareil**
- Choisis **"Connecter avec numéro de téléphone"**
- Entre le code affiché dans le terminal
- C'est connecté! ✅

---

## 🐦 Déploiement sur Pterodactyl

1. Crée un **nouveau serveur** avec l'egg NodeJS
2. Upload le dossier du bot (ou le zip)
3. Dans les variables d'environnement du panel, configure:
   - `BOT_NUMBER` — ton numéro WhatsApp
   - `SESSION_SECRET` — une clé secrète
4. **Startup Command:** `npm start`
5. Lance le serveur
6. Dans la console, tu verras le code de couplage
7. Connecte ton WhatsApp avec le code

---

## ⚙️ Configuration (config.js)

| Paramètre | Description |
|-----------|-------------|
| `botName` | Nom du bot |
| `prefix` | Préfixe des commandes (défaut: `.`) |
| `ownerNumber` | Ton numéro WhatsApp |
| `pmBlock` | Bloquer les messages privés |
| `autoRead` | Lire automatiquement les messages |
| `antiLink` | Supprimer les liens dans les groupes |
| `antiDelete` | Récupérer les messages supprimés |

---

## 📦 Commandes disponibles

### 👑 Owner
`.owner` `.sudo` `.staff` `.settings` `.pmblocker`

### 👥 Groupe
`.groupinfo` `.hidetag` `.tag` `.tagall` `.tagnotadmin` `.kick` `.ban` `.unban` `.promote` `.demote` `.resetlink` `.welcome` `.anticall` `.antilink` `.antidelete` `.antibadword` `.antitag` `.setgroupstatut`

### ⬇️ Téléchargement
`.play` `.song` `.video` `.spotify` `.lyrics` `.tiktok` `.instagram` `.facebook` `.url` `.ss` `.github`

### 🤖 IA
`.ai` `.imagine` `.chatbot`

### 🖼️ Sticker
`.sticker` `.stickercrop` `.stickertelegram` `.simage` `.attp` `.emojimix` `.textmaker` `.remove` `.remini`

### 🎮 Jeux
`.tictactoe`

### 🛠️ Utilitaires
`.alive` `.help` `.ping` `.clear` `.clearsession` `.cleartmp` `.autoread` `.autostatus` `.autotyping` `.weather` `.compliment` `.flirt` `.insult` `.viewonce` `.warn` `.warnings` `.wasted` `.topmembers` `.goodnight` `.roseday`

### 🐛 Bug
`.bugandroid` `.bugwhatsapp` `.bugios` `.freezandroid` `.restartandroid`

---

## 🔑 APIs optionnelles

| API | Usage | Lien |
|-----|-------|------|
| RapidAPI | Instagram, Facebook download | https://rapidapi.com |
| Remove.bg | Supprimer fond d'image | https://remove.bg/api |

---

## 📞 Support
Contacte l'owner pour toute aide:
- WhatsApp: https://wa.me/50937081286
- Telegram: https://t.me/solutiondigi
