/**
 * @author qiqingfu
 * @date 2020-03-27 00:17
 */

const init = require("./module_datas/init");
/**
 * 将定义的模型(module_types), 同步到数据中, 映射出对应的表结构
 */

/**
 * timestamps: false  不向模型添加createdAt和updatedAt时间戳
 */

function getModels() {
  /* eslint-disable global-require */
  return {
    user: require("./module_types/db_user"),
  };
}

/**
 *
 * @param sequelize 初始化好的 seq 实例
 * @returns {Object} seq 实例, 和每个模型的实例
 */
module.exports = (sequelize) => {
  const models = getModels();

  // 用户模型
  const User = sequelize.define(models.user.TABLE_NAME, models.user.TABLE_COL, {
    AutoIncrement: 10000,
    timestamps: false,
  });

  const _define = {
    User,
  };

  /**
   * 向每个模型同步初始数据
   */
  init(_define);

  return {
    ..._define,
    sequelize,
  };
};
