/**
 * @author qiqingfu
 * @date 2020-03-25 14:58
 */

/**
 * 引入数据库配置文件
 * 并且通过 Sequelize 尝试与 mysql 数据库建立连接
 * 并且返回一个 sequelize 实例对象
 */

const Sequelize = require("sequelize");
const config = require("../../config");

const sequelize = new Sequelize(
  config.DATABASE.SQLNAME,
  config.DATABASE.USERNAME,
  config.DATABASE.PASSWORD,
  {
    host: config.DATABASE.HOST,
    port: config.DATABASE.PORT,
    protocol: "tcp",
    dialect: "mysql", // 选择连接的数据库
    dialectOptions: {
      charset: "utf8mb4",
      // 排序规则
      // utf8mb4_general_ci 查询时不区分大小写匹配, 效率高, 准确性相对低
      // utf8_general_cs 查询时区分大小写匹配, 准确性高, 效率相对较低
      // collate: "utf8mb4_general_ci",
      supportBigNumbers: true,
      bigNumberStrings: true,
    },
    define: {
      underscored: true,
      freezeTableName: true, // 表不要复数
    },
    timezone: "+08:00", // 将日期从数据库转换为 JavaScript 日期时使用的时区
  }
);

module.exports = sequelize;
