/**
 * @author qiqingfu
 * @date 2020-03-27 15:26
 */

/**
 * 当前 routers 下用到的一些通用方法工具
 */

const register = (middlewares) => (router) => {
  middlewares.forEach((middleware) => {
    router.use(middleware.routes());
  });

  return router;
};

module.exports = {
  register,
};
