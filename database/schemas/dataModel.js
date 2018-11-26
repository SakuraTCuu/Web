var mongoose = require('mongoose')
var dataSchema = require('./data')
var data = mongoose.model('user', dataSchema)

module.exports = data