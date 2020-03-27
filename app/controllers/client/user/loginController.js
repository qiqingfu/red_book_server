/**
 * @author qiqingfu
 * @date 2020-03-27 15:07
 */

module.exports = (ctx) => {
  ctx.body = {
    message: "登录接口",
    url: ctx.request.url,
  };
};
