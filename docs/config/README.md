## 项目相关配置说明

### 别名配置
`@` 表示根目录, red_book_server

##### 例子
访问 `config` 目录下的文件 和 访问 `db/mysqldb` 下的文件
```javascript
const config = require('@/config');

const mysqldb = require('@/db/mysqldb');
```

`/* eslint-disable import/no-unresolved */` 取消 eslint 报错


### 响应对象和 await 结果对象
统一使用同一种响应格式 `resModel`。具体的封装在 `util/responseModel` 中。

在模块中只需要这样引入此类就可以, 类的变量要大写开头

```javascript
const ResModel = require("@ResModel");
``` 

就可以使用, 不用写相对路径和绝对路径


### ResModel 使用文档
设置成功的几种方式: 

```text
// 第一种
new ResModel({ name: 1 })
{
  "message": "",
  "data": {
    "name": 1
  },
  "errno": 1
}

// 第二种
new ResModel("响应成功", 1);
{
  "message": "响应成功",
  "data": null,
  "errno": 1
}

// 第三种
new ResModel("验证码已发送", { code: 1234 }, 1)
{
  "message": "验证码已发送",
  "data": {
    "code": 1234
  },
  "errno": 1
}
```

设置失败的几种方式
```text
// 第一种
new ResModel("获取失败")
{
  "message": "获取失败",
  "data": null,
  "errno": 0
}

// 第二种
new ResModel("获取失败", { errorData: "123" }, 0);
{
  "message": "获取失败",
  "data": {
    "errorData": "123"
  },
  "errno": 0
}
```

暂时支持以上五种方式

### 注释规范
API  接口参考注释: 

```text
/**
   * @catalog services/user/code
   * @module 发送验证码
   * @title 生成验证码, 发送验证码
   * @description 接受 Controller 委托, 生成验证码并发送给用户
   * @url null
   * @param email 必选 string 邮箱地址
   * @return ResModel
   * @return_param errno number 成功/失败
   * @return_param data null|objeect
   * @return_param message string 错误或成功消息
   * @remark null
   * @number 2
   */
```

后续的一些接口都会更新为上面的注释风格
