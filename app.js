/**
 * @author qiqingfu
 * @date 2020-03-25 13:02
 */

const debug = require("debug")("app");
const Koa = require("koa");
const bodyParser = require("koa-body-parser");
const session = require("koa-session-minimal");
const MysqlStore = require("koa-mysql-session");
const logger = require("koa-logger");
const json = require("koa-json");
const config = require("./config");
const connect = require("./db/mysqldb/connect");
const router = require("./app/routers");
const { COOKIE_EXPIRED_TIME } = require("./util/constant");

const app = new Koa();

/**
 * 配置服务端的 session, 结合 mysql 存储用户 session信息
 */
app.use(
  session({
    key: config.CLIENT.SESSION_KEY,
    store: new MysqlStore({
      user: config.DATABASE.USERNAME,
      password: config.DATABASE.PASSWORD,
      database: config.DATABASE.SQLNAME,
      host: config.DATABASE.HOST,
    }),
    cookie: {
      maxAge: COOKIE_EXPIRED_TIME,
    },
  })
);

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
