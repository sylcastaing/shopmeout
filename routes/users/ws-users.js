var express = require('express');
var router = express.Router();

var usersAccessDb = require('../../models/users/usersAccessDb');

router.post('/sign-up', function (req, res, next) {
	// Vérification des données
	verifDatas(req.body, function (isValid, err) {
		console.log("isValid = "+isValid);
		if (isValid) {
			// Création de l'utilisateur
			console.log("lancement de la création de l'utilisateur");
			usersAccessDb.createUser(req.body, function(result) {
				res.json({
					statut: (result)?("L'e-mail " + req.body.mail + " a bien été ajouté."):"Erreur de création..."
				});
			});
		} else {
			res.json({
				statut: err
			});
		}
	});

});

router.post('/check-email', function (req, res, next) {
	// Vérification des données
	console.log("---------------------------------------");
	console.log("------------Check-email----------------");
	console.log("---------------------------------------");

	verifEmail(req.body, function(result, err){
		console.log("result = "+result);
		res.json({
			statut: result,
			erreur: err
		});
	});

});

verifDatas = function (datas, callback) {

	// Vérification de l'e-mail
	verifEmail(datas, function(result, err) {
		console.log((result)?"E-mail OK":"E-mail déjà présent dans la base");
		// Vérification des autres champs
		if (result) {
			err = ""
			isValid = true;
			if (datas.nom == undefined ||  datas.nom == "") {
				err = "Le nom est vide";
				isValid = false;
			}
			if (isValid && (datas.prenom == undefined || datas.prenom == "")) {
				err = "Le prénom est vide";
				isValid = false;
			}
			if (isValid && (datas.adresse == undefined || datas.adresse == "")) {
				err = "L'adresse est vide";
				isValid = false;
			}
			if (isValid && (datas.telephone == undefined || datas.telephone == "")) {
				err = "Le téléphone est vide";
				isValid = false;
			}
			if (isValid && (datas.motDePasse == undefined || datas.motDePasse == "")) {
				err = "Le mot de passe est vide";
				isValid = false;
			}
			if (isValid && (datas.sexe == undefined || datas.sexe == "")) {
				err = "Le sexe est vide";
				isValid = false;
			}
			if (isValid && (datas.dateNaissance == undefined || datas.dateNaissance == "")) {
				err = "La date de naissance est vide";
				isValid = false;
			}
			callback(isValid, err);
		} else {
			callback(result, err);
		}
	});

}

verifEmail = function (datas, callback) {
	if (datas.mail && datas.mail != "") {
		// Vérification email valide :		
		console.log('Test e-mail valide :');
		if(isEmail(datas.mail)) {

			console.log('Test e-mail dans la base :');
			// Vérification si email pas déjà dans la base
			usersAccessDb.checkAlreadyExist(datas.mail, function(result, err){
				console.log((!result)?'E-mail déjà dans la base':'E-mail pas encore dans la base - OK');
				callback(!result, err);
			});
		} else {
			callback(false, "E-mail non valide");
		}

	} else {
		console.log("E-mail vide à la récupération");
		callback(false, "E-mail vide à la récupération.");
	}
}

isEmail = function (myVar) {
     // Définition de l'expression régulière d'une adresse email
     var regEmail = new RegExp('^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$','i');

     return regEmail.test(myVar);
   }



   module.exports = router;
