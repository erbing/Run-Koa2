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

function render(page) {
    return new Promise((resolve, reject) => {
        let viewUrl = `./view/${page}`;
        fs.readFile(viewUrl, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

async function route(url) {
    let view = '404.html';
    switch (url) {
        case '/':
            view = 'index.html';
            break;
        case '/index':
            view = 'index.html';
            break;
        case '/login':
            view = 'login.html';
            break;
        case '/404':
            view = '404.html';
            break;
        default:
            break;
    }
    let html = render(view);
    return html;
}

app.use(async ctx => {
    let url = ctx.request.url;
    let html = await route(url);

    // 从上下文对 request 对象中获取
    let request = ctx.request;
    let req_query = request.query;
    let req_queryString = request.querystring;

    // 从 上下文中直接获取
    let ctx_query = ctx.query;
    let ctx_queryString = ctx.querystring;

    ctx.body = {
        ctx,
        request,
        url,
        req_query,
        req_queryString,
        ctx_query,
        ctx_queryString,
        html
    };
});

app.listen(2000);

console.log('[demo] start-quick is starting at port 2000');
