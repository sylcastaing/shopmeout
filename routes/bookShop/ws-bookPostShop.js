var express = require('express');
var router = express.Router();
var passport = require('passport');
var bookPostShopAccessDb = require('../../models/book-post-shop/bookPostShopAccessDb');
var bookPostShopValidation = require('../../models/book-post-shop/bookPostShopValidation');
var bookPostShopMessages = require('properties-reader')('messages/bookPostShop.messages.properties');



router.post('/bookPostShop', function(req, res, next) {
	if (req.isAuthenticated()) {
		if(req.session.passport.user.email) {
			req.body.mailBookeur = req.session.passport.user.email;
			req.body.prenomBookeur = req.session.passport.user.prenom;
			req.body.nomBookeur = req.session.passport.user.nom;
		}
	}
	// Vérification des données
	bookPostShopValidation.verifDatas(req.body, function (isValid, err) {
		if (isValid) {
			// Création de la proposition
			bookPostShopAccessDb.createBookPostShop(req.body, function(result, err) {
				res.json({
					statut: result,
					err: (result)?(bookPostShopMessages.get("bookPostShop.creation.success")):err
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
