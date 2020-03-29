/**
 * @author qiqingfu
 * @date 2020-03-27 22:58
 */
/* eslint-disable import/no-unresolved */
const userModel = require("@model/client/user");
const ResModel = require("@ResModel");
const safety = require("@/util/safety");
const codes = require("@codes/client");
const debugRegister = require("debug")("register");

/**
 * 用户 Servicees 层, 处理相关业务逻辑
 */
class UserServices {
  /**
   * @catalog services/user
   * @module 用户注册
   * @title 用户注册逻辑处理
   * @description 对字段进行验证, 将业务逻辑委托给 Services 层处理
   * @param userInfo 必选 object 请求体对象
   * @param_key username 必填 string 用户名
   * @param_key email 必填 string 注册邮箱
   * @param_key code 必填 string 验证码
   * @param_key password 必填 string 初始密码
   * @return ResModel
   * @return_param errno
   * @return_param data
   * @return_param message
   * @remark null
   * @number 2
   */
  static async registUser(userInfo) {
    const { username, email, code, password } = userInfo;

    /**
     * 根据邮箱查询当前用户是否已经注册了
     * 避免重复注册造成的错误
     */
    const isRegist = await userModel.User.emailCheckUser(email);
    if (!isRegist.errno) {
      return new ResModel(codes.USER_CODE.ERROR_USER_IS_REGISTERED);
    }

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

    return regResult;
  }
}

module.exports = UserServices;
