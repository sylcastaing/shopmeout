var express = require('express');
var router = express.Router();
var passport = require('passport');
var needShopAccessDb = require('../../models/need-shop/needShopAccessDb');
var needShopValidation = require('../../models/need-shop/needShopValidation');
var needShopMessages = require('properties-reader')('messages/needShop.messages.properties');
 


router.post('/needShop', function(req, res, next) {
	if (req.isAuthenticated()) {
		if(req.session.passport.user.prenom) {
			req.body.mail = req.session.passport.user.email;
			req.body.nom = req.session.passport.user.nom;
			req.body.prenom = req.session.passport.user.prenom;
		}
	}
	// Vérification des données
	needShopValidation.verifDatas(req.body, function (isValid, err) {
		if (isValid) {
			// Création de la proposition
			needShopAccessDb.createNeedShop(req.body, function(result, err) {
				res.json({
					statut: result,
					err: (result)?(needShopMessages.get("needShop.creation.success")):err
				});
			});
		} else {
			res.json({
				statut: false,
				err : err
			});
		}
	});
});

router.post('/search-needShop', function(req, res, next) {
	// Récupération du mail du user
	mailUser = (req.isAuthenticated)?req.session.passport.user.email:"";
	needShopAccessDb.searchNeedShop(req.body, mailUser, function(result, err) {
		res.json({
			needShops: result,
		});
	});
	
});

router.post('/add-shoppeur', function(req, res, next) {
	needShopAccessDb.addShoppeur(req.body, function(err) {
		res.json({
			err: err,
		});
	});
	
});

router.post('/is-already-add', function(req, res, next) {
	needShopAccessDb.isAlreadyShoppeur(req.body, function(result, err) {
		res.json({
			needShops: result,
			err: err
		});
	});
	
});



module.exports = router;
