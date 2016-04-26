var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var postShopModel = require('./postShopModel');
var PostShop = mongoose.model('postShop', postShopModel);


var postShopAccessDb = {

	createPostShop: function(datas, callback) {
		PostShop.create({
			nomShoppeur: datas.nomShoppeur,
			date: datas.date,
			codePostal: datas.codePostal,
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
	}
}

module.exports = postShopAccessDb;