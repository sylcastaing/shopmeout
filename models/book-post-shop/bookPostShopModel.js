var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookPostShopModel = new Schema({
	mailBookeur: String,
	prenomBookeur: String,
	nomBookeur: String,
	nbrArticleTotal: Number,
	adresseLivraisonBookeur: String,
	idPostShop: String,
	articles: [{
		nomArticle: String,
		nbrArticle: Number
	}],
	statut: String
});

module.exports = mongoose.model('bookPostShop', bookPostShopModel);