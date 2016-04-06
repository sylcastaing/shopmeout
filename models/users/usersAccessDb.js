var express = require('express');
var MongoClient = require('mongodb').MongoClient;

var usersAccessDb = {

	// url de la BDD
	urlBase: 'mongodb://localhost:27017/shopmeout',
	// collection de la base de données
	collectionBase : 'users',

	createUser: function(callback) {
		try {
			MongoClient.connect(usersAccessDb.urlBase, function(err, db) {

				if(err) {
					console.log(err);
					callback("KO");
				} else {
					db.collection(usersAccessDb.collectionBase).insertOne({
						"name" : "Cécile",
						"mail" : "bourratcecile.33@gmail.com"
					}, function(err, result) {
						if (err) {
							console.log(err);
							callback("KO");
						} else {
							callback("OK");
						}
						db.close();
					});
				}
			});
		} catch(e) {
			console.log(e);
			callback("KO");
		}
	}
}

module.exports = usersAccessDb;