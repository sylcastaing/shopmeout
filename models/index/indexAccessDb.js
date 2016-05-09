var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var moment = require('moment');
var postShopModel = require('../post-shop/postShopModel');
var PostShop = mongoose.model('postShop', postShopModel);
var needShopModel = require('../need-shop/needShopModel');
var NeedShop = mongoose.model('needShop', needShopModel);

var indexAccessDb = {
	searchRandomPostShops: function(datas,callback) {
		// Sélectionner les 3 dernières propositions de shoppping (les plus récentes)
		var dateActuelle = new Date();
		PostShop.find({
			date: {$gt: dateActuelle}
		},
		{
			_id:0,
			__v:0
		}, function(err,user) {
			callback(user, err);
		}).sort({_id:-1}).limit(3);
	},

	searchRandomNeedShops: function(datas,callback) {
		// Sélectionner les 3 dernières demandes de shopping (les plus récentes)
		var dateActuelle = new Date();
		NeedShop.find({
			date: {$gt: dateActuelle}
		},
		{
			_id:0,
			__v:0
		}, function(err,user) {
			callback(user, err);
		}).sort({_id:-1}).limit(3);
	}
}

module.exports = indexAccessDb;