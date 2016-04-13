var express = require('express');
var MongoClient = require('mongodb').MongoClient;

var usersAccessDb = {

	// url de la BDD
	urlBase: 'mongodb://localhost:27017/shopmeout',
	// collection de la base de données
	collectionBase : 'users',

	createUser: function(datas, callback) {
		try {
			MongoClient.connect(usersAccessDb.urlBase, function(err, db) {

				if(err) {
					console.log(err);
					callback(false);
				} else {
					db.collection(usersAccessDb.collectionBase).insertOne(datas, function(err, result) {
						if (err) {
							console.log(err);
							callback(false);
						} else {
							callback(true);
						}
						db.close();
					});
				}
			});
		} catch(e) {
			console.log(e);
			callback(false);
		}
	},
	checkAlreadyExist: function(email, callback) {
		try {
			MongoClient.connect(usersAccessDb.urlBase, function(err, db) {

				if(err) {
					console.log("erreur connexion à la base" + err);
					callback(true, err);
				} else {
					db.collection(usersAccessDb.collectionBase).findOne({
						"email" : email
					}, function(err, result) {
						db.close();
						if (err) {
							console.log("erreur récupération résultat" + err);
							callback(true, err);
						} else {
							console.log("result =" + result);
							if (result != null) {
								callback(true, "Un compte existe déjà pour cet e-mail.");
								console.log("result1 =" + result);
							} else {
								callback(false, "");
								console.log("result2 =" + result);
							}
						}
						
					});
				}
			});
		} catch(e) {
			console.log("catch" + e);
			callback(true, e);
		}
	}
}

module.exports = usersAccessDb;