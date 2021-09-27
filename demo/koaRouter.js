const Koa = require('koa2');
const fs = require('fs');
const app = new Koa();

const Router = require('koa-router');

const home = new Router();

home.get('/', async (ctx) => {
    ctx.body = `
        <ul>
            <li><a href="/page/helloworld">/page/helloworld</a></li>
            <li><a href="/page/404">/page/404</a></li>
        </ul>
    `;
});

const page = new Router();

page.get('404', async (ctx) => {});
