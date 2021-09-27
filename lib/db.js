`use strict`;

const mysql = require('mysql');

const pool = mysql.createPool({
    host: '42.193.163.181',
    port: '3306',
    user: 'root',
    password: '110265qweFU.',
    database: 'koaProject',
});

const query = function (sql, values) {
    console.log(sql);
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                    connection.release();
                });
            }
        });
    });
};

module.exports = {
    query,
};
