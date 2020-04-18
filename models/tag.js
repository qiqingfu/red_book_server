/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "tag",
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      tag_id: {
        type: DataTypes.CHAR(20),
        allowNull: false,
        unique: true,
      },
      tag_name: {
        type: DataTypes.STRING(6),
        allowNull: false,
        unique: true,
      },
      en_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      tag_icon: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      tag_description: {
        type: DataTypes.STRING(80),
        allowNull: true,
      },
      tag_followers: {
        type: DataTypes.BIGINT,
        allowNull: true,
        defaultValue: "0",
      },
      abc: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
    },
    {
      tableName: "tag",
    }
  );
};
