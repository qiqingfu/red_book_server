/**
 * @author qiqingfu
 * @date 2020-03-27 23:40
 */
/* eslint-disable import/no-unresolved */
const { User, VerifyCode } = require("@db/mysqldb");
const ResModel = require("@ResModel");

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
      return new ResModel("邮箱已被注册");
    }

    return new ResModel("成功", 1);
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
        "验证码保存失败",
        {
          error: e.message,
        },
        0
      );
    }
  }
}

module.exports = UserModel;
