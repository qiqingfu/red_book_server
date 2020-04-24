/**
 * Created by qiqf on 2020/4/25
 */

/**
 * 这是一张多对多的关联表
 * 主要用于关联 用户表 和 标签表
 *
 * 一个用户可以选择多个标签
 * 一个标签也可以被多个用户选择
 */

const S = require("sequelize");

module.exports = {
  TABLE_NAME: "user_to_tag",
  TABLE_COL: {
    /**
     * 关联表的主键 id
     */
    id: {
      type: S.BIGINT(20),
      allowNull: false,
      primaryKey: true,
      filed: "id",
      autoIncrement: true,
      comment: "关联表主键",
    },
    uuid: {
      type: S.STRING(50),
      allowNull: false,
      unique: "uuid_tag_id",
      field: "uuid",
      comment: "用户表外键字段",
      references: {
        model: "user",
        key: "uuid",
      },
    },
    tag_id: {
      type: S.CHAR(20),
      allowNull: false,
      unique: "uuid_tag_id",
      field: "tag_id",
      comment: "标签外键字段",
      references: {
        model: "tag",
        key: "tag_id",
      },
    },
  },
};
