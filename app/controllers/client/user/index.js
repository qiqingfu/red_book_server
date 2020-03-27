/**
 * @author qiqingfu
 * @date 2020-03-27 13:27
 */

/**
 * user模块 控制器入口
 * userController
 */

const register = require("./registerController");
const login = require("./loginController");

module.exports = {
  register,
  login,
};
