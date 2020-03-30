/**
 * @author qiqingfu
 * @date 2020-03-28 01:11
 */

/**
 * 随机生成验证码
 * @param n - 几位
 * @param min - 范围
 * @param max - 范围
 * @returns {string}
 */
const random = (n = 6, min = 0, max = 9) => {
  const codes = [];
  for (let i = 0; i < n; i++) {
    const code = Math.floor(Math.random() * (max - min + 1) + min);
    codes.push(code);
  }

  return codes.join("");
};

/**
 * 下划线命名转驼峰命名
 * @param str
 * @returns String
 */
const underlineToHump = (str) => {
  return str.replace(/(_(\w)?)/g, ($0) => $0.slice(1).toUpperCase());
};

module.exports = {
  random,
  underlineToHump,
};
