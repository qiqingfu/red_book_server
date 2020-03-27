/**
 * @author qiqingfu
 * @date 2020-03-27 15:49
 */

/**
 * 验证码相关的控制器
 * @type {Code}
 */
class Code {
  static async registerCode(ctx) {
    ctx.body = "获取验证码";
  }
}

module.exports = Code;
