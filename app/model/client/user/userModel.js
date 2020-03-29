/**
 * @author qiqingfu
 * @date 2020-03-27 23:40
 */
/* eslint-disable import/no-unresolved */
const { User, VerifyCode } = require("@db/mysqldb");
const ResModel = require("@ResModel");
const codes = require("@codes/client");
const { CODE_EXPIRED_MS } = require("@/util/constant");

class UserModel {
  /**
   * @catalog model/userModel
   * @module 验证
   * @title 验证邮箱
   * @description 1. 验证 email 邮箱是否已被注册。 2. 注册用户时, 防止重复注册
   * @url null
   * @param email 必选 string 邮箱地址
   * @return ResModel
   * @return_param errno number 成功/失败
   * @return_param data null|objeect
   * @return_param message string 错误或成功消息
   * @remark null
   * @number
   */

  static async emailCheckUser(email) {
    const result = await User.findOne({
      where: {
        email,
      },
      attributes: ["uid"],
    });

    /**
     * 邮箱已被注册
     */
    if (result) {
      return new ResModel(codes.USER_CODE.ERROR_EMAIL_REGISTERED);
    }

    return new ResModel("successs", 1);
  }

  /**
   * @catalog model/userModel
   * @module 保存验证码
   * @title 存储验证码
   * @description 将已发送给客户端的验证码和邮箱同步到表中,
   * 在真正注册的时候, 再根据注册的邮箱校验验证码的真实性
   * @url null
   * @param code 必选 string 验证码
   * @param email 必选 string 邮箱地址
   * @param expiration 必选 number 过期时间戳
   * @return ResModel
   * @return_param errno number 成功/失败
   * @return_param data null|objeect
   * @return_param message string 错误或成功消息
   * @remark 过期时间 60s
   * @number
   */
  static async syncVerifyCode(code, email, expiration) {
    // https://sequelize.org/v5/class/lib/model.js~Model.html#static-method-upsert
    try {
      const upsertResult = await VerifyCode.upsert({
        code,
        email,
        expiration,
      });

      // true 插入
      // false 更新
      if (typeof upsertResult === "boolean") {
        return new ResModel("验证码已保存", 1);
      }

      return null;
    } catch (e) {
      return new ResModel(
        codes.USER_CODE.FAIL_CODE_SAVE_FAILED,
        {
          error: e.message,
        },
        0
      );
    }
  }

  /**
   * @catalog model/userModel
   * @module 用户注册
   * @title 校验验证码的有效性
   * @description 验证用户接受的验证码是否正确
   * @param params 必选 object 校验需要的用户信息
   * @param_key email 必选 string 用户邮箱
   * @param_key code 必选 string 验证码
   * @param_key expiration 必选 number 过期时间戳
   * @return ResModel
   * @return_param errno number 成功/失败
   * @return_param data null|objeect
   * @return_param message string 错误或成功消息
   * @remark null
   * @number 2
   */
  static async validateCode(params) {
    const { email, code, expiration } = params;

    const result = await VerifyCode.findOne({
      where: {
        email,
      },
      attributes: ["code", "expiration"],
    });

    if (result === null) {
      return new ResModel(codes.USER_CODE.ERROR_EMAIL_NOT_SAME);
    }

    /**
     * 1. 验证码过期
     * 2. 验证码和和数据库保存的不一致
     * == 统称 "验证码错误" ==
     */
    if (
      result.code !== code ||
      expiration - result.expiration > CODE_EXPIRED_MS
    ) {
      return new ResModel(codes.USER_CODE.ERROR_CODE_ERROR);
    }

    return new ResModel("success", 1);
  }

  /**
   * @catalog model/userModel
   * @module 用户注册
   * @title 注册用户信息
   * @description 向 user 表增加新用户数据
   * @param params 必选 object 校验需要的用户信息
   * @param_key username 必选 string 用户名
   * @param_key email 必选 string 用户邮箱
   * @param_key password 必选 string 经过加密后的密码
   * @return ResModel
   * @return_param errno number 成功/失败
   * @return_param data null|objeect
   * @return_param message string 错误或成功消息
   * @remark 注册用户到这里就结束了
   * @number
   */
  static async registerUserInfo(params) {
    const { username, email, password } = params;

    try {
      const registerResult = await User.create({
        username,
        email,
        password,
      });

      if (registerResult) {
        return new ResModel(codes.USER_CODE.SUCCESS_USER_REGISTED_SUCCESS, 1);
      }

      return null;
    } catch (e) {
      return new ResModel(
        codes.USER_CODE.FAIL_USER_REGISTED_FAIL,
        {
          message: e.message,
        },
        0
      );
    }
  }
}

module.exports = UserModel;
