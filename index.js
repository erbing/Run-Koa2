const Koa = require('koa');
const path = require('path');
const static = require('koa-static');

const app = new Koa();

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static';

app.use(static(path.join(__dirname, staticPath)));

app.use(async ctx => {
    if (ctx.url === '/index') {
        ctx.cookies.set('cid', 'hello world', {
            domain: '127.0.0.1',
            // 写cookie所在的域名, 需要注意的是如果访问的域名和这里的 domain 不一致的化，是无法成功写入的
            path: '/index', // 写cookie所在的路径
            maxAge: 10 * 60 * 1000, // cookie有效时长
            expires: new Date('2017-02-15'), // cookie失效时间
            httpOnly: false, // 是否只用于http请求中获取
            overwrite: false // 是否允许重写
        });
        ctx.body = 'cookies is ok';
    } else {
        ctx.body = 'hello koa2';
    }
});

app.listen(3000, () => {
    console.log('[demo] static-use-middleware is starting at port 3000');
});
