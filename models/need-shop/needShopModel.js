var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var needShopModel = new Schema({
	mailShoppeur: String,
	nom: String,
	prenom: String,
	magasin: String,
	adresseMagasin: String,
	date: Date,
	adresse: String,
	nbArticle: Number,
	articles: [{
		nomArticle: String,
		nbrArticle: Number
	}],
	listShoppeurs: [{
		mailShoppeur: String,
		statut: String
	}]
});

module.exports = mongoose.model('needShop', needShopModel);