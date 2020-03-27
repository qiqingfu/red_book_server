/**
 * @author qiqingfu
 * @date 2020-03-27 13:43
 */
const routerMiddleware = require("./routerMiddleware");
const apiClient = require("./client");
const apiAdmin = require("./admin");

const API_VERSION = "v1";

module.exports = (app) => {
  // 注册客户端 api 路由
  // app.use() 只接受一个函数

  // 客户端访问接口
  // /client/v1/xxx
  // 中间件注册顺序 1
  app.use(
    routerMiddleware({
      version: API_VERSION,
      app,
      prefix: {
        client: apiClient,
        admin: apiAdmin,
      },
    })
  );
};
