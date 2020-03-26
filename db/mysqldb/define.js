/**
 * @author qiqingfu
 * @date 2020-03-27 00:17
 */

/**
 * 将定义的模型(module_types), 同步到数据中, 映射出对应的表结构
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
  });

  const _define = {
    User,
  };
  return {
    ..._define,
    sequelize,
  };
};
