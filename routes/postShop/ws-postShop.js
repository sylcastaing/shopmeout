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
				console.log(result);
				res.json({
					postShops: result,
				});
			}
			else {
				console.log("erreur");
			}
	});
	
});


module.exports = router;
