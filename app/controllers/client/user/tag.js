/**
 * Created by qiqf on 2020/4/21
 */

/**
 * 这是用户标签相关的控制器
 */
/* eslint-disable import/no-unresolved */
const TagServices = require("@/app/services/client/user/tag");

class Tag {
  /**
   * @catalog controller/user/tag
   * @module 用户标签
   * @title 用户标签
   * @description 用户登录成功之后, 需要获取所有的标签分类
   * @url /client/v1/tags
   * @method GET
   * @param ctx 必选 object 请求的上下文对象
   * @return null
   * @return_param null
   * @remark 无需任何参数, 不需要进行鉴权
   * @number 1
   */
  static async tags(ctx) {
    ctx.body = await TagServices.getAllTags();
  }

  /**
   * @catalog controller/user/tag
   * @module 用户标签
   * @title 更新用户标签
   * @description 如果当前用户没有标签, 新传入的标签则保存。如果数据库中有 a b c 标签
   * 客户端传递了 a b, 则表示移除 c 标签
   * @url /client/v1/update/tags
   * @method GET
   * @param ctx 必选 object 请求的上下文对象
   * @return null
   * @return_param null
   * @remark 需要选择的标签 id 组成的数据
   * @number 1
   */
  static async update(ctx) {
    ctx.body = "新增,修改和删除标签";
  }
}

module.exports = Tag;
