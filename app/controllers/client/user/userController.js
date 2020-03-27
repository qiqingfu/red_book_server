/**
 * @author qiqingfu
 * @date 2020-03-27 15:52
 */

/**
 * 用户相关的控制器
 * @type {Code}
 */

class User {
  /**
   * 用户注册
   * @param ctx
   * @returns {Promise<void>}
   */
  static async register(ctx) {
    const registerData = ctx.request.body;
    ctx.body = registerData;
  }

  /**
   * 用户登录
   * @param ctx
   * @returns {Promise<void>}
   */
  static async login(ctx) {
    ctx.body = {
      message: "登录接口",
      url: ctx.request.url,
    };
  }
}

module.exports = User;
