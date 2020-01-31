const Koa = require('koa');
const views = require('koa-views');
const path = require('path');
const mysql = require('mysql');

const app = new Koa();

// 加载模板引擎
app.use(
    views(path.join(__dirname, './ejs'), {
        extension: 'ejs'
    })
);

// 连接数据库
const connection = mysql.createConnection({
    host: '127.0.0.1', // 数据库地址
    user: 'root', // 数据库用户
    password: '123456', // 数据库密码
    database: 'hellothinkjs' // 选中数据库
});

let title = 'hello 404';
let users = [];

connection.connect();
connection.query('SELECT * FROM think_user', async (error, results, fields) => {
    if (error) throw error;
    // connected !
    console.log(results);
    users = results;
    app.use(async ctx => {
        await ctx.render('404', {
            title,
            users
        });
    });
});
connection.end();

app.listen(3000);
