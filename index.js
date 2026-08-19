const express = require("express")
const app = express()
const multer = require("multer")
const fs = require("fs")
const path = require('path')
const { writeFile } = require("./models/multer")
const { readFile } = require("./helperFunc/helperFunc")
const DBPath = path.join(process.cwd(), "FilesData", "Database.json")
app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: false }))



const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './uploadedFiles')
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

const fileFilter = (req, file, cb) => {
    if (file.mimetype == "image/png") {
        cb(null, true)
    } else {
        cb(new Error("Only png files are allowed"), false)
    }
}

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 3
    },
    fileFilter
})

app.get('/', (req, res) => {
    res.render("fileUpload")
})


app.post('/', upload.fields([{ name: "field1", maxCount: 1 }, { name: 'field2', maxCount: 1 }, { name: 'field3', maxCount: 1 }]), (req, res) => {
    if (!req.files) {
        res.status(400).send("All Fields are required")
    }
    const { myname } = req.body;
    const img1 = req.files.field1[0].filename;
    const img2 = req.files.field1[0].filename;
    const img3 = req.files.field1[0].filename;

    fs.writeFile(DBPath, JSON.stringify([{ myname, img1, img2, img3 }]), async () => {
        try {
            res.send([myname, img1, img2, img3])
        } catch (error) {
            new Error(error)
        }
    })
    // res.send([{
    //     fileName: req.files.field1[0].filename,
    //     originalName: req.files.field1[0].originalname
    // },
    // {
    //     fileName: req.files.field2[0].filename,
    //     originalName: req.files.field2[0].originalname
    // },
    // {
    //     fileName: req.files.field3[0].filename,
    //     originalName: req.files.field3[0].originalname
    // }],
    // );
})

app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        return res.status(400).send({ success: false, error: `${multer.MulterError} ${error.message} File too many large ${error.code}` })
    }
    else if (error) {
        return res.status(500).send({ success: false, error: `Something went wrong ${error.message} ${error.code}` })
    }
})

app.get('/getimage', async (req, res) => {
    const data = await readFile()
    if (data === 0) {
        res.send("data not found")
    }
    res.render("getimage",data)
    res.send(data)
})


const port = 4000;
app.listen(port, () => {
    console.log("server is running at post " + port)
})
