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
   * 验证用户邮箱是否已被注册
   * @param email
   *
   * @returns 返回的结构遵循 ResModel模型
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
   * 将已发送给客户端的验证码和邮箱同步到表中
   * 在真正注册的时候, 再根据注册的邮箱校验验证码的真实性
   * 过期时间为 60s
   *
   * @param code 验证码
   * @param email 邮箱
   * @param expiration
   * @returns {Promise<void>}
   */
  static async syncVerifyCode(code, email, expiration) {
    // Sequelize.upsert
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

      return false;
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
   * 校验注册验证码的有效性
   * @param params
   * @returns {Promise<void>}
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

    // 首先验证是否已过期
    if (expiration - result.expiration > CODE_EXPIRED_MS) {
      return new ResModel(codes.USER_CODE.ERROR_CODE_EXPIRED);
    }

    if (result.code !== code) {
      return new ResModel(codes.USER_CODE.ERROR_CODE_ERROR);
    }

    return new ResModel("success", 1);
  }

  /**
   * 注册用户信息, 向 user 表中写入新注册的用户数据
   * @param params
   * @returns {Promise<null>}
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
