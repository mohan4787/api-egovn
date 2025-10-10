const userSvc = require("../user/user.service");
const authSvc = require("./auth.service");

class AuthController {
  registerUser = async (req, res, next) => {
    try {
      const data = await authSvc.transformUserCreate(req); 
      let user = await authSvc.createUser(data)
      await authSvc.sendActivationNotification(user);
      res.json({
        data: userSvc.getUserPublicProfile(user),
        message: "User registered successfully, please check your email to activate your account",
        status: "SUCCESS",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  activateUser = (req, res, next) => {
    let params = req.params;
    const headers = req.headers;
    const query = req.query;

    res.json({
      data: {
        params,
        headers,
        query,
      },
      message: "activate token",
      status: "SUCCESS",
      options: null,
    });
  };

  loginUser = (req, res, next) => {
    res.json({
      data: null,
      message: "login",
      status: "SUCCESS",
      options: null,
    });
  };

  forgetPasswordRequest = (req, res, next) => {
    res.json({
      data: null,
      message: "forget password",
      status: "SUCCESS",
      options: null,
    });
  };

  forgetPasswordTokenVerify = (req, res, next) => {
    res.json({
      data: req.params.token,
      message: "forget password verify",
      status: "SUCCESS",
      options: null,
    });
  };

  resetPassword = (req, res, next) => {
    res.json({
      data: null,
      message: "reset password",
      status: "SUCCESS",
      options: null,
    });
  };

  loggedInUserProfile = (req, res, next) => {
    res.json({
      data: null,
      message: "me",
      status: "SUCCESS",
      options: null,
    });
  };

  logoutUser = (req, res, next) => {
    res.json({
      data: null,
      message: "logout",
      status: "SUCCESS",
      options: null,
    });
  };

  updateUserById = (req, res, next) => {
    res.json({
      data: req.params.id,
      message: "update user",
      status: "SUCCESS",
      options: null,
    });
  };
}

module.exports = AuthController;
