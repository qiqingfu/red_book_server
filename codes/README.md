## 响应Message维护

### 为什么要划分模块? 
由于目前项目模块较少, 现在划分出模块, 每个模块单独维护自己的响应状态和验证提醒消息等。方便维护。

在以后模块增多的情况下, 也可以更好的将多个模块的 Message 抽离出来, 在不改动业务代码的情况下。

### 区分响应Message
```text
ERROR_xxx: ERROR开头的表示(校验不通过)

FAIL_xxx: FAIL开头的标识(服务端的错误)

WARN_:  WARN开头表示(服务端的警告信息)

SUCCESS_: SUCCESS开头的标识(成功的Message)
```

### 别名获取
在client端中的模块中可以通过: 
```text
const codes = require("@codes/client");
```
快速获取
