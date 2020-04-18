/**
 * Created by qiqf on 2020/4/17
 */

/**
 * 标签数据模型
 *
 * client
 * 1. 用户注册 -> 登录成功之后的第一步就是选择响应感兴趣的标签, 最少选择 5 个标签
 * 2. 选择标签之后, 将选择的标签的 tag_id(每个标签唯一) 与用户数据表关联
 * 3. 进入首页之后, 根据用户选择的标签进行数据筛选
 *
 * admin
 * 1. 后台管理可以对标签进行配置和新增
 * 2. 是否可以修改和删除用户已经选择的标签, 后续再考虑
 *
 *
 * 标签模型字段如下:
 */

const S = require("sequelize");

module.exports = {
  TABLE_NAME: "tag",
  TABLE_COL: {
    // 标签自增 id, 10位长整型
    id: {
      type: S.BIGINT(10),
      allowNull: false, // 不允许空值
      primaryKey: true, // 主键
      filed: "id",
      autoIncrement: true, // 主键自增
      comment: "tag 标签主键自增",
    },
    // 标签 tag_id 当前标签的唯一标识
    // 固定长度 20个, 不重复唯一的随机码
    tag_id: {
      type: S.CHAR(20),
      allowNull: false, // 非空约束
      filed: "tag_id",
      unique: true, // 唯一约束
      comment: "标签的唯一代表值, 外表可以通过 tag_id 字段查询",
    },
    /**
     * 标签名
     * 最少两个字符, 最多6个字符
     */
    tag_name: {
      type: S.STRING(6),
      allowNull: false,
      filed: "tag_name",
      unique: true,
      comment: "标签名字",
      validate: {
        len: [2, 6],
      },
    },
    /**
     * 标签名的别名
     */
    en_name: {
      type: S.STRING(20),
      allowNull: false,
      filed: "en_name",
      unique: true,
      comment: "标签中文名的别名",
    },
    /**
     * 标签图标, 不是唯一约束
     * 可以是外部服务器的链接地址
     * allowNull 暂时为 true, 暂时为 Null
     * 后期标签图标必须上传的
     */
    tag_icon: {
      type: S.STRING(100),
      allowNull: true,
      filed: "tag_icon",
      unique: false,
      comment: "标签的图标",
    },
    /**
     * 标签的描述
     * 可以为Null
     * 不是唯一约束
     */
    tag_description: {
      type: S.STRING(80),
      allowNull: true,
      filed: "tag_description",
      unique: false,
      comment: "标签的描述信息",
    },
    /**
		 * 标签的关注用户数量
		   关注的数量和用户数量一样
		 */
    tag_followers: {
      type: S.BIGINT(20),
      defaultValue: 0,
      filed: "tag_followers",
      comment: "有多少用户关注当前标签",
    },
    // tag_abc: {
    //   type: S.STRING(20),
    //   defaultValue: "hello",
    // },
  },
};
