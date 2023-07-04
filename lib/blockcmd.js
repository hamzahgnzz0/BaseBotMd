const fs = require('fs')

const add = (msg, listblokir) => {
    const obj = {
        cmd: msg
    }
    listblokir.push(obj)
    return true
}
const del = (command, listblokir) => {
    Object.keys(listblokir).forEach((i) => {
        if (listblokir[i].cmd === command) {
            listblokir.splice(i, 1)
        }
    })
    return true
}
const check = (command, listblokir) => {
    let status = false
    Object.keys(listblokir).forEach((i) => {
        if (listblokir[i].cmd === command) {
            status = true
        }
    })

    return status
}
module.exports = { add, del, check }