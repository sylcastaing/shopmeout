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
			req.login(user, function(err) {
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

router.post('/sign-out', function(req, res, next) {
	req.session.destroy();
	res.json({
		"statut": req.isAuthenticated()
	});
});

verifDatas = function (datas, callback) {

	// Vérification de l'e-mail
	verifEmail(datas, function(result, err) {
		console.log((result)?"E-mail OK":"E-mail déjà présent dans la base");
		// Vérification des autres champs
		if (result) {
			var valideTel = /^0[1-6]\d{8}$/;
			var valideDate = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
			err = ""
			isValid = true;
			console.log ("caract tél : " + datas.telephone.length);
			if (datas.nom == undefined ||  datas.nom == "") {
				err = "Le nom est vide";
				isValid = false;
			} else if (isValid && datas.nom.length > 30) {
				err = "Le nom est trop long";
				isValid = false;
			}
			if (isValid && (datas.prenom == undefined || datas.prenom == "")) {
				err = "Le prénom est vide";
				isValid = false;
			} else if (isValid && datas.prenom.length > 30) {
				err = "Le prénom est trop long";
				isValid = false;
			}
			if (isValid && (datas.adresse == undefined || datas.adresse == "")) {
				err = "L'adresse est vide";
				isValid = false;
			} else if (isValid && datas.adresse.length > 60) {
				err = "L'adresse est trop longue";
				isValid = false;
			}
			if (isValid && (datas.telephone == undefined || datas.telephone == "")) {
				err = "Le téléphone est vide";
				isValid = false;
			} else if (isValid && datas.telephone.length != 10) {
				err = "Le téléphone ne contient pas 10 chiffres";
				isValid = false;
			} else if (isValid && !valideTel.test(datas.telephone)) {
				err = "Le téléphone ne contient pas que des chiffres et/ou ne commence pas correctement";
				isValid = false;
			}
			if (isValid && (datas.motDePasse == undefined || datas.motDePasse == "")) {
				err = "Le mot de passe est vide";
				isValid = false;
			}
			if (isValid && (datas.sexe == undefined || datas.sexe == "")) {
				err = "Le sexe est vide";
				isValid = false;
			} else if (isValid && datas.sexe != "0" && datas.sexe != "1") {
				err = "Le sexe n'est pas valide (différent de 0 ou 1)";
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
