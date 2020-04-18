/**
 * @author qiqingfu
 * @date 2020-03-28 13:26
 */

/**
 * 所有 module_datas 入口文件
 */

const User = require("./user");
const VerifyCode = require("./verifyCode");
const Tag = require("./tag");

module.exports = {
  User,
  VerifyCode,
  Tag,
};
