const { Mimetype, proto, generateWAMessage } = require('@sampandey001/baileys')
const { exec, spawn, execSync } = require("child_process")
const fs = require('fs');
const os = require('os')
const util = require('util');
const chalk = require('chalk');
const crypto = require('crypto');
const axios = require('axios');
const { sizeFormatter } = require('human-readable');
const moment = require('moment-timezone');
const ms = toMs = require('ms');
const FormData = require("form-data");
const nou = require('node-os-utils');
const googleTTS = require('google-tts-api');
const fromBuffer = require('file-type')
const fetch = require('node-fetch')
const createHash = require('crypto')

require('./settings')
const LangMess = require("./lang/lang-id.js")
const { id } = require("./lang/index.js")
const fetchBuffer = require("./lib/myfunc2")
const blockir = require ("./lib/blockcmd")
const { jadibot, listJadibot } = require('./function/jadibot')
const { ftroli, fopenai, fdoc, fvn, ftextt, ftoko, fgif, fgclink, fvideo, floc, floc2, fkontak, fakestatus } = require("./lib/fakeReply")
const { pickRandom, sleep, getRandom, jsonformat, createSerial, toRupiah, getCase, totalFitur } = require("./function/allfunc.js")
//const { tiktokDl, tiktokDown, facebookDl, mediafireDl, GTts } = require("./scrape.js")
const PR = pickRandom
const { smsg, fetchJson, getBuffer, getGroupAdmins, TelegraPh, msToDate, isUrl, hitungmundur, checkBandwidth, runtime, clockString } = require('./lib/simple')
const { updateResponList, delResponList, isAlreadyResponListGroup, sendResponList, isAlreadyResponList, getDataResponList, addResponList, isSetDone, addSetDone, removeSetDone, changeSetDone, getTextSetDone, isSetProses, addSetProses, removeSetProses, changeSetProse } = require("./lib/store")
const { tanggal, jam, salam, time } = require ("./lib/time.js")
const _data = require("./lib/totalcmd.js")

// DATABASE USER
global.db.data = JSON.parse(fs.readFileSync('./database/database.json'))
if (global.db.data) global.db.data = {
    users: {},
    chats: {},
    database: {},
    settings: {},
    blockcmd: {},
    ...(global.db.data || {})
}
//let menu = db.data.chats.menu = []
const listblokir = db.data.blockcmd
const menu = {}
const menuDown = {}
const downTiktok = {}
const downFacebook = {}

const similarity = require('similarity')
const threshold = 0.72
const format = sizeFormatter()

// ============ MODULE EXPORTS ==============\\
module.exports = clients = async (clients, m, chatUpdate, store, set_proses, set_done, db_respon_list, ) => {
   const { type, quotedMsg, mentioned, now, fromMe } = m
       var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : '' //omzee
       var budy = (typeof m.text == 'string' ? m.text : '')
       var prefix = `${global.prefa}`
const isCmd = body.startsWith(prefix)
const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const pushname = m.pushName || "No Name"
const botNumber = await clients.decodeJid(clients.user.id)
const ToOwner = `${global.OwneNumber}@s.whatsapp.net`
const isOwner = ["6283869821927", `${global.OwnerBot}`, botNumber].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const text = q = args.join(" ")
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const groupMetadata = m.isGroup ? await clients.groupMetadata(m.chat).catch(e => {}) : ''
const groupName = m.isGroup ? groupMetadata.subject : ''
const participants = m.isGroup ? await groupMetadata.participants : ''

const sender = m.isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid
const senderNumber = sender.split('@')[0]
const mentionByTag = type == 'extendedTextMessage' && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.mentionedJid : []
const mentionByReply = type == 'extendedTextMessage' && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.participant || '' : ''
const from = mek.key.remoteJid
const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
const isMedia = /image|video|sticker|audio/.test(mime)
const messagesD = body.slice(0).trim().split(/ +/).shift().toLowerCase()
const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
try {
const reply = async (text) =>{
      	return await clients.sendFakeLink(m.chat, text, salam, pushname, m)
}
const rep = async (text) =>{
      	return await clients.sendText(m.chat, text, m)
}

async function getGcName(groupID) {
   try {
      let data_name = await clients.groupMetadata(groupID)
      return data_name.subject
   } catch (err) {
      return '-'
   }
}  

if (global.autoTyping) { if (m.chat) { clients.sendPresenceUpdate('composing', m.chat) }
}
// auto read message
if (global.autoRead) { if (m.message) {
  clients.readMessages([m.key])
  // Push Message To Console
  console.log(chalk.black(chalk.bgWhite('[ PESAN ]')), chalk.black(chalk.bgGreen(new Date)), chalk.black(chalk.bgBlue(budy || m.mtype)) + '\n' + chalk.magenta('=> Dari'), chalk.green(pushname), chalk.yellow(m.sender) + '\n' + chalk.blueBright('=> Di'), chalk.green(m.isGroup ? pushname : 'Private Chat', m.chat))
}
}
       
  // ANTI LINK 
if (budy.match(`chat.whatsapp.com`)) {
      m.reply(`Link grup terdeteksi`)
  if (!isBotAdmins) return m.reply("Tidak Dapat Meninjau Lebih Lanjut")
   const gclink = (`https://chat.whatsapp.com/`+ await clients.groupInviteCode(m.chat))
   const isLinkThisGc = new RegExp(gclink, 'i')
   const isgclink = isLinkThisGc.test(m.text)
     if (isgclink) return m.reply(`Link Group Ini Telah Dipublikasi Kan`)
     if (isAdmins) return m.reply(`Admin Mengirim Link Group Lain`)
     if (isOwner) return m.reply("Maaf Tidak Dapat Mengeluarkan Creator")
     if (m.key.fromMe) return m.reply("Tidak Bisa Mengeluarkan Diri Sendiri")
 await clients.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant } })
 clients.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
  }

if (budy.match(`wa.me/`)) {
    m.reply("Link Wa Kontak Terdeteksi")
  if (!isBotAdmins) return m.reply("Tidak Dapat Meninjau Lebih Lanjut")
  if (isAdmins) return m.reply(`Admin Mengirim Link Group Lain`)
  if (isOwner) return m.reply("Maaf Tidak Dapat Mengeluarkan Creator")
  if (m.key.fromMe) return m.reply("Tidak Bisa Mengeluarkan Diri Sendiri")
  await clients.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant } })
 clients.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
}

if (isAlreadyResponList((m.isGroup ? m.chat: botNumber), body.toLowerCase(), db_respon_list)) {
  var get_data_respon = getDataResponList((m.isGroup ? m.chat: botNumber), body.toLowerCase(), db_respon_list)
  if (get_data_respon.isImage === false) {
    clients.sendMessage(m.chat, { text: sendResponList((m.isGroup ? m.chat: botNumber), body.toLowerCase(), db_respon_list) }, { quoted: m })
  } else {
    clients.sendMessage(m.chat, { image: await getBuffer(get_data_respon.image_url), caption: get_data_respon.response }, { quoted: m })
  }
}


try {
let isNumber = x => typeof x === 'number' && !isNaN(x)
let user = global.db.data.users[m.sender]
if (typeof user !== 'object') global.db.data.users[m.sender] = {}
if (user) {
if (!isNumber(user.afkTime)) user.afkTime = -1
if (!('verify' in user)) user.verify = ''
if (!('afkReason' in user)) user.afkReason = ''
} else global.db.data.users[m.sender] = {
afkTime: -1,
afkReason: '',
}
let chat = global.db.data.chats[m.chat]
if (typeof chat !== 'object') global.db.data.chats[m.chat] = {}
if (chat) {
if (!('delete' in chat)) chat.delete = true
if (!('antiSpam' in chat)) chat.antiSpam = true
if (!('antiVirtex' in chat)) chat.antiVirtex = true
if (!('isBanned' in chat)) chat.isBanned = false
if (!('viewonce' in chat)) chat.viewonce = false
if (!('antiToxic' in chat)) chat.antiToxic = true
if (!('simi' in chat)) chat.simi = false
} else global.db.data.chats[m.chat] = {
antiSpam: true,
antiVirtex: true,
isBanned: false,
delete: true,
viewonce: false,
antiToxic: true,
simi: false,
}
let setting = global.db.data.settings[botNumber]
if (typeof setting !== 'object') global.db.data.settings[botNumber] = {}
if (setting) {
if (!('anticall' in setting)) setting.anticall = true
if (!isNumber(setting.status)) setting.status = 0
if (!('autobio' in setting)) setting.autobio = true
} else global.db.data.settings[botNumber] = {
anticall: true,
status: 0,
autobio: true
}

} catch (err) {
console.error(err)
}

// Public & Self
if (!clients.public) { if (!m.key.fromMe) return }

 // SIMI 
/*  if (db.data.chats[m.chat].simi && !db.data.chats[m.chat].isBanned) {
  if (!m.text) return
       let res = await fetch(global.api('https://api.simsimi.net', '/v2/', { text: encodeURIComponent(m.text), lc: "id" }, ''))
       let json = await res.json()
       if (json.success == 'gapaham banh:v') return m.reply('lu ngetik apaaan sih')
   //await m.reply(`${json.success}`)
   let re = GTts(`${json.success}`, 'id')
   await clients.sendMessage(m.chat, {audio: {url: re}}, {quoted: m})
  }*/
  

if (db.data.settings[botNumber].autobio) {
let setting = global.db.data.settings[botNumber]
if (new Date() * 1 - setting.status > 1000) {
	let _uptime = process.uptime() * 1000
	let uptime = clockString(_uptime)
	await clients.updateProfileStatus(`Hallo Saya ${NameBot} | Aktif Selama ${uptime} | Mode : ${clients.public ? 'Public-Mode' : 'Self-Mode'} | User : ${Object.keys(global.db.data.users).length} | Jangan Telp Bot  | © Created Riko-bot`).catch(_ => _)
	setting.status = new Date() * 1
	}
}
		
 // Respon Cmd with media
if (isMedia && m.msg.fileSha256 && (m.msg.fileSha256.toString('base64') in global.db.data.sticker)) {
  let hash = global.db.data.sticker[m.msg.fileSha256.toString('base64')]
  let { text, mentionedJid } = hash
  let messages = await generateWAMessage(m.chat, { text: text, mentions: mentionedJid }, { userJid: clients.user.id, quoted: m.quoted && m.quoted.fakeObj })
     messages.key.fromMe = areJidsSameUser(m.sender, clients.user.id)
     messages.key.id = m.key.id
     messages.pushName = m.pushName
     if (m.isGroup) messages.participant = m.sender
     let msg = {
         ...chatUpdate,
         messages: [proto.WebMessageInfo.fromObject(messages)],
        type: 'append'
     }
     clients.ev.emit('messages.upsert', msg)
}		


var users = global.db.data.users[m.sender]

switch(command) {
case "menu": {
  if (menu[m.chat]) return clients.sendText(m.chat, "mohon tunggu 10 detik", menu[m.chat][0])
  let anu = id.Menu(pushname, OwnerName)
  menu[m.chat] = [
    await clients.sendText(m.chat, anu, m), setTimeout(() => {
      if (menu[m.chat]) { delete menu[m.chat] }
    }, 15000)
  ]
}
break
case "tiktok": {
  if (!text) return reply('Linknya?')
  if (!q.includes('tiktok')) return reply("link err")
  let anu = await tiktokDl(text)
  clients.sendMessage(m.chat, { caption: "nowm", video: {url: anu.url[0].url} }, {quoted: m})
}
break
case 'jadibot': {
  if (!isRegister) return m.reply(PR(LangMess.NotRegister))
jadibot(clients, m, from)
}
break
case 'listjadibot':
  if (!isRegister) return m.reply(mess.register)
  if (m.isGroup) return m.reply(mess.privat)
   try {
    let user = [... new Set([...global.clients.filter(clients => clients.user).map(clients => clients.user)])]
te = "*List Jadibot*\n\n"
for (let i of user){
let y = await clients.decodeJid(i.id)
te += " × User : @" + y.split("@")[0] + "\n"
te += " × Name : " + i.name + "\n\n"
}
clients.sendMessage(from,{text:te,mentions: [y], },{quoted:msg})
} catch (err) {
reply(`Belum Ada User Yang Jadibot`)
}
break
case 'q':{
  m.reply ("On Kok Kak Bot Nya")
}
break
case 'jasarun': 
case 'jasrun': {
  m.reply(jasarun)
}
break
case 'sewa': {
  m.reply(sewabot)
}
break
case 'sc':
case 'script': {
  m.reply(script)
}
break
case 'tts': {
if (!text) return reply('masukan text')
  global.autoTyping = false
  clients.sendPresenceUpdate("recording", m.chat)
  const url = googleTTS.getAudioUrl(text, { lang: "id", slow: false, host: 'https://translate.google.com' });
   clients.sendMessage(m.chat, { audio: {url: url}, mimetype: "audio/mpeg", ptt: true, caption: "Text To Speech" }, {quoted: m})
 sleep(5000)
 global.autoTyping = true
}
break
case 'tqto':
case 'credit':
case 'thanksto': {
  m.reply(`╭─❒ 「 THANKS TO 」 
│○ Allah Swt.
│○ Myparents
│○ Hads
│○ VinzDev
│○ Misel
│○ Fatih Arridho
│○ Ferdiz
│○ Hamzah
│○ Zeeoneofc
│○ JerOfc
│○ All Creator Bot
╰❒`) // MAU MAMBAHIN NAMA LU? 
// SILAHKAN TAPI TOLONG JANGAN HAPUS SALAH SATU NAMA DI ATAS ITU
}
break
case 'donasi': 
case 'donate': {
    let donat = id.Donasi(pushname)
 await clients.sendFile(m.chat, fotodonasi, 'donasi.jps', donat, fkontak)
 m.reply(PR(LangMess.Donasi))
}
break    
case 'owner':
case 'creator': {
  let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:WhatsApp; Messenger\nNICKNAME: Hamzah\nORG: Hamzah\nTITLE:soft\nitem1.TEL;waid=6283869821927:+62 838-6982-1927\nitem1.X-ABLabel:📞 Nomor Owner\nitem2.URL:https://wa.me/message/HVXYZPCV6ZVBI1\nitem2.X-ABLabel:💬 More\nitem3.EMAIL;type=INTERNET: hajahala.020@gmail.com\nitem3.X-ABLabel:💌 Mail Owner WhanGsAPPbot\nitem4.ADR:;;🇮🇩 Indonesia;;;;\nitem4.X-ABADR:💬 More\nitem4.X-ABLabel:📍 Lokasi Saya\nBDAY;value=date:🔖 ,21 Februari -\nEND:VCARD`
 await clients.sendMessage(m.chat, { contacts: { displayName: "Creator", contacts: [{ vcard }] }}, { quoted: fkontak })
}
break
case 'ambilcase': {
if (!isOwner) return
if (!q) return reply("Mau nyari Case apa") 
let res = getCase(q)
reply(res)
}
break
case 'totalfitur': {
let res = totalFitur()
reply(`total fitur: ${res}`)
}
break
case 'buka': {
if (!q) reply ("masukkan teks")
if (!blockir.check(q, listblokir))
blockir.del(q,listblokir)
reply("command berhasil di buka")
}
break
case 'readsw': {
 await clients.fetchStatus(`${text}@s.whatsapp.net`)
//console.log("status: " + status)
}
break
case 'goblok': case 'gblk': case 'kontol': case 'kntl': case 'kmtl': case 'ngtd': case 'ngentod': case 'ajg': case 'anjg': case 'anjing': case 'mmk': case 'memek': case 'meki': case 'puki': case 'jancok': case 'babi': case 'tolol': case 'yapit':  case 'yatim': case 'piatu': case 'bodoh': case 'tolol': case 'ngentot': case 'sange': case 'bangsat': case 'gblk': case 'goblok': case 'pantek': case 'pantex': case 'asu': case 'bego':
case 'sangean': {
  m.reply("Jangan Toxic Ya")
  await clients.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant } })
}
break
	
default:
if (budy.startsWith('$')) {
  if (!isOwner) return m.reply(mess.owner)
    await m.reply("_Executing..._")
    exec(budy.slice(2), (err, stdout) => {
       if (err) return m.reply(`${err}`)
       if (stdout) return m.reply(stdout)
    })
}

if (budy.startsWith('>')) {
  if (!isOwner) return
  try {
      let evaled = await eval(budy.slice(2))
      if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
      await m.reply(evaled)
  } catch (err) {
      await m.reply(util.format(err))
  }
}
if (budy.startsWith('=>')) {
  if (!isOwner) return
  function Return(sul) {
    sat = JSON.stringify(sul, null, 2)
    bang = util.format(sat)
    if (sat == undefined) {
      bang = util.format(sul)
    }
    return m.reply(bang)
  }
  try {
    m.reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
  } catch (e) {m.reply(String(e))}
}
}
    
} catch (err) {
   m.reply(util.format(err))
   m.reply("Terjadi Kesalahan")
   /*if (!blockir.check(command, listblokir)) {
   blockir.add(command, listblokir)
   reply ("Perintah Ini Akan Di Block")
   } else if (blockir.check(command, listblokir)) {
   reply ("command sudah di block")
   }*/
   clients.sendMessage(ToOwner, {text: `Halo Owner, Laporan Terdeteksi Eror\n Command: ${command}\n ERORR!!!!\n${util.format(err)}`}, {quoted: m})
   reply("Laporan Telah Terkirim Ke Owner")
}
}