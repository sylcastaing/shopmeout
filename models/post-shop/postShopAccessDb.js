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

		// On cherche juste avec magasin et date : 
		if(datas[0].date != undefined && datas[0].nbArticle == undefined) {
			var time = moment.duration("00:01:00");
			var date = moment(datas[0].date);
			var newDate = date.subtract(time);

			PostShop.find({
				date: { $lte: datas[0].date,
					$gt: newDate.format()},
				magasin: datas[0].magasin,
				adresse: datas[0].adresse
			},
			{
				__v:0
			}, function(err,user) {
				callback(user, err);
			});
		}
		// On cherche juste avec nbArticle et magasin
		else if(datas[0].nbArticle != undefined && datas[0].date == undefined) {
			PostShop.find({
				nbArticle: { $lte: datas[0].nbArticle },
				magasin: datas[0].magasin,
				adresse: datas[0].adresse
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

			PostShop.find({
				date: { $lte: datas[0].date,
					$gt: newDate.format()},
				nbArticle : { $lte: datas[0].nbArticle },
				magasin: datas[0].magasin,
				adresse: datas[0].adresse
			},
			{
				__v:0
			}, function(err,user) {
				callback(user, err);
			});
		}
		// On cherche juste avec magasin
		else {
			PostShop.find({
				magasin: datas[0].magasin,
				adresse: datas[0].adresse
			},
			{
				__v:0
			}, function(err,user) {
				callback(user, err);
			});
		}
	},
	getProposition: function(id,callback) {
		PostShop.findOne({
			_id: id
		}, function(err,user) {
			callback(user, err);
		});
	}
	
}

module.exports = postShopAccessDb;