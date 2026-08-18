const express = require("express")
const app = express()
const multer = require("multer")
const path = require('path')

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: false }))



const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './uploads')
    },
    filename(req, file, cb) {
        const newFileName = Date.now() + path.extname(file.originalname)
        cb(null, newFileName)
    },
})

// const fileFilter = (req,file,cb) => {
//     if(file.mimetype.startsWith("image/")){
//         cb(null,true)
//     }else{
//         cb(new Error("Only Image are allowed"),false)
//     }   
// }

const fileFilter = (req,file,cb) => {
    if(file.mimetype == "image/png"){
        cb(null,true)
    }else{
        cb(new Error("Only png files are allowed"),false)
    }
}

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 3
    },
    fileFilter
})

app.get('/',(req,res)=>{
    res.render("fileUpload")
})

app.post('/',upload.fields([{name:"field1",maxCount:1},{ name: 'field2', maxCount: 1},{ name: 'field3', maxCount: 1}]),(req,res)=>{
    res.send(req.files)
})

const port = 4000
app.listen(port, () => {
    console.log("server is running at post " + port)
})
