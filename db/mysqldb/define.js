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
    verify_code: require("./module_types/db_verify_code"),
    tag: require("./module_types/db_tag"),
  };
}

/**
 *
 * @param sequelize 初始化好的 seq 实例
 * @param isPatch [Boolean | Array] true表示同步或清除表数据, 如果为数组表示同步个别模型
 * @returns {Object} seq 实例, 和每个模型的实例
 */
module.exports = (sequelize, isPatch = false) => {
  const models = getModels();
  let seed = null;

  // 需要使用迭代器模式进行优化
  // 用户模型
  const User = sequelize.define(models.user.TABLE_NAME, models.user.TABLE_COL, {
    AutoIncrement: 10000,
    timestamps: false,
  });

  // 核实验证码模型
  const VerifyCode = sequelize.define(
    models.verify_code.TABLE_NAME,
    models.verify_code.TABLE_COL,
    {
      timestamps: false,
    }
  );

  // 分类模型
  const Tag = sequelize.define(models.tag.TABLE_NAME, models.tag.TABLE_COL, {
    timestamps: false,
  });

  /**
   * 导出的模型统一大写字母开头
   * 驼峰命名
   */
  const _define = {
    User,
    VerifyCode,
    Tag,
  };

  /**
   * 向每个模型同步初始数据
   */
  if (isPatch) {
    seed = () => init(_define, sequelize.getQueryInterface());
  }

  return {
    ..._define,
    seed,
    sequelize,
  };
};
