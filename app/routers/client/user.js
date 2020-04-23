/**
 * @author qiqingfu
 * @date 2020-03-27 13:41
 */

const Router = require("@koa/router");
/* eslint-disable import/no-unresolved */
const identity = require("@/middlewares/identity");
const userController = require("@/app/controllers/client/user");
const Tags = require("@/app/controllers/client/user/tag");

const router = new Router();
/**
 * 用户注册
 */
router.post("/register", userController.User.register);

/**
 * 根据邮箱获取验证码
 */
router.post("/register/code", userController.Code.registerCode);

/**
 * 用户登录
 */
router.post("/login", userController.User.login);

/**
 * 用户模块下标签相关的接口
 * - 获取所有标签
 * - 用户选择的标签
 */

/**
 * 获取所有标签
 */
router.get("/tags", Tags.tags);

/**
 * 更新用户选择的标签
 * 包括 新增和删除
 * 当前接口需要鉴权
 */
router.post("/update/tags", identity, Tags.update);

module.exports = router;
