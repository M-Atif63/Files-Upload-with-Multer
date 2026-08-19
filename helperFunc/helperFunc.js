const fs = require('fs')
const path = require('path')
const DBPath = path.join(process.cwd(), "FilesData", "Database.json")
exports.readFile=()=>{
    fs.readFile(DBPath, () => {
        return new Promise((reject,resolve)=>{
            if(reject){
                reject()
            }
            resolve(JSON.parse(toString(DBPath)))
        })
    })
}