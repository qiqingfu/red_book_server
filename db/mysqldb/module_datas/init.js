/**
 * @author qiqingfu
 * @date 2020-03-27 11:33
 */

/**
 * datas key 是小写的
 */
const datas = require("./index");

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
  const names = Object.keys(modelMap);

  for (let k = 0; k < names.length; k++) {
    const name = names[k];
    const model = modelMap[name];
    const modelName = name.toLowerCase();
    const item = datas[modelName];

    if (item) {
      if (modelName === item.NAME && !item.DROP) {
        for (let i = 0; i < item.DATA.length; i++) {
          create(model, item.DATA[i]).then(() => {
            console.log(`${modelName} 第 ${i + 1} 行: 模型数据同步完成!`);
          });
        }
      } else {
        for (let i = 0; i < item.DATA.length; i++) {
          create(model, item.DATA[i], item.DROP).then(() => {
            console.log(`${modelName} 第 ${i + 1} 行: 模型数据同步完成!`);
          });
        }
      }
    }
  }
};
