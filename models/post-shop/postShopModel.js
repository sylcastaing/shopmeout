var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postShopModel = new Schema({
	mailShoppeur: String,
	prenom: String,
	nom: String,
	date: Date,
	adresse: String,
	magasin: String,
	distance: Number,
	nbShoppeur: Number,
	nbArticle: Number,
	listBookeurs: [{
		mailBookeur: String,
		prenomBookeur: String,
		nomBookeur: String,
		nbrArticleTotal: Number,
		adresseLivraisonBookeur: String,
		articles: [{
			nomArticle: String,
			nbrArticle: Number
		}],
		statut: String,
	isMine: Boolean,
	isAlreadyShoppeur: Boolean
	}]
});

module.exports = mongoose.model('postShop', postShopModel);