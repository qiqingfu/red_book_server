/**
 * 身份鉴权路由中间件
 */
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

module.exports = function (ctx, next) {
  const userToken = ctx.header[config.CLIENT.XSRF_HEADER_NAME] || "";
  const userCookie = ctx.cookies.get(config.CLIENT.SESSION_KEY) || "";
  debug(userToken);
  debug(userCookie);

  if (!userToken || !userCookie) {
    ctx.throw(createError(401, SEND_CLIENT_401_STATUS_MESSAGE));
  }

  verifyUser(userToken, ctx.session)
    .then((verifyResult) => {
      next();
    })
    .catch((code) => {
      if (code === STATUS.expired) {
        ctx.body = { errno: LOGINEXPIRED, message: "身份已过期, 请重新登录" };
      } else {
        ctx.throw(createError(401, SEND_CLIENT_401_STATUS_MESSAGE));
      }
    });
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
    });
  });
}
