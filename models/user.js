/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    uid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    uuid: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: true
    },
    username: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: true
    },
    nickname: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    tableName: 'user'
  });
};
