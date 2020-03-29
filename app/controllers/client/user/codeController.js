/**
 * @author qiqingfu
 * @date 2020-03-27 15:49
 */

/* eslint-disable import/no-unresolved */
const ResModel = require("@ResModel");
const userServices = require("@services/client/user");
const Validator = require("@Validator");
const tools = require("./tools");

/** **
 * Code Controller
 */

class Code {
  /**
   * @catalog controller/user/code
   * @module 用户注册
   * @url /client/v1/register/code
   * @method POST
   * @title 用户注册, 获取验证码的 Controller 模块
   * @description 接受 /register/code 路由请求, 处理一些验证操作
   * @param ctx object koa上下文请求对象
   * @return null
   * @return_param null
   * @remark 负责处理路由请求, 将具体的业务操作代理给 Services 层
   * @number 1
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
