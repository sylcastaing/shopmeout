var express = require('express');
var router = express.Router();
var passport = require('passport');
var usersAccessDb = require('../../models/users/usersAccessDb');

router.post('/sign-in', function (req, res, next) {
	passport.authenticate('local', {session: true}, function(err, user, info) {
		if (err) { 
			res.json({
				statut: false,
				erreur: info
			});
		}
		if (!user) { 
			res.json({
				statut: false,
				erreur: info
			});
		}
		else {
			req.logIn(user, function(err) {
				if (err) {
					return next(err);
				}
				res.json({
					statut: true,
					erreur: ""
				});
			});
		}
	})(req, res, next);
});

router.post('/sign-up', function (req, res, next) {
	// Vérification des données
	verifDatas(req.body, function (isValid, err) {
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
	verifEmail(datas, function(result, err) {
		console.log((result)?"E-mail OK":"E-mail déjà présent dans la base");
		callback(result, err);
	});
}

verifEmail = function (datas, callback) {
	if (datas.email && datas.email != "") {
		// Vérification email valide :		
		console.log('Test e-mail valide :');
		if(isEmail(datas.email)) {

			console.log('Test e-mail dans la base :');
			// Vérification si email pas déjà dans la base
			usersAccessDb.checkAlreadyExist(datas.email, function(result, err){
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
