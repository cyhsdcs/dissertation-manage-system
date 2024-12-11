var models = require('../db/db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var $sql = require('../db/sqlMap');

var conn = mysql.createConnection(models.mysql);

conn.connect();

var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.send('err');
    } else {
        console.log(ret);
        res.send(ret);
    }
}

var dateStr = function(str) {
    return new Date(str.slice(0,7));
}

// 增加用户接口
router.post('/addUser', (req, res) => {
    var sql = $sql.user.add;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.name, params.account, params.pass, params.checkPass, params.role], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

//查找用户接口
router.post('/login', (req, res) => {
    var sql_name = $sql.user.select_name;
    var params = req.body;
    
    // 如果参数是字符串，尝试解析它
    if (typeof Object.keys(params)[0] === 'string') {
        try {
            params = JSON.parse(Object.keys(params)[0]);
        } catch (e) {
            console.error('参数解析错误:', e);
            return res.status(400).send('Invalid request format');
        }
    }

    if (params.name) {
        sql_name += " where username ='"+ params.name +"'";
        console.log(sql_name);
    }    
    conn.query(sql_name, params.name, function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result[0] === undefined) {
            res.send('-1')   //查询不出username，data 返回-1
        } else {
            var resultArray = result[0];
            console.log(resultArray);
            console.log(params);
            console.log(resultArray.password);
            console.log(params.password);
            if(resultArray.password === params.password) {
                jsonWrite(res, result);
            } else {
                res.send('0')   //username
            }
        }
    })
});

//获取用户信息
router.post('/getUser', (req, res) => {
    var sql_name = $sql.user.select_name;
    // var sql_password = $sql.user.select_password;
    var params = req.body;
    console.log('/getUser', params);

    if (params.name) {
        sql_name += " where account ='"+ params.name +"'";
    }
    conn.query(sql_name, params.name, function(err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        if (result[0] === undefined) {
            res.send('-1')   //查询不出username，data 返回-1
        } else {
            jsonWrite(res, result);
        }
    })
});

//更新用户信息
router.post('/updateUser', (req, res) => {
    var sql_update = $sql.user.update_user;
    var params = req.body;
    console.log(params);
    if (params.id) {
        sql_update  += " email = '" + params.email +
                        "',phone = '" + params.phone +
                        "',card = '" + params.card +
                        "',birth = '" + params.birth +
                        "',sex = '" + params.sex +
                        "' where id ='"+ params.id + "'";
    }    
    conn.query(sql_update, params.id, function(err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        if (result.affectedRows === undefined) {
            res.send('更新失败，请联系管理员')   //查询不出username，data 返回-1
        } else {
            res.send('ok'); 
        }
    })
});

//更改密码
router.post('/modifyPassword', (req, res) => {
    var sql_modify = $sql.user.update_user;
    var params = req.body;
    console.log(params);
    conn.query(sql_modify, [params.pass, params.checkPass, params.id], function(err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        if (result.affectedRows === undefined) {
            res.send('修改密码失败，请联系管理员')   //查询不出username，data 返回-1
        } else {
            res.send('ok'); 
        }
    })
});

router.post('/getMyStudentList', (req, res) => {
    var sql_student = $sql.user.select_my_student;
    var params = req.body;
    console.log('/getMyStudentList', params);

    if (params.account) {
        sql_student += " where teacher_account ='"+ params.account +"'";
    }
    conn.query(sql_student, params.account, function(err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        if (result[0] === undefined) {
            res.send('-1')   //查询不出，data 返回-1
        } else {
            jsonWrite(res, result);
        }
    })
})

router.post('/getNotGraded', (req, res) => {
    var sql_student = $sql.user.select_not_graded;
    var params = req.body;
    console.log('/getNotGraded', params);

    if (params.account) {
        sql_student += " and teacher_account ='"+ params.account +"'";
    }
    conn.query(sql_student, params.account, function(err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        if (result === undefined || result[0] === undefined) {
            res.send('-1')   //查询不出，data 返回-1
        } else {
            jsonWrite(res, result);
        }
    })
})

router.post('/submitScores', (req, res) => {
    var update_score = $sql.user.update_score;
    var insert_score = $sql.user.insert_score;
    var select_score = $sql.user.select_score;
    var params = req.body;
    console.log('/submitScores', params);

    conn.query(select_score, params.student_account, function(err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        if (result === undefined || result[0] === undefined) {
            conn.query(insert_score, [params.student_account, params.score_progress, params.score_final], function(err, result) {
                if (err) {
                    console.log(err);
                }
                jsonWrite(res, result);
            })
        } else {
            conn.query(update_score, [params.score_progress, params.score_final, params.student_account], function(err, result) {
                if (err) {
                    console.log(err);
                }
                jsonWrite(res, result);
            })
        }
    })

})

module.exports = router;
