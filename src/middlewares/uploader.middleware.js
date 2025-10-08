const multer = require("multer");
const fs = require("fs");
const { randomStringGenerator } = require("../utilities/helper");

const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let filePath = "./public/uploads/";

        if(!fs.existsSync(filePath)){
            fs.mkdirSync(filePath, { recursive: true });
        }
        cb(null, filePath);
    },
    filename: (req, file, cb) => {
        let filename =randomStringGenerator(15)+"-"+file.originalname;
        cb(null, filename);
    },

});

const uploader = (type = "image") => {
    const uploadConfig = {
        fileSize: 3000000,
        fileFilter: function (req, file, cb) {
            let allowedExts = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg','bmp']
            if(type === "doc") {
                this.fileSize = 6000000;
                allowedExts = ['doc', 'docx', 'pdf', 'xls', 'xlsx', 'csv', 'json']
            } else if(type === "audio") {
                this.fileSize = 7000000;
                allowedExts = ['mp3', 'm3u8'];
            }
            const fileExt = file.originalname.split(".").pop();

            if(allowedExts.includes(fileExt.toLowerCase())) {
                cb(false, true)
            } else {
                cb({code: 422, message: "File type not supported!", status: "INVALID_FILE_FORMAT"})
            }
        },
    };

    return multer({
        storage: myStorage,
        fileFilter: uploadConfig.fileFilter,
        limits: {
            fileSize: uploadConfig.fileSize
        }
    })
}

module.exports = uploader;