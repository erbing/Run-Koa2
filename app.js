const Koa = require('koa');
const fs = require('fs');

// middleware 中间件、或者叫做组件
const logger = require('./middleware/logger-async');

const app = new Koa();

app.use(logger());

app.use(async ctx => {
    ctx.body = 'hello koa2';
});

app.listen(2000);

console.log('[demo] start-quick is starting at port 2000');
