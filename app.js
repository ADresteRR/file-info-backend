// Import the required modules
const express = require('express');
const multer = require('multer');
const cors = require("cors");


const app = express();
//To allow cross origin access
app.use(cors());

const upload = multer()

app.get("/", (req, res) => {
    res.send({
        "message": "api is working fine"
    })
})

// endpoint to upload file and get the relevant infromation about the file
app.post('/upload', cors(), upload.single('file'), (req, res) => {
    // file uploaded by the user
    const file = req.file;
    // check whether any file is upload or not
    if (file) {
        // Get the basic information about the file
        const info = {
            name: file.originalname,
            type: file.mimetype,
            size: file.size + "bytes",
        };

        // Get more information about the file based on its type
        switch (file.mimetype) {
            case 'application/pdf':
                const pdfParse = require('pdf-parse');
                pdfParse(file.buffer).then((data) => {
                    info.text = data.text;
                    info.metadata = data.metadata;
                    res.json(info);
                });
                break;
            case 'image/jpeg':
            case 'image/png':
            case 'image/gif':
                const sharp = require('sharp');
                sharp(file.buffer).metadata().then((data) => {
                    info.width = data.width;
                    info.height = data.height;
                    info.format = data.format;
                    res.json(info);
                });
                break;
            case 'application/msword':
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                const mammoth = require('mammoth');
                mammoth.extractRawText(file.buffer).then((data) => {
                    info.paragraphs = data.value.split('\n').length;
                    info.styles = data.messages
                        .filter((message) => message.type === 'warning')
                        .map((message) => message.message);
                    res.json(info);
                });
                break;
            default:
                // Send the basic information as a JSON response
                res.json(info);
        }
    } else {
        // if no file is uploaded send 400
        res.status(400).send('No file was uploaded');
    }
});


app.listen(process.env.PORT, () => {
    console.log('Server listening on port 3000');
});
