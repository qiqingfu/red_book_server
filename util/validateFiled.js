/**
 * @author qiqingfu
 * @date 2020-03-27 22:04
 */

const emailReg = new RegExp(
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
);

const isEmail = (email) => {
  return emailReg.test(email);
};

module.exports = {
  isEmail,
};
