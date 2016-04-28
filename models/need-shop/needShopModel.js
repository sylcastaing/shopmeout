var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var needShopModel = new Schema({
	mailShoppeur: String,
	date: Date,
	codePostal: String,
	nbArticle: Number
});

module.exports = mongoose.model('needShop', needShopModel);