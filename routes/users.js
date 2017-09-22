var express = require('express');
var dbutil = require('../util/db');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    console.log(req.query);
    var conn = dbutil();
    conn.query('select * from tbuser',
        function (err, rows, fields) {
            res.render('users', {data: rows});
        }
    );
});

router.get('/edit/:id', function (req, res, next) {
    console.log(req.params);
    var conn = dbutil();
    conn.query('select * from tbuser where id = ?', [req.params.id], function (req, data) {
        res.render('user-edit', data[0]);
    })
});

router.get('/new', function (req, res, next) {
    res.render('user');
});

router.post('/', function (req, res, next) {
    var conn = dbutil();
    conn.query('insert into tbuser(login, email, senha) values(?,?,?)',
        [req.body.login, req.body.email, req.body.senha], function (data) {
            res.render('users')
        });
});

router.post('/:id', function (req, res, next) {
    var conn = dbutil();
    conn.query('UPDATE tbuser SET login = ?, senha = ?, email = ? ' +
        'WHERE id = ?', [req.body.login, req.body.email, req.body.senha, req.params.id], function () {
            res.render('users')
    });
});

module.exports = router;
