var express = require('express');
var MongoClient = require('mongodb').MongoClient;

var usersAccessDb = {

	// url de la BDD
	urlBase: 'mongodb://localhost:27017/shopmeout',
	// collection de la base de données
	collectionBase : 'users',

	createUser = function() {

	},

}

module.exports = usersAccessDb;