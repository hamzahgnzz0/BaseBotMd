const fs = require('fs')

global.NameBot = "CPanelBot"
global.OwnerBot = ["6283869821927","62838698219270"] // OWNER Bot
global.AdminPanel = ["","",""] // Admin Panel
global.OwnerNumber = "08"
global.OwnerName = ""
global.sessionName = 'session' // GAK USAH UBAH
global.prefa = ['', '!', '.', '🐦', '🐤', '🗿'] // GAK USAH UBAH

//Manajemen Panel Control
global.host = "https://"
global.application = {
    api_key: "plta_", //Ambil di panel lu || caranya pergi ke setting admin lalu klik garis tiga di pojok kiri atas lalu klik Application API tinggal salin dehh
    c_api_key: "pltc_" //Ambil di panel lu || caranya pergi ke Account Setting atau klik avatar akun lalu klik API Credentials lalu isi DESCRIPTION isinya bebas lalu klik CREATE
}
global.serverCreate = {
    nestId: "5", //Nest Id panel lu
    eggId: "15", //Egg Id panel lu
    limits: {
      db: "1", //Mending ga usah diganti
      backups: "1", //Mending ga usah diganti
      allocation: "0" //Mending ga usah diganti
    },
    eggs: {
      environment: {
        "CMD_RUN": "npm start", //Sesuaiin sama eggs lu
        "GIT_ADDRESS": "",
        "BRANCH": "",
        "USERNAME": "",
        "ACCESS_TOKEN": ""
      }
    }
}

global.footer_text = "© WhanGsAPP" + NameBot // NAMA BOT
global.ttname = "By WhanGsAPP" // NAMA TITLE BUAT FAKE REPLY

global.fakelink = "https://chat.whatsapp.com/KTXtrESxZCg8aTUbP62c6d" // bebas asal jan hapus
global.lwame = 'https://wa.me/message/HVXYZPCV6ZVBI1'
global.tiktok = '-'
global.grubbot = (`*INI KAK LINK GRUB NYA*\n\nhttps://chat.whatsapp.com/KTXtrESxZCg8aTUbP62c6d`) // GANTI LINK GRUB BOT LU \\

/*===============(( FOTO ALL ))===============*/
global.thumbfake = "https://telegra.ph/file/6ab2255f0ce8add56ffb5.jpg" // Link Foto, Buat Fake Reply Nya
global.fotodonasi = "https://telegra.ph/file/02af0d7e97a09db430e4b.jpg" // Foto Qris Atau Terserah
global.fotomenu = "https://telegra.ph/file/02af0d7e97a09db430e4b.jpg" // Foto Menunya

// PAYMENT
global.dana = '083869821927'
global.gopay = 'GKPUNYA'
global.linkaja = 'GKPUNYA'
global.saweria = 'https://saweria.co/hamzahgnzz1zax'
global.pulsaxl = '6283869821927'
global.pulsatsel = '6283869821927'
global.pulsaim3 = '6285705713614'
global.qris = "" // LINK QRIS


// FALSE OR TRUE \\
global.autoTyping = true // BIAR ADA TULISAN SEDANG MENGETIK
global.autoRead = true // BIAR CENTANG BIRU
global.welcome = true // KALO MAU AUTO WELCOME UBAH JADI true
global.left = true // KALO MAU AUTO LEFT UBAH JADI true
global.anticall = true // BEBAS

// PEMISAH \\
global.packname = '© Whans Bot' //sticker wm ubah
global.author = 'Mau Nyolong Ya!!' //sticker wm ganti nama kalian
