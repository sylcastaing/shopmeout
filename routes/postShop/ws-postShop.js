var express = require('express');
var router = express.Router();
var passport = require('passport');
var postShopAccessDb = require('../../models/post-shop/postShopAccessDb');
var postShopValidation = require('../../models/post-shop/postShopValidation');
var postShopMessages = require('properties-reader')('messages/postShop.messages.properties');



router.post('/postShop', function(req, res, next) {
	if (req.isAuthenticated()) {
		if(req.session.passport.user.prenom) {
			req.body.nomShoppeur = req.session.passport.user.prenom;
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


module.exports = router;
