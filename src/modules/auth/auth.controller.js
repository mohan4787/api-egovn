const { AppConfig } = require("../../config/config");
const { Status } = require("../../config/constants");
const userSvc = require("../user/user.service");
const authSvc = require("./auth.service");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class AuthController {
  registerUser = async (req, res, next) => {
    try {
      const data = await authSvc.transformUserCreate(req);
      let user = await userSvc.createUser(data);
      await authSvc.sendActivationNotification(user);
      res.json({
        data: userSvc.getUserPublicProfile(user),
        message:
          "User registered successfully, please check your email to activate your account",
        status: "SUCCESS",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  activateUser = async (req, res, next) => {
    try {
      const token = req.params.token;
      const userDetail = await userSvc.getSingleUserByFilter({
        activationToken: token,
      });

      if (!userDetail) {
        throw {
          code: 404,
          message: "Invalid activation token or user not found",
          status: "NOT_FOUND",
        };
      }
      const updatedUser = await userSvc.updateSingleUserByFilter(
        {
          _id: userDetail._id,
        },
        {
          status: Status.ACTIVE,
          activationToken: null,
        }
      );
      await authSvc.newUserWelcomeEmail(updatedUser);
      res.json({
        data: null,
        message: "User activated successfully. You can login now.",
        status: "Activation Success",
        options: null,
      })
    } catch (exception) {
      next(exception);
    }
  };

  loginUser = async (req, res, next) => {
    try {
      const {email, password} = req.body;
      const userDetail = await userSvc.getSingleUserByFilter({
        email: email
      })
      if(!userDetail) {
        throw {
          code: 422,
          message: "Email not registered",
          status: "EMAIL_NOT_REGISTERED"
        }
      }
      if(!bcrypt.compareSync(password, userDetail.password)) {
        throw {
          code: 422,
          message: "Credentials does not match",
          status: "CREDENTIALS_MISMATCH"
        }
      }
      if(userDetail.status !== Status.ACTIVE || userDetail.activationToken !== null) {
        throw {
          code: 422,
          message: "User not activated",
          status: "USER_NOT_ACTIVATED"
        }
      }

      const accessToken = jwt.sign({
        sub: userDetail._id,
        type: "Bearer"
      }, AppConfig.jwtSecret, {
        expiresIn: "1h"
      })

      const refreshToken = jwt.sign({
        sub: userDetail._id,
        type: "Refresh"
      }, AppConfig.jwtSecret, {
        expiresIn: "1d"
      })

      res.json({
        data: {
          accessToken,
          refreshToken,
        },
        message: "Welcome to "+userDetail.role+" Panel",
        status: "LOGIN_SUCCESS",
        options: null,
      })
    } catch (exception) {
      next(exception);
    }
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
