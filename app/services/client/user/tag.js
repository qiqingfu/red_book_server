/**
 * Created by qiqf on 2020/4/21
 */

/**
 * 这是标签的 services 层, 业务逻辑处理
 */

/* eslint-disable import/no-unresolved */
const ResModel = require("@ResModel");
const { TagModel } = require("@/app/model/client/user");
const { cipher } = require("@/util/safety");
const { diffArray } = require("@/util");
const debug = require("debug")("/update/tags");

/**
 *
 * @param data
 * 批量加密 tag_id, 并且将 tag_id 属性替换为 id
 *
 * Tip: 如果要去具体的某项值, 需要通过 dataValues 属性
 */
const batchCipId = (data) => {
  const resultArray = [];

  data.forEach((item) => {
    const map = {};
    Object.keys(item.dataValues).forEach((k) => {
      if (k === "ttid") {
        map.id = cipher.encrypt(item[k]);
      } else {
        map[k] = item[k];
      }
    });

    resultArray.push(map);
  });

  return resultArray;
};

/**
 * 将加密后的标签 id 解密
 * @param ids {Array}
 * @returns Array
 */
const batchDecodeId = (ids) => {
  return ids.map((id) => cipher.decode(id));
};

/**
 *
 * @param {Array} source 已存在的标签数据
 * @param {Array} target 客户端传递来的数据
 * @returns {Object} 需要被删除和需要被新增的标签, 以及是否需要更新
 */
const diffTags = (source, target) => {
  const result = {
    deleteTagList: [],
    addTagList: [],
    noPatch: true,
  };

  if (diffArray(source, target)) return result;
  const targetSource = new Set(target);

  for (let i = 0; i < source.length; i++) {
    const val = source[i];
    if (targetSource.has(val)) {
      targetSource.delete(val);
    } else {
      result.deleteTagList.push(val);
    }
  }

  if (targetSource.size) {
    result.addTagList = [...targetSource.values()];
  }

  result.noPatch = false;

  return result;
};

class TagServices {
  /**
   * @catalog services/tag
   * @module 获取标签
   * @title 获取所有标签分类
   * @description 对标签中的 tag_id 进行加密, 不对客户端暴露真正数据库的标签唯一 id
   * @return ResModel
   * @return_param errno
   * @return_param data
   * @return_param message
   * @remark null
   * @number 2
   */
  static async getAllTags() {
    const findResult = await TagModel.findAllTags();
    if (!findResult.errno) {
      return findResult;
    }

    return Object.assign(findResult, { data: batchCipId(findResult.data) });
  }

  /**
   * @catalog services/tag
   * @module tag
   * @title 新增、修改和删除标签
   * @description 一个接口支持新增、更新和删除用户标签
   * @param session 当前用户的 session 信息
   * @param ids 标签 id
   * @return ResModel
   * @return_param errno
   * @return_param data
   * @return_param message
   * @remark null
   * @number 2
   */
  static async updateTags(session, ids) {
    const { uuid } = session;

    // 客户端最新标签数据
    const realTagIds = batchDecodeId(ids);

    /**
     * 三种操作
     * 1. 查询当前用户, 如果当前用户没有对应的标签, 则说明是首次选择标签
     * 2. 如果当前用户已有的标签 比 客户端传递的标签 id少, 则说明是新增或更新
     * 3. 如果当前用户已有的标签 比 客户端传递的标签 id多, 则说明是删除或更新
     */

    const findTagByIdResult = await TagModel._findTagById(uuid);
    if (!findTagByIdResult.errno) {
      return findTagByIdResult;
    }

    // 用户已存在的标签数据, map 取出标签字段组成数组, filter 过滤 tags.ttid 为 null 的情况
    const findTagList = findTagByIdResult.data
      .map((e) => e["tags.ttid"])
      .filter((e) => Boolean(e));

    /**
     * 对应第一种
     * 1. 将选择的标签存储到关系表中
     * 2. 将 user 表中的 seleted_tag 的状态置为1, 已选择标签
     * 3. 使用事务操作, 确保两张表都成功或失败
     */
    if (findTagList.length === 0) {
      /**
       * 存储用户的标签数据
       */
      const saveResult = await TagModel.saveTagById(realTagIds, uuid);
      if (!saveResult.errno) {
        return saveResult;
      }

      return saveResult;
    }

    /**
     * diff 需要将用于已有的标签数据， 和客户端最新传递过来的数据进行 diff
     * diff 结束之后, 可以得知需要被删除和新增的标签数据
     * 在用户已有标签和客户端传递过来的标签相同的情况下, 需要新增的标签直接更新需要删除的标签
     */

    const { deleteTagList, addTagList, noPatch } = diffTags(
      findTagList,
      realTagIds
    );

    /**
     * 不需要更新的情况下, 直接响应给客户端
     */
    if (noPatch) {
      debug("noPatch");
      return new ResModel("标签更新成功", 1);
    }

    /**
     * 如果有移除的标签, 先移除再插入
     */
    try {
      if (deleteTagList.length) {
        const deleteTagResult = await TagModel.deleteTags(deleteTagList, uuid);
        if (deleteTagResult.errno) {
          return deleteTagResult;
        }
      }

      if (addTagList.length) {
        const addTagResult = await TagModel.addTags(addTagList, uuid);
        if (addTagResult.errno) {
          return addTagResult;
        }
      }
    } catch (e) {
      debug(e);
      return new ResModel("系统错误");
    }

    return new ResModel("更新标签成功", 1);
  }
}

module.exports = TagServices;
