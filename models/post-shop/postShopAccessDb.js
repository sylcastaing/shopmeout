var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var moment = require('moment');
var postShopModel = require('./postShopModel');
var PostShop = mongoose.model('postShop', postShopModel);
 

var postShopAccessDb = {

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
	searchPostShop: function(datas,callback) {

		if(datas[0].date != undefined) {
			var time = moment.duration("00:01:00");
			var date = moment(datas[0].date);
			var newDate = date.subtract(time);

			PostShop.find({
				date: { $lte: datas[0].date,
					$gt: newDate.format()},
				magasin: datas[0].magasin
			},
			{
				_id:0,
				__v:0
			}, function(err,user) {
				callback(user, err);
			});
		}
		else {
			PostShop.find({
				magasin: datas[0].magasin
			},
			{
				_id:0,
				__v:0
			}, function(err,user) {
				callback(user, err);
			});
		}

	
	}
}

module.exports = postShopAccessDb;