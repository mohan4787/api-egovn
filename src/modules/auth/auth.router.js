const authRouter = require("express").Router();
const { bodyValidator } = require("../../middlewares/request-validate.middleware"); // ✅ add this
const { uploader } = require("../../middlewares/uploader.middleware");
const AuthController = require("./auth.controller");
const { RegisterDTO, LoginDTO, ResetPasswordRequestDTO } = require("./auth.validators");

const authCtrl = new AuthController();

// Register route
authRouter.post(
  "/register",
  uploader().single('image'),
  bodyValidator(RegisterDTO), // ✅ now defined
  authCtrl.registerUser
);

// Activate account
authRouter.get("/activate/:token", authCtrl.activateUser);

// Login
authRouter.post(
  "/login",
  bodyValidator(LoginDTO),
  authCtrl.loginUser
);

// Forget password request
authRouter.post(
  "/forget-password",
  bodyValidator(ResetPasswordRequestDTO),
  authCtrl.forgetPasswordRequest
);

// Forget password token verification
authRouter.get("/forget-password-verify/:token", authCtrl.forgetPasswordTokenVerify);

// Reset password
authRouter.put("/reset-password", authCtrl.resetPassword);

// Logged-in user profile
authRouter.get("/me", authCtrl.loggedInUserProfile);

// Logout
authRouter.get("/logout", authCtrl.logoutUser);

// Update user by ID
authRouter.put("/user/:id", authCtrl.updateUserById);

module.exports = authRouter;
