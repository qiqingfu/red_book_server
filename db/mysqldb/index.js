/**
 * @author qiqingfu
 * @date 2020-03-26 22:33
 */

const sequelize = require("./init");
const models = require("./define")(sequelize);

module.exports = {
  ...models,
};
