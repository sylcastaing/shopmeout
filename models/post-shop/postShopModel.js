var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postShopModel = new Schema({
	shoppeur: String,
	magasin: String,
	distance: Number,
	nbShoppeur: Number,
	nbArticle: Number
});

module.exports = mongoose.model('postShop', postShopModel);