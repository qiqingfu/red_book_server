/**
 * Created by qiqf on 2020/4/21
 */

/**
 * 这是标签的 services 层, 业务逻辑处理
 */

/* eslint-disable import/no-unresolved */
const { TagModel } = require("@/app/model/client/user");
const { cipher } = require("@/util/safety");

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
      if (k === "tag_id") {
        map.id = cipher.encrypt(item[k]);
      } else {
        map[k] = item[k];
      }
    });

    resultArray.push(map);
  });

  return resultArray;
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
}

module.exports = TagServices;
