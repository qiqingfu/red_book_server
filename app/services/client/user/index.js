/**
 * @author qiqingfu
 * @date 2020-03-27 22:59
 */

/**
 * 处理 Controller 相关的业务逻辑
 * services 层
 */
const Code = require("./codeServices");
const User = require("./userServices");
const Tag = require("./tag");

module.exports = {
  Code,
  User,
  Tag,
};
