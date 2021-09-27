'use strict';
const Koa = require('koa2');
const bodyParser = require('koa-bodyparser');
const staticCache = require('koa-static-cache');
const cors = require('koa-cors');
const helmet = require('koa-helmet');

const config = require('./config');
const publicRouter = require('./router/public');
const privateRouter = require('./router/private');
const { loggerMiddleware } = require('./middlewares/logger');
const { errorHandler, responseHandler } = require('./middlewares/response');
const { corsHandler } = require('./middlewares/cors');

const app = new Koa();

app.use(loggerMiddleware);

app.use(helmet());

app.use(errorHandler);

app.use(bodyParser());
app.use(staticCache(config.publicDir));

app.use(publicRouter.routes(), publicRouter.allowedMethods());
app.use(privateRouter.routes(), privateRouter.allowedMethods());

app.use(async (ctx, next) => {
    try {
        await next();
        if (!ctx.body) {
            console.log(ctx.url);
            ctx.body = 'not found 404';
            ctx.status = 404;
        }
    } catch (error) {
        ctx.body = 'server error';
        ctx.status = 500;
    }
});

app.use(cors(corsHandler));

app.use(responseHandler);

module.exports = app;
