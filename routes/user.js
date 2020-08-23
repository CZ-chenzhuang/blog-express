var express = require('express');
var router = express.Router();
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

/* GET home page. */
router.post('/login', function(req, res, next) {
    const { username, password } = req.body
    const result = login(username, password)
    result.then(val => {
      if (val.username) {
        // 设置session
        req.session.username = val.username
        req.session.realname = val.password
        res.json(
            new SuccessModel('登录成功')
        )
        return
      }
      res.json(
        new ErrorModel('登陆失败')
      )
    })
});

// loginCheck是自己定义的中间件，在需要登陆验证的操作之前，使用这个中间件
router.get('/login-test', loginCheck, (req, res, next) => {
    res.json(
        new SuccessModel(req.session, '登录了啦！')
    )
})

module.exports = router;
