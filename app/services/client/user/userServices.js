/**
 * @author qiqingfu
 * @date 2020-03-27 22:58
 */
/* eslint-disable import/no-unresolved */
const userModel = require("@model/client/user");
const ResModel = require("@ResModel");
const safety = require("@/util/safety");
const codes = require("@codes/client");
const config = require("@/config");
const { COOKIE_EXPIRED_TIME } = require("@/util/constant");
const { v4 } = require("uuid");
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
    const uuid = v4();
    const regResult = await userModel.User.registerUserInfo({
      username,
      email,
      password: safety.cipher.encrypt(password),
      uuid,
    });

    // 注册用户失败
    if (!regResult.errno) {
      debugRegister(regResult.data);
      return regResult;
    }

    return regResult;
  }

  /**
   * @catalog services/user
   * @module 用户登录
   * @title 用户登录逻辑处理
   * @description 1. 验证密码的正确性 2. 登录的 email 是否存在
   * @param loginInfo 必选 object 请求体对象
   * @param_key email 必填 string 登录邮箱
   * @param_key password 必填 string 登录密码
   * @param_key ctx object 请求响应的上下文对象
   * @return ResModel
   * @return_param errno
   * @return_param data
   * @return_param message
   * @remark null
   * @number 2
   */
  static async userLogin(loginInfo) {
    const { email, password, ctx } = loginInfo;

    /**
     * 查询用户信息
     */
    const userData = await userModel.User.findUser(email);

    if (!userData.errno) {
      return userData;
    }

    // 加密后的密码和数据库密码匹配
    const pwd = safety.cipher.encrypt(password);
    if (pwd !== userData.data.password) {
      return new ResModel("登录密码错误");
    }

    /**
     * 保存用户的登录状态
     */
    ctx.session = {
      isLogin: true,
      uuid: userData.data.uuid,
    };

    /**
     * 生成 token, 根据用户的 uuid加密成token发送给客户端
     */
    const token = await safety.jwt.createToken({ uuid: userData.data.uuid });

    ctx.cookies.set(config.CLIENT.XSRF_COOKIE_NAME, token, {
      maxAge: COOKIE_EXPIRED_TIME,
      httpOnly: false, // 允许客户端读取cookie, 请求携带到约定的头部s
    });

    /**
     * 其他逻辑处理
     */
    return new ResModel("登录成功", 1);
  }
}

module.exports = UserServices;
