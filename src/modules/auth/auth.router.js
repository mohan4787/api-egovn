const authRouter = require("express").Router()
const bodyValidator = require("../../middlewares/request-validate.middleware")
const uploader = require("../../middlewares/uploader.middleware")
const AuthController = require("./auth.controller")
const { RegisterDTO, LoginDTO, ResetPasswordRequestDTO } = require("./auth.validators")

const authCtrl = new AuthController()


authRouter.post("/register",uploader().single('image'), bodyValidator(RegisterDTO), authCtrl.registerUser)

authRouter.get("/activate/:token", authCtrl.activateUser)

authRouter.post("/login",bodyValidator(LoginDTO), authCtrl.loginUser)

authRouter.post("/forget-password",bodyValidator(ResetPasswordRequestDTO) ,authCtrl.forgetPasswordRequest)

authRouter.get("/forget-password-verify/:token", authCtrl.forgetPasswordTokenVerify)

authRouter.put("/reset-password", authCtrl.resetPassword)

authRouter.get("/me", authCtrl.loggedInUserProfile)

authRouter.get("/logout", authCtrl.logoutUser)

authRouter.put("/user/:id", authCtrl.updateUserById)



module.exports = authRouter;