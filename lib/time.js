const moment = require('moment-timezone');
const tanggal = moment().tz("Asia/Makassar").format("dddd, ll")
const jam = moment(Date.now()).tz('Asia/Makassar').locale('id').format('HH:mm:ss z')
const salam = moment(Date.now()).tz("Asia/Makassar").locale('id').format('a')
const time = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('HH:mm:ss z')

module.exports = { tanggal, jam, salam, time }