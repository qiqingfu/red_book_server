/**
 * @author qiqingfu
 * @date 2020-03-27 00:53
 */
const { sequelize } = require("./index");

sequelize
  .sync()
  .then(() => {
    console.log("模型同步数据库成功");
  })
  .catch((err) => {
    console.log("模型同步数据库失败", err);
  });
