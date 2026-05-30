const config = require("../config");
const { proto, areJidsSameUser } = require("@whiskeysockets/baileys");

function smsg(christ, m) {
  if (!m) return m;

  if (m.key) {
    m.id = m.key.id;
    m.isBaileys = m.id?.startsWith("BAE5") && m.id.length === 16;
    m.chat = m.key.remoteJid;
    m.fromMe = m.key.fromMe;
    m.isGroup = m.chat?.endsWith("@g.us");
    m.sender = m.fromMe
      ? (christ.user?.id?.split(":")[0] + "@s.whatsapp.net")
      : (m.isGroup ? (m.key.participant || "") : m.chat);
  }

  if (m.message) {
    m.mtype = getContentType(m.message);
    if (!m.mtype) return null;

    try {
      m.msg =
        m.mtype === "viewOnceMessage"
          ? m.message[m.mtype].message[getContentType(m.message[m.mtype].message)]
          : m.message[m.mtype];
    } catch {
      m.msg = m.message[m.mtype] || {};
    }

    m.body =
      m.message?.conversation ||
      m.msg?.text ||
      m.msg?.caption ||
      (m.mtype === "buttonsResponseMessage" ? m.msg?.selectedButtonId : null) ||
      (m.mtype === "templateButtonReplyMessage" ? m.msg?.selectedId : null) ||
      (m.mtype === "listResponseMessage" ? m.msg?.singleSelectReply?.selectedRowId : null) ||
      "";

    m.prefix = config.prefix;
    m.from = m.chat;

    const senderNumber = (m.sender || "").replace(/[^0-9]/g, "");
    m.isOwner = config.ownerNumber.includes(senderNumber);
    m.isSudo = config.sudoNumbers.includes(senderNumber) || m.isOwner;
    m.isStaff = config.staffNumbers.includes(senderNumber) || m.isSudo;

    const ctx = m.msg?.contextInfo;
    if (ctx?.quotedMessage) {
      const qid = ctx.participant || ctx.remoteJid;
      const qMsg = ctx.quotedMessage;
      const qType = getContentType(qMsg);
      m.quoted = {
        key: {
          remoteJid: m.chat,
          fromMe: areJidsSameUser(qid, christ.user?.id || ""),
          id: ctx.stanzaId,
          participant: qid,
        },
        message: qMsg,
        sender: qid,
        mtype: qType,
        msg: qMsg?.[qType] || {},
        body: qMsg?.conversation || qMsg?.[qType]?.text || qMsg?.[qType]?.caption || "",
        raw: {
          key: { remoteJid: m.chat, fromMe: false, id: ctx.stanzaId, participant: qid },
          message: qMsg,
        },
      };
    }

    m.mentionedJids = ctx?.mentionedJid || [];

    m.reply = async (content, options = {}) => {
      if (typeof content === "string") {
        return await christ.sendMessage(m.chat, { text: content, ...options }, { quoted: m });
      }
      return await christ.sendMessage(m.chat, { ...content, ...options }, { quoted: m });
    };

    m.react = async (emoji) => {
      return await christ.sendMessage(m.chat, {
        react: { text: emoji, key: m.key },
      });
    };

    m.raw = m;
    m.type = m.mtype;
  }

  return m;
}

function getContentType(message) {
  if (!message) return undefined;
  const keys = Object.keys(message);
  return keys.find(
    (k) =>
      k !== "senderKeyDistributionMessage" &&
      k !== "messageContextInfo" &&
      k !== "deviceSentMessage" &&
      k !== "verified_name"
  );
}

function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseJid(text) {
  return text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
}

module.exports = { smsg, getContentType, formatNumber, getRandom, sleep, parseJid };
