var mongoose = require('mongoose')

var dataSchema=new mongoose.Schema({
    user: String,  // 用户名
    pwd: String,  // 密码
    rd: Date,   // 注册时间
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

//为模式添加一个方法

dataSchema.pre('save', function(next) {
    if(this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    }
    else {
        this.meta.updateAt = Date.now()
    }

    next()
})

dataSchema.statics = {
    fetch: function(cb) {
        return this
        .find({})
        .sort('meta.updateAt')
        exec(cb)
    },
    findById: function(id,cb) {
        return this
        .findOne({_id:id})
        exec(cb)
    }
}

module.exports = dataSchema