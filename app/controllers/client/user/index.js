/**
 * @author qiqingfu
 * @date 2020-03-27 13:27
 */

/**
 * user模块 控制器入口
 * userController
 */

const Code = require("./codeController");
const User = require("./userController");
const Tag = require("./tag");

module.exports = {
  Code,
  User,
  Tag,
};
