`use strict`;

const { query } = require('../lib/db');

const user = {
    async register(userData) {
        const { userName, password } = userData;
        try {
            await query(
                `insert into user (id, username, password) values (null, '${userName}', ${password});`
            );
            return 'SUCCESS';
        } catch (error) {
            return error;
        }
    },
    async login(userData) {
        const { userName, password } = userData;
        try {
            return await query(
                `select id from user where username = '${userName}' and password = '${password}'`
            );
        } catch (error) {
            return error;
        }
    },
    async getUser(userData) {
        console.log(userData);
        return userData;
    },
};

module.exports = user;
