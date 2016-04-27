var express = require('express');
var router = express.Router();
var passport = require('passport');
var postShopAccessDb = require('../../models/post-shop/postShopAccessDb');
var postShopValidation = require('../../models/post-shop/postShopValidation');
var postShopMessages = require('properties-reader')('messages/postShop.messages.properties');
 


router.post('/postShop', function(req, res, next) {
	if (req.isAuthenticated()) {
		req.body.mailShoppeur = req.session.passport.user.email;
	}
	else {
		req.body.mailShoppeur = "";
	}
	console.log("mail shoppeur : " + req.body.mailShoppeur);
	// Vérification des données
	postShopValidation.verifDatas(req.body, function (isValid, err) {
		console.log(req.body);
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
			}		
			else {
				console.log("erreur");
			}
	});
	
});


module.exports = router;
