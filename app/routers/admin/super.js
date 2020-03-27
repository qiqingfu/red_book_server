/**
 * @author qiqingfu
 * @date 2020-03-27 15:19
 */

const Router = require("@koa/router");

const router = new Router();

router.get("/test", async (ctx) => {
  ctx.body = {
    message: "管理端接口测试",
    url: ctx.url,
  };
});

module.exports = router;
