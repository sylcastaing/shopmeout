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
			date: datas.date,
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
			}, function(err,user) {
				callback(user, err);
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
			}, function(err,user) {
				callback(user, err);
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
			}, function(err,user) {
				callback(user, err);
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
			}, function(err,user) {
				callback(user, err);
			});
		}
	},
	getNeedShops: function(email,callback) {
		NeedShop.find({
			mailShoppeur: email
		},
		{
			__v:0
		}, function(err,needShop) {
			callback(needShop, err);
		});
	}
}

module.exports = needShopAccessDb;