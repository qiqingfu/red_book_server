/**
 * Created by qiqf on 2020/4/21
 */
/* eslint-disable import/no-unresolved */
const ResModel = require("@ResModel");
const { Tag, User, sequelize } = require("@db/mysqldb");
const debug = require("debug")("/update/tags");

// 后期需要优化, 抽离系统内部公用的调用
const UserModel = require("./userModel");

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
      findResult = await User.findOne({
        where: { uuid },
        include: {
          model: Tag,
        },
      });

      debug("findResult =>", findResult);
    } catch (e) {
      console.log(e);
      return new ResModel("查询用户标签错误");
    }

    return new ResModel(findResult.tags, "查询用户标签成功");
  }

  /**
   *
   * @param data 批量存储的数据 [{ uuid: xxx, tag_id: xxx }, {uuid: xxx, tag_id: xxx}]
   * @param uuid 需要批量添加标签的用户 uuid
   * @param type ['add', 'delete']
   * @description uuid 是相同的, 而 tag_id 不一定是相同的
   * @returns ResModel
   */
  static async updateTagById(data, uuid, type) {
    if (!type) {
      throw new Error("操作标签的类型必须指定");
    }

    const strategyMaps = {
      async add(userInstance, tagInstance) {
        await userInstance.addTags(tagInstance);
      },
      async delete(userInstance, tagInstance) {
        await userInstance.removeTags(tagInstance);
      },
      // 用户第一次选择标签
      // 使用事务操作
      async set(userInstance, tagInstance) {
        sequelize
          .transaction((t) => {
            return userInstance
              .setTags(tagInstance, { transaction: t })
              .then((setResult) => {
                debug("用户新增数据, 事务操作第一步", setResult);
                // 更新 user 的 seleted_tag 字段为 1
                return userInstance.update(
                  { seleted_tag: "1" },
                  {
                    fields: ["seleted_tag"],
                    transaction: t,
                  }
                );
              });
          })
          .then((result) => {
            debug("事务提交成功", result);
          })
          .catch((err) => {
            debug("事务提交失败, 已回滚", err);
          });
      },
    };

    try {
      const user = await UserModel.findUser("", uuid);
      const tags = await Tag.findAll({
        where: {
          ttid: data,
        },
      });

      // 将 data 数据和 uuid 用户进行关联
      strategyMaps[type].call(this, user.data, tags);
    } catch (e) {
      console.log("error", e);
      return new ResModel("标签更新失败");
    }

    return new ResModel("标签更新成功", {}, 1);
  }
}

module.exports = TagModel;
