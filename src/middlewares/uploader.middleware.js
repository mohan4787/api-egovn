const multer = require("multer");
const fs = require("fs");
const { randomStringGenerator } = require("../utilities/helper");

const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const filePath = "./public/uploads/";
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath, { recursive: true });
        }
        cb(null, filePath);
    },
    filename: (req, file, cb) => {
        const filename = randomStringGenerator(15) + "-" + file.originalname.replace(/\s+/g, "_");
        cb(null, filename);
    },
});

const uploader = (type = "image") => {
    let fileSize = 3 * 1024 * 1024; // default 3MB
    let allowedExts = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'bmp'];

    if (type === "doc") {
        fileSize = 6 * 1024 * 1024; // 6MB
        allowedExts = ['doc', 'docx', 'pdf', 'xls', 'xlsx', 'csv', 'json'];
    } else if (type === "audio") {
        fileSize = 7 * 1024 * 1024; // 7MB
        allowedExts = ['mp3', 'm3u8'];
    }

    const uploadConfig = {
        storage: myStorage,
        limits: { fileSize },
        fileFilter: (req, file, cb) => {
            const fileExt = file.originalname.split(".").pop().toLowerCase();
            if (allowedExts.includes(fileExt)) {
                cb(null, true);
            } else {
                cb({
                    code: 422,
                    message: "File type not supported!",
                    status: "INVALID_FILE_FORMAT"
                });
            }
        }
    };

    return multer(uploadConfig);
};

// ✅ Export as object
module.exports = { uploader };
