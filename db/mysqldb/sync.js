/**
 * @author qiqingfu
 * @date 2020-03-27 11:12
 */

const sequelize = require("./init");

const PATCH = true;
require("./define")(sequelize, PATCH);

sequelize
  .sync()
  .then(() => {
    console.log("模型同步成功");
  })
  .catch((err) => {
    console.log("模型同步失败", err);
  });
