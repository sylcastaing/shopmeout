var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var moment = require('moment');
var needShopModel = require('./needShopModel');
var NeedShop = mongoose.model('needShop', needShopModel);
 

var needShopAccessDb = {

	createNeedShop: function(datas, callback) {
		NeedShop.create({
			mailShoppeur: datas.mailShoppeur,
			nom: datas.nom,
			prenom: datas.prenom,
			magasin: datas.magasin,
			adresseMagasin: datas.adresseMagasin,
			dateShopping: datas.dateShopping,
			adresse: datas.adresse,
			nbArticle: datas.nbArticle,
			articles: datas.articles
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
	searchNeedShop: function(datas,callback) {
		if(datas[0].date != undefined) {
			var time = moment.duration("00:01:00");
			var date = moment(datas[0].date);
			var newDate = date.subtract(time);

			NeedShop.find({
				date: { 
					$lte: datas[0].date,
					$gt: newDate.format()},
				nomMagasin: datas[0].nomMagasin
			},{
				_id:0,
				__v:0
			}, function(err,user) {
				callback(user, err);
			});
		}
		else {
			NeedShop.find({
				nomMagasin: datas[0].nomMagasin
			},{
				_id:0,
				__v:0
			}, function(err,user) {
				callback(user, err);
			});
		}
	}
}

module.exports = needShopAccessDb;