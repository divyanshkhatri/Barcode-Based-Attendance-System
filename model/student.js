var mongoose = require('mongoose')
var attendance= new mongoose.Schema({
    date: String,
    registerno: []
  })
  var Student_registeration = module.exports = mongoose.model("BCD", attendance);