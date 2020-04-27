/**
 * Created by qiqf on 2020/4/21
 */
/* eslint-disable import/no-unresolved */
const ResModel = require("@ResModel");
const { Tag, User } = require("@db/mysqldb");
const debug = require("debug")("/update/tags");

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

  /**
   * 根据用户的 uuid, 去关系表 user_to_tag 中查找所有的
   * 用户标签
   * @param uuid User表 uuid, 用户唯一标识
   * @returns ResModel
   */
  static async findTagById(uuid) {
    let findResult;
    try {
      // 根据 uuid, 在 User 表找到当前这个用户实例
      const user = await User.findOne({
        where: {
          uuid,
        },
      });
      // 获取当前用户对应的多个标签数据
      findResult = await user.getTags({
        raw: true,
        attributes: ["ttid"],
      });
      debug("findResult =>", findResult);
    } catch (e) {
      console.log(e);
      return new ResModel("查询用户标签错误");
    }

    return new ResModel(findResult, "查询用户标签成功");
  }

  /**
   *
   * @param data 批量存储的数据 [{ uuid: xxx, tag_id: xxx }, {uuid: xxx, tag_id: xxx}]
   * @param uuid 需要批量添加标签的用户 uuid
   * @description uuid 是相同的, 而 tag_id 不一定是相同的
   * @returns ResModel
   */
  static async saveTagById(data, uuid) {
    try {
      const user = await User.findOne({
        wheree: {
          uuid,
        },
      });
      console.log(user);
    } catch (e) {
      console.log("error", e);
      return new ResModel("标签保存失败");
    }

    return new ResModel("标签保存成功", {}, 1);
  }
}

module.exports = TagModel;
