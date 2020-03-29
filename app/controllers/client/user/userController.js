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
const userServices = require("@services/client/user");
const Validator = require("@Validator");
const tools = require("./tools");

class User {
  /**
   * @catalog controller/user
   * @module 用户注册
   * @title 用户注册
   * @description 对字段进行验证, 将业务逻辑委托给 Services 层处理
   * @url /client/v1/register
   * @method POST
   * @param ctx 必选 object 请求的上下文对象
   * @param_key username 必填 string 用户名
   * @param_key email 必填 string 注册邮箱
   * @param_key code 必填 string 验证码
   * @param_key password 必填 string 初始密码
   * @param_key repeatpwd 必填 string 确认密码
   * @return null
   * @return_param null
   * @remark 注册邮箱和接受验证码邮箱必须一致
   * @number 1
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

    ctx.body = await userServices.User.registUser(ctx.request.body);
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
