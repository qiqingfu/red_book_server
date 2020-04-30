/**
 * 身份鉴权路由中间件
 */
/* eslint-disable import/no-unresolved */
const config = require("@/config");
const safety = require("@/util/safety");
const createError = require("http-errors");
const { LOGINEXPIRED } = require("@/util/constant");
const debug = require("debug")("identify");

const SEND_CLIENT_401_STATUS_MESSAGE = "无权限访问接口";
const STATUS = {
  normal: 0, // 正常访问接口
  expired: 1, // 登录已过期
  noPermission: 2, // 无权限访问
};

function verifyUser(t, session) {
  return new Promise((resolve, reject) => {
    safety.jwt.verifyToken(t).then(({ uuid }) => {
      /**
       * 登录态已过期
       */
      if (!session.isLogin) {
        return reject(STATUS.expired);
      }

      if (uuid === session.uuid) {
        return resolve(STATUS.normals);
      }

      reject(STATUS.noPermission);

      return true;
    });
  });
}

module.exports = async function identity(ctx, next) {
  const userToken = ctx.header[config.CLIENT.XSRF_HEADER_NAME] || "";
  const userCookie = ctx.cookies.get(config.CLIENT.SESSION_KEY) || "";
  debug("userToken", userToken);
  debug("userCookie", userCookie);

  if (!userToken || !userCookie) {
    ctx.throw(createError(401, SEND_CLIENT_401_STATUS_MESSAGE));
  }

  try {
    await verifyUser(userToken, ctx.session);
    // 导致客户端接受到 404 Not Found 的原因是, 上一个中间件没有将下一个中间件的响应结果返回
    // return next() 正确
    return next();
  } catch (code) {
    if (code === STATUS.expired) {
      ctx.body = { errno: LOGINEXPIRED, message: "身份已过期, 请重新登录" };
    } else {
      ctx.throw(createError(401, SEND_CLIENT_401_STATUS_MESSAGE));
    }
  }

  return false;
};
