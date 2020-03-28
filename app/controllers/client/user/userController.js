/**
 * @author qiqingfu
 * @date 2020-03-27 15:52
 */

/**
 * 用户相关的控制器
 * @type {Code}
 */

/* eslint-disable import/no-unresolved */
const ResModel = require("@ResModel");
const Validator = require("@Validator");
const tools = require("./tools");

class User {
  /**
   * 用户注册
   * @param ctx
   * @returns {Promise<void>}
   */
  static async register(ctx) {
    const {
      username = "",
      email = "",
      code = "",
      password = "",
      repeatpwd = "",
    } = ctx.request.body;

    const validator = new Validator();

    /**
     * 注册接口字段验证
     */
    const validateRules = [
      { value: username, rules: tools.username },
      { value: email, rules: tools.email },
      { value: code, rules: tools.code },
      { value: password, rules: tools.password },
      { value: repeatpwd, rules: tools.repeatpwd },
    ];

    const errMsg = validator.map(validateRules).start();

    if (errMsg) {
      ctx.body = new ResModel(errMsg);
      return;
    }

    if (password !== repeatpwd) {
      ctx.body = new ResModel("两次密码输入不一致");
      return;
    }

    ctx.body = "注册成功了";
  }

  /**
   * 用户登录
   * @param ctx
   * @returns {Promise<void>}
   */
  static async login(ctx) {
    ctx.body = {
      message: "登录接口",
      url: ctx.request.url,
    };
  }
}

module.exports = User;
