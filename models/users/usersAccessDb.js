var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var usersModel = require('./usersModel');
var User = mongoose.model('users', usersModel);
var usersMessages = require('properties-reader')('messages/users.messages.properties');

var usersAccessDb = {
	// Création d'un utilisateur
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
	// Fonction permettant de vérifier si l'e-mail existe déjà en base de données
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
	// Fonction permettant de récupérer les informations d'un utilisateur selon son email
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