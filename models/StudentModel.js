var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var StudentSchema = new Schema({	'name' : String,	'description' : String,	'email' : String});

module.exports = mongoose.model('Student', StudentSchema);
