/**
 * @author qiqingfu
 * @date 2020-03-27 11:12
 */

/**
 * 解决不能在 init 模块中使用别名的问题
 */
require("module-alias/register");

const sequelize = require("./init");

// PATCH  中必须是对应模型的名字
// 导出的模型名字
const PATCH = ["User"];
const { seed } = require("./define")(sequelize, PATCH);

sequelize
  .sync()
  .then(() => {
    console.log(`
      模型同步成功...
      开始将初始数据 seed 到对应的表中
    `);
    seed();
  })
  .catch((err) => {
    console.log("模型同步失败", err);
  });
