/**
 * @author qiqingfu
 * @date 2020-03-27 11:33
 */

const user = require("./user");

async function create(model, data, isDrop = false) {
  if (isDrop) {
    await model.drop();
  }

  await model.create(data);
}

/**
 * 向模型同步数据
 */
module.exports = (modelMap) => {
  Object.keys(modelMap).forEach((name) => {
    const model = modelMap[name];
    const modelName = name.toLowerCase();

    if (modelName === user.NAME && !user.DROP) {
      for (let i = 0; i < user.DATA.length; i++) {
        create(model, user.DATA[i]).then(() => {
          console.log(`${modelName} 第 ${i + 1} 行: 模型数据同步完成!`);
        });
      }
    } else {
      for (let i = 0; i < user.DATA.length; i++) {
        create(model, user.DATA[i], user.DROP).then(() => {
          console.log(`${modelName} 第 ${i + 1} 行: 模型数据同步完成!`);
        });
      }
    }
  });
};
