'use strict';

const path = require('path');

module.exports = {
    port: '3333',
    secret: 'secret',
    publicDir: path.resolve(__dirname, './public'),
    logPath: path.resolve(__dirname, './logs/koa-template.log'),
    mysql: {
        database: 'interface',
        username: 'root',
        password: '110265qweFU.',
        host: '42.193.163.181',
        port: 3306,
    },
};
