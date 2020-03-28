/**
 * @author qiqingfu
 * @date 2020-03-27 15:49
 */

/* eslint-disable import/no-unresolved */
const ResModel = require("@ResModel");
const validate = require("@/util/validateFiled");
const codeServices = require("@services/client/user");
const codes = require("@codes/client");

/**
 * 验证码相关的控制器
 * @type {Code}
 */
class Code {
  /**
   * @description 获取验证码接口
   * @param ctx
   *
   * @field email - 接受验证码的邮箱
   */
  static async registerCode(ctx) {
    const email = ctx.request.body && ctx.request.body.email;

    if (!email) {
      ctx.body = new ResModel(codes.USER_CODE.ERROR_EMAIL_NOT_NULL);
      return;
    }

    if (!validate.isEmail(email)) {
      ctx.body = new ResModel(codes.USER_CODE.ERROR_EMAIL_ILLEGAL);
    }

    ctx.body = await codeServices.Code.sendCode(email);
  }
}

module.exports = Code;
