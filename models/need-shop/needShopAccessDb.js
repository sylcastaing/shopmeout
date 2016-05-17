var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var moment = require('moment');
var needShopModel = require('./needShopModel');
var NeedShop = mongoose.model('needShop', needShopModel);


var needShopAccessDb = {

	// Création d'une demande de shopping pour le user
	createNeedShop: function(datas, callback) {
		NeedShop.create({
			mail: datas.mail,
			nom: datas.nom,
			prenom: datas.prenom,
			magasin: datas.magasin,
			adresseMagasin: datas.adresseMagasin,
			date: datas.date,
			adresse: datas.adresse,
			nbArticle: datas.nbArticle,
			articles: datas.articles,
			listShoppeurs: []
		}, function(err,needShop) {
			if(err) {
				callback(false, err);
			} else {
				if (needShop != null) {
					callback(true, "");
				} else {
					callback(false, "");
				}
			}
		});
	},

	// Recherche des demandes de shopping selon les critères présents dans data
	searchNeedShop: function(datas, mailUser, callback) {
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
			console.log(nowDate);
			query.date = {
				$gte: nowDate
			};
		}
		if(datas[0].nbArticle != undefined && datas[0].nbArticle != null) {
			query.nbArticle = { $lte: datas[0].nbArticle };
		}

		query.magasin = datas[0].magasin;
		query.adresseMagasin = datas[0].adresseMagasin;
		
		NeedShop.find(
			query
		,
		{
			__v:0
		}).exec(function(err, needShop) {
			needShopAccessDb.isMine(needShop, mailUser, function(needShop) {
				needShopAccessDb.isAlreadyShoppeur(needShop, mailUser, function(needShop) {
					callback(needShop, err);
				})
			});
		});
	},


	isMine: function(needShops, mailUser, callback) {
		for (i in needShops) {
			needShops[i].isMine = (needShops[i].mail == mailUser);
		}
		callback(needShops);
	},

	isAlreadyShoppeur: function(needShops, mailUser, callback) {
		for (i in needShops) {
			isAlreadyShoppeur = false;
			for (l in needShops[i].listShoppeurs) {
				if (needShops[i].listShoppeurs[l].mailShoppeur == mailUser) {
					isAlreadyShoppeur = true;
					break;
				}
			}
			needShops[i].isAlreadyShoppeur = isAlreadyShoppeur;
		}
		callback(needShops);
	},

	// Récupération de toutes les demandes associé à "email"
	getNeedShops: function(email, callback) {
		NeedShop.find({
			mail: email
		},
		{
			__v:0
		}).sort({date: 1 }).exec(function(err, postShop) {
			callback(postShop, err);
		});
	},

	// Ajout du shoppeur dans une demande (idDemande)
	addShoppeur: function(data, user, callback) {
		NeedShop.update(
		// Condition
		{
			_id: new ObjectId(data.idDemande)
		},
		// update
		{
			$push: {
				listShoppeurs: {
					mailShoppeur: user.email,
					nomShoppeur: user.nom,
					prenomShoppeur: user.prenom,
					statut: "En attente"
				}
			}
		}, function(err, demande) {
			callback(err);
		});
	},

	getBookNeedShops: function(mailShoppeur, callback) {
		NeedShop.find({
			"listShoppeurs.mailShoppeur": mailShoppeur
		}, function(err, bookNeedShops) {
			callback(err, bookNeedShops);
		});
	},

	acceptNeedShop: function (data, callback) {
		NeedShop.update(
		// Condition
		{
			_id: new ObjectId(data.selectedDemande._id),
			'listShoppeurs._id': new ObjectId(data.shoppeur._id)
		},
		// update
		{
			$set: {
				'listShoppeurs.$.statut': (data.isAccepted)?"Validé":"Refusé"
			}
		}, function(err, update) {
			callback(err, update);
		});
	}



}

module.exports = needShopAccessDb;