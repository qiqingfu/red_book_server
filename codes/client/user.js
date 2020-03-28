/**
 * @author qiqingfu
 * @date 2020-03-28 16:34
 */

const userCode = {
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

  SUCCESS_CODE_SENDED: "验证码已发送, 请注意注意查收!",

  FAIL_CODE_SEND_FAILED: "验证码发送失败, 请稍后重试!",
  FAIL_CODE_SAVE_FAILED: "验证码保存失败",
};

module.exports = userCode;
