'use strict';

const koaJwt = require('koa-jwt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const jwtMiddleware = koaJwt({ secret: config.secret });

module.exports = function (ctx, next) {
    try {
        if (typeof ctx.request.headers.authorization === 'string') {
            ctx.jwtData = jwt.verify(ctx.request.headers.authorization, config.secret);
        } else {
            throw { code: 401, message: 'no authorization' };
        }
    } catch (error) {
        throw { code: 401, message: error.message };
    }
    next();
};
