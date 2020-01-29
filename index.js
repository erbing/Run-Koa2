const Koa = require('koa');
const path = require('path');
const static = require('koa-static');

const app = new Koa();

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static';

app.use(static(path.join(__dirname, staticPath)));

app.use(async ctx => {
    if (ctx.url === '/index') {
        ctx.cookies.set('cid', 'hello koa2', {
            domain: '127.0.0.1',
            path: '/index',
            maxAge: 10 * 60 * 1000,
            expires: new Date('2020-01-30'),
            httpOnly: false,
            overwrite: false
        });
        ctx.body = 'cook is ok';
    } else {
        ctx.body = 'hello koa2';
    }
});

app.listen(3000, () => {
    console.log('[demo] static-use-middleware is starting at port 3000');
});
