## Strategy 策略类验证

主要方便表单的字段验证, 告别 if else 的验证方式, 采取配置式验证。

参考模块: 
- app/controllers/client/user/codeController.js
- app/controllers/client/user/userController.js

任何需要验证字段的模块都可以这样引入: 
```text
const Validator = require("@Validator");
```

使用: 
```javascript
const validator = new Validator()

let body = { name: zhangsan, email: 123456@qq.com };

validator.add(body.name, [ 
	{
		strategy: "isNotNull", // 不允许为空
		message: "用户名不能为空", // 校验失败的消息
	}
 ])
 
validator.add(body.email, [
	{
		strategy: "isEmail",
		message: "邮箱格式错误"
	}
]) 

const errMsg = validator.start()
```

如果 errMsg 有值, 则表示验证失败, 如果返回 `null`表示验证成功。


### 目前支持的几种验证方式
 - isNotNull: 是否为空
 - isEmail: 是否为邮箱格式
 - isUserName: 是否合法的用户名
 - minLenght: 一个值的最小长度。使用:  minLenght:6 
