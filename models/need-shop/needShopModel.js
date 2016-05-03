var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var needShopModel = new Schema({
	mailShoppeur: String,
	nomMagasin: String,
	adresseMagasin: String,
	dateShopping: Date,
	adresse: String,
	nbArticle: Number
});

module.exports = mongoose.model('needShop', needShopModel);