/**
 * @author qiqingfu
 * @date 2020-03-25 13:57
 */

const db = require("../db/lowdb");

module.exports = {
  SERVER_PORT: "3001",

  // mysql config
  DATABASE: {
    USERNAME: db.mysql.username,
    PASSWORD: db.mysql.password,
    SQLNAME: db.mysql.database,
    HOST: db.mysql.host,
    PORT: db.mysql.port,
  },

  // 系统相关配置
  SYSTEM: {
    SECRET: db.system.secret,
    IV: db.system.iv,
  },

  // 客户端相关配置
  CLIENT: {
    SESSION_KEY: "session_id", // 存在客户端cookie中的 key 标识

    // 具体参考 axios 文档: https://www.kancloud.cn/luponu/axios/873153s
    XSRF_COOKIE_NAME: "XSRF-TOKEN", // xsrf token 的值的cookie的名称
    XSRF_HEADER_NAME: "X-XSRF-TOEKN", // 带有xsrf令牌值的http标头的名称
  },
};
