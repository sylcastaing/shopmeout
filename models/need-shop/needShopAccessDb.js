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
	searchNeedShop: function(datas, callback) {
		// On cherche juste avec magasin et date :
		if(datas[0].date != undefined && datas[0].nbArticle == undefined) {
			var time = moment.duration("00:01:00");
			var date = moment(datas[0].date);
			var newDate = date.subtract(time);
			NeedShop.find({
				date: { $lte: datas[0].date,
					$gt: newDate.format()},
					magasin: datas[0].magasin,
					adresseMagasin: datas[0].adresseMagasin
				},
				{
					__v:0
				}).sort({date: 1 }).exec(function(err, postShop) {
					callback(postShop, err);
				});
			}
		// On cherche juste avec nbArticle et magasin
		else if(datas[0].nbArticle != undefined && datas[0].date == undefined) {
			NeedShop.find({
				nbArticle: { $lte: datas[0].nbArticle },
				magasin: datas[0].magasin,
				adresseMagasin: datas[0].adresseMagasin
			},
			{
				__v:0
			}).sort({date: 1 }).exec(function(err, postShop) {
				callback(postShop, err);
			});
		}
		// On cherche avec nbArticle, date et magasin
		else if(datas[0].nbArticle != undefined && datas[0].date != undefined) {
			var time = moment.duration("00:01:00");
			var date = moment(datas[0].date);
			var newDate = date.subtract(time);

			NeedShop.find({
				date: { $lte: datas[0].date,
					$gt: newDate.format()},
					nbArticle : { $lte: datas[0].nbArticle },
					magasin: datas[0].magasin,
					adresseMagasin: datas[0].adresseMagasin
				},
				{
					__v:0
				}).sort({date: 1 }).exec(function(err, postShop) {
					callback(postShop, err);
				});
			}
		// On cherche juste avec magasin
		else {
			NeedShop.find({
				magasin: datas[0].magasin,
				adresseMagasin: datas[0].adresseMagasin
			},
			{
				__v:0
			}).sort({date: 1 }).exec(function(err, postShop) {
				callback(postShop, err);
			});
		}
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
	addShoppeur: function(data, callback) {
		console.log(data.idDemande);
		NeedShop.update(
		// Condition
		{
			_id: new ObjectId(data.idDemande)
		},
		// update
		{
			$push: {
				listShoppeurs: {
					mailShoppeur: data.mailShoppeur,
					statut: "En attente"
				}
			}
		}, function(err, demande) {
			callback(err);
		});
	},

	isAlreadyShoppeur: function(data, callback) {
		console.log(data.email);
		NeedShop.find({
			_id: new ObjectId(data.idDemande),
			'listShoppeurs.mailShoppeur': data.mailShoppeur
		}, function(err,demande) {
		callback(demande,err)
	});
	}

}

module.exports = needShopAccessDb;