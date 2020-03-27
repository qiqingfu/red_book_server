/**
 * @author qiqingfu
 * @date 2020-03-27 11:23
 */

/**
 * db_user 模型初始的表数据
 */

module.exports = {
  NAME: "user",
  DROP: true, // 同步模型数据时, 如果数据库中已存在当前表, 则删除后再同步
  DATA: [
    {
      uid: 10000,
      email: "9116895@qq.com",
      username: "root",
      nickname: "官方",
      password: "red_book_admin",
    },
    {
      uid: 10001,
      email: "723469354@qq.com",
      username: "admin",
      nickname: "超级管理",
      password: "red_book_admin",
    },
  ],
};
