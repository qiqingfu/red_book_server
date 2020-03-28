/**
 * @author qiqingfu
 * @date 2020-03-27 22:58
 */

const nodemailer = require("nodemailer");
/* eslint-disable import/no-unresolved */
const lowdb = require("@db/lowdb")._lowdb;
const ResModel = require("@ResModel");
const userModel = require("@model/client/user");
const codes = require("@codes/client");
const { random } = require("@/util/");

const emailConfig = lowdb.get("email").value();

/**
 * SMTP  服务器
 * @param mail
 */
const smtp = (function smtp() {
  const config = {
    service: "qq",
    port: 465,
    secureConnection: true,
    auth: {
      user: emailConfig.user,
      pass: emailConfig.pass,
    },
  };

  const transporter = nodemailer.createTransport(config);

  return {
    async send(mail) {
      try {
        return await transporter.sendMail(mail);
      } catch (e) {
        return e;
      }
    },
  };
})();

class codeServices {
  static async sendCode(email) {
    // 查询数据库中是否已存在邮箱
    const checkResult = await userModel.User.emailCheckUser(email);

    if (!checkResult.errno) {
      return checkResult;
    }

    /**
     * 生成验证码, 暂时存储到数据库中
     */
    const code = random(4);
    const expiration = Date.now() + 60 * 1000;
    const mailOptions = {
      from: `redBook <${emailConfig.user}>`,
      to: email,
      subject: "redBook 新用户注册验证码",
      html: `您的验证码是: <b>${code}</b>`,
    };

    // 将验证码同步到 verify_code 表
    const syncResult = await userModel.User.syncVerifyCode(
      code,
      email,
      expiration
    );

    if (!syncResult.errno) {
      return syncResult;
    }

    const sendResult = await smtp.send(mailOptions);
    if (sendResult.messageId) {
      return new ResModel(codes.USER_CODE.SUCCESS_CODE_SENDED, 1);
    }

    return new ResModel(codes.USER_CODE.FAIL_CODE_SEND_FAILED);
  }
}

module.exports = codeServices;
