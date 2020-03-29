# user 相关接口

<a name="ZT73o"></a>
## 注册登录


<a name="3PQeo"></a>
### 获取验证码



| api | 参数 | 类型 | 响应 |
| --- | --- | --- | --- |
| /client/v1/register/code | email | 邮箱 - String - * | {<br /> "message": "验证码已发送, 请注意注意查收!",<br /> "data": null,<br /> "errno": 1<br />} |
| /client/v1/register | username | 用户名 - String - * | {<br /> "message": "用户注册成功",<br /> "data": null,<br /> "errno": 1<br />} |
|  | email | 邮箱 - String - * |  |
|  | code | 验证码 - Number - * |  |
|  | password | 初始密码 - String - * |  |
|  | repeatpwd | 确认密码 - String - * |  |
