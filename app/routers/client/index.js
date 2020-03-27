/**
 * @author qiqingfu
 * @date 2020-03-27 13:49
 */

/**
 * 客户端 api 入口
 */

const Router = require("@koa/router");
const user = require("./user");

const router = new Router();
const middlewares = [user];

middlewares.forEach((middleware) => {
  router.use(middleware.routes());
});

module.exports = router;
