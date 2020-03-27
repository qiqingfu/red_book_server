/**
 * @author qiqingfu
 * @date 2020-03-27 13:41
 */

const Router = require("@koa/router");
const userController = require("../../controllers/client/user");

const router = new Router();

router.post("/register", userController.register);

router.post("/login", userController.login);

module.exports = router;
