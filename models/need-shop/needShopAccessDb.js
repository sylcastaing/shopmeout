var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var needShopModel = require('./needShopModel');
var NeedShop = mongoose.model('needShop', needShopModel);
 

var needShopAccessDb = {

	createNeedShop: function(datas, callback) {
		NeedShop.create({
			mailShoppeur: datas.mailShoppeur,
			nomMagasin: datas.nomMagasin,
			adresseMagasin: datas.adresseMagasin,
			dateShopping: datas.dateShopping,
			adresse: datas.adresse,
			nbArticle: datas.nbArticle
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
		NeedShop.find({
			dateShopping: datas.dateShopping,
			adresse: datas.adresse
		},
		{
			_id:0,
			__v:0
		}, function(err,user) {
			callback(user, err);
		});
	}
}

module.exports = needShopAccessDb;