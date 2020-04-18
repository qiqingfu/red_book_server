/**
 * @author qiqingfu
 * @date 2020-03-27 11:23
 */

/**
 * db_user 模型初始的表数据
 */

module.exports = {
  NAME: "User",
  DROP: true, // 同步模型数据时, 如果数据库中已存在当前表, 则删除后再同步
  DATA: [
    {
      uid: 10000,
      uuid: "1234567",
      email: "9116895@qq.com",
      username: "root",
      nickname: "官方",
      password: "red_book_admin",
    },
    {
      uid: 10001,
      uuid: "7654321",
      email: "12345@qq.com",
      username: "root1",
      nickname: "官方",
      password: "red_book_admin",
    },
  ],
};
