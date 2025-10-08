const cloudinarySvc = require("../../services/cloudinary.service");
const bcrypt = require("bcryptjs");
const { randomStringGenerator } = require("../../utilities/helper");
const { Status } = require("../../config/constants");
const emailSvc = require("../../services/email.service");
const { AppConfig } = require("../../config/config");
class AuthService {
   async transformUserCreate (req) {
      try {
        const data = req.body;
      if(req.file) {
      data.image = await cloudinarySvc.fileUpload(req.file.path, "/user/");
      }
      data.password = bcrypt.hashSync(data.password,12);
      data.status = Status.INACTIVE;
      data.activationToken = randomStringGenerator(100);

      const {confirmPassword, ...mappedData} = data;
      return mappedData;
      } catch (exception) {
        throw exception;
      }
    }

    async sendActivationNotification (user) {
        try {
            await emailSvc.sendEmail({
                to:user.email,
                sub: "Activate your account",
                msg: `Dear ${user.name},
                thank you for registering with us. Please click the link below to activate your account:
                <a href="${AppConfig.frontendUrl}/activate/${user.activationToken}">Click here</a>
                Regards,
                System Administration,
                Please do not reply to this email. Contact our admin for any queries.
                Note: Please copy the link incase the click button does not work: ${AppConfig.frontendUrl}/activate/${user.activationToken}
                `,
            })
        } catch (exception) {
            throw exception;
        }
    }
}

const authSvc = new AuthService();
module.exports = authSvc
