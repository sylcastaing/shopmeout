var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userModel = new Schema({
	email: String,
	motDePasse: String
});

module.exports = mongoose.model('users', userModel);