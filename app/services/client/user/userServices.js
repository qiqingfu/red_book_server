/**
 * @author qiqingfu
 * @date 2020-03-27 22:58
 */
/* eslint-disable import/no-unresolved */
const userModel = require("@model/client/user");
const safety = require("@/util/safety");
const debugRegister = require("debug")("register");

/**
 * 用户 Servicees 层, 处理相关业务逻辑
 */
class UserServices {
  /**
   * @description 处理用户注册
   * @param userInfo {Object}
   * @returns {Promise<void>}
   */
  static async registUser(userInfo) {
    const { username, email, code, password } = userInfo;

    /**
     * 校验验证码的时效性
     */
    const expiration = Date.now();
    const validateResult = await userModel.User.validateCode({
      code,
      email,
      expiration,
    });

    if (!validateResult.errno) {
      return validateResult;
    }

    /**
     * 执行注册操作
     */
    const regResult = await userModel.User.registerUserInfo({
      username,
      email,
      password: safety.cipher.encrypt(password),
    });

    // 注册用户失败
    if (!regResult.errno) {
      debugRegister(regResult.data);
      return regResult;
    }

    // 其他业务逻辑处理

    return regResult;
  }
}

module.exports = UserServices;
