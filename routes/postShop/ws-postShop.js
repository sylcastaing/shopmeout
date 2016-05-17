var express = require('express');
var router = express.Router();
var passport = require('passport');
var postShopAccessDb = require('../../models/post-shop/postShopAccessDb');
var postShopValidation = require('../../models/post-shop/postShopValidation');
var postShopMessages = require('properties-reader')('messages/postShop.messages.properties');
 


router.post('/postShop', function(req, res, next) {
	if (req.isAuthenticated()) {
		if(req.session.passport.user.email) {
			req.body.mailShoppeur = req.session.passport.user.email;
			req.body.prenom = req.session.passport.user.prenom;
			req.body.nom = req.session.passport.user.nom;
		}
	}
	// Vérification des données
	postShopValidation.verifDatas(req.body, function (isValid, err) {
		if (isValid) {
			// Création de la proposition
			postShopAccessDb.createPostShop(req.body, function(result, err) {
				res.json({
					statut: result,
					err: (result)?(postShopMessages.get("postShop.creation.success")):err
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


router.post('/search-postShop', function(req, res, next) {
	postShopAccessDb.searchPostShop(req.body, function(result, err) {
			if(!err) {
				res.json({
					postShops: result,
				});
			} else {
				console.log("erreur");
			}
	});
});

router.post('/get-postShop', function(req, res, next) {
	postShopAccessDb.getProposition(req.body.id, function(result, err) {
			if(!err) {
				res.json({
					postShop: result,
				});
			} else {
				console.log("erreur");
			}
	});
});

router.post('/add-bookeur', function(req, res, next) {
	postShopAccessDb.addBookeur(req.body, function(err) {
		res.json({
			err: err,
		});
	});
});

module.exports = router;
