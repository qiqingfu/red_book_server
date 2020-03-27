/**
 * @author qiqingfu
 * @date 2020-03-27 14:20
 */
const Router = require("@koa/router");

/**
 * @param options {Object}
 *
 * 路由注册中间件
 * 注册 prefixRouter 中的每一个路由, 并且设置好路由的前缀
 */

module.exports = function (options) {
  const version = options.version || "v1";
  const prefixRouter = options.prefix || {};
  const app = options.app || this;

  const prefixs = Object.keys(prefixRouter);

  return async (ctx, next) => {
    prefixs.forEach((prefix) => {
      const router = new Router();
      router.use(`/${prefix}/${version}`, prefixRouter[prefix].routes());
      app.use(router.routes());
    });

    await next();
  };
};
