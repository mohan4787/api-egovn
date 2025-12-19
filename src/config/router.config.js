const authRouter = require("../modules/auth/auth.router");
const bannerRouter = require("../modules/banner/banner.router");
const serviceRouter = require("../modules/service/service.router");

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
router.use("/service",serviceRouter)

module.exports = router;