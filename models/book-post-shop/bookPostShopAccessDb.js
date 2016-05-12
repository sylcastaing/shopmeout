var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var moment = require('moment');
var bookPostShopModel = require('./bookPostShopModel');
var BookPostShop = mongoose.model('bookPostShop', bookPostShopModel);


var bookPostShopAccessDb = {

	createBookPostShop: function(datas, callback) {
		BookPostShop.create({
			mailBookeur: datas.mailBookeur,
			nbrArticleTotal: datas.nbrArticleTotal,
			adresseLivraisonBookeur: datas.adresseLivraisonBookeur,
			idPostShop: datas.idPostShop,
			articles: datas.articles,
			statut: datas.statut
		}, function(err,bookPostShop) {
			if(err) {
				callback(false, err);
			} else {
				if (bookPostShop != null) {
					callback(true, "");
				} else {
					callback(false, "");
				}
			}
		});
	},
	getBookPostShops: function(id,callback) {
		BookPostShop.find({
			idPostShop: id
		},
		{
			__v:0
		}, function(err,bookPostShop) {
			callback(bookPostShop, err);
		});
	}
}

module.exports = bookPostShopAccessDb;