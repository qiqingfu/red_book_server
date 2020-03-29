/**
 * 策略类, 算法的具体实现
 */

const validate = require("../validateFiled");

class Strategy {
  /**
   * @description 是否为空
   */
  static isNotNull(value, message) {
    if (!value) {
      return message;
    }
    return null;
  }

  /**
   * @description 是否为邮箱
   * @param {String} value
   * @param {String} message
   */
  static isEmail(value, message) {
    if (!validate.isEmail(value)) {
      return message;
    }
    return null;
  }

  /**
   *
   * 合法的用户名算法
   * @param {String} value
   * @param {String} message
   */
  static isUserName(value, message) {
    if (!validate.isUserName(value)) {
      return message;
    }
    return null;
  }

  /**
   *
   * 一个值的最小长度
   * @param value
   * @param {Number} len
   * @param {String} message
   */
  static minLenght(value, len, message) {
    const lenght = parseInt(len, 10);
    if (Number.isNaN(lenght)) {
      return `Strategy Error: ${len} 字段错误, 希望是一个数字类型`;
    }
    if (value.length < lenght) {
      return message;
    }
    return null;
  }
}

module.exports = Strategy;
