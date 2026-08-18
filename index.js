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

const fileFilter = (req,file,cb) => {
    if(file.mimetype == "image/png" || file.mimetype == "image/jpeg"){
        cb(null,true)
    }else{
        cb(new Error("Only png & jpeg Images are allowed"),false)
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
    // res.send("hello world")
})

app.post('/',upload.single("field1"),(req,res)=>{
    res.send(req.file)
})

const port = 4000
app.listen(port, () => {
    console.log("server is running at post " + port)
})
