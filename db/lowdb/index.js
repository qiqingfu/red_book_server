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

Object.defineProperty(db, "_lowdb", {
  configurable: false,
  enumerable: false,
  writable: false,
  value: lowdb,
});

module.exports = db;
