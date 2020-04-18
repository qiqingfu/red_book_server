/**
 * @author qiqingfu
 * @date 2020-03-28 13:26
 */

/**
 * 所有 module_datas 入口文件
 */

const user = require("./user");
const verifyCode = require("./verifyCode");
const tag = require("./tag");

module.exports = {
  user,
  verify_code: verifyCode,
  tag,
};
