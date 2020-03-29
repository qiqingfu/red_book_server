/**
 * @author qiqingfu
 * @date 2020-03-28 16:34
 */

const userCode = {
  // 验证 Error
  ERROR_EMAIL_NOT_NULL: "邮箱不能为空",
  ERROR_USERNAME_NOT_NULL: "用户名不能为空",
  ERROR_CODE_NOT_NULL: "验证码不能为空",
  ERROR_INIT_PASS_NOT_NULL: "初始密码不能为空",
  ERROR_CONFIRM_PASS_NOT_NULL: "确认密码不能为空",
  ERROR_USERNAME_PATTEERN:
    "用户名以字母开头，允许5-16字节，允许字母数字下划线组合",
  ERROR_EMAIL_ILLEGAL: "邮箱不合法",
  ERROR_EMAIL_REGISTERED: "邮箱已被注册",
  ERROR_MIN_LENGHT_SIX: "密码最少6位长度",
  ERROR_EMAIL_NOT_SAME: "注册和接受验证码邮箱不是同一个",
  ERROR_CODE_EXPIRED: "验证码已过期, 请重新获取",
  ERROR_CODE_ERROR: "验证码错误",

  // 成功 Success
  SUCCESS_CODE_SENDED: "验证码已发送, 请注意注意查收!",
  SUCCESS_USER_REGISTED_SUCCESS: "用户注册成功",

  // 系统 Fail
  FAIL_CODE_SEND_FAILED: "验证码发送失败, 请稍后重试!",
  FAIL_CODE_SAVE_FAILED: "验证码保存失败",
  FAIL_USER_REGISTED_FAIL: "用户注册失败",
};

module.exports = userCode;
