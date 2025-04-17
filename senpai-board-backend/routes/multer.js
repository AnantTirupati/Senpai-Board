const multer = require("multer")
const { v4:uuid } = require("uuid")
const path = require("path")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images/uploads") //destination of folder of uploads
    },
    filename: function (req, file, cb) {
        const uniqueFilename = uuid();
        //generating unique filename using vvid
        cb(null, uniqueFilename + path.extname(file.originalname))
    }
    
})

const upload = multer({storage:storage})
module.exports = upload;