const { SMTPConfig } = require("../config/config");
const nodemailer = require("nodemailer");
class EmailService {
  #transport;

  constructor() {
    try {
      const config = {
        host: SMTPConfig.host,
        port: SMTPConfig.port,
        auth: {
          user: SMTPConfig.user,
          pass: SMTPConfig.password,
        },
      };
      if (SMTPConfig.provider === "gmail") {
        config.service = SMTPConfig.provider;
      }

      this.#transport = nodemailer.createTransport(config);
      console.log("SMTP Server connected...");
    } catch (exception) {
      throw {
        message: "SMTP Server connection failed...",
        status: "SMTP_CONNECTION_FAILED",
      };
    }
  }

  sendEmail = async ({to, sub, msg, cc=null, bcc=null, attachements=null}) => {
    try {
        let msgBody = {
            to:to,
            from:SMTPConfig.from,
            subject:sub,
            text:msg,
        }
        if(cc) {
            msgBody["cc"] = cc;
        }
        if(bcc) {
            msgBody["bcc"] = bcc;
        }
        if(attachements) {
            msgBody["attachements"] = attachements;
        }
        let response = await this.#transport.sendMail(msgBody)
        return response;
    } catch (exception) {
        throw {
            message: "Email sending failed...",
            status: "EMAIL_SENDING_FAILED",
          };
    }
  }

}

const emailSvc = new EmailService();
module.exports = emailSvc;