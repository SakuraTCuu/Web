var express = require("express")
var router = express.Router();

router.route('/').get(function(req,res) {
    console.log("-------------------------------------logout-----------------------------------------------");
    // res.write('登出成功')
    // res.end()
}).post(function(req, res) {
    console.log('post --- ')
    // res.write('登出成功')
    // res.end()
})
module.exports = router;