/**
 * @author qiqingfu
 * @date 2020-03-28 12:35
 */

/**
 * 核实验证码
 * 临时存放发送给客户端的验证码
 */

const S = require("sequelize");

module.exports = {
  TABLE_NAME: "verify_code",
  TABLE_COL: {
    id: {
      type: S.BIGINT(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      filed: "id",
      comment: "主键",
    },
    email: {
      // 已发送验证码的邮箱
      type: S.STRING(20),
      unique: true,
      comment: "已接受验证码的邮箱",
      filed: "email",
    },
    code: {
      type: S.STRING(6),
      comment: "验证码数据",
      filed: "code",
    },
    expiration: {
      type: S.BIGINT(20),
      comment: "验证码过期时间",
      filed: "expiration",
    },
  },
};
