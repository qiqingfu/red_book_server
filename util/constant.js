/**
 * @author qiqingfu
 * @date 2020-03-29 11:33
 */

/**
 * 验证码过期时间 120s
 * @type {number}
 */
exports.CODE_EXPIRED_MS = 60 * 2 * 1000;

/**
 * 客户端cookie和服务端session的过期时间
 * koa-session-minimal 内部默认为 1天
 * token 的过期时间
 * @type {number}
 */
exports.COOKIE_EXPIRED_TIME = 24 * 3600 * 1000;

/**
 * 定义响应给客户端的 errno 状态码
 * 身份过期码
 */
exports.LOGINEXPIRED = 2;
