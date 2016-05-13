var express = require('express');
var usersAccessDb = require('../../models/users/usersAccessDb');
var usersMessages = require('properties-reader')('messages/users.messages.properties');

var usersValidation = {
	// Fonction de vérification des données de l'utilisateur avant sa création
	verifDatas: function (datas, callback) {

		// Vérification de l'e-mail
		usersValidation.verifEmail(datas, function(result, err) {
			// Vérification des autres champs
			if (result) {
				var valideTel = /^0[1-9]\d{8}$/;
				var valideDate = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
				var valideCP = /^[0-9]{5}$/;
				err = ""
				isValid = true;
				if (datas.nom == undefined ||  datas.nom == "") {
					err = usersMessages.get("users.creation.nom.empty");
					isValid = false;
				} else if (isValid && datas.nom.length > 30) {
					err = usersMessages.get("users.creation.nom.tooLong");
					isValid = false;
				}
				if (isValid && (datas.prenom == undefined || datas.prenom == "")) {
					err = usersMessages.get("users.creation.prenom.empty");
					isValid = false;
				} else if (isValid && datas.prenom.length > 30) {
					err = usersMessages.get("users.creation.prenom.tooLong");
					isValid = false;
				}
				if (isValid && (datas.adresse == undefined || datas.adresse == "")) {
					err = usersMessages.get("users.creation.adresse.empty");
					isValid = false;
				} else if (isValid && datas.adresse.length > 60) {
					err = usersMessages.get("users.creation.adresse.tooLong");
					isValid = false;
				}
				if (isValid && (datas.codePostal == undefined || datas.codePostal == "")) {
					err = usersMessages.get("users.creation.codePostal.empty");
					isValid = false;
				} else if (isValid && (datas.codePostal.length != 5 || !valideCP.test(datas.codePostal))) {
					err = usersMessages.get("users.creation.codePostal.fail");
					isValid = false;
				}
				if (isValid && (datas.ville == undefined || datas.ville == "")) {
					err = usersMessages.get("users.creation.ville.empty");
					isValid = false;
				}
				if (isValid && (datas.telephone == undefined || datas.telephone == "")) {
					err = usersMessages.get("users.creation.telephone.empty");
					isValid = false;
				} else if (isValid && datas.telephone.length != 10) {
					err = usersMessages.get("users.creation.telephone.long");
					isValid = false;
				} else if (isValid && !valideTel.test(datas.telephone)) {
					err = usersMessages.get("users.creation.telephone.fail");
					isValid = false;
				}
				if (isValid && (datas.motDePasse == undefined || datas.motDePasse == "")) {
					err =  usersMessages.get("users.creation.motDePasse.empty");
					isValid = false;
				}
				if (isValid && (datas.sexe == undefined || datas.sexe == "")) {
					err = usersMessages.get("users.creation.sexe.empty");
					isValid = false;
				} else if (isValid && datas.sexe != "0" && datas.sexe != "1") {
					err = usersMessages.get("users.creation.sexe.fail");
					isValid = false;
				}
				if (isValid && (datas.dateNaissance == undefined || datas.dateNaissance == "")) {
					err = usersMessages.get("users.creation.dateNaissance.empty");
					isValid = false;
				}
				callback(isValid, err);
			} else {
				callback(result, err);
			}
		});

	},
	// Fonction permettant de vérifier l'email de l'utilisateur
	verifEmail : function (datas, callback) {
		if (datas.email && datas.email != "") {
			// Vérification email valide :
			if(usersValidation.isEmail(datas.email)) {
				// Vérification si email pas déjà dans la base
				usersAccessDb.checkAlreadyExist(datas.email, function(result, err){
					callback(!result, err);
				});
			} else {
				callback(false, usersMessages.get("users.creation.email.fail"));
			}
		} else {
			callback(false, usersMessages.get("users.creation.email.empty"));
		}
	},
	// Vérifie le bon format de l'adresse email
	isEmail : function (myVar) {
		// Définition de l'expression régulière d'une adresse email
		var regEmail = new RegExp('^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$','i');
		return regEmail.test(myVar);
	}

}

module.exports = usersValidation;