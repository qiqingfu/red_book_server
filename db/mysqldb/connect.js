/**
 * @author qiqingfu
 * @date 2020-03-26 22:37
 */

/**
 * 与 mysql 数据库建立连接
 */
const sequelize = require("./init");

const connect = (() => {
  const connecting = async () => {
    try {
      await sequelize.authenticate();
      return "Connection has been established successfully.";
    } catch (e) {
      console.log("Unable to connect to the database:", e);
      return false;
    }
  };

  return {
    connecting,
  };
})();

module.exports = connect;
