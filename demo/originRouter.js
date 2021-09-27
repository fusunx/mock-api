const Koa = require('koa2');
const fs = require('fs');
const path = require('path');
const app = new Koa();

function render(page) {
    return new Promise((resolve, reject) => {
        const viewUrl = path.resolve(__dirname, `./view/${page}`);
        fs.readFile(viewUrl, 'binary', (err, data) => {
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
        case '/': {
            view = 'index.html';
            break;
        }
        case '/index': {
            view = 'index.html';
            break;
        }
        case '/todo': {
            view = 'todo.html';
            break;
        }
        case '/404': {
            view = '404.html';
            break;
        }
        default: {
            break;
        }
    }

    return await render(view);
}

app.use(async (ctx) => {
    let url = ctx.request.url;
    console.log(url);
    let html = await route(url);
    ctx.body = html;
});

app.listen(3000);
