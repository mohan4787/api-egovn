const cloudinarySvc = require("../../services/cloudinary.service");
const bcrypt = require("bcryptjs");
const { randomStringGenerator } = require("../../utilities/helper");
const { Status } = require("../../config/constants");
const emailSvc = require("../../services/email.service");
const { AppConfig } = require("../../config/config");
const UserModel = require("../user/user.model");

class AuthService {
  async transformUserCreate(req) {
    try {
      const data = req.body;
      if (req.file) {
        data.image = await cloudinarySvc.fileUpload(req.file.path, "/user/");
      }
      data.password = bcrypt.hashSync(data.password, 12);
      data.status = Status.INACTIVE;
      data.activationToken = randomStringGenerator(100);

      const { confirmPassword, ...mappedData } = data;
      return mappedData;
    } catch (exception) {
      throw exception;
    }
  }

 

  async sendActivationNotification(user) {
    try {
      await emailSvc.sendEmail({
        to: user.email,
        sub: "Activate your account",
        msg: `Dear ${user.name},
                thank you for registering with us. Please click the link below to activate your account:
                <a href="${AppConfig.frontendUrl}/activate/${user.activationToken}">Click here</a>
                Regards,
                System Administration,
                Please do not reply to this email. Contact our admin for any queries.
                Note: Please copy the link incase the click button does not work: ${AppConfig.frontendUrl}/activate/${user.activationToken}
                `,
      });
    } catch (exception) {
      throw exception;
    }
  }
  async newUserWelcomeEmail(user) {
    try {
      return emailSvc.sendEmail({
        to: user.email,
        sub: "Welcome to BIN-Commerce!",
        msg: `
          <div style="background: #f4f4f4; padding: 40px 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background: #fff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
          <tr>
            <td style="padding: 30px 40px 20px 40px; text-align: center;">
          <img src="https://img.icons8.com/color/96/000000/shopping-cart.png" alt="BIN-Commerce" style="width: 80px; height: 80px;"/>
          <h1 style="color: #2d2d2d; font-family: Arial, sans-serif; margin: 20px 0 10px 0; font-size: 28px;">Welcome to <span style="color: #007bff;">BIN-Commerce</span>!</h1>
          <p style="color: #555; font-size: 18px; font-family: Arial, sans-serif; margin: 0;">
            Hi <b>${user.name}</b>,
          </p>
          <p style="color: #555; font-size: 16px; font-family: Arial, sans-serif; margin: 20px 0 0 0;">
            We're excited to let you know that your account has been <span style="color: #28a745; font-weight: bold;">successfully activated</span>.<br/>
            Start exploring the best deals and enjoy a seamless shopping experience!
          </p>
          <a href="${AppConfig.frontendUrl}" style="display: inline-block; margin: 30px 0 0 0; padding: 14px 32px; background: #007bff; color: #fff; text-decoration: none; border-radius: 5px; font-size: 18px; font-family: Arial, sans-serif; font-weight: bold;">
            Shop Now
          </a>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 40px 30px 40px; text-align: center;">
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #888; font-size: 14px; font-family: Arial, sans-serif;">
            If you have any questions, feel free to contact our support team.<br/>
            <span style="color: #007bff;">Happy Shopping!</span>
          </p>
          <p style="color: #bbb; font-size: 12px; font-family: Arial, sans-serif; margin-top: 20px;">
            &copy; ${new Date().getFullYear()} BIN-Commerce. All rights reserved.
          </p>
            </td>
          </tr>
        </table>
          </div>
        `,
      });
    } catch (exception) {
      throw exception;
    }
  }
}

const authSvc = new AuthService();
module.exports = authSvc;
