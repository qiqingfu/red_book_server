/**
 * @author qiqingfu
 * @date 2020-03-25 13:02
 */

const debug = require("debug")("app");
const Koa = require("koa");
const connect = require("./db/mysqldb/connect");

const app = new Koa();

/**
 * 数据库测试连接
 */
connect.connecting().then((r) => {
  debug(r);
});

app.use(async (ctx) => {
  ctx.body = "hello_server";
});

module.exports = app;
