/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('verify_code', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: true
    },
    code: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    expiration: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: 'verify_code'
  });
};
