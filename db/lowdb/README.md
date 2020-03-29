## db.json 敏感数据说明

```json
{
  "mysql": {
    "username": "据库用户名",
    "password": "数据库密码",
    "database": "数据库名称",
    "port": "数据库端口",
    "host": "数据库主机"
  },
  "email": {
    "user": "邮箱地址(用于向用户发送邮件通知)",
    "pass": "POP3/SMTP服务授权码"
  },
  "system": {
    "secret": "加密密匙",
    "iv": "初始化向量"
  }
}
```

#### mysql
数据库相关配置

#### email
邮件相关配置

#### system
系统相关配置

secret 和 iv 均是 16 为字符串

[随机密码生成](https://suijimimashengcheng.51240.com/)
