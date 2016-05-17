var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var moment = require('moment');
var ObjectId = mongoose.Types.ObjectId;
var postShopModel = require('./postShopModel');
var PostShop = mongoose.model('postShop', postShopModel);
 

var postShopAccessDb = {

	// Creation d'une proposition de shopping
	createPostShop: function(datas, callback) {
		PostShop.create({
			mailShoppeur: datas.mailShoppeur,
			nom: datas.nom,
			prenom: datas.prenom,
			date: datas.date,
			adresse: datas.adresse,
			magasin: datas.magasin,
			distance: datas.distance,
			nbShoppeur: datas.nbShoppeur,
			nbArticle: datas.nbArticle
		}, function(err,postShop) {
			if(err) {
				callback(false, err);
			} else {
				if (postShop != null) {
					callback(true, "");
				} else {
					callback(false, "");
				}
			}
		});
	},

	// Recherche de proposition de shopping
	searchPostShop: function(datas,callback) {
			var query = {};
			if(datas[0].date != undefined && datas[0].date != null) {

				var time = moment.duration("00:01:00");
				var date = moment(datas[0].date);
				var newDate = date.subtract(time);

				query.date = { $lte: datas[0].date,
					$gt: newDate.format()
				};
			}
			else {
				var nowDate = new Date();
				nowDate.setHours(0,0,0,0);
				query.date = {
					$gte: nowDate
				};
			}

			if(datas[0].nbArticle != undefined && datas[0].nbArticle != null) {
				query.nbArticle = { $lte: datas[0].nbArticle };
			}

			query.magasin = datas[0].magasin;
			query.adresse = datas[0].adresse;

			PostShop.find(
				query
			,
			{
				__v:0
			}).sort({date: 1 }).exec(function(err,postShop) {
				callback(postShop, err);
			});
	},

	// Récupère les informations d'une proposition de shopping selon son id
	getProposition: function(id,callback) {
		PostShop.findOne({
			_id: id
		}, function(err,postShop) {
			callback(postShop, err);
		});
	},

	//Ajoute un bookeur à une proposition de shopping (postShop)
	addBookeur: function(data, callback) {
		PostShop.update(
		// Condition
		{
			_id: new ObjectId(data.idPostShop)
		},
		// update
		{
			$push: {
				listBookeurs: {
					mailBookeur: data.mailBookeur,
					nbrArticleTotal: data.nbrArticleTotal,
					adresseLivraisonBookeur: data.adresseLivraisonBookeur,
					articles: data.articles,
					statut: "En attente"
				}
			}
		}, function(err, demande) {
			callback(err);
		});
	}
	
}

module.exports = postShopAccessDb;