const authRouter = require("../modules/auth/auth.router");
const bannerRouter = require("../modules/banner/banner.router");

const router = require("express").Router()

router.get("/", (req, res, next) => {
    res.json({
        data:null,
        message:"Welcome to the API",
        status:"ok",
        options: null
    })
})

router.use("/auth",authRouter);
router.use("/banner",bannerRouter)

module.exports = router;