'use strict';

class CodeError extends Error {
    constructor(message = '未知错误', code = -1) {
        super(message);
        this.code = code;
    }
}

module.exports = {
    CodeError,
    // 拒绝访问错误构造函数
    ForbiddenError: class ForbiddenError extends CodeError {
        constructor(message = '拒绝访问') {
            super(message, 403);
        }
    },
    // 无效参数构造函数
    InvalidQueryError: class InvalidQueryError extends CodeError {
        constructor(message = '无效的参数') {
            super(message, 400);
        }
    },
};
