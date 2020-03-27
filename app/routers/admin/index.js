/**
 * @author qiqingfu
 * @date 2020-03-27 15:21
 */
const Router = require("@koa/router");
const supepRouter = require("./super");
const { register } = require("../tools");

const adminMiddleware = [supepRouter];

module.exports = register(adminMiddleware)(new Router());
