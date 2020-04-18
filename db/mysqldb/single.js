/**
 * Created by qiqf on 2020/4/17
 */

/**
 * 同步单一的模型, 可以配置型
 *
 * sync 文件用于同步所有的模型, 并且根据每个 module_data 下模型的初始化数据字段 (DROP) 来决定
 * 同步模型的是否是否需要删除当前模型对应的数据库中表, 然后再重新创建新表进行同步
 *
 * sync 文件同步模型, 太受限制, 所以 single 文件同步模型的配置型更强
 * 可以有选择的同步单个或多个模型, 也是结合 初始化模型数据文件中的 DROP 字段决定同步的方式
 */

require("module-alias/register");

const sequelize = require("./init");

/**
 * 模型名字要和 module_datas 下模型数据的 NAME一致
 * @type {string[]}
 */
const MODULE_NAMES = ["Tag"];
require("./define")(sequelize, MODULE_NAMES);

sequelize
  .sync()
  .then(() => {
    console.log("模型同步成功");
  })
  .catch((err) => {
    console.log("模型同步失败", err);
  });
