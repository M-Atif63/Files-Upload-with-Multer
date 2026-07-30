const express = require('express')
const app = express()
exports.app = app
const multer = require('multer')
const path = require('path')
const dotenv = require('dotenv')
const { log, error } = require('console')
const { MIMEType } = require('util')
dotenv.config()
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const store = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './Files')
    },
    filename(req, file, cb) {
        const newFileName = Date.now() + path.extname(file.originalname)
        cb(null, newFileName)
    },
})
function fileFilter(req, file, cb){
    if (file.mimeType.startsWith('image/')){
        cb(null,true)
    } else {
        cb(new Error('Only images are allowed'))
    }
}
    
const upload = multer({
    store: store,
    limits: {
        filesize: 1025 * 1024 * 5
    },
    fileFilter,
})

app.get('/upload-file', (req, res) => {
    res.render('fileUpload')
})
app.post('/upload-file', upload.single('filename'), (req, res) => {
    res.send(req.file)
})

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Port is running on ${port}`);
})
