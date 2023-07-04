require('./settings')
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto } = require("@sampandey001/baileys")
const pino = require('pino')
const { Boom } = require('@hapi/boom')
const fs = require('fs')
const _ = require('lodash')
const yargs = require('yargs/yargs')
const axios = require('axios')
const fetch = require('node-fetch')
const FileType = require('file-type')
const PhoneNumber = require('awesome-phonenumber')
const moment = require('moment-timezone')
const path = require('path')
const { getSizeMedia } = require('./lib/myfunc')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const { smsg, getBuffer, fetchJson } = require('./lib/simple')
const sleep = require ('./function/allfunc.js')
const { isSetDone, addSetDone, removeSetDone, changeSetDone, getTextSetDone, isSetProses, addSetProses, removeSetProses, changeSetProses, getTextSetProses } = require("./lib/store")
const { nocache, uncache } = require("./function/CacheData.js")
const writeExif = require('./lib/exif')
const { Low, JSONFile } = require('./lib/lowdb')
const mongoDB = require('./lib/mongoDB')

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.db = new Low(
  /https?:\/\//.test(opts['db'] || '') ?
    new cloudDBAdapter(opts['db']) : /mongodb/.test(opts['db']) ?
      new mongoDB(opts['db']) :
      new JSONFile(`database/database.json`)
)
global.DATABASE = global.db // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) return new Promise((resolve) => setInterval(function () { (!global.db.READ ? (clearInterval(this), resolve(global.db.data == null ? global.loadDatabase() : global.db.data)) : null) }, 1 * 1000))
  if (global.db.data !== null) return
  global.db.READ = true
  await global.db.read()
  global.db.READ = false
  global.db.data = {
     users: {},
     chats: {},
     database: {},
     game: {},
     others: {},
     sticker: {},
     cmd: {},
     settings: {},
     anonymous: {},
     menfess: {},
    ...(global.db.data || {})
  }
  global.db.chain = _.chain(global.db.data)
}
loadDatabase()

// save database every 30seconds
if (global.db) setInterval(async () => {
    if (global.db.data) await global.db.write()
  }, 30 * 1000)

let set_proses = JSON.parse(fs.readFileSync('./database/set_proses.json'));
let set_done = JSON.parse(fs.readFileSync('./database/set_done.json'));
let db_respon_list = JSON.parse(fs.readFileSync('./database/list.json'));

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
 
global.api = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({
	...query,
	...(apikeyqueryname ? {
		[apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name]
		} : {})
		})) : '')
	
async function Botstarted() {
    const getVersionWaweb = () => {
        let version
        try {
            let a = fetchJson('https://web.whatsapp.com/check-update?version=1&platform=web')
            version = [a.currentVersion.replace(/[.]/g, ', ')]
        } catch {
            version = [2, 2204, 13]
        }
        return version
    }
    const { state, saveCreds } = await useMultiFileAuthState(sessionName)

    const clients = makeWASocket({
        logger: pino({ level: 'fatal' }),
        printQRInTerminal: true,
        browser: ['Clients-MD','Safari','1.1.0'],
        auth: state,
        fireInitQueries: false,
        shouldSyncHistoryMessage: false,
        downloadHistory: false,
        version: getVersionWaweb() || [2, 2242, 6],
        syncFullHistory: false,
        markOnlineOnConnect: false,
        connectTimeoutMs: 60_000,
        defaultQueryTimeoutMs: 0,
        keepAliveIntervalMs: 10000,
        generateHighQualityLinkPreview: true,
        patchMessageBeforeSending: (message) => {
            const requiresPatch = !!(
               message.buttonsMessage 
               || message.templateMessage
               || message.listMessage
            );
            if (requiresPatch) {
               message = {
                 viewOnceMessage: {
                    message: {
                       messageContextInfo: {
                          deviceListMetadataVersion: 2,
                          deviceListMetadata: {},
                       },
                       ...message,
                    },
                 },
               };
            }
        return message;
        },
        getMessage: async (key) => {
            if (store) {
               const msg = await store.loadMessage(key.remoteJid, key.id)
               return msg.message || undefined
            }
            return {
               conversation: "hello, i'm Whans bot"
            }
        },
    })
    store.bind(clients.ev)
    
    clients.ev.on('messages.upsert', async chatUpdate => {
        //console.log(JSON.stringify(chatUpdate, undefined, 2))
        try {
        mek = chatUpdate.messages[0]
        if (!mek.message) return
        mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
        if (mek.key && mek.key.remoteJid === 'status@broadcast') return
        if (!clients.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
        if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
        m = smsg(clients, mek, store)
        require("./case")(clients, m, chatUpdate, store, set_proses, set_done, db_respon_list)
        } catch (err) {
            console.log(err)
        }
    })
    
    clients.ev.on('groups.update', async anu => {
    try {
    for(let x of anu) {
       try {
       ppgc = await clients.profilePictureUrl(x.id, 'image')
       } catch {
       ppgc = 'https://telegra.ph/file/c3f3d2c2548cbefef1604.jpg'
       }
       let wm_fatih = { url : ppgc }
       if (x.announce == true) {
       clients.sendMessage(x.id, {image: {url: ppgc}, caption: `*「 Group Update Detected 」*\n\nGroup telah ditutup, Sekarang hanya admin yang dapat mengirim pesan !`})
       } else if (x.announce == false) {
       clients.sendMessage(x.id, {image: {url: ppgc}, caption:`*「 Group Update Detected 」*\n\nGroup telah dibuka, Sekarang peserta dapat mengirim pesan !`})
       } else if (x.restrict == true) {
       clients.sendMessage(x.id, {image: {url: ppgc}, caption:`*「 Group Update Detected 」*\n\nInfo group telah dibatasi, Sekarang hanya admin yang dapat mengedit info group !`})
       } else if (x.restrict == false) {
       clients.sendMessage(x.id, {image: {url: ppgc}, caption:`*「 Group Update Detected 」*\n\nInfogroup telah dibuka, Sekarang peserta dapat mengedit info group !`})
       } else {
       clients.sendMessage(x.id, {image: {url: ppgc}, caption:`*「 Group Update Detected 」*\n\nNama Group telah diganti menjadi *${x.subject}*`})
     }
    }
    } catch (err){
    console.log(err)
    }
    })
    
    store.bind(clients.ev)
    clients.ev.on('call', async (celled) => {
    	if (global.anticall) {
    	console.log(celled)
    for (let kopel of celled) {
    	if (kopel.isGroup == false) {
    	if (kopel.status == "offer") {
    	let nomer = await clients.sendTextWithMentions(kopel.from, `*${clients.user.name}* tidak bisa menerima panggilan ${kopel.isVideo ? `video` : `suara`}. Maaf @${kopel.from.split('@')[0]} kamu akan diblokir. Silahkan hubungi Owner membuka blok !`)
    await sleep(5000)
    clients.updateBlockStatus(kopel.from, "block")
    }
    }
    }
    }
    })
    
    clients.ev.on('group-participants.update', async (anu) => {
try {
    let metadata = await clients.groupMetadata(anu.id)
    let participants = anu.participants
    const groupName = metadata.subject
    const groupDesc = metadata.desc
    for (let num of participants) {
    try {
        ppuser = await clients.profilePictureUrl(num, 'image')
    } catch {
        ppuser = 'https://telegra.ph/file/c3f3d2c2548cbefef1604.jpg'
    }

    try {
        ppgroup = await clients.profilePictureUrl(anu.id, 'image')
    } catch {
        ppgroup = 'https://telegra.ph/file/c3f3d2c2548cbefef1604.jpg'
    }
    
    if (anu.action == 'add' && (global.welcome)) {
        //console.log(anu)
        welcome = await getBuffer("https://telegra.ph/file/c3f3d2c2548cbefef1604.jpg") 
     {     
    clients.sendMessage(anu.id, { image: welcome, mentions: [num], caption: `*Welcome Kak @${num.split("@")[0]} Di Group ${metadata.subject}* \n\n${metadata.desc}` })
     }
    } else

    if (anu.action == 'remove' && (global.left)) {
       //console.log(anu)
        goodbye = await getBuffer("https://telegra.ph/file/0d50687b197cac991115e.jpg")
    {
    clients.sendMessage(anu.id, { image: goodbye, mentions: [num], caption: `Bye Kak 👋 \n*"Karna Setiap Ucapan Selamat Datang Akan Selalu Diakhiri Dengan Ucapan Selamat Tinggal"* \n\nTerima Kasih Kak @${num.split("@")[0]} Sampai Bertemu Kembali Di Group ${metadata.subject}` })
     }
    } else 
    
    if (anu.action == 'promote') {
     clients.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `@${num.split('@')[0]} sekaran menjadi admin grup ${metadata.subject}` })
    } else 
    
    if (anu.action == 'demote') {
     clients.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `@${num.split('@')[0]} bukan admin grup ${metadata.subject} lagi` })
    }
    }
} catch (err) {
    console.log(err)
}
    })
	
    // Setting
    clients.decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {}
            return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
    }
    
    clients.ev.on('contacts.update', update => {
        for (let contact of update) {
            let id = clients.decodeJid(contact.id)
            if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
        }
    })

    clients.getName = (jid, withoutContact  = false) => {
        id = clients.decodeJid(jid)
        withoutContact = clients.withoutContact || withoutContact 
        let v
        if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
            v = store.contacts[id] || {}
            if (!(v.name || v.subject)) v = clients.groupMetadata(id) || {}
            resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
        })
        else v = id === '0@s.whatsapp.net' ? {
            id,
            name: 'WhatsApp'
        } : id === clients.decodeJid(clients.user.id) ?
            clients.user :
            (store.contacts[id] || {})
            return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
    }
    
    clients.sendContact = async (jid, kon, quoted = '', opts = {}) => {
	let list = []
	for (let i of kon) {
	    list.push({
	    	displayName: await clients.getName(i + '@s.whatsapp.net'),
	    	vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await clients.getName(i + '@s.whatsapp.net')}\nFN:${await clients.getName(i + '@s.whatsapp.net')}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
	    })
	}
	clients.sendMessage(jid, { contacts: { displayName: `${list.length} Kontak`, contacts: list }, ...opts }, { quoted })
    }
    
    clients.public = true

    clients.serializeM = (m) => smsg(clients, m, store)

    clients.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update	    
        if (connection === 'close') {
        let reason = new Boom(lastDisconnect?.error)?.output.statusCode
            if (reason === DisconnectReason.badSession) { console.log(`Bad Session File, Please Delete Session and Scan Again`); clients.logout(); }
            else if (reason === DisconnectReason.connectionClosed) { console.log("Connection closed, reconnecting...."); Botstarted(); }
            else if (reason === DisconnectReason.connectionLost) { console.log("Connection Lost from Server, reconnecting..."); Botstarted(); }
            else if (reason === DisconnectReason.connectionReplaced) { console.log("Connection Replaced, Another New Session Opened, reconnecting..."); Botstarted(); }
            else if (reason === DisconnectReason.loggedOut) { console.log(`Device Logged Out, Please Scan Again And Run.`); clients.logout(); }
            else if (reason === DisconnectReason.restartRequired) { console.log("Restart Required, Restarting..."); Botstarted(); }
            else if (reason === DisconnectReason.timedOut) { console.log("Connection TimedOut, Reconnecting..."); Botstarted(); }
            else if (reason === DisconnectReason.Multidevicemismatch) { console.log("Multi device mismatch, please scan again"); clients.logout(); }
            else clients.end(`Unknown DisconnectReason: ${reason}|${connection}`)
        }
        if (update.connection == "open" || update.receivedPendingNotifications == "true") {
         await store.chats.all()
         console.log(`Connected to = ` + JSON.stringify(clients.user, null, 2))
         //clients.sendMessage("77777777777" + "@s.whatsapp.net", {text:"", "contextInfo":{"expiration": 86400}})
      }
    })

    clients.ev.on('creds.update', saveCreds)

  clients.sendText = (jid, text, quoted = '', options) => clients.sendMessage(jid, { text: text, ...options }, { quoted, ...options })

clients.downloadMediaMessage = async (message) => {
      let mime = (message.msg || message).mimetype || ''
      let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
      const stream = await downloadContentFromMessage(message, messageType)
      let buffer = Buffer.from([])
      for await (const chunk of stream) {
         buffer = Buffer.concat([buffer, chunk])
      }

      return buffer
   }
   
clients.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {

        let quoted = message.msg ? message.msg : message

        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(quoted, messageType)
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
	let type = await FileType.fromBuffer(buffer)
        trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
        // save to file
        await fs.writeFileSync(trueFileName, buffer)
        return trueFileName
    }
    clients.sendImage = async (jid, path, caption = '', quoted = '', options) => {
    	let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
    return await clients.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
    }
    clients.sendMedia = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
    	let types = await clients.getFile(path, true)
    let { mime, ext, res, data, filename } = types
    if (res && res.status !== 200 || file.length <= 65536) {
    	try { throw { json: JSON.parse(file.toString()) } }
    catch (e) { if (e.json) throw e.json }
    }
    let type = '', mimetype = mime, pathFile = filename
    if (options.asDocument) type = 'document'
    if (options.asSticker || /webp/.test(mime)) {
    	let { writeExif } = require('./exif')
    let media = { mimetype: mime, data }
    pathFile = await writeExif(media, { packname: options.packname ? options.packname : global.packname, author: options.author ? options.author : global.author, categories: options.categories ? options.categories : [] })
    await fs.promises.unlink(filename)
    type = 'sticker'
    mimetype = 'image/webp'
    }
    else if (/image/.test(mime)) type = 'image'
    else if (/video/.test(mime)) type = 'video'
    else if (/audio/.test(mime)) type = 'audio'
    else type = 'document'
    await clients.sendMessage(jid, { [type]: { url: pathFile }, caption, mimetype, fileName, ...options }, { quoted, ...options })
    return fs.promises.unlink(pathFile)
    }
    
    clients.getFile = async (PATH, returnAsFilename) => {
      let res, filename
      const data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,` [1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await fetch(PATH)).buffer() : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
      if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
      const type = await FileType.fromBuffer(data) || {
         mime: 'application/octet-stream',
         ext: '.bin'
      }
      if (data && returnAsFilename && !filename)(filename = path.join(__dirname, './media/' + new Date * 1 + '.' + type.ext), await fs.promises.writeFile(filename, data))
      return {
         res,
         filename,
         ...type,
         data,
         deleteFile() {
            return filename && fs.promises.unlink(filename)
         }
     }
     }
     
    clients.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
    	let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
    let buffer
    if (options && (options.packname || options.author)) {
    	buffer = await writeExifVid(buff, options)
    } else {
    	buffer = await videoToWebp(buff)
    }
    
    await clients.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
    return buffer
    }
    clients.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
    	let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
    let buffer
    if (options && (options.packname || options.author)) {
    	buffer = await writeExifImg(buff, options)
    } else {
    	buffer = await imageToWebp(buff)
    }
    
    await clients.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
    return buffer
    }
    
    clients.sendMediaAsSticker = async (jid, path, quoted, options = {}) => {
    	let {
    	ext,
    mime,
    data
    } = await clients.getFile(path)
    let media = {}
    let buffer
    media.data = data
    media.mimetype = mime
    if (options && (options.packname || options.author)) {
    	buffer = await writeExif(media, options)
    } else {
    	buffer = /image/.test(mime) ? await imageToWebp(data) : /video/.test(mime) ? await videoToWebp(data) : ""
    }
    await clients.sendMessage(jid, {
    	sticker: {
    	url: buffer
    },
    ...options
    }, {
    	quoted
    })
    return buffer
    }
    
    clients.sendFakeLink = (jid, text, salam, pushname, quoted) => clients.sendMessage(jid, {
    	text: text,
    }, {
    quoted : quoted
    })
    
    clients.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
    	let type = await clients.getFile(path, true)
    let {
    	res,
    data: file,
    filename: pathFile
    } = type
    if (res && res.status !== 200 || file.length <= 65536) {
    	try {
    	throw {
    	json: JSON.parse(file.toString())
    }
    }
    catch (e) {
    	if (e.json) throw e.json
    }
    }
    let opt = {
    	filename
    }
    if (quoted) opt.quoted = quoted
    if (!type) options.asDocument = true
    let mtype = '',
    mimetype = type.mime,
    convert
    if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) mtype = 'sticker'
    else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) mtype = 'image'
    else if (/video/.test(type.mime)) mtype = 'video'
    else if (/audio/.test(type.mime))(
    convert = await (ptt ? toPTT : toAudio)(file, type.ext),
    file = convert.data,
    pathFile = convert.filename,
    mtype = 'audio',
    mimetype = 'audio/ogg; codecs=opus'
    )
    else mtype = 'document'
    if (options.asDocument) mtype = 'document'
    
    delete options.asSticker
    delete options.asLocation
    delete options.asVideo
    delete options.asDocument
    delete options.asImage
    
    let message = {
    	...options,
    caption,
    ptt,
    [mtype]: {
    	url: pathFile
    },
    mimetype
    }
    let m
    try {
    	m = await clients.sendMessage(jid, message, {
    	...opt,
    ...options
    })
    }
    catch (e) {
    	//console.error(e)
    m = null
    }
    finally {
    	if (!m) m = await clients.sendMessage(jid, {
    	...message,
    [mtype]: file
    }, {
    	...opt,
    ...options
    })
    file = null
    return m
    }
    }
    
clients.sendTextWithMentions = async (jid, text, quoted, options = {}) => clients.sendMessage(jid, {
      text: text,
      mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'),
      ...options
   }, {
      quoted
   })

    return clients
}

Botstarted()