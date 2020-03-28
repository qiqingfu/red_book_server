/**
 * @author qiqingfu
 * @date 2020-03-27 22:04
 */

const emailReg = new RegExp(
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
);

const userNameReg = new RegExp(/^[a-zA-Z]\w{4,15}$/);

/**
 * 验证邮箱是否合法
 * @param {String} email
 */
const isEmail = (email) => {
  return emailReg.test(email);
};

/**
 * 验证用户名是否合法
 *
 * 字母开头，允许5-16字节，允许字母数字下划线组合
 * @param {String} name
 * @returns {Boolean}
 */
const isUserName = (name) => {
  return userNameReg.test(name);
};

module.exports = {
  isEmail,
  isUserName,

  emailReg,
  userNameReg,
};
