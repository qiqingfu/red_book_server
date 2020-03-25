/**
 * @author qiqingfu
 * @date 2020-03-25 13:02
 */

const Koa = require('koa');

const app = new Koa();

app.use(async ctx => {
  ctx.body = 'red_book_server'
});

app.listen(3001);
