/**
 * @author qiqingfu
 * @date 2020-03-29 12:34
 */

const crypto = require("crypto");
const config = require("../config");

/**
 * 安全相关的模块
 */

const cipher = (function cipher() {
  const key = Buffer.from(config.SYSTEM.SECRET, "utf8");
  const iv = Buffer.from(config.SYSTEM.IV, "utf8");
  const algorithm = "aes-128-cbc";

  function encrypt(data) {
    let secretKey = "";
    const c = crypto.createCipheriv(algorithm, key, iv);
    // data 需要加密的数据
    // utf8 加密数据的字符编码
    // hex 加密后的字符编码
    secretKey += c.update(data, "utf8", "hex");
    secretKey += c.final("hex");

    return secretKey;
  }

  function decode(secretKey) {
    let data = "";
    const c = crypto.createDecipheriv(algorithm, key, iv);
    // secretKey 密匙
    // hex 加密后的字符编码
    // utf8 data 解密前的字符编码(还原)
    data += c.update(secretKey, "hex", "utf8");
    data += c.final("utf8");

    return data;
  }

  return {
    encrypt,
    decode,
  };
})();

module.exports = {
  cipher, // 加密密码
};
