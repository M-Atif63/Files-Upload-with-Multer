const { app, upload } = require('.');

app.post('/upload-file', upload.single('userfile'), (req, res) => {
    res.send(req.file);
});
