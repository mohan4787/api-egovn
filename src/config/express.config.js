const express = require("express")
const router = require("./router.config")
const { deleteFile } = require("../utilities/helper")

const app = express()

app.use(express.json({
    limit:"10mb"
}))
app.use(express.urlencoded())

app.use("/api/v1/",router)

app.use((req, res, next) => {
    next({
        code: 400,
        message: "Resource not found",
        status: "NOT_FOUND",
    })
})

app.use((error, req, res, next) => {
    let code = error.code || 500
    let details = error.details || null
    let msg = error.message || "Internal Server Error"
    let status = error.status || "sERVER_ERROR"

    if(req.file) {
        deleteFile(req.file.path);
    } else if(req.files) {
        req.files.forEach((file) => {
            deleteFile(file.path);
        });
    }
   
    res.status(code).json({
        error: details,
        message: msg,
        status: status,
        options: null
    })
})

module.exports = app;