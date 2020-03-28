/**
 * @author qiqingfu
 * @date 2020-03-28 23:35
 */
/* eslint-disable import/no-unresolved */
const codes = require("@/codes/client");

/**
 * User 模块下的验证配置
 */

module.exports = {
  email: [
    { strategy: "isNotNull", message: codes.USER_CODE.ERROR_EMAIL_NOT_NULL },
    { strategy: "isEmail", message: codes.USER_CODE.ERROR_EMAIL_ILLEGAL },
  ],
  username: [
    { strategy: "isNotNull", message: codes.USER_CODE.ERROR_USERNAME_NOT_NULL },
    {
      strategy: "isUserName",
      message: codes.USER_CODE.ERROR_USERNAME_PATTEERN,
    },
  ],
  code: [{ strategy: "isNotNull", message: codes.USER_CODE.ERROR_CODE_NOT_NULL }],
  password: [
    { strategy: "isNotNull", message: codes.USER_CODE.ERROR_INIT_PASS_NOT_NULL },
    { strategy: "minLenght:6", message: codes.USER_CODE.ERROR_MIN_LENGHT_SIX },
  ],
  repeatpwd: [{ strategy: "isNotNull", message: codes.USER_CODE.ERROR_CONFIRM_PASS_NOT_NULL }],
};
