const crypto = require('crypto');
function pickRandom(list) {
   return list[Math.floor(Math.random() * list.length)]
}

const sleep = async (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const getRandom = (ext) => {
	return `${Math.floor(Math.random() * 10000)}${ext}`
}

const jsonformat = (string) => {
	return JSON.stringify(string, null, 2)
}

const createSerial = (size) => {
    return crypto.randomBytes(size).toString('hex').slice(0, size)
}

module.exports = { pickRandom, sleep, getRandom, jsonformat, createSerial }