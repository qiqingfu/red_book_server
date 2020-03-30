/**
 * @author qiqingfu
 * @date 2020-03-27 11:33
 */

/**
 * datas key 要确保模型名字一样
 */
/* eslint-disable import/no-unresolved */
const { underlineToHump } = require("@/util/");
const datas = require("./index");

async function create(model, data, isDrop = false) {
  if (isDrop) {
    await model.drop();
  }

  if (data) {
    await model.create(data);
  }
}

/**
 * 向模型同步数据
 */
module.exports = (modelMap) => {
  const names = Object.keys(modelMap);

  for (let k = 0; k < names.length; k++) {
    const name = names[k];
    const model = modelMap[name];
    const item = datas[name];
    const itemName = underlineToHump(item.NAME);
    console.log(itemName);

    if (item) {
      if (name === itemName && !item.DROP) {
        for (let i = 0; i < item.DATA.length; i++) {
          create(model, item.DATA[i]).then(() => {
            console.log(`${name} 第 ${i + 1} 行: 模型数据同步完成!`);
          });
        }
      } else if (item.DATA.length) {
        /**
         * 存在初始数据时就同步, 否则就清除
         */
        for (let i = 0; i < item.DATA.length; i++) {
          create(model, item.DATA[i], item.DROP).then(() => {
            console.log(`${name} 第 ${i + 1} 行: 模型数据同步完成!`);
          });
        }
      } else {
        create(model, null, item.DROP).then(() => {
          console.log(`${name} 表中的数据已经清除完毕`);
        });
      }
    }
  }
};
