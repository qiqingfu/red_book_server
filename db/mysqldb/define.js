/**
 * @author qiqingfu
 * @date 2020-03-27 00:17
 */
/* eslint-disable import/no-unresolved */
const { Type } = require("@/util");
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
    user_to_tag: require("./module_types/db_user_to_tag"),
  };
}

/**
 * 处理两种情况
 * @param p {Boolean | Array}
 * @param d {Object}
 * @returns {Object}
 *
 * 返回的数据结构为:
 * {
 *   isPatch: Boolean,
 *   _define: Object
 * }
 */
function heavyLoad(p, d) {
  const returnModel = (isPatch, _define) => {
    return {
      isPatch,
      _define,
    };
  };

  const findSomeModel = (_d, _p) => {
    const set = new Set(_p);
    const res = {};
    Object.keys(_d).forEach((modelName) => {
      const modelDate = _d[modelName];
      if (set.has(modelName)) res[modelName] = modelDate;
    });

    return Object.keys(res).length > 0 ? res : null;
  };

  if (Type.Boolean(p) && p) return returnModel(p, d);

  if ((Type.Boolean(p) && !p) || (Type.Array(p) && p.length < 1))
    return returnModel(false);

  // single sync model
  if (Type.Array(p) && p.length > 0) {
    const defineModels = findSomeModel(d, p);

    // 如果要同步的模型, 没有在 _define定义, defineModels 返回值为 null
    // 负责返回要同步的模型
    return returnModel(!!defineModels, defineModels);
  }

  return undefined;
}

/**
 *
 * @param sequelize 初始化好的 seq 实例
 * @param isPatch [Boolean | Array] true表示同步或清除表数据, 如果为数组表示同步个别模型
 * @returns {Object} seq 实例, 和每个模型的实例
 */
module.exports = (sequelize, isPatch = false) => {
  const models = getModels();
  let seed = () => console.log(`无任何需要同步的数据`);

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

  // 用户和标签的关联表 多对多
  const UserToTag = sequelize.define(
    models.user_to_tag.TABLE_NAME,
    models.user_to_tag.TABLE_COL,
    {
      timestamps: false,
    }
  );

  /**
   * 导出的模型统一大写字母开头
   * 驼峰命名
   */
  const _define = {
    User,
    VerifyCode,
    Tag,
    UserToTag,
  };

  /**
   * 向每个模型同步初始数据
   */
  const patch = heavyLoad(isPatch, _define);
  if (patch.isPatch) {
    seed = () => init(patch._define, sequelize.getQueryInterface());
  }

  return {
    ..._define,
    seed,
    sequelize,
  };
};
