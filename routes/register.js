var express = require("express")
var router = express.Router();

/* GET register page. */
router.route("/").get(function (req, res) {    // 到达此路径则渲染register文件，并传出title值供 register.html使用
    console.log("-------------------------------------register--------------------------------------------");
    res.render("register", { title: '注册', message: '用户注册' });
}).post(function (req, res) {
    console.log('post register----')
    //这里的User就是从model中获取user对象，通过global.dbHandel全局方法（这个方法在app.js中已经实现)
    var User = global.dbHandle.getModel('user');
    var uname = req.body.uname;
    var upwd = req.body.upwd;
    console.log("uname-->>", uname);
    console.log("upwd-->>", upwd);
    User.findOne({ name: uname }, function (err, doc) {   // 同理 /login 路径的处理方式
        if (err) {
            res.send(500);
            // req.session.error = '网络异常错误！';
            console.log("服务器异常");
            console.log('err--->>>', err);
        } else if (doc) {
            console.log("用户名已存在！");
            res.send(200,{
                code: 3,
                msg: '用户名已存在! 请直接登录'
            });
        } else {
            User.create({                             // 创建一组user对象置入model
                name: uname,
                password: upwd
            }, function (err, doc) {
                if (err) {
                    res.send(500);
                    console.log(err);
                } else {
                    console.log("用户名创建成功");
                    res.send(200,{
                        code: 1,
                        msg: '用户创建成功'
                    });
                }
            });
        }
    });
});

module.exports = router;