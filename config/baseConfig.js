/**
 * @author qiqingfu
 * @date 2020-03-25 13:57
 */

const db = require('../db/lowdb/');

module.exports = {
  SERVER_PORT: '3001',

  // mysql config
  DATABASE: {
    USERNAME: db.mysql.username,
    PASSWORD: db.mysql.password,
    SQLNAME: db.mysql.database,
    HOST: db.mysql.host,
    PORT: db.mysql.port
  }
};
