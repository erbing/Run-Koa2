const Koa = require('koa');
const fs = require('fs');
const path = require('path');

// middleware 中间件、或者叫做组件
const logger = require('./middleware/logger-async');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');

const app = new Koa();

const staticPath = './static';

app.use(logger());
app.use(bodyParser());

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

function parsePostData(ctx) {
    return new Promise((resolve, reject) => {
        try {
            let postdata = '';
            ctx.req.addListener('data', data => {
                postdata += data;
            });
            ctx.req.addListener('end', function() {
                let parseData = parseQueryStr(postdata);
                resolve(parseData);
            });
        } catch (error) {}
    });
}

// 将POST请求参数字符串解析成JSON
function parseQueryStr(queryStr) {
    let queryData = {};
    let queryStrList = queryStr.split('&');
    console.log(queryStrList);
    for (let [index, queryStr] of queryStrList.entries()) {
        let itemList = queryStr.split('=');
        queryData[itemList[0]] = decodeURIComponent(itemList[1]);
    }
    return queryData;
}

app.use(static(path.join(__dirname, staticPath)));

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

    if (ctx.method === 'GET') {
        ctx.body = html;
    } else if (ctx.url === '/' && ctx.method === 'POST') {
        // let postData = await parsePostData(ctx);
        // ctx.body = postData;
        // 当POST请求的时候，中间件koa-bodyparser解析POST表单里的数据，并显示出来
        let postData = ctx.request.body;
        ctx.body = postData;
    } else {
        ctx.body = '<h1>404！！！ o(╯□╰)o</h1>';
    }
});

app.listen(2000, () => {
    console.log('[demo] static-use-middleware is starting at port 2000');
});

console.log('[demo] start-quick is starting at port 2000');
