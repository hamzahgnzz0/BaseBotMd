require("../settings.js")
module.exports = { ftroli, fopenai, fdoc, fvn, ftextt, ftoko, fgif, fgclink, fvideo, floc, floc2, fkontak, fakestatus } = async (m) => {
const ftroli = {
    key: {
       fromMe: false,
       "participant": "0@s.whatsapp.net",
       "remoteJid": "status@broadcast"
    },
    "message": {
        orderMessage: {
        itemCount: 2022,
        status: 200,
        thumbnail: {url: thumbfake},
        surface: 200,
        message: ttname,
        orderTitle: NameBot,
        sellerJid: '0@s.whatsapp.net'
       }
    },
    contextInfo: {
       "forwardingScore": 999,
       "isForwarded": true // biar ada tulisan di teruskan berkali-kali, kalo gk mau ubh aja jadi false
    },
    sendEphemeral: true    
}

const fopenai = {
    key: {
       fromMe: false,
       "participant": "0@s.whatsapp.net",
       "remoteJid": "status@broadcast"
    },
    "message": {
        orderMessage: {
        itemCount: 2023,
        status: 200,
        surface: 200,
        message: 'ChatGpt',
        orderTitle: 'OpenAi',
        sellerJid: '0@s.whatsapp.net'
       }
    },
    contextInfo: {
       "forwardingScore": 999,
       "isForwarded": false // biar ada tulisan di teruskan berkali-kali, kalo gk mau ubh aja jadi false
    },
    sendEphemeral: true    
}

const fdoc = {
    key: {
       participant: '0@s.whatsapp.net',
       ...(m.chat ? {
       remoteJid: `status@broadcast`
       } : {})
    },
    message: {
       documentMessage: {
       title: ttname,
       jpegThumbnail: {url: thumbfake},
       }
    }
}

const fvn = {
    key: {
       participant: `0@s.whatsapp.net`,
       ...(m.chat ? {
       remoteJid: "status@broadcast"
       } : {})
    },
    message: {
       "audioMessage": {
       "mimetype": "audio/ogg; codecs=opus",
       "seconds": 359996400,
       "ptt": "true"
       }
    }
}

const ftextt = {
    key: {
       fromMe: false,
       participant: `0@s.whatsapp.net`,
       ...(m.chat ? {
       remoteJid: "status@broadcast"
       } : {})
    },
    message: {
       "extendedTextMessage": {
       "text": ttname,
       "title": NameBot,
       'jpegThumbnail': {url: thumbfake},
       }
    }
}

const ftoko = {
    key: {
       fromMe: false,
       participant: `0@s.whatsapp.net`,
       ...(m.chat ? {
       remoteJid: "status@broadcast"
       } : {})
    },
    message: {
       "productMessage": {
       "product": {
       "productImage": {
       "mimetype": "image/jpeg",
       "jpegThumbnail": {url: thumbfake},
       },
       "title": ttname,
       "description": NameBot,
       "currencyCode": "IDR",
       "priceAmount1000": "1000000000000000000",
       "retailerId": ttname,
       "productImageCount": 1
       },
       "businessOwnerJid": `0@s.whatsapp.net`
       }
    }
}

const fgif = {
    key: {
       participant: `0@s.whatsapp.net`,
       ...(m.chat ? {
       remoteJid: "status@broadcast"
       } : {})
    },
    message: {
       "videoMessage": {
       "title": ttname,
       "h": `Hmm`,
       'seconds': '359996400',
       'gifPlayback': 'true',
       'caption': ttname,
       'jpegThumbnail': {url: thumbfake},
       }
    }
}

const fgclink = {
    key: {
       participant: "0@s.whatsapp.net",
       "remoteJid": "0@s.whatsapp.net"
    },
    "message": {
        "groupInviteMessage": {
        "groupJid": "60102810046-1616169743@g.us",
        "inviteCode": "m",
        "groupName": ttname,
        "caption": ttname,
        'jpegThumbnail': {url: thumbfake},
        }
    }
}

const fvideo = {
    key: {
       fromMe: false,
       participant: `0@s.whatsapp.net`,
       ...(m.chat ? {
       remoteJid: "status@broadcast"
       } : {})
    },
    message: {
       "videoMessage": {
       "title": ttname,
       "h": `Hmm`,
       'seconds': '359996400',
       'caption': ttname,
       'jpegThumbnail': {url: thumbfake},
       }
    }
}

const floc = {
    key: {
       participant: '0@s.whatsapp.net',
       ...(m.chat ? {
       remoteJid: `status@broadcast`
       } : {})
    },
    message: {
       locationMessage: {
       name: ttname,
       jpegThumbnail: {url: thumbfake},
       }
    }
}

const floc2 = {
    key: {
       fromMe: false,
       participant: `0@s.whatsapp.net`,
       ...(m.chat ? {
       remoteJid: "status@broadcast"
       } : {})
    },
    message: {
       "liveLocationMessage": {
       "title": ttname,
       "h": `Hmm`,
       'jpegThumbnail': {url: thumbfake},
       }
    }
}

const fkontak = {
    key: {
       participant: `0@s.whatsapp.net`,
       ...(m.chat ? {
       remoteJid: `status@broadcast`
       } : {})
    },
    message: {
       'contactMessage': {
       'displayName': ttname,
       'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;ttname,;;;\nFN:ttname\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
       'jpegThumbnail': {url: thumbfake},
       thumbnail: {url: thumbfake},
       sendEphemeral: true
       }
    }
}

const fakestatus = {
    key: {
       fromMe: false,
       participant: `0@s.whatsapp.net`,
       ...(m.chat ? {
       remoteJid: "status@broadcast"
       } : {})
    },
    message: {
       "imageMessage": {
       "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc",
       "mimetype": "image/jpeg",
       "caption": ttname,
       "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=",
       "fileLength": "28777",
       "height": 1080,
       "width": 1079,
       "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=",
       "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=",
       "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69",
       "mediaKeyTimestamp": "1610993486",
       "jpegThumbnail": {url: thumbfake},
       "scansSidecar": "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw=="
       }
    }
}

const repPy = {
	key: {
		remoteJid: '0@s.whatsapp.net',
		fromMe: false,
		id: `${global.NameBot}`,
		participant: '0@s.whatsapp.net'
	},
	message: {
		requestPaymentMessage: {
			currencyCodeIso4217: "USD",
			amount1000: 999999999,
			requestFrom: '0@s.whatsapp.net',
			noteMessage: {
				extendedTextMessage: {
					text: `${global.NameBot}`
				}
			},
			expiryTimestamp: 999999999,
			amount: {
				value: 91929291929,
				offset: 1000,
				currencyCode: "USD"
			}
		}
	}
}
}