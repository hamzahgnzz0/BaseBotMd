// ============ IMPORT FROM MODULE ==============\\
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, MessageType, MessageOptions, Mimetype, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, downloadContentFromMessage, areJidsSameUser, getContentType } = require('@adiwajshing/baileys')
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
const { fromBuffer } = require('file-type')
const { Configuration, OpenAIApi } = require("openai");
const fetch = require('node-fetch')
const { exec, spawn, execSync } = require("child_process")
const serialUser = require("crypto").randomBytes(5).toString("hex").toUpperCase()

// ============ IMPORT FROM FILES ==============\\
require('./settings')
const { LangMess } = require("./lang/lang-id.js")
const { id } = require("./lang")
//const { Lang } = require ("./lang/lang-en.js")
const { fetchBuffer } = require("./lib/myfunc2")
const { jadibot, listJadibot } = require('./function/jadibot')
const help = require("./lang/help.js")
const { ftroli, fopenai, fdoc, fvn, ftextt, ftoko, fgif, fgclink, fvideo, floc, floc2, fkontak, fakestatus } = require("./lib/fakeReply")
const { pickRandom, sleep, getRandom, jsonformat, createSerial } = require("./lib/p.js")
const PR = pickRandom
const { smsg, fetchJson, getBuffer, getGroupAdmins, TelegraPh, msToDate, isUrl, hitungmundur, checkBandwidth, runtime, clockString } = require('./lib/simple')
const { updateResponList, delResponList, isAlreadyResponListGroup, sendResponList, isAlreadyResponList, getDataResponList, addResponList, isSetClose, addSetClose, removeSetClose, changeSetClose, getTextSetClose, isSetDone, addSetDone, removeSetDone, changeSetDone, getTextSetDone, isSetLeft, addSetLeft, removeSetLeft, changeSetLeft, getTextSetLeft, isSetOpen, addSetOpen, removeSetOpen, changeSetOpen, getTextSetOpen, isSetProses, addSetProses, removeSetProses, changeSetProses, getTextSetProses, isSetWelcome, addSetWelcome, removeSetWelcome, changeSetWelcome, getTextSetWelcome, addSewaGroup, getSewaExpired, getSewaPosition, expiredCheck, checkSewaGroup, addPay, updatePay } = require("./lib/store")
const { addSaldo, minSaldo, cekSaldo } = require("./lib/deposit");
const { tanggal, jam, salam, time } = require ("./lib/time.js")
const _data = require("./lib/totalcmd.js")

// DATABASE USER
const db_saldo = JSON.parse(fs.readFileSync("./database/saldo.json"));
const depositPath = "./database/deposit/"
const ntilinkall = JSON.parse(fs.readFileSync('./database/antilinkall.json'));
const register = JSON.parse(fs.readFileSync('./database/user.json'))
global.db.data = JSON.parse(fs.readFileSync('./database/database.json'))
if (global.db.data) global.db.data = {
    users: {},
    chats: {},
    database: {},
    settings: {},
    deposit: {},
    ...(global.db.data || {})
}
let deposit = db.data.deposit.ss = []
let isisaldo = db.data.deposit.is = []

const similarity = require('similarity')
const threshold = 0.72
const format = sizeFormatter()

// ============ MODULE EXPORTS ==============\\
module.exports = clients = async (clients, m, chatUpdate, store, opengc, antilink, antiwame, antilink2, antiwame2, set_welcome_db, set_left_db, set_proses, set_done, set_open, set_close, sewa, _welcome, _left, db_respon_list, ) => {
   try {
   const { type, quotedMsg, mentioned, now, fromMe } = m
       var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : '' //omzee
       var budy = (typeof m.text == 'string' ? m.text : '')
       var prefix = global.prefix
const isCmd = body.startsWith(prefix)
const command = body.trim().split(/ +/).slice(1).toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const pushname = m.pushName || "No Name"
const botNumber = await clients.decodeJid(clients.user.id)
const isOwner = ["6283869821927", `${global.OwnerBot}`, botNumber].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const isAdminPanel = [`${global.adminPanel}`,"6283869821927"].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
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
const AntiLinkAll = m.isGroup ? ntilinkall.includes(from) : false
const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
const isMedia = /image|video|sticker|audio/.test(mime)
const isRegister = register.includes(m.sender)
const messagesD = body.slice(0).trim().split(/ +/).shift().toLowerCase()
const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
const isSewa = checkSewaGroup(m.chat, sewa)
const isAntiLink = antilink.includes(m.chat) ? true : false
const isAntiWame = antiwame.includes(m.chat) ? true : false  
const isAntiLink2 = antilink2.includes(m.chat) ? true : false
const isAntiWame2 = antiwame2.includes(m.chat) ? true : false  
const isWelcome = _welcome.includes(m.chat)
const isLeft = _left.includes(m.chat)
const reply = async (text) =>{
      	return await clients.sendFakeLink(m.chat, text, salam, pushname, m)
}

async function getGcName(groupID) {
   try {
      let data_name = await clients.groupMetadata(groupID)
      return data_name.subject
   } catch (err) {
      return '-'
   }
}

function toRupiah(angka) {
var saldo = '';
var angkarev = angka.toString().split('').reverse().join('');
for (var i = 0; i < angkarev.length; i++)
if (i % 3 == 0) saldo += angkarev.substr(i, 3) + '.';
return '' + saldo.split('', saldo.length - 1).reverse().join('');
}
     
    
if(m.isGroup){
   expiredCheck(clients, sewa)
}
      
/*============= BOT RESPOND MESSAGE =============*/
  // autotyper all
  if (global.autoTyping) { if (m.chat) { clients.sendPresenceUpdate('composing', m.chat) }
  }
  
  // auto read message
  if (global.autoRead) { if (m.message) {
    clients.readMessages([m.key]) }
  }
     
/*=============== ANTI LINK ALL ===============*/     
/*============================================*/ 

  // ANTI LINK 1 
if (isAntiLink) {
  if (budy.match(`chat.whatsapp.com`)) {
     reply(`*「 ANTI LINK 」*\n\nLink grup detected, maaf kamu akan di kick !`)
  if (!isBotAdmins) return reply(mess.botNotAdmin)
     let gclink = (`https://chat.whatsapp.com/`+await clients.groupInviteCode(m.chat))
     let isLinkThisGc = new RegExp(gclink, 'i')
     let isgclink = isLinkThisGc.test(m.text)
  if (isgclink) return reply(`Upsss... gak jadi, untung link gc sendiri`)
  if (isAdmins) return reply(`Upsss... gak jadi, kasian adminnya klo di kick`)
  if (isOwner) return reply(`Upsss... gak jadi, kasian owner ku klo di kick`)
  if (m.key.fromMe) return reply(`Upsss... gak jadi, kasian owner ku klo di kick`)
 await clients.sendMessage(m.chat, {
    delete: {
        remoteJid: m.chat,
        fromMe: false,
        id: m.key.id,
        participant: m.key.participant
    }
 })
 clients.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
  }
}

  // ANTI LINK 2
if (isAntiLink2) {
  if (budy.match(`chat.whatsapp.com`)) {
  if (!isBotAdmins) return //reply(mess.botNotAdmin)
     let gclink = (`https://chat.whatsapp.com/`+await clients.groupInviteCode(m.chat))
     let isLinkThisGc = new RegExp(gclink, 'i')
     let isgclink = isLinkThisGc.test(m.text)
  if (isgclink) return //reply(`Upsss... gak jadi, untung link gc sendiri`)
  if (isAdmins) return //reply(`Upsss... gak jadi, kasian adminnya klo di kick`)
  if (isOwner) return //reply(`Upsss... gak jadi, kasian owner ku klo di kick`)
  if (m.key.fromMe) return //reply(`Upsss... gak jadi, kasian owner ku klo di kick`)
 await clients.sendMessage(m.chat, {
    delete: {
        remoteJid: m.chat,
        fromMe: false,
        id: m.key.id,
        participant: m.key.participant
    }
 })
  }
}
  
  // ANTI LINK WAME 1
if (isAntiWame) {
  if (budy.match(`wa.me/`)) {
      reply(`*「 ANTI WA ME 」*\n\nWa Me detected, maaf kamu akan di kick !`)
  if (!isBotAdmins) return reply(mess.botNotAdmin)
  if (isAdmins) return reply(`Upsss... gak jadi, kasian adminnya klo di kick`)
  if (isOwner) return reply(`Upsss... gak jadi, kasian owner ku klo di kick`)
  if (m.key.fromMe) return reply(`Upsss... gak jadi, kasian owner ku klo di kick`)
 await clients.sendMessage(m.chat, {
    delete: {
        remoteJid: m.chat,
        fromMe: false,
        id: m.key.id,
        participant: m.key.participant
    }
 })
 clients.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
  }
}

  // ANTI LINK WAME 2
if (isAntiWame2) {
  if (budy.match(`wa.me/`)) {
      reply(`*「 ANTI WA ME 」*\n\nWa Me detected, maaf kamu akan di kick !`)
  if (!isBotAdmins) return //reply(mess.botNotAdmin)
  if (isAdmins) return //reply(`Upsss... gak jadi, kasian adminnya klo di kick`)
  if (isOwner) return //reply(`Upsss... gak jadi, kasian owner ku klo di kick`)
  if (m.key.fromMe) return //reply(`Upsss... gak jadi, kasian owner ku klo di kick`)
 await clients.sendMessage(m.chat, {
    delete: {
        remoteJid: m.chat,
        fromMe: false,
        id: m.key.id,
        participant: m.key.participant
    }
 })
  }
}

/*=========== GAK TAU JUGA FUNGSINYA===========*/

        if (isAlreadyResponList((m.isGroup ? m.chat: botNumber), body.toLowerCase(), db_respon_list)) {
            var get_data_respon = getDataResponList((m.isGroup ? m.chat: botNumber), body.toLowerCase(), db_respon_list)
            if (get_data_respon.isImage === false) {
                clients.sendMessage(m.chat, { text: sendResponList((m.isGroup ? m.chat: botNumber), body.toLowerCase(), db_respon_list) }, {
                    quoted: m
                })
            } else {
                clients.sendMessage(m.chat, { image: await getBuffer(get_data_respon.image_url), caption: get_data_respon.response }, {
                    quoted: m
                })
            }
        }

/*=============== DATABASE NYA ===============*/
try {
     let isNumber = x => typeof x === 'number' && !isNaN(x)
  // DATABASE USER
 let user = global.db.data.users[m.sender]
  if (typeof user !== 'object') global.db.data.users[m.sender] = {}
  if (user) {
      if (!isNumber(user.afkTime)) user.afkTime = -1
      if (!('afkReason' in user)) user.afkReason = ''
      if (!('registered' in user)) user.registered = false
      if (!user.registered) {
         if (!('name' in user)) user.name = m.name
         if (!isNumber(user.age)) user.age = -1
         if (!isNumber(user.regTime)) user.regTime = -1
      }
  } else global.db.data.users[m.sender] = {
      afkTime: -1,
      afkReason: '',
      registered: false,
      name: m.name,
      age: -1,
      regTime: -1,
  }
  // DATABASE CHAT
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
      if (!('openai' in chat)) chat.openai = false
  } else global.db.data.chats[m.chat] = {
      antiSpam: true,
	  antiVirtex: true,
      isBanned: false,
      delete: true,
      viewonce: false,
      antiToxic: true,
      simi: false,
      openai: false,
  }
  // DATABASE SETTING
 let setting = global.db.data.settings[botNumber]
  if (typeof setting !== 'object') global.db.data.settings[botNumber] = {}
  if (setting) {
      if (!('anticall' in setting)) setting.anticall = true
      if (!isNumber(setting.status)) setting.status = 0
      if (!('autobio' in setting)) setting.autobio = false
  } else global.db.data.settings[botNumber] = {
      anticall: true,
      status: 0,
      autobio: false,
  }

} catch (err) {
console.error(err)
}

  // Public & Self
  if (!clients.public) {
  if (!m.key.fromMe) return
  }

 /* RESET LIMIT SETIAP JAM 12
  if (db.data.settings[botNumber].resetlimit) {
  let cron = require('node-cron')
      cron.schedule('00 12 * * *', () => {
  let user = Object.keys(global.db.data.users)
  let limitUser = isPremium ? global.limitawal.premium : global.limitawal.free
      for (let jid of user) global.db.data.users[jid].limit = limitUser
      console.log('Reseted Limit')
      }, {
           scheduled: true,
           timezone: "Asia/Jakarta"
      })
  }

  // SIMI
  if (db.data.chats[m.chat].simi && !db.data.chats[m.chat].isBanned) {
  if (!m.text) return
       let res = await fetch(global.api('https://api.simsimi.net', '/v2/', { text: encodeURIComponent(m.text), lc: "id" }, ''))
       if (!res.ok) throw eror
       let json = await res.json()
       if (json.success == 'gapaham banh:v') return m.reply('lu ngetik apaaan sih')
   await m.reply(`${json.success}`)
  }
  
  // AUTO AI
  if (db.data.chats[m.chat].openai && !db.data.chats[m.chat].isBanned) {
  if (!m.text) return
     let res = await fetchJson(`https://api.lolhuman.xyz/api/openai?apikey=${lolhuman}&text=${text}&user=user-unique-id`)
     if (res.status === '404') return reply(res.message)
     if (res.result === 'undefined') return reply('Maaf Saya Tidak Mengerti Yang Anda Katakan')
   await clients.sendMessage(m.chat, {text: `${res.result}`}, {quoted: fopenai})
  }
  
  // ANTI VIEWONCE      
  if (db.data.chats[m.chat].antiviewonce) {
  if (m.mtype == 'viewOnceMessage') {
        let msg = m.message.viewOnceMessage.message
        let type = Object.keys(msg)[0]
        let media = await downloadContentFromMessage(msg[type], type == 'imageMessage' ? 'image' : 'video')
        let buffer = Buffer.from([])
        for await (const chunk of media) {
            buffer = Buffer.concat([buffer, chunk])
        }
        if (/video/.test(type)) {
            return this.sendFile(m.chat, buffer, 'media.mp4', msg[type].caption || '', m)
        } else if (/image/.test(type)) {
            return this.sendFile(m.chat, buffer, 'media.jpg', msg[type].caption || '', m)
        }
    }
  }*/
  
  /* AUTO BIO
  if (db.data.settings[botNumber].autobio) {
  	    let setting = global.db.data.settings[botNumber]
	   if (new Date() * 1 - setting.status > 1000) {
		let _uptime = process.uptime() * 1000
		let uptime = clockString(_uptime)
		await clients.updateProfileStatus(`Hallo Saya ${namabot} | Aktif Selama ${uptime} | Mode : ${clients.public ? 'Public-Mode' : 'Self-Mode'} | User : ${Object.keys(global.db.data.users).length} | Jangan Telp Bot  | © Created clients-bot`).catch(_ => _)
		setting.status = new Date() * 1
	   }
  }
	*/
	
	
  // Respon Cmd with media
        if (isMedia && m.msg.fileSha256 && (m.msg.fileSha256.toString('base64') in global.db.data.sticker)) {
        let hash = global.db.data.sticker[m.msg.fileSha256.toString('base64')]
        let { text, mentionedJid } = hash
        let messages = await generateWAMessage(m.chat, { text: text, mentions: mentionedJid }, {
            userJid: clients.user.id,
            quoted: m.quoted && m.quoted.fakeObj
        })
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

if (isisaldo.hasOwnProperty(m.sender.split('@')[0]) && isCmd) {
   transaksi = true
   let name = /([0-9A-Za-z]{20,24})/i
   let email = name + "@gmail.com"
linkRegex.exec(m.text)
   if (budy.toLowerCase() == name) {
     await clients.sendTextWithMentions(m.chat, `Transaksi Berhasil`, m)
   delete isisaldo[m.sender.split('@')[0]]
   } else m.reply('*Jawaban Salah!*')
   if (budy.toLowerCase() == email) {
     await clients.sendTextWithMentions(m.chat, `Transaksi Berhasil`, m)
   delete isisaldo[m.sender.split('@')[0]]
   } else m.reply('*Jawaban Salah!*')
}

/*        if (('register' + m.chat in _register) && isCmd) {
            kuis = true
            let room = _register['register' + m.chat]
            let teks = budy.toLowerCase().replace(/[^\w\s\-]+/, '')
            let isCancel = /^(batal)$/i.test(m.text)
            if (!isCancel) {
                let index = room.jawaban.findIndex(v => v.toLowerCase().replace(/[^\w\s\-]+/, '') === teks)
                if (room.terjawab[index]) return !0
                room.terjawab[index] = m.sender
            }
            let isWin = room.terjawab.length === room.terjawab.filter(v => v).length
            let caption = `
Jawablah Pertanyaan Berikut :\n${room.soal}\n\n\nTerdapat ${room.jawaban.length} Jawaban ${room.jawaban.find(v => v.includes(' ')) ? `(beberapa Jawaban Terdapat Spasi)` : ''}
${isWin ? `Semua Jawaban Terjawab` : isSurender ? 'Menyerah!' : ''}
${Array.from(room.jawaban, (jawaban, index) => {
        return isSurender || room.terjawab[index] ? `(${index + 1}) ${jawaban} ${room.terjawab[index] ? '@' + room.terjawab[index].split('@')[0] : ''}`.trim() : false
    }).filter(v => v).join('\n')}
    ${isSurender ? '' : `Perfect Player`}`.trim()
            whans.sendText(m.chat, caption, fakestatus, {
                contextInfo: {
                    mentionedJid: parseMention(caption)
                }
            }).then(mes => {
                return _register['register' + m.chat].pesan = mesg
            }).catch(_ => _)
            if (isDone || isCancel) delete _register['register' + m.chat]
        }
            case 'register': {
                if ('register' + m.chat in _register) {
                    m.reply('Masih Ada Sesi Yang Belum Diselesaikan!')
                    throw false
                }
                let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/family100.json')
                let random = anu[Math.floor(Math.random() * anu.length)]
                let hasil = `*Jawablah Pertanyaan Berikut :*\n${random.soal}\n\nTerdapat *${random.jawaban.length}* Jawaban ${random.jawaban.find(v => v.includes(' ')) ? `(beberapa Jawaban Terdapat Spasi)` : ''}`.trim()
                _register['register' + m.chat] = {
                    id: 'register' + m.chat,
                    pesan: await whans.sendText(m.chat, hasil, fakestatus),
                    ...random,
                    terjawab: Array.from(random.jawaban, () => false),
                    hadiah: 6,
                }
            }
            break
*/
// Deposit
if (text === "payment_qris") {
if (!fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
var deposit_object = {
ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
session: "amount",
date: new Date().toLocaleDateString("ID", { timeZone: "Asia/Jakarta"}),
number: sender,
payment: "QRIS",
data: {
amount_deposit: ""
}
}
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(deposit_object, null, 2))
reply("Oke kak mau deposit berapa?\n\nContoh: 15000")
} else {
reply("Proses Deposit kamu masih ada yang belum terselesaikan\nKetik _batal_ untuk membatalkan")
}
} else if (isListMessage === "payment_dana") {
if (!fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
var deposit_object = {
ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
session: "amount",
date: new Date().toLocaleDateString("ID", { timeZone: "Asia/Jakarta"}),
number: sender,
payment: "DANA",
data: {
amount_deposit: ""
}
}
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(deposit_object, null, 2))
reply("Oke kak mau deposit berapa?\n\nContoh: 15000")
} else {
reply("Proses Deposit kamu masih ada yang belum terselesaikan\nKetik _batal_ untuk membatalkan")
}
}

if (fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
if (!msg.key.fromMe) {
let data_deposit = JSON.parse(fs.readFileSync(depositPath + sender.split("@")[0] + ".json"))
if (data_deposit.session === "amount") {
if (isNaN(chats)) return reply("Masukan hanya angka ya")
data_deposit.data.amount_deposit = Number(chats);
if (data_deposit.data.amount_deposit < 10000) return reply(`Deposit Minimal Rp10.000`)
data_deposit.session = "konfirmasi_deposit";
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(data_deposit, null, 3));
let text = `「 𝙆𝙊𝙉𝙁𝙄𝙍𝙈𝘼𝙎𝙄-𝘿𝙀𝙋𝙊𝙎𝙄𝙏 」

▪ ID : ${data_deposit.ID}
▪ Nomer : ${data_deposit.number.split('@')[0]}
▪ Payment : ${data_deposit.payment}
▪ Jumlah Deposit : Rp${toRupiah(data_deposit.data.amount_deposit)}
▪ Pajak Admin : Rp0
▪ Total Pembayaran : Rp${toRupiah(data_deposit.data.amount_deposit)}

_Deposit akan dibatalkan otomatis apabila terdapat kesalahan input._
`
ronzz.sendMessage(from, { text, footer: '_Pencet *LANJUT* untuk melanjutkan_\n_Pencet *BATAL* untuk membatalkan_', buttons: [{ buttonId: 'y', buttonText: { displayText: 'LANJUT' }, type: 1},{ buttonId: 'n', buttonText: { displayText: 'BATAL' }, type: 1}]}, { quoted: msg })
} else if (data_deposit.session === "konfirmasi_deposit") {
if (chats.toLowerCase() === "y") {
if (data_deposit.payment === "QRIS") {
var qr_fexf =`༆━━[ *PAYMENT QRIS* ]━━࿐
 
*URL :* ${payment.qris.link_nya}
*AN :* ${payment.qris.atas_nama}

_Silahkan transfer dengan nomor yang sudah tertera, Jika sudah harap kirim bukti foto dengan caption #bukti untuk di acc oleh admin_`
ronzz.sendMessage(from, {image:{url:payment.qris.link_nya}, caption:qr_fexf}, {quoted: msg})
} else if (data_deposit.payment === "DANA") {
var py_dana =`༆━━[ *PAYMENT DANA* ]━━࿐
 
*NOMER :* ${payment.dana.nomer}
*AN :* ${payment.dana.atas_nama}

_Silahkan transfer dengan nomor yang sudah tertera, Jika sudah harap kirim bukti foto dengan caption *#bukti* untuk di acc oleh admin_`
reply(py_dana)
}} else if (chats === "n") {
reply(`Baik kak, Deposit Dengan ID : ${data_deposit.ID} dibatalkan 😊`)
fs.unlinkSync(depositPath + sender.split('@')[0] + '.json')
}}}}

switch(command) {
/*===============(( MAIN MENU ))===============*/
case 'daftar': case 'registrasi': case 'register': case 'registered': case 'regis': {
  var Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
  var users = global.db.data.users[m.sender]
  if (users.registered === true) return reply(PR(LangMess.Register))
   try {
       ppimg = await clients.profilePictureUrl(`${sender.split('@')[0]}@c.us`)
   } catch {
       ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
   }
  let [_, username, email, password] = text.match(Reg)
  if (!username) return reply('UserName tidak boleh kosong (Alphanumeric)')
  if (!email) throw 'Umur tidak boleh kosong (Angka)'
  if (!password) return reply('password tidak boleh kosong')
  age = parseInt(age)
  if (age > 30) throw 'WOI TUA (。-`ω´-)'
  if (age < 5) throw 'Halah dasar bocil'
  users.username = username.trim()
  users.email = email
  users.password = password
  user.regTime = + new Date
  user.registered = true
  let sn = createHash('md5').update(m.sender).digest('hex')
   let req = id.Daftar(prefix, command, pushname, register, serialUser, sender)
   register.push(sender)
   fs.writeFileSync('./database/user.json', JSON.stringify(register))
   Imgnah = await getBuffer(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlaKCZE6A9OdzmLHnsxL28_XT8qjBsL1tSlg&usqp=CAU`)
 clients.sendMessage(from, { caption: req, image: Imgnah, footer: packname, mentions: [sender] })    
}
break
case 'jadibot': {
  if (!isRegister) return reply(PR(LangMess.NotRegister))
jadibot(clients, m, from)
}
break
case 'listjadibot':
  if (!isRegister) return reply(mess.register)
  if (m.isGroup) return reply(mess.privat)
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
  reply ("On Kok Kak Bot Nya")
}
break
/*===============(( INFO BOT MENU ))===============*/
case 'jasarun': 
case 'jasrun': {
  reply(jasarun)
}
break
case 'sewa': {
  reply(sewabot)
}
break
case 'sc':
case 'script': {
  reply(script)
}
break
case 'tqto':
case 'credit':
case 'thanksto': {
  reply(`╭─❒ 「 THANKS TO 」 
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
 clients.sendContact(m.chat, global.owner, fkontak)
}
break
case 'menu': 
case 'help': 
case '?': {
 // if (!isRegister) return reply(PR(LangMess.NotRegister))
   var mundur = await hitungmundur(6, 29)
   let cap = id.Menu(pushname, salam, mundur, upload, download, totalGb, usedGb, freeGb, OwnerName, NameBot, jam, tanggal, runtime, sender, db, prefix, toRupiah, q, cekSaldo, db_saldo)
  await clients.sendFile(m.chat, fotomenu, 'menu.jpg', cap, fkontak)
}
break
/* ============== (( C ADMIN PANEL )) ===============*/
case 'cek saldo':{
reply(id.CekSaldo)
}
break
case 'add':
case 'tambah saldo': {
  if (!isOwner) reply(PR(LangMess.Owner))
  if (!q.split(",")[0]) return reply(`Ex : ${prefix+command} nomor,jumlah\n\nContoh :\n${prefix+command} 628xxx,20000`)
  if (!q.split(",")[1]) return reply(`Ex : ${prefix+command} nomor,jumlah\n\nContoh :\n${prefix+command} 628xxx,20000`)
addSaldo(q.split(",")[0]+"@s.whatsapp.net", Number(q.split(",")[1]), db_saldo)
await sleep(50)
clients.sendTextWithMentions(from, `「 *SALDO USER* 」 \n⭔ID: ${q.split(",")[0]} \n⭔Nomer: @${q.split(",")[0]} \nTanggal: ${tanggal} \n⭔Saldo: Rp${toRupiah(cekSaldo(q.split(",")[0]+"@s.whatsapp.net", db_saldo))}`, [q.split(",")[0]+"@s.whatsapp.net"])
}
break
case 'minsaldo': {
  if (!isOwner) reply(PR(LangMess.Owner))
  if (!q.split(",")[0]) return reply(`Ex : ${prefix+command} nomor,jumlah\n\nContoh :\n${prefix+command} 628xxx,20000`)
  if (!q.split(",")[1]) return reply(`Ex : ${prefix+command} nomor,jumlah\n\nContoh :\n${prefix+command} 628xxx,20000`)
  if (cekSaldo(q.split(",")[0]+"@s.whatsapp.net", db_saldo) < q.split(",")[1] && cekSaldo(q.split(",")[0]+"@s.whatsapp.net", db_saldo) !== 0) return reply(`Dia saldonya ${cekSaldo(q.split(",")[0]+"@s.whatsapp.net", db_saldo)}, jadi jangan melebihi ${cekSaldo(q.split(",")[0]+"@s.whatsapp.net", db_saldo)} yah kak🙏`)
minSaldo(q.split(",")[0]+"@s.whatsapp.net", Number(q.split(",")[1]), db_saldo)
await sleep(50)
clients.sendTextMentions(from, `「 *SALDO USER* 」 \n⭔ID: ${q.split(",")[0]} \n⭔Nomer: @${q.split(",")[0]} \n⭔Tanggal: ${tanggal} \n⭔Saldo: Rp${toRupiah(cekSaldo(q.split(",")[0]+"@s.whatsapp.net", db_saldo))}`, [q.split(",")[0]+"@s.whatsapp.net"])
}
break
case 'addusr': {
  if (domain === 'DOMAIN') return reply(`Maaf Domain Belum Diisi, Silahkan Isi Terlebih Dahulu Di File cpanel.js \nDomain Bisa Didapatkan Di Link Login Panel Anda`)
  if (apikey === 'APIKEY') return reply(`Maaf Apikey Belum Diisi, Silahkan Isi Terlebih Dahulu Di File cpanel.js \nApikey Bisa Didapatkan Di Akun Admin Panel`)
  if (c_apikey === 'CAPIKEY') return reply(`Maaf CApikey Belum Diisi, Silahkan Isi Terlebih Dahulu Di File cpanel.js \nCApikey Bisa Di Dapatkan Di Server Panel Anda`)
  if (!isOwner) return reply(mess.owner)
    let t = text.split(',');
  if (t.length < 1) return reply(`> Perintah :\n${prefix + command} nomor/tag`);
    let u = m.quoted ? m.quoted.sender : t[0] ? t[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
    let dms = `${global.nomorhost}@s.whatsapp.net`;
  if (!u) return m.reply(`*Format Yang Anda Masukkan Salah!*\n Contoh Penggunaan : ${prefix + command} nomer/tag`);
  try {
    let d = (await clients.onWhatsApp(u.split`@`[0]))[0] || {}
    let profil = d.exists ? crypto.randomBytes(2).toString('hex') : t[2]
    let password = d.exists ? crypto.randomBytes(3).toString('hex') : t[3]
    let f = await fetch(domain + "/api/application/users", {
        "method": "POST",
        "headers": {
           "Accept": "application/json",
           "Content-Type": "application/json",
           "Authorization": "Bearer " + apikey
        },
        "body": JSON.stringify({
           "email": 'admin' + profil.toString() + `@${global.namehost}`,
           "username": `${global.namahost}` + profil.toString(),
           "first_name": `${global.namahost}` + profil.toString(),
           "last_name": `${global.namahost}`,
           "language": "en",
           "password": `${global.namahost}` + password.toString()
        })
    })
    let data = await f.json();
  if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
    let user = data.attributes
    let succ = `*[ SUKSES MEMBUAT USER PANEL ]* \n\n📡ID: ${user.id} \n👤USERNAME: ${user.username} \n📃BUATAN: ${user.last_name} \n✅AKUN DIKIRIM : @${u.split`@`[0]}`
    let p = await clients.sendMessage(m.chat, { text: succ }, m, { mentions: [u] })
    let done = `*[ BERIKUT INFORMASI PANEL ANDA ]* \n\n📡ID: ${user.id} \n👤USERNAME: ${user.username} \n🔐PASSWORD: ${global.namahost}${password} \n🖥️LOGIN: ${global.webPage} \n✅TUTORIAL : https://bit.ly/Tutorial-Panel \n⛔EXPIRED : 1 Bulan`
      await clients.sendMessage(u, {text: done,})
    let pesan = `*[ PESANAN USER PANEL ]* \n\n👤AKUN PUNYA : @${u.split`@`[0]} \n📡ID: ${user.id} \n📬EMAIL: ${user.email} \n🖥️USERNAME: ${user.username} \n🔐PASSWORD: ${global.namahost}${password} \n📃DIBUAT: ${user.created_at}`
      clients.sendMessage(dms, {text: pesan,})
    let warn = `*[ PERINGATAN & PERATURAN ]*\n\n Note: \nGunakan dengan sebaik mungkin, simpan informasi akun karna jika hilang maka bukan tanggung jawab kami! \n\nPeringatan: \n⛔Dilarang menjual kembali \n⛔Dilarang menyebarkan akun karna \n⛔Dilarang menggunakan berlebihan \n⛔Jika terjadi error segera komplain \n\n✅Garansi 5Hari \n✅Admin : ${global.nomorhost} \n✅Toko : ${global.namestore}`
      clients.sendMessage(u, {text: warn,})
  } catch (err) {reply(`Maaf Domain, Apikey, Capikey Yang Anda Masukkan Tidak Benar. Mohon Masukkan Data Yang Benar \nJika Data Yang Anda Masukkan Sudah Benar, Tapi Masih Terjadi Kesalahan. Artinya Sedang Ada Kesalahan Pada Sistem (mohon untuk di perbaiki)`)}
}
break
case "delusr": {
  if (domain === 'DOMAIN') return reply(`Maaf Domain Belum Diisi, Silahkan Isi Terlebih Dahulu Di File cpanel.js \nDomain Bisa Didapatkan Di Link Login Panel Anda`)
  if (apikey === 'APIKEY') return reply(`Maaf Apikey Belum Diisi, Silahkan Isi Terlebih Dahulu Di File cpanel.js \nApikey Bisa Didapatkan Di Akun Admin Panel`)
  if (c_apikey === 'CAPIKEY') return reply(`Maaf CApikey Belum Diisi, Silahkan Isi Terlebih Dahulu Di File cpanel.js \nCApikey Bisa Di Dapatkan Di Server Panel Anda`)
  if (!isOwner) return reply(mess.owner)
  try {
let usr = args[0]
if (!usr) return m.reply('ID nya mana?')
let f = await fetch(domain + "/api/application/users/" + usr, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res = f.ok ? {
errors: null
} : await f.json()
if (res.errors) return m.reply('*USER NOT FOUND*')
m.reply('*SUCCESSFULLY DELETE THE USER*')
  } catch (err) {reply(`Maaf Domain, Apikey, Capikey Yang Anda Masukkan Tidak Benar. Mohon Masukkan Data Yang Benar \nJika Data Yang Anda Masukkan Sudah Benar, Tapi Masih Terjadi Kesalahan. Artinya Sedang Ada Kesalahan Pada Sistem (mohon untuk di perbaiki)`)}
}
break
case 'listusr': {
  if (domain === 'DOMAIN') return reply(`Maaf Domain Belum Diisi, Silahkan Isi Terlebih Dahulu Di File cpanel.js \nDomain Bisa Didapatkan Di Link Login Panel Anda`)
  if (apikey === 'APIKEY') return reply(`Maaf Apikey Belum Diisi, Silahkan Isi Terlebih Dahulu Di File cpanel.js \nApikey Bisa Didapatkan Di Akun Admin Panel`)
  if (c_apikey === 'CAPIKEY') return reply(`Maaf CApikey Belum Diisi, Silahkan Isi Terlebih Dahulu Di File cpanel.js \nCApikey Bisa Di Dapatkan Di Server Panel Anda`)
  try {
  let page = args[0] ? args[0] : '1'
    let f = await fetch(domain + "/api/application/users?page=" + page, {
        "method": "GET",
        "headers": {
           "Accept": "application/json",
           "Content-Type": "application/json",
           "Authorization": "Bearer " + apikey
        }
    })
    let res = await f.json();
    let users = res.data
    let sections = []
    for (let user of users) {
        let u = user.attributes
        let obj = {
            title: `${namehost}`,
            rows: [
               { title: `${u.id}. ${u.username}`, rowId: `${prefix}detusr ` + u.id, description: u.first_name + ' ' + u.last_name },
            ]
        }
    await sections.push(obj)
  if (sections.length === 50) {
    sections.push({
        title: `-- ${global.namapanel} --`,
        rows: [
           { title: `⏩ NEXT`, rowId: `${prefix}listusr 2`, description: 'Page 2' },
        ]
    })
  }
    }
 await clients.sendMessage(m.chat, {
                text: `Berikut list user *${global.namapanel}*`,
                footer: `Page: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}`,
                title: `${global.namapanel}`,
                buttonText: `${res.meta.pagination.count} Users`,
                sections
 })
   } catch (err) {reply(`Maaf Domain, Apikey, Capikey Yang Anda Masukkan Tidak Benar. Mohon Masukkan Data Yang Benar \nJika Data Yang Anda Masukkan Sudah Benar, Tapi Masih Terjadi Kesalahan. Artinya Sedang Ada Kesalahan Pada Sistem (mohon untuk di perbaiki)`)}
}
break
case 'detusr': {
  if (domain === 'DOMAIN') return reply(`Maaf Domain Belum Diisi, Silahkan Isi Terlebih Dahulu Di File cpanel.js \nDomain Bisa Didapatkan Di Link Login Panel Anda`)
  if (apikey === 'APIKEY') return reply(`Maaf Apikey Belum Diisi, Silahkan Isi Terlebih Dahulu Di File cpanel.js \nApikey Bisa Didapatkan Di Akun Admin Panel`)
  if (c_apikey === 'CAPIKEY') return reply(`Maaf CApikey Belum Diisi, Silahkan Isi Terlebih Dahulu Di File cpanel.js \nCApikey Bisa Di Dapatkan Di Server Panel Anda`)
  try {
  let usr = args[0]
    let f = await fetch(domain + "/api/application/users/" + usr, {
        "method": "GET",
        "headers": {
           "Accept": "application/json",
           "Content-Type": "application/json",
           "Authorization": "Bearer " + apikey
        }
    })
    let res = await f.json()
  if (res.errors) return m.reply('*USER NOT FOUND*')
    let u = res.attributes
    m.reply(`*${u.username.toUpperCase()} USER DETAILS*

\`\`\`ID: ${u.id}
UUID: ${u.uuid}
USERNAME: ${u.username}
EMAIL: ${u.email}
NAME: ${u.first_name} ${u.last_name}
LANGUAGE: ${u.language}
ADMIN: ${u.root_admin}
CREATED AT: ${u.created_at}\`\`\``)
   } catch (err) {reply(`Maaf Domain, Apikey, Capikey Yang Anda Masukkan Tidak Benar. Mohon Masukkan Data Yang Benar \nJika Data Yang Anda Masukkan Sudah Benar, Tapi Masih Terjadi Kesalahan. Artinya Sedang Ada Kesalahan Pada Sistem (mohon untuk di perbaiki)`)}
}
break
case 'addsrv': {
  if (domain === 'DOMAIN') return reply(`Maaf Domain Belum Diisi, Silahkan Isi Terlebih Dahulu Di File cpanel.js \nDomain Bisa Didapatkan Di Link Login Panel Anda`)
  if (apikey === 'APIKEY') return reply(`Maaf Apikey Belum Diisi, Silahkan Isi Terlebih Dahulu Di File cpanel.js \nApikey Bisa Didapatkan Di Akun Admin Panel`)
  if (c_apikey === 'CAPIKEY') return reply(`Maaf CApikey Belum Diisi, Silahkan Isi Terlebih Dahulu Di File cpanel.js \nCApikey Bisa Di Dapatkan Di Server Panel Anda`)
  if (!isOwner) return reply(mess.owner)
  try {
    let s = text.split(',');
  if (s.length < 7) return m.reply(`> Perintah :\n
${prefix + command} name,desc,userId,eggId,locId,memory/disk,cpu`)
    let name = s[0];
    let desc = s[1] || ''
    let usr_id = s[2];
    let egg = s[3];
    let loc = s[4];
    let memo_disk = s[5].split`/`;
    let cpu = s[6];
    let f1 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
         "method": "GET",
         "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apikey
         }
    })
    let data = await f1.json();
    //console.log(data.attributes.startup)
    let startup_cmd = data.attributes.startup
    let f = await fetch(domain + "/api/application/servers", {
        "method": "POST",
        "headers": {
           "Accept": "application/json",
           "Content-Type": "application/json",
           "Authorization": "Bearer " + apikey,
        },
        "body": JSON.stringify({
           "name": name,
           "description": desc,
           "user": usr_id,
           "egg": parseInt(egg),
           "docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
           "startup": startup_cmd,
           "environment": {
                "INST": "npm",
                "USER_UPLOAD": "0",
                "AUTO_UPDATE": "0",
                "CMD_RUN": "index.js"
           },
           "limits": {
                 "memory": memo_disk[0],
                 "swap": 0,
                 "disk": memo_disk[1],
                 "io": 500,
                 "cpu": cpu
           },
           "feature_limits": {
                 "databases": 0,
                 "backups": 1,
                 "allocations": 0
           },
           // "allocation": {
           //     "default": 36
           // }
           deploy: {
                 locations: [parseInt(loc)],
                 dedicated_ip: false,
                 port_range: [],
           },
        })
    })
    let res = await f.json()
  if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
    let server = res.attributes
    m.reply(`*== [ SUKSES MEMBUAT SERVER ] ==*

🖥TYPE: ${res.object}
📦ID: ${server.id}
👤NAME: ${server.name}
📄DESCRIPTION: ${server.description}
💾MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
🗄️DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
📈CPU: ${server.limits.cpu}%
📅CREATED AT: ${server.created_at}
⛔EXPIRED : 1 Bulan`)
   } catch (err) {reply(`Maaf Domain, Apikey, Capikey Yang Anda Masukkan Tidak Benar. Mohon Masukkan Data Yang Benar \nJika Data Yang Anda Masukkan Sudah Benar, Tapi Masih Terjadi Kesalahan. Artinya Sedang Ada Kesalahan Pada Sistem (mohon untuk di perbaiki)`)}
}
break
case 'delsrv': {
  if (domain === 'DOMAIN') return reply(`Maaf Domain Belum Diisi, Silahkan Isi Terlebih Dahulu Di File cpanel.js \nDomain Bisa Didapatkan Di Link Login Panel Anda`)
  if (apikey === 'APIKEY') return reply(`Maaf Apikey Belum Diisi, Silahkan Isi Terlebih Dahulu Di File cpanel.js \nApikey Bisa Didapatkan Di Akun Admin Panel`)
  if (c_apikey === 'CAPIKEY') return reply(`Maaf CApikey Belum Diisi, Silahkan Isi Terlebih Dahulu Di File cpanel.js \nCApikey Bisa Di Dapatkan Di Server Panel Anda`)
  if (!isOwner) return reply(mess.owner)
  try {
    let srv = args[0]
  if (!srv) return m.reply('ID nya mana?')
    let f = await fetch(domain + "/api/application/servers/" + srv, {
        "method": "DELETE",
        "headers": {
           "Accept": "application/json",
           "Content-Type": "application/json",
           "Authorization": "Bearer " + apikey,
        }
    })
    let res = f.ok ? {
        errors: null
    } : await f.json()
  if (res.errors) return m.reply('*SERVER NOT FOUND*')
    m.reply('*SUCCESSFULLY DELETE THE SERVER*')
  } catch (err) {reply(`Maaf Domain, Apikey, Capikey Yang Anda Masukkan Tidak Benar. Mohon Masukkan Data Yang Benar \nJika Data Yang Anda Masukkan Sudah Benar, Tapi Masih Terjadi Kesalahan. Artinya Sedang Ada Kesalahan Pada Sistem (mohon untuk di perbaiki)`)}
}
break
case 'listsrv': {
  if (domain === 'DOMAIN') return reply(`Maaf Domain Belum Diisi, Silahkan Isi Terlebih Dahulu Di File cpanel.js \nDomain Bisa Didapatkan Di Link Login Panel Anda`)
  if (apikey === 'APIKEY') return reply(`Maaf Apikey Belum Diisi, Silahkan Isi Terlebih Dahulu Di File cpanel.js \nApikey Bisa Didapatkan Di Akun Admin Panel`)
  if (c_apikey === 'CAPIKEY') return reply(`Maaf CApikey Belum Diisi, Silahkan Isi Terlebih Dahulu Di File cpanel.js \nCApikey Bisa Di Dapatkan Di Server Panel Anda`)
  if (!isOwner) return reply(mess.owner)
  try {
    let page = args[0] ? args[0] : '1'
    let f = await fetch(domain + "/api/application/servers?page=" + page, {
        "method": "GET",
        "headers": {
           "Accept": "application/json",
           "Content-Type": "application/json",
           "Authorization": "Bearer " + apikey
        }
    })
    let res = await f.json();
    let servers = res.data
    let sections = []
    for (let server of servers) {
    let s = server.attributes
    let f3 = await fetch(domain + "/api/client/servers/" + s.uuid.split`-`[0] + "/resources", {
         "method": "GET",
         "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + c_apikey
         }
    })
    let data = await f3.json();
    let obj = {
        title: `${global.namapanel}`,
        rows: [
            { title: `${s.id}. ${s.name}`, rowId: `${prefix}detsrv ` + s.id, description: `Status: ${data.attributes ? data.attributes.current_state : s.status}` },
        ]
    }
    await sections.push(obj)
  if (sections.length >= 50 && res.meta.pagination.links.next) {
    sections.push({
        title: `${global.namapanel}`,
        rows: [
{ title: `⏩ NEXT`, rowId: `${prefix}listsrv 2`, description: 'Page 2' },
{ title: `⏩ NEXT`, rowId: `${prefix}listsrv 3`, description: 'Page 3' },
{ title: `⏩ NEXT`, rowId: `${prefix}listsrv 4`, description: 'Page 4' },
{ title: `⏩ NEXT`, rowId: `${prefix}listsrv 5`, description: 'Page 5' },
        ]
    })
  }
    }
 await clients.sendMessage(m.chat, {
    text: `Berikut list server *${global.namapanel}*`,
    footer: `Page: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}`,
    title: `${global.namapanel}`,
    buttonText: `${res.meta.pagination.count} Servers`,
    sections
 }, { quoted: m })
    } catch (err) {reply(`Maaf Domain, Apikey, Capikey Yang Anda Masukkan Tidak Benar. Mohon Masukkan Data Yang Benar \nJika Data Yang Anda Masukkan Sudah Benar, Tapi Masih Terjadi Kesalahan. Artinya Sedang Ada Kesalahan Pada Sistem (mohon untuk di perbaiki)`)}
}
break
case 'detsrv': {
  if (domain === 'DOMAIN') return reply(`Maaf Domain Belum Diisi, Silahkan Isi Terlebih Dahulu Di File cpanel.js \nDomain Bisa Didapatkan Di Link Login Panel Anda`)
  if (apikey === 'APIKEY') return reply(`Maaf Apikey Belum Diisi, Silahkan Isi Terlebih Dahulu Di File cpanel.js \nApikey Bisa Didapatkan Di Akun Admin Panel`)
  if (c_apikey === 'CAPIKEY') return reply(`Maaf CApikey Belum Diisi, Silahkan Isi Terlebih Dahulu Di File cpanel.js \nCApikey Bisa Di Dapatkan Di Server Panel Anda`)
  try {
  let srv = args[0]
            let f = await fetch(domain + "/api/application/servers/" + srv, {
                "method": "GET",
                "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + apikey
                }
            })
            let res = await f.json();
            if (res.errors) return m.reply('*SERVER NOT FOUND*')
            let s = res.attributes
            let f2 = await fetch(domain + "/api/client/servers/" + s.uuid.split`-`[0] + "/resources", {
                "method": "GET",
                "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + c_apikey
                }
            })
            let data = await f2.json();
            let t = data.attributes
            m.reply(`*${s.name.toUpperCase()} SERVER DETAILS*

\`\`\`STATUS: ${t.current_state}

ID: ${s.id}
UUID: ${s.uuid}
NAME: ${s.name}
DESCRIPTION: ${s.description}
MEMORY: ${await (format(t.resources.memory_bytes)).toString()} / ${s.limits.memory === 0 ? 'Unlimited' : s.limits.memory + 'MB'}
DISK: ${await (format(t.resources.disk_bytes)).toString()} / ${s.limits.disk === 0 ? 'Unlimited' : s.limits.disk + 'MB'}
CPU: ${t.resources.cpu_absolute}% / ${s.limits.cpu === 0 ? 'Unlimited' : s.limits.cpu + '%'}
CREATED AT: ${s.created_at}\`\`\``)
           } catch (err) {reply(`Maaf Domain, Apikey, Capikey Yang Anda Masukkan Tidak Benar. Mohon Masukkan Data Yang Benar \nJika Data Yang Anda Masukkan Sudah Benar, Tapi Masih Terjadi Kesalahan. Artinya Sedang Ada Kesalahan Pada Sistem (mohon untuk di perbaiki)`)}
           }
            break
        case 'reinstall': {
          if (domain === 'DOMAIN') return reply(`Maaf Domain Belum Diisi, Silahkan Isi Terlebih Dahulu Di File cpanel.js \nDomain Bisa Didapatkan Di Link Login Panel Anda`)
  if (apikey === 'APIKEY') return reply(`Maaf Apikey Belum Diisi, Silahkan Isi Terlebih Dahulu Di File cpanel.js \nApikey Bisa Didapatkan Di Akun Admin Panel`)
  if (c_apikey === 'CAPIKEY') return reply(`Maaf CApikey Belum Diisi, Silahkan Isi Terlebih Dahulu Di File cpanel.js \nCApikey Bisa Di Dapatkan Di Server Panel Anda`)
            if (!isOwner) return reply(mess.owner)
            try {
            let srv = args[0]
            if (!srv) return m.reply('ID nya mana?')
            let f = await fetch(domain + "/api/application/servers/" + srv + "/reinstall", {
                "method": "POST",
                "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + apikey
                }
            })
            let res = f.ok ? {
                errors: null
            } : await f.json()
            if (res.errors) return m.reply('*SERVER NOT FOUND*')
            m.reply('*REINSTALLING THE SERVER..*')
               } catch (err) {reply(`Maaf Domain, Apikey, Capikey Yang Anda Masukkan Tidak Benar. Mohon Masukkan Data Yang Benar \nJika Data Yang Anda Masukkan Sudah Benar, Tapi Masih Terjadi Kesalahan. Artinya Sedang Ada Kesalahan Pada Sistem (mohon untuk di perbaiki)`)}
        }
            break
        case 'updatesrv': {
          if (domain === 'DOMAIN') return reply(`Maaf Domain Belum Diisi, Silahkan Isi Terlebih Dahulu Di File cpanel.js \nDomain Bisa Didapatkan Di Link Login Panel Anda`)
  if (apikey === 'APIKEY') return reply(`Maaf Apikey Belum Diisi, Silahkan Isi Terlebih Dahulu Di File cpanel.js \nApikey Bisa Didapatkan Di Akun Admin Panel`)
  if (c_apikey === 'CAPIKEY') return reply(`Maaf CApikey Belum Diisi, Silahkan Isi Terlebih Dahulu Di File cpanel.js \nCApikey Bisa Di Dapatkan Di Server Panel Anda`)
            if (!isOwner) return reply(mess.owner)
            try {
            let t = text.split(',');
            if (t.length < 4) return m.reply(`Perintah :\n
${prefix + command} srvId,locId,memory/disk,cpu`)
            let srv = t[0];
            let loc = t[1];
            let memo_disk = t[2].split`/`;
            let cpu = t[3];
            let f1 = await fetch(domain + "/api/application/servers/" + srv, {
                "method": "GET",
                "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + apikey
                }
            })
            let data = await f1.json()

            let f = await fetch(domain + "/api/application/servers/" + srv + "/build", {
                "method": "PATCH",
                "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + apikey
                },
                "body": JSON.stringify({
                    "allocation": parseInt(loc) || data.attributes.allocation,
                    "memory": memo_disk[0] || data.attributes.limits.memory,
                    "swap": data.attributes.limits.swap || 0,
                    "disk": memo_disk[1] || data.attributes.limits.disk,
                    "io": 500,
                    "cpu": cpu || data.attributes.limits.cpu,
                    "threads": null,
                    "feature_limits": {
                        "databases": 5,
                        "allocations": 5,
                        "backups": 5
                    }
                })
            })
            let res = await f.json()
            if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
            let server = res.attributes
            m.reply(`*SUCCESSFULLY UPDATED THE SERVER*

TYPE: ${res.object}

ID: ${server.id}
UUID: ${server.uuid}
NAME: ${server.name}
DESCRIPTION: ${server.description}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%
CREATED AT: ${server.created_at}
UPDATED AT: ${server.updated_at}`)
   } catch (err) {reply(`Maaf Domain, Apikey, Capikey Yang Anda Masukkan Tidak Benar. Mohon Masukkan Data Yang Benar \nJika Data Yang Anda Masukkan Sudah Benar, Tapi Masih Terjadi Kesalahan. Artinya Sedang Ada Kesalahan Pada Sistem (mohon untuk di perbaiki)`)}
        }
            break
        case 'startsrv': case 'stopsrv': case 'restartsrv': {
          if (domain === 'DOMAIN') return reply(`Maaf Domain Belum Diisi, Silahkan Isi Terlebih Dahulu Di File cpanel.js \nDomain Bisa Didapatkan Di Link Login Panel Anda`)
  if (apikey === 'APIKEY') return reply(`Maaf Apikey Belum Diisi, Silahkan Isi Terlebih Dahulu Di File cpanel.js \nApikey Bisa Didapatkan Di Akun Admin Panel`)
  if (c_apikey === 'CAPIKEY') return reply(`Maaf CApikey Belum Diisi, Silahkan Isi Terlebih Dahulu Di File cpanel.js \nCApikey Bisa Di Dapatkan Di Server Panel Anda`)
try {
            let action = command.replace('srv', '')
            if (!isOwner) return reply(mess.owner)
            let srv = args[0]
            if (!srv) return m.reply('ID nya mana?')
            let f = await fetch(domain + "/api/client/servers/" + srv + "/power", {
                "method": "POST",
                "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + c_apikey,
                },
                "body": JSON.stringify({
                    "signal": action
                })
            })

            let res = f.ok ? {
                errors: null
            } : await f.json()
            if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
            m.reply(`*SUCCESSFULLY ${action.toUpperCase()} THE SERVER*`)
               } catch (err) {reply(`Maaf Domain, Apikey, Capikey Yang Anda Masukkan Tidak Benar. Mohon Masukkan Data Yang Benar \nJika Data Yang Anda Masukkan Sudah Benar, Tapi Masih Terjadi Kesalahan. Artinya Sedang Ada Kesalahan Pada Sistem (mohon untuk di perbaiki)`)}
        }
case 'goblok': case 'gblk': case 'kontol': case 'kntl': case 'kmtl': case 'ngtd': case 'ngentod': case 'ajg': case 'anjg': case 'anjing': case 'mmk': case 'memek': case 'meki': case 'puki': case 'jancok': case 'babi': case 'tolol': case 'yapit':  case 'yatim': case 'piatu': case 'bodoh': case 'tolol': case 'ngentot': case 'sange': case 'bangsat': case 'gblk': case 'goblok': case 'pantek': case 'pantex': case 'asu': case 'bego':
case 'sangean': {
  m.reply(PR(Lang.mess.NoToxic))
  await clients.sendMessage(m.chat, { 
	delete: {
        remoteJid: m.chat,
        fromMe: false,
        id: m.key.id,
        participant: m.key.participant
    }
  })
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
      await reply(evaled)
  } catch (err) {
      await reply(util.format(err))
  }
}
}
    
} catch (err) {
   m.reply(util.format(err))
}
}