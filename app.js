/**
 * @author qiqingfu
 * @date 2020-03-25 13:02
 */

const debug = require("debug")("app");
const Koa = require("koa");
const bodyParser = require("koa-body-parser");
const logger = require("koa-logger");
const json = require("koa-json");
const connect = require("./db/mysqldb/connect");
const router = require("./app/routers");

const app = new Koa();

/**
 * 数据库测试连接
 */
connect.connecting().then((r) => {
  debug(r);
});

// 注册路由
router(app);

/**
 * 解析 post 请求体
 */
app.use(bodyParser());

/**
 * json 响应美化
 */
app.use(json());

/**
 * 请求记录
 */
app.use(logger());

module.exports = app;
