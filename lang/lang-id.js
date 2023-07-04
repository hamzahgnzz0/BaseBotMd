require("../settings")
var ex = exports
// RESPOND MESSAGE
ex.LangMess = {
  Register: ["Maaf, Anda Sudah Pernah Mendaftar Sebelumnya", "Anda sudah Pernah Mendaftar", "Anda Sudah Terdaftar", "Maaf, Anda Sudah Terdaftar Di Database Kami", "Command Ini Sudah Pernah Anda Jalankan Sebelumnya"],
  NotRegister: ["Maaf, Untuk Menggunakan Perintah Tersebut Anda Harus Mendaftar Terlebih Dahulu Ketik _Daftar_ Untuk Mendaftar", "Perintah Tersebut Hanya Dapat Digunakan Jika Anda Sudah Mendaftar Silahkan Mendaftar Terlebih Dahulu"],
  AnimeWaifu: ["_Nih Waifunya, Dasar Wibu_"],
  Asupan: ["_Nih, Biar Semangat"],
  Admin: ["_Fitur Khusus Admin Group_"],
  BotNotAdmin: ["_Bot Bukan Admin, Jadikan Bot Sebagai Admin Terlebih Dahulu_"],
  Donasi: ["Terima Kasih Untuk Yang Sudah Berdonasi, Yang Gk Berdonasi Gkpp🗿"],
  Done: ["Berhasil"],
  EndLimit: ["_Limit Anda Sudah Habis. Silahkan Tunggu Sampai Besok Atau Beli Premium Untuk Unlimited Limit_"],
  Error: ["Maaf Fitur Eror", "Maaf Sedang Eror"],
  Group: ["_Fitur Khusus Dalam Group_"],
  JadiAnime: ["_Anjayy Wibu, Lari Ada Wibu_"],
  Limit: ["1 limit telah di gunakan"],
  Owner: ["_Fitur Khusus Owner Bot_", "Perintah Tersebut Hanya Dapat Digunakan Oleh Owner Bot, Silahkan Hubungi Owner Untuk Menjadi Owner Bot", "Anda Bukan Owner, Perintah Ini Hanya Untuk Owner"],
  OwnerCr: ["Itu Owner Saya Kak, Jangan Di Spam Ya!!"],
  Privhasil: ["_Hasilnya Sedang Di Kirim Di Chat Pribadi_"],
  Privat: ["_Maaf Fitur Ini Hanya Dapat Digunakan Di Private Chat_"],
  Searchimg: ["_Tunggu Sebentar, Sedang Mencari Foto_"],
  Searchjbw: ["_Tunggu Sebentar, Sedang Mencari Jawaban_"],
  Sendaudio: ["_Tunggu Sebentar, Sedang Memuat Audio_"],
  Sendvideo: ["_Tunggu Sebentar, Sedang Memuat Video_"],
  usrpanel: ["_Anda Sudah Pernah Mendaftar Sebelumnya_"],
  Wait: ["_Sedang di proses. Mohon Tunggu Sebentar_"]
}

// RESPOND FITURNYA  
ex.Daftar = (prefix, command, pushname, register, serialUser, sender) => {
 return `*MENDAFTAR KE DATABASE*
 *Terimakasih telah mendaftarkan diri ke database BOT berikut adalah info data anda* 
● *Nama : ${pushname}*
● *Nama Pengguna : ${users.username}*
● *Nomor : ${sender.split('@')[0]}*
● *Pengguna : ${users.length}*
● *Email : ${users.email}*
● *SN : ${users.serialUser}*

Note :
 *Gunakan bot sewajarnya*`
}

ex.Donasi = (pushname) => {
 return `Silahkan BerDonasi ${pushname}
*Dana* : ${global.dana}
*Gopay* : ${global.gopay}
*LinkAja* : ${global.linkaja}
*Pulsa Im3* : ${global.pulsaim3}
*Pulsa Telkomsel* : ${global.pulsatsel}
*Pulsa Axis/Xl* : ${global.pulsaxl}
*Saweria* : ${global.saweria}`
}


let q = "```"
ex.Menu = (pushname, OwnerName) => {
  return `Halo ${pushname}
Silahkan pilih salah satu menu dengan mengetikkan pilihan nomor dibawah ini (Contoh: 1) ;

1. Downloader
2. Searching
3. Bantuan
4. Tentang

Creator *${OwnerName}*
`
}

ex.MenuDown = () => {
 return `Pilih Downloader yang anda Mau
 
 1. Tiktok 
 2. Facebook
 3. MediaFire
 4. YouTube`
}
ex.MenuSear = () => {
 return `Berikut Beberapa Pilihan
 
 1. Google
 2. Wikipedia`
}
ex.MenuBantu = () => {
 return `ketik menu untuk memulai. layanan berlaku 10 detik`
}
ex.MenuTentg = () => {
 return `*INFORMATION
 ${q}Nama Bot: Whans${q}
 ${q}Nama Creator: Hamzah${q}
 ${q}Masih Tahap Pengembangan${q}`
}