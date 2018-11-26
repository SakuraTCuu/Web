var express = require("express")
var router = express.Router();

// /**login page */
router.route("/").get(function (req, res) {
    console.log("-------------------------------------login-----------------------------------------------");
    res.render("login", { title: 'User Login', message: "注册" });
}).post(function (req, res) {   // 从此路径检测到post方式则进行post数据的处理操作
    console.log('post---');
    var User = global.dbHandle.getModel("user");
    var uname = req.body.uname;
    User.findOne({ name: uname }, function (err, doc) {  //通过此model以用户名的条件 查询数据库中的匹配信息
        if (err) {
            res.send(500);
            console.log(err);
        } else if (!doc) {
            req.session.error = '用户名不存在';
            req.write('用户不存在,请注册')
            req.send(404);
        } else {
            if (req.body.upwd != doc.password) {  //查询到匹配用户名的信息，但相应的password属性不匹配
                req.session.error = "密码错误";
                req.write('用户或密码错误')
                res.send(404);
            } else {      //信息匹配成功，则将此对象（匹配到的user) 赋给session.user  并返回成功
                req.session.user = doc;
                res.send(200);
                console.log("用户登录成功");
            }
        }
    })
});

module.exports = router;
