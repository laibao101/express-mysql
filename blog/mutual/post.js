var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./postSqlMapping');

// 使用连接池，提升性能
var pool = mysql.createPool({
    host: '127.0.0.1', user: 'root', password: 'root123', database: 'test', // 前面建的post表位于这个数据库中
    port: 3306
});
// 向前台返回JSON方法的简单封装
var jsonWrite = function(res, ret) {
    if (typeof ret === 'undefined') {
        res.json({code: '1', msg: '操作失败'});
    } else {
        res.json(ret);
    }
};

module.exports = {
    add: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            // var param = req.query || req.params || req.body;
            var param = req.body;
            // 建立连接，向表中插入值
            // 'INSERT INTO post(id, title, content) VALUES(0,?,?)',
            connection.query($sql.insert, [
                param.title, param.content
            ], function(err, result) {
                if (result) {
                    result = {
                        code: 200,
                        msg: '创建成功'
                    };
                }

                // 以json形式，把操作结果返回给前台页面
                jsonWrite(res, result);

                // 释放连接
                connection.release();
            });
        });
    },
    // index
    queryAll: function(req, res, next,cb) {
        console.log('query all');
        // console.log(pool);
        // pool.getConnection(function(err, connection) {
        //     connection.query('SELECT * FROM post', function(error, results,fields) {
        //         connection.release();
        //
        //         console.log(result);
        //         // jsonWrite(res, result);
        //     });
        // });

        pool.getConnection(function(err, connection) {
            // Use the connection
            connection.query($sql.queryAll, function(error, results, fields) {
                // And done with the connection.
                connection.release();

                jsonWrite(res, results);
                // Handle error after the release.
                if (error)
                    throw error;
                    // Don't use the connection here, it has been returned to the pool.
                }
            );
        });

    }
};
