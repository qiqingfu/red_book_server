/**
 * @author qiqingfu
 * @date 2020-03-27 18:54
 */

const ERRNO_NUMBER = {
  succeed: 1,
  fail: 0,
};

/**
 * 同一响应模块
 *
 * @field errno
 * 					- 0: 请求失败
 * 					- 1: 请求成功
 *
 * @field message
 * 					- null
 * 					- String 客户端请求有误, 用户无权限等, 有提醒用户的值
 *
 * @field data
 * 					- null 客户端不需要数据时
 * 				  - 响应给客户端数据
 * {
 *   errno: 0
 * }
 */

class BaseResponse {
  constructor(m, d, e = ERRNO_NUMBER.fail) {
    this.message = null;
    this.data = null;
    this.errno = null;

    /**
     * res(data) 失败
     */
    if (typeof m !== "string") {
      this.data = m;
      this.message = "";
      this.errno = ERRNO_NUMBER.succeed;

      return;
    }

    /**
     * res(data, 1) 成功
     * res(data, 0) 失败
     */
    if (typeof d === "number") {
      this.message = m;
      this.data = null;
      this.errno = d;

      return;
    }

    /**
     * res('修改成功', data, 1)
     */
    if (
      typeof m === "string" &&
      typeof d === "object" &&
      d !== null &&
      (e === ERRNO_NUMBER.succeed || e === ERRNO_NUMBER.fail)
    ) {
      this.message = m;
      this.data = d;
      this.errno = e;

      return;
    }

    /**
     * res(msg) 失败
     * res(Error) 失败
     */
    if (typeof m === "string") {
      this.message = m.message || m;
      this.errno = ERRNO_NUMBER.fail;
    }
  }
}

module.exports = BaseResponse;
