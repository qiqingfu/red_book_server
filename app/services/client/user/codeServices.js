/**
 * @author qiqingfu
 * @date 2020-03-27 22:58
 */

const nodemailer = require("nodemailer");
/* eslint-disable import/no-unresolved */
const lowdb = require("@db/lowdb")._lowdb;
const ResModel = require("@ResModel");
const userModel = require("@model/client/user");
const { random } = require("@/util/");

const emailConfig = lowdb.get("email").value();

/**
 * SMTP  服务器
 * @param mail
 */
const smtp = (function () {
  const config = {
    host: "smtp.qq.com",
    port: 465,
    auth: {
      email: emailConfig.user,
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
    return new ResModel({ code });
  }
}

module.exports = codeServices;
