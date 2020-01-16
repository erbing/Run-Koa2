const Koa = require('koa');
const fs = require('fs');

const app = new Koa();

function render(page) {
    return new Promise((resolve, reject) => {
        let viewUrl = `view/${page}`;
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
