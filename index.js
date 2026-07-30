const express = require('express')
const app = express()
const multer = require('multer')
const path = require('path')
const dotenv = require('dotenv')
const { log } = require('console')
dotenv.config()

app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:false}))

const store = multer.diskStorage({
    destination(req,file,cb){
        cb(null,'./Files')
    },
    filename(req,file,cb){
        const newFileName = Date.now() + path.extname(file.originalname)
        cb(null,newFileName)
    }
})

const upload = {
    store:store,
    limits:{
        filesize:1025 * 1024 *5
    }
}

app.get('/upload-file',(req,res)=>{
    res.render('fileUpload')
})

app.post('/upload-file',upload.single('userfile'),(req,res)=>{
    res.send(req.file)
})
const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`Port is running on ${port}`);
})
