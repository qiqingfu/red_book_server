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

const firstLowercase = (str) => {
  const arr = str.split("");
  arr.splice(0, 1, arr[0].toLowerCase());

  return arr.join("");
};

/**
 * 向模型同步数据
 *
 * 1. 如果同步的模型, 在数据库中已经存在
 * 		> 删除对应表中的所有数据
 * 	  > 再将最新的数据同步到对应的数据库表中
 *
 * 2. 如果同步的模型, 在数据库中不存在
 * 		> 创建对应的表
 * 	  > 将数据同步到表中
 *
 * 3. 删除数据库中所有的表
 */

module.exports = async (modelMap, queryInterface) => {
  let dataBaseHavedTablesName;

  try {
    dataBaseHavedTablesName = await queryInterface.showAllSchemas();
    dataBaseHavedTablesName = dataBaseHavedTablesName.map(
      (tablesIn) => tablesIn.Tables_in_red_book
    );
  } catch (e) {
    console.log(e);
  }

  // 新的 map 映射, 模型的 TABLE_NAME: 模型
  const modelNames = Object.keys(modelMap).map(firstLowercase);

  modelNames.forEach((modelName) => {
    const idx = dataBaseHavedTablesName.findIndex(
      (databaseModelName) => modelName === underlineToHump(databaseModelName)
    );

    if (idx !== -1) {
      const { NAME, DATA } = datas[dataBaseHavedTablesName[idx]];
      queryInterface
        .bulkDelete(NAME, null, {})
        .then((deleteResult) => {
          return deleteResult;
        })
        .then(() => {
          return DATA.length > 0 && queryInterface.bulkInsert(NAME, DATA);
        });
    } else {
      console.error(`
        数据向模型同步失败: 
          数据库中没有找到 ${underlineToHump(modelName)} 这张表
          但是你的模型数据 ${modelName} 却向一个没有表的数据库同步数据
          
          请确保同步数据之前, 模型定义已经映射到数据库中对应的表
      `);
    }
  });
};

// async function create(model, data) {
//   if (data) {
//     await model.create(data);
//   }
// }

/**
 * 向模型同步数据
 */
// module.exports = async (modelMap) => {
//   const names = Object.keys(modelMap);
//
//   for (let k = 0; k < names.length; k++) {
//     const name = names[k]; // 开头大写
//     const model = modelMap[name];
//     const item = datas[name];
//     const itemName = underlineToHump(item.NAME);
//
//     if (item) {
//       if (name === itemName && !item.DROP) {
//         for (let i = 0; i < item.DATA.length; i++) {
//           create(model, item.DATA[i]).then(() => {
//             console.log(`${name} 第 ${i + 1} 行: 模型数据同步完成!`);
//           });
//         }
//       } else if (item.DATA.length) {
//         /**
//          * 存在初始数据时就同步, 否则就清除
//          */
//         if (item.DROP) {
//           await model.drop();
//         }
//         for (let i = 0; i < item.DATA.length; i++) {
//           create(model, item.DATA[i], item.DROP).then(() => {
//             console.log(`${name} 第 ${i + 1} 行: 模型数据同步完成!`);
//           });
//         }
//       } else {
//         create(model, null).then(() => {
//           console.log(`${name} 表中的数据已经清除完毕`);
//         });
//       }
//     }
//   }
// };
