/**
 * @author qiqingfu
 * @date 2020-03-27 15:49
 */

/* eslint-disable import/no-unresolved */
const ResModel = require("@ResModel");
const userServices = require("@services/client/user");
const Validator = require("@Validator");
const tools = require("./tools");

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
    const validator = new Validator();

    /**
     * 验证邮箱 email 字段的合法性
     */
    validator.add(email, tools.email);

    const errMsg = validator.start();

    /**
     * 验证失败
     */
    if (errMsg) {
      ctx.body = new ResModel(errMsg);

      return;
    }

    ctx.body = await userServices.Code.sendCode(email);
  }
}

module.exports = Code;
