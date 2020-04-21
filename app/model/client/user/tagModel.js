/**
 * Created by qiqf on 2020/4/21
 */
/* eslint-disable import/no-unresolved */
const ResModel = require("@ResModel");
const { Tag } = require("@db/mysqldb");

class TagModel {
  /**
   * @catalog model/tagModel
   * @module 用户标签
   * @title 获取标签
   * @description 查询 tag表中所有的标签数据, 排除 id 字段
   * @url null
   * @return ResModel
   * @return_param errno number 成功/失败
   * @return_param data null|objeect
   * @return_param message string 错误或成功消息
   * @remark null
   * @number
   */
  static async findAllTags() {
    let result;

    try {
      result = await Tag.findAll({
        attributes: {
          exclude: ["id"],
        },
      });
    } catch (e) {
      console.error(e);
      return new ResModel("查询标签失败");
    }

    return new ResModel("获取标签列表成功", result, 1);
  }
}

module.exports = TagModel;
