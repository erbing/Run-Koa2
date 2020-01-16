const Koa = require('koa');
const fs = require('fs');

// middleware 中间件、或者叫做组件
const logger = require('./middleware/logger-async');

const app = new Koa();

app.use(logger());
// app.use(async (ctx, next) => {
//     await next();
//     const rt = ctx.response.get('X-Response-Time');
//     console.log(`${ctx.method} ${ctx.url} - ${rt}`);
// });

// app.use(async (ctx, next) => {
//     const start = Date.now();
//     await next();
//     const ms = Date.now() - start;
//     ctx.set('X-Response-Time', `${ms}ms`);
// });

app.use(async ctx => {
    ctx.body = ctx;
});

app.listen(2000);

console.log('[demo] start-quick is starting at port 2000');
