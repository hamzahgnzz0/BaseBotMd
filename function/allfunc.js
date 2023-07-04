const crypto = require('crypto');
const fs = require ("fs")

function pickRandom(list) {
   return list[Math.floor(Math.random() * list.length)]
}

function toRupiah(angka) {
const saldo = ''
const angkarev = angka.toString().split('').reverse().join('')
for (var i = 0; i < angkarev.length; i++)
if (i % 3 == 0) saldo += angkarev.substr(i, 3) + '.';
return '' + saldo.split('', saldo.length - 1).reverse().join('');
}

function getCase(cases) {
return "case "+`'${cases}'`+fs.readFileSync("./case.js").toString().split('case \''+cases+'\'')[1].split("break")[0]+"break"
}

function totalFitur() {
const mytext = fs.readFileSync("./case.js").toString()
const leng = (mytext.match(/case/g) || []).length;
return leng
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandom(ext) {
	return `${Math.floor(Math.random() * 10000)}${ext}`
}

function jsonformat(string) {
	return JSON.stringify(string, null, 2)
}

function createSerial(size) {
    return crypto.randomBytes(size).toString('hex').slice(0, size)
}

module.exports = { pickRandom, sleep, getRandom, jsonformat, createSerial, toRupiah, getCase, totalFitur }