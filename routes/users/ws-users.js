var express = require('express');
var router = express.Router();

var usersAccessDb = require('../../models/users/usersAccessDb');

router.post('/sign-up', function(req, res, next) {
	// Vérification des données
	verifDatas(req.body, function(isValid, err) {
		console.log("isValid = "+isValid);
		if (isValid) {
			// Création de l'utilisateur
			console.log("lancement de la création de l'utilisateur");
			usersAccessDb.createUser(req.body, function(result) {
				res.json({
					statut: (result)?("L'e-mail " + req.body.email + " a bien été ajouté."):"Erreur de création..."
				});
			});
		} else {
			res.json({
				statut: err
			});
		}
	});

});

router.post('/check-email', function(req, res, next) {
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


verifEmail = function(datas, callback) {
	if (datas.email && datas.email != "") {
		// TODO : vérifier email valide
		console.log('Test e-mail dans la base ?');
		// Vérification si email pas déjà dans la base
		usersAccessDb.checkAlreadyExist(datas.email, function(result, err){
			console.log((!result)?'E-mail déjà dans la base':'E-mail pas encore dans la base - OK');
			callback(!result, err);
		});

	} else {
		console.log("E-mail vide à la récupération");
		callback(false, "E-mail vide à la récupération.");
	}
}

verifDatas = function(datas, callback) {
	verifEmail(datas, function(result, err){
		console.log((result)?"E-mail OK":"E-mail déjà présent dans la base");
		callback(result, err);
	});
}

module.exports = router;
