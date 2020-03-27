/**
 * @author qiqingfu
 * @date 2020-03-25 14:24
 */

const low = require("lowdb");
const path = require("path");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync(path.join(__dirname, "db.json"));
const lowdb = low(adapter);

if (!lowdb.has("mysql").value()) {
  lowdb.set("mysql", {}).write();
}

if (!lowdb.has("email").value()) {
  lowdb.set("email", {}).write();
}

/**
 * 便捷获取和更新 db.mysql配置
 * @type {{mysql}}
 */
const db = {
  get mysql() {
    return lowdb.get("mysql").value();
  },
  set mysql(val) {
    if (Object.prototype.toString.call(val) !== "[object Object]") {
      return false;
    }

    Object.keys(val).forEach((key) => {
      lowdb.update(`mysql[${key}]`, () => val[key]).write();
    });

    return db.mysql;
  },
};

/**
 * 将 lowdb 实例设置在 db 对象上, 作为一个不可修改的属性
 * 外部可以通过 db_lowdb 来获取实例, 通过 lowdb 提供的 api
 * 便捷操作 lowdb 下的配置文件s
 */
Object.defineProperty(db, "_lowdb", {
  configurable: false,
  enumerable: false,
  writable: false,
  value: lowdb,
});

module.exports = db;
