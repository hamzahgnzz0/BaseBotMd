const fs = require('fs');
const chalk = require('chalk')
const moment = require('moment')
const time = moment(new Date()).format('HH:mm:ss DD/MM/YYYY')


function uncache(module = '.') {
return new Promise((resolve, reject) => {
try {
delete require.cache[require.resolve(module)]
resolve()
} catch (e) {
reject(e)
}
})
}

function nocache(module, cb = () => { }) {
console.log(`Module ${module} sedang diperhatikan terhadap perubahan`)
fs.watchFile(require.resolve(module), async () => {
await uncache(require.resolve(module))
cb(module)
})
}

nocache('../case', module => console.log(chalk.greenBright('[ WHATSAPP BOT ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`) + chalk.white(chalk.bgRed("Warning!!")) + "\n" + chalk.red("DILARANG MENGEXPLOITASIKAN FILE SECARA SEMBARANGAN")))
require('../settings')
nocache('../settings', module => console.log(chalk.greenBright('[ WHATSAPP BOT ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`) + chalk.white(chalk.bgRed("Warning!!")) + "\n" + chalk.red("DILARANG MENGEXPLOITASIKAN FILE SECARA SEMBARANGAN")))
require('../index')
nocache('../index', module => console.log(chalk.greenBright('[ WHATSAPP BOT ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`) + chalk.white(chalk.bgRed("Warning!!")) + "\n" + chalk.red("DILARANG MENGEXPLOITASIKAN FILE SECARA SEMBARANGAN")))
    
module.exports = { nocache, uncache }