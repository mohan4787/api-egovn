const authRouter = require("../modules/auth/auth.router");

const router = require("express").Router()

router.get("/", (req, res, next) => {
    res.json({
        data:null,
        message:"Welcome to the API",
        status:"ok",
        options: null
    })
})

router.use("/auth",authRouter)

module.exports = router;