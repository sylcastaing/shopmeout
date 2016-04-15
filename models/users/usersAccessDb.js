var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var usersModel = require('./usersModel');
var User = mongoose.model('users', usersModel);
var usersMessages = require('properties-reader')('messages/users.messages.properties');

var usersAccessDb = {

	// url de la BDD
	urlBase: 'mongodb://localhost:27017/shopmeout',
	// collection de la base de données
	collectionBase : 'users',

	createUser: function(datas, callback) {
		User.create({
			email: datas.email,
			nom: datas.nom,
			prenom: datas.prenom,
			dateNaissance: datas.dateNaissance,
			adresse: datas.adresse,
			codePostal: datas.codePostal,
			ville: datas.ville,
			telephone: datas.telephone,
			sexe: datas.sexe,
			motDePasse: datas.motDePasse,
			dateInscription: new Date()
		}, function(err,user) {
			if(err) {
				callback(false, err);
			} else {
				if (user != null) {
					callback(true, usersMessages.get("users.creation.email.alreadyExist"));
				} else {
					callback(false, "");
				}
			}
		});
	},
	checkAlreadyExist: function(email, callback) {
		User.findOne({
			email: email
		}, function(err,user) {
			if(err) {
				callback(true, err);
			} else {
				if (user != null) {
					callback(true, usersMessages.get("users.creation.email.alreadyExist"));
				} else {
					callback(false, "");
				}
			}
		});
	},
	getUser: function(email,callback) {
		User.findOne({
			email: email
		},
		{
			_id:0,
			motDePasse:0,
			__v:0
		}, function(err,user) {
			callback(user, err);
		});
	}
}

module.exports = usersAccessDb;