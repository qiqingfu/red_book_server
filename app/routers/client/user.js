/**
 * @author qiqingfu
 * @date 2020-03-27 13:41
 */

const Router = require("@koa/router");
const userController = require("../../controllers/client/user");

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

module.exports = router;
