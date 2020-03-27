/**
 * @author qiqingfu
 * @date 2020-03-26 23:43
 */
const S = require("sequelize");

/**
 * 用户表的描述
 *  - 表名
 *  - 表中的每个字段
 */

module.exports = {
  TABLE_NAME: "user",
  TABLE_COL: {
    // 用户 uid, 主键自增
    uid: {
      type: S.BIGINT(20),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      filed: "uid",
      comment: "用户uid 主键 自增",
    },
    email: {
      // 用户邮箱, 唯一性约束
      type: S.STRING(20),
      unique: true,
      comment: "用户邮箱",
      filed: "email",
    },
    username: {
      // 用户注册时的名称, 用户名是不对外公开的, 唯一性约束
      // 用户需要通过 用户名 + 密码进行登录
      type: S.STRING(20),
      unique: true,
      comment: "用户名",
      filed: "username",
    },
    nickname: {
      // 用户昵称, 可以是公开的, 可以修改, 可以多人重复
      type: S.STRING(20),
      comment: "用户昵称",
      filed: "nickname",
    },
    password: {
      // 需要对用户密码进行加密
      type: S.STRING(100),
      comment: "用户密码",
      filed: "password",
    },
  },
};
