/**
 * @author qiqingfu
 * @date 2020-03-27 23:40
 */
/* eslint-disable import/no-unresolved */
const { User } = require("@db/mysqldb");
const ResModel = require("@ResModel");

class UserModel {
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
}

module.exports = UserModel;
