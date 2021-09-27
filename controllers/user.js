`use strict`;

const jwt = require('jsonwebtoken');
const config = require('../config');
const userServices = require('../services').user;
const { InvalidQueryError } = require('../lib/error');

const register = async (ctx, next) => {
    const { userName, password } = ctx.request.body;
    if (!userName || !password) {
        throw new InvalidQueryError();
    }
    const queryRes = await userServices.register(ctx.request.body);
    if (queryRes === 'SUCCESS') {
        ctx.result = 'SUCCESS';
        ctx.msg = '注册成功';
    } else {
        const errMsg = queryRes.code === 'ER_DUP_ENTRY' ? '用户名已存在' : queryRes;
        throw {
            code: 2,
            message: `注册失败 ${errMsg}`,
        };
    }
    return next();
};

const login = async (ctx, next) => {
    const { userName, password } = ctx.request.body;
    if (!userName || !password) {
        throw new InvalidQueryError();
    }
    const user = await userServices.login(ctx.request.body);
    if (user.length === 0) {
        ctx.result = '';
        ctx.msg = '用户不存在';
        throw {
            code: 1,
            message: '用户不存在',
        };
    } else {
        ctx.result = jwt.sign(
            {
                data: user[0].id,
                exp: Math.floor(Date.now() / 1000) + 60 * 60,
            },
            config.secret
        );
    }
    return next();
};

const getUser = async (ctx, next) => {
    ctx.result = ctx.jwtData;
    return next();
};

module.exports = {
    login,
    getUser,
    register,
};
